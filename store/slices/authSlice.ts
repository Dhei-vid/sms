import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/services/auth/auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

// Start with empty state so server and client initial render match (avoids hydration error)
const getInitialState = (): AuthState => ({
  token: null,
  user: null,
  isAuthenticated: false,
});

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) => {
      const { token, user } = action.payload;

      // Validate inputs
      if (!token || !user) {
        console.error("❌ Invalid credentials: missing token or user");
        return;
      }

      // Log for debugging
      if (typeof window !== "undefined") {
        console.log("💾 Storing credentials:", {
          hasToken: !!token,
          hasUser: !!user,
          userId: user?.id,
          userEmail: user?.email,
          userRole: user?.role,
        });
      }

      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("auth_user", JSON.stringify(user));

          // Verify storage
          const storedToken = localStorage.getItem("auth_token");
          const storedUser = localStorage.getItem("auth_user");

          if (!storedToken || !storedUser) {
            console.error("❌ Failed to store credentials in localStorage");
          } else {
            console.log("✅ User stored in localStorage:", {
              stored: true,
              userId: user?.id,
            });
          }
        } catch (storageError) {
          console.error("❌ localStorage error:", storageError);
        }
      }
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    },

    updateUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("auth_user", JSON.stringify(action.payload));
      }
    },

    rehydrateAuth: (state) => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("auth_token");
      const userStr = localStorage.getItem("auth_user");
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        } catch {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      }
    },
  },
});

export const { setCredentials, logout, updateUser, rehydrateAuth } =
  authSlice.actions;
export default authSlice.reducer;

export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
