import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { transactionsApi } from "./transactions";
import type { Transaction } from "./transaction-types";
import { groupTransactionsByCategory } from "./transaction-utils";
import type { TransactionsByCategoryGroup } from "./transaction-utils";

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
