import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { walletApi } from "./wallet";
import type { Wallet } from "./wallet-type";

const STABLE_EMPTY: Wallet[] = [];

export const selectGetWalletsResult = (state: RootState) =>
  walletApi.endpoints.getWallets.select(undefined)(state);

/** Stable ref when no data (Reselect v5 input stability). */
export const selectWalletsData = createSelector(
  [selectGetWalletsResult],
  (result): Wallet[] => result.data?.data ?? STABLE_EMPTY
);
