import currency from "currency.js";

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

export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export const formatNumber = (value: number, locale = "en-US") => {
  return value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formattedAmount = (amount: number) =>
  currency(amount, {
    symbol: "₦",
    separator: ",",
  }).format();

export function generateStudentID(
  length: number = 8,
  prefix: string = "",
): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = prefix;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}

export function generateSchoolID(): string {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 26;
  let result = "";

  const randomValues = new Uint32Array(idLength);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < idLength; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
}
