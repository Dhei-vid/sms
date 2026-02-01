import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { studentsApi } from "./students";
import type { Student } from "./students-type";

const STABLE_EMPTY: Student[] = [];

export const selectGetStudentsResult = (state: RootState) =>
  studentsApi.endpoints.getStudents.select(undefined)(state);

/** Stable ref when no data (Reselect v5 input stability). */
export const selectStudentsData = createSelector(
  [selectGetStudentsResult],
  (result): Student[] => result.data?.data ?? STABLE_EMPTY
);
