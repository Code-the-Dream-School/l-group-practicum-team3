// Status Codes
const { StatusCodes } = require("http-status-codes");
const ai = require("../config/gemini.js");
const { z } = require("zod");

const receiptItemSchema = z.object({
  name: z.string(),
  category: z
    .enum([
      "produce",
      "dairy",
      "proteins",
      "grains",
      "beverages",
      "pantry",
      "other",
    ])
    .optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  price: z.number().optional(),
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
          unit: { type: "STRING" },
          price: { type: "NUMBER" },
          category: {
            type: "STRING",
            description:
              "Categorize the item into: produce, dairy, proteins, grains, beverages, pantry, or other",
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
- Categorize each item: Assign a category from the following list: [produce, dairy, proteins, grains, beverages, pantry, other].
- Preserve quantities, units, and prices if visible.
- If a value is not present, omit the field completely.
- Ensure all monetary values are numbers only.
`;

// scan
const scan = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // convert the uploaded image to base64
    const base64Image = req.file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: process.env.AI_MODEL,
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: req.file.mimetype,
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

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unexpected error during scanning",
      error: err.message,
    });
  }
};

module.exports = { scan };
