import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { usersApi } from "./users";
import type { User } from "./users-type";

const STABLE_EMPTY: User[] = [];

export const selectGetUsersResult = (state: RootState) =>
  usersApi.endpoints.getUsers.select(undefined)(state);

/** Stable ref when no data (Reselect v5 input stability). */
export const selectUsersData = createSelector(
  [selectGetUsersResult],
  (result): User[] => result.data?.data ?? STABLE_EMPTY
);
