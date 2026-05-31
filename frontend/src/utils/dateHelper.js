// Helper function to calculate days left from an expiration date string from DB

import dayjs from "dayjs";

export const calculateExpiryDays = (expirationDate) => {
  if (!expirationDate) return null;

  const today = dayjs().startOf("day");
  const expiry = dayjs(expirationDate).startOf("day");

  console.log("current date", expiry);
  console.log("expiry date", expirationDate);

  const diffDays = expiry.diff(today, "day");
  return diffDays > 0 ? diffDays : 0;
};
