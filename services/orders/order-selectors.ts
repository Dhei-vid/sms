import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { ordersApi } from "./orders";
import type { Order } from "./orders-type";

const STABLE_EMPTY: Order[] = [];

export const selectGetOrdersResult = (state: RootState) =>
  ordersApi.endpoints.getOrders.select(undefined)(state);

/** Stable ref when no data (Reselect v5 input stability). */
export const selectOrdersData = createSelector(
  [selectGetOrdersResult],
  (result): Order[] => result.data?.data ?? STABLE_EMPTY
);
