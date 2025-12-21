import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppError {
  code?: string | number;
  message: string;
  details?: unknown;
}

interface ErrorState {
  lastError: AppError | null;
}

const initialState: ErrorState = {
  lastError: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<AppError | null>) {
      state.lastError = action.payload;
    },
    clearError(state) {
      state.lastError = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;



