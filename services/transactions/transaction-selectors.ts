import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { transactionsApi } from "./transactions";
import type { Transaction, BudgetSummary } from "./transaction-types";

export interface TransactionsByCategoryGroup {
  category: string;
  totalAmount: number;
  count: number;
  percentageOfTotal: number;
}

const UNCATEGORIZED = "Uncategorized";

export function normalizeCategory(category: string | null | undefined): string {
  const value = (category ?? "").toString().trim();
  return value || UNCATEGORIZED;
}

export function groupTransactionsByCategory(
  transactions: Transaction[] | undefined,
): TransactionsByCategoryGroup[] {
  if (!transactions?.length) return [];

  const expenseOnly = transactions.filter(
    (t) => (t.transaction_type ?? "").toLowerCase() === "expense",
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
    0,
  );

  return Array.from(byCategory.entries())
    .map(([category, { total, count }]) => ({
      category,
      totalAmount: total,
      count,
      percentageOfTotal: totalSpend > 0 ? (total / totalSpend) * 100 : 0,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
}

export function calculateBudgetSummary(
  transactions: Transaction[],
): BudgetSummary {
  let total_income = 0;
  let total_expense = 0;
  let currency = "NGN";

  for (const t of transactions) {
    const amount = Number(t.amount) || 0;
    const type = (t.transaction_type ?? "").toLowerCase();
    if (type === "income") total_income += amount;
    else if (type === "expense") total_expense += amount;
    if (t.currency) currency = t.currency;
  }

  return {
    total_income,
    total_expense,
    net_balance: total_income - total_expense,
    currency,
    transaction_count: transactions.length,
  };
}

const STABLE_EMPTY: Transaction[] = [];

export const selectGetAllTransactionsResult = (state: RootState) =>
  transactionsApi.endpoints.getAllTransactions.select(undefined)(state);

export const selectAllTransactionsData = (state: RootState): Transaction[] => {
  const body = selectGetAllTransactionsResult(state).data;
  if (!body) return STABLE_EMPTY;
  if (Array.isArray(body)) return body;
  return (body as { data?: Transaction[] }).data ?? STABLE_EMPTY;
};

/** Memoized: expense transactions grouped by category (totals + %). Use after useGetAllTransactionsQuery(). */
export const selectTransactionsGroupedByCategory = createSelector(
  [selectAllTransactionsData],
  (transactions): TransactionsByCategoryGroup[] =>
    groupTransactionsByCategory(transactions),
);
