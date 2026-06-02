// Helper function to calculate days left from an expiration date string from DB

import dayjs from "dayjs";

export const calculateExpiryDays = (expirationDate) => {
  if (!expirationDate) return null;

  const today = dayjs().startOf("day");
  const expiry = dayjs(expirationDate).startOf("day");

  const diffDays = expiry.diff(today, "day");

  return diffDays > 0 ? diffDays : 0;
};

export const getExpiryMessage = (days) => {
  if (days === null) return "No expiry";
  if (days === 0) return "Soon";
  if (days === 1) return "1 day";
  return `${days} days`;
};
