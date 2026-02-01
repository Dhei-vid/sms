import type { Transaction } from "./transaction-types";

/**
 * Result of grouping transactions by category (expense-only, aggregated).
 * Used by selectors and UI for Budget vs Actual and similar views.
 */
export interface TransactionsByCategoryGroup {
  category: string;
  totalAmount: number;
  count: number;
  percentageOfTotal: number;
}

const UNCATEGORIZED = "Uncategorized";

/**
 * Normalize category for grouping (API may return null or empty).
 */
export function normalizeCategory(
  category: string | null | undefined
): string {
  const value = (category ?? "").toString().trim();
  return value || UNCATEGORIZED;
}

/**
 * Group transactions by category and aggregate amounts.
 * Uses expense transactions only (actual spending for budget vs actual).
 * Returns groups sorted by totalAmount descending, with percentageOfTotal.
 */
export function groupTransactionsByCategory(
  transactions: Transaction[] | undefined
): TransactionsByCategoryGroup[] {
  if (!transactions?.length) return [];

  const expenseOnly = transactions.filter(
    (t) => (t.transaction_type ?? "").toLowerCase() === "expense"
  );
  const byCategory = new Map<string, { total: number; count: number }>();

  for (const t of expenseOnly) {
    const key = normalizeCategory(t.category as string | null | undefined);
    const amount = Number(t.amount) || 0;
    const existing = byCategory.get(key) ?? { total: 0, count: 0 };
    byCategory.set(key, {
      total: existing.total + amount,
      count: existing.count + 1,
    });
  }

  const totalSpend = Array.from(byCategory.values()).reduce(
    (sum, { total }) => sum + total,
    0
  );

  return Array.from(byCategory.entries())
    .map(([category, { total, count }]) => ({
      category,
      totalAmount: total,
      count,
      percentageOfTotal:
        totalSpend > 0 ? (total / totalSpend) * 100 : 0,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
}
