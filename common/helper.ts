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
