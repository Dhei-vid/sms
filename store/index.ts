import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@/services/baseApi";
import { errorSlice } from "./errorSlice";
import authReducer from "./slices/authSlice";

/**
 * Redux store configuration
 * Combines all reducers and middleware for the application
 */
export const store = configureStore({
  reducer: {
    // RTK Query API reducer for handling API state and caching
    [baseApi.reducerPath]: baseApi.reducer,
    // Error handling reducer for global error state
    error: errorSlice.reducer,
    // Authentication reducer for managing user login state and token
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Enable refetchOnFocus and refetchOnReconnect behaviors for RTK Query
setupListeners(store.dispatch);

// TypeScript types for store state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;