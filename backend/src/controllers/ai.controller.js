// Status Codes
const { StatusCodes } = require("http-status-codes");
const ai = require("../config/gemini.js");
const { z } = require("zod");
const { supabaseAdmin } = require("../config/db.supabase.js");

const receiptItemSchema = z.object({
  name: z.string(),
  category: z
    .enum([
      // perishable
      "dairy",
      "meat",
      "fruit",
      "vegetable",
      // nonPerishable
      "spice",
      "condiment",
      "canned",
      "other",
    ])
    .optional(),
  quantity: z.number().optional(),
  unit: z
    .enum(["kg", "g", "lb", "oz", "l", "ml", "cup", "tbsp", "tsp", "piece"])
    .optional(),
  price: z.number().optional(),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

const receiptSchema = z.object({
  store: z.string().optional(),
  date: z.string().optional(),
  items: z.array(receiptItemSchema),
  subtotal: z.number().optional(),
  tax: z.number().optional(),
  total: z.number().optional(),
});

// AI-assisted, generated JSON schema
const geminiSchema = {
  type: "OBJECT",
  properties: {
    store: { type: "STRING" },
    date: { type: "STRING" },
    subtotal: { type: "NUMBER" },
    tax: { type: "NUMBER" },
    total: { type: "NUMBER" },
    items: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          quantity: { type: "NUMBER" },
          price: { type: "NUMBER" },
          category: {
            type: "STRING",
            description:
              "Categorize the item into one of: dairy, meat, fruit, vegetable, spice, condiment, canned, or other",
          },
          unit: {
            type: "STRING",
            description:
              "Unit of measurement. Must be one of: kg, g, lb, oz, l, ml, cup, tbsp, tsp, piece. Omit if not applicable.",
          },
          expirationDate: {
            type: "STRING",
            description:
              "Estimated expiration date in YYYY-MM-DD format, calculated by adding the item's typical shelf life to the receipt date",
          },
        },
        required: ["name"],
      },
    },
  },
  required: ["items"],
};

// ********************************************************************
// ENDPOINTS
// ********************************************************************

const prompt = `
You are a receipt data extraction system.

Extract structured data from the receipt image.

Rules:
- Clean item names: remove adjectives, branding words, and unnecessary descriptors.
- Categorize each item: Assign a category from the following list:
  [dairy, meat, fruit, vegetable, spice, condiment, canned, other].
  Use "fruit" or "vegetable" instead of the generic "produce".
  Use "canned" for tinned/preserved goods instead of "pantry".
  Use "meat" for proteins including fish and poultry.
- Normalize units: if a unit is present, convert it to the closest match from
  [kg, g, lb, oz, l, ml, cup, tbsp, tsp, piece]. Omit if no unit applies.
- Preserve quantities, units, and prices if visible.
- If a value is not present, omit the field completely.
- Ensure all monetary values are numbers only.
- Estimate expirationDate for each item: using the receipt date as the purchase date,
  calculate an estimated expiration date in YYYY-MM-DD format by adding the item's
  typical shelf life (e.g., milk ≈ 7 days, bananas ≈ 5 days, canned beans ≈ 730 days).
  Base estimates on the item name and category. If the receipt date is missing or the
  item is completely ambiguous, omit the field.
`;

const BUCKET = "Receipts"; // supabase Storage bucket name

// SCAN RECEIPT ENDPOINT::
/*
1. Inserts image into Supabase Storage Bucket
2. Releases buffer from memory
3. Insert row into Supabase 'receipt' table
4. Generate short-lived public URL for image from storage bucket
5. Fetch Image and convert to base64
6. Make Gemini AI call using public URL
7. Parse the response
8. Update row in Supabase 'receipt' table
9. Return data
*/
const scan = async (req, res) => {
  let receiptId = null;
  let storagePath = null;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // UPLOAD TO SUPABASE STORAGE BUCKET
    const mimeType = req.file.mimetype;
    const userId = req.user?.id ?? "anonymous";
    storagePath = `${userId}/${Date.now()}-${req.file.originalname}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(storagePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      return res.status(500).json({
        message: "Failed to upload receipt image",
        error: uploadError.message,
      });
    }

    req.file.buffer = null; // release buffer from memory, already stored in supabase

    // insert row into RECEIPT table in SUPABASE
    const { data: receiptRow, error: insertError } = await supabaseAdmin
      .from("receipt")
      .insert({
        user_id: req.user?.id ?? null,
        storage_path: storagePath,
        data: null,
      })
      .select("id")
      .single();

    if (insertError) {
      return res.status(500).json({
        message: "Failed to create receipt record",
        error: insertError.message,
      });
    }

    receiptId = receiptRow.id;

    // generate short-lived public url for gemini
    const { data: signedData, error: signedError } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(storagePath, 60); // 60 seconds

    if (signedError) {
      return res.status(500).json({
        message: "Failed to generate signed URL",
        error: signedError.message,
      });
    }

    // fetch the image and convert to base 64 for gemini
    const imageRes = await fetch(signedData.signedUrl);
    if (!imageRes.ok) {
      return res
        .status(500)
        .json({ message: "Failed to fetch uploaded image for processing" });
    }
    const base64Image = Buffer.from(await imageRes.arrayBuffer()).toString(
      "base64"
    );

    // make the call
    const response = await ai.models.generateContent({
      model: process.env.AI_MODEL,
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        prompt,
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema,
      },
    });

    // parse response JSON
    let parsed;
    try {
      parsed = receiptSchema.parse(JSON.parse(response.text));
    } catch (err) {
      return res.status(500).json({
        message: "Failed to parse Gemini output",
        zodErrors: err.issues || err.message || "Not a Zod error",
        raw: response.text,
      });
    }

    // UPDATE SUPABASE RECEIPT ENTRY
    const { error: updateError } = await supabaseAdmin
      .from("receipt")
      .update({ data: parsed })
      .eq("id", receiptId);

    if (updateError) {
      console.error("Failed to update receipt data:", updateError.message);
    }

    return res
      .status(200)
      .json({ id: receiptId, storage_path: storagePath, ...parsed });
  } catch (err) {
    
    // do clean-up if failed?
    if (storagePath)
      await supabaseAdmin.storage.from(BUCKET).remove([storagePath]);
    if (receiptId)
      await supabaseAdmin.from("receipt").delete().eq("id", receiptId);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unexpected error during scanning",
      error: err.message,
    });
  }
};

module.exports = { scan };
