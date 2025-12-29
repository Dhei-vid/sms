import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/services/auth/auth";

/**
 * Interface for the authentication state in Redux store
 * Stores the authentication token and user information
 */
interface AuthState {
  token: string | null; // JWT token for API authentication
  user: AuthUser | null; // Current authenticated user information
  isAuthenticated: boolean; // Flag to quickly check if user is logged in
}

/**
 * Initial state for the auth slice
 * Attempts to load persisted auth data from localStorage on initialization
 */
const getInitialState = (): AuthState => {
  // Try to load persisted auth data from localStorage
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        return {
          token,
          user,
          isAuthenticated: true,
        };
      } catch (error) {
        // If parsing fails, clear corrupted data
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
  }

  // Default state if no persisted data exists
  return {
    token: null,
    user: null,
    isAuthenticated: false,
  };
};

/**
 * Redux slice for managing authentication state
 * Handles login, logout, and user data updates
 */
export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    /**
     * Action to set authentication credentials after successful login
     * Persists token and user data to localStorage for session persistence
     * 
     * @param state - Current auth state
     * @param action - Payload containing token and user data
     */
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>
    ) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      // Persist to localStorage for session persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      }
    },

    /**
     * Action to clear authentication state on logout
     * Removes token and user data from both Redux state and localStorage
     * 
     * @param state - Current auth state
     */
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Clear persisted data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    },

    /**
     * Action to update user information without changing token
     * Useful when user profile is updated
     * 
     * @param state - Current auth state
     * @param action - Payload containing updated user data
     */
    updateUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;

      // Update persisted user data in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_user", JSON.stringify(action.payload));
      }
    },
  },
});

// Export actions for use in components
export const { setCredentials, logout, updateUser } = authSlice.actions;

// Export reducer to be included in store
export default authSlice.reducer;

// Selector functions for accessing auth state
/**
 * Selector to get the authentication token
 * Used by API middleware to attach token to requests
 */
export const selectToken = (state: { auth: AuthState }) => state.auth.token;

/**
 * Selector to get the current authenticated user
 * Used to display user information in UI
 */
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

/**
 * Selector to check if user is authenticated
 * Used for route protection and conditional rendering
 */
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

