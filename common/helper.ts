import currency from "currency.js";

/**
 * Date Formatter
 * @param date
 * @returns
 */
export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/**
 * Check if Date is valid
 * @param date
 * @returns
 */
export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

/**
 * Format a number to 56,000.00
 * @param value
 * @param locale
 * @returns
 */
export const formatNumber = (value: number, locale = "en-US") => {
  return value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Format Amount
 * @param amount
 * @returns
 */
export const formattedAmount = (amount: number) =>
  currency(amount, {
    symbol: "₦",
    separator: ",",
  }).format();

/**
 * Generates a random student ID.
 * @param length - The length of the ID (default is 8).
 * @param prefix - An optional string to prepend (e.g., 'STU-').
 * @returns A randomly generated student ID string.
 */
export function generateStudentID(
  length: number = 8,
  prefix: string = "",
): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed O, 0, 1, I for clarity
  let result = prefix;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}

/**
 * Generates a 26-character random alphanumeric school ID.
 * Uses cryptographically secure random values.
 */
export function generateSchoolID(): string {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 26;
  let result = "";

  // Using crypto.getRandomValues for better entropy than Math.random()
  const randomValues = new Uint32Array(idLength);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < idLength; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
}
