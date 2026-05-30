// Helper function to calculate days left from an expiration date string from DB

export const calculateExpiryDays = (expirationDate) => {
  if (!expirationDate) return 0;

  const today = new Date();
  const expiry = new Date(expirationDate);
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};
