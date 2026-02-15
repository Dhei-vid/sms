import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import { clearError, setError } from "@/store/errorSlice";
import { logout, selectToken } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/format-api-error";

/**
 * API Configuration (centralized here).
 * Services: endpoints = url/params/body only (lean). Use *-selectors.ts + createSelector to derive/transform cached data for UI.
 */
const getBaseUrl = () => {
  const rawUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;

  if (!rawUrl) {
    if (typeof window !== "undefined") {
      console.error("❌ API base URL not configured!");
      console.error(
        "Please set NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_BASE_URL environment variable.",
      );
    }
    return "https://api-placeholder.invalid";
  }

  const url = rawUrl.replace(/\/+$/, "");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    if (typeof window !== "undefined") {
      console.error(
        "❌ API baseUrl must be a full URL (starting with http:// or https://)",
      );
      console.error("Current value:", url);
    }
    return "https://api-placeholder.invalid";
  }

  if (typeof window !== "undefined") {
    // console.log("🔗 API Base URL:", url);
  }

  return url;
};

const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_AUTH_API_KEY;
  if (!apiKey && typeof window !== "undefined") {
    console.error(
      "❌ x-api-key is NOT configured! Set NEXT_PUBLIC_AUTH_API_KEY environment variable.",
    );
  }
  return apiKey || "";
};

/**
 * Base Query Configuration
 * Sets up base URL and prepares headers matching Postman requirements
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  /**
   * Prepare headers for each API request
   * Matches Postman configuration:
   * - x-api-key: Required for all requests
   * - Content-Type: application/json
   * - Authorization: Bearer token (from cookie, for authenticated requests)
   */
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (typeof window === "undefined") {
      return headers;
    }

    const apiKey = getApiKey();
    if (apiKey) {
      headers.set("x-api-key", apiKey);
    }

    // Skip ngrok free-tier interstitial page when using ngrok tunnel
    const baseUrl = getBaseUrl();
    if (baseUrl.includes("ngrok-free.app") || baseUrl.includes("ngrok-free.dev") || baseUrl.includes("ngrok.io")) {
      headers.set("ngrok-skip-browser-warning", "true");
    }

    const state = getState() as RootState;
    const token = selectToken(state);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    const isMultipart =
      endpoint === "admissionRegister" || endpoint === "createStakeholder";
    if (!isMultipart) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
});

/**
 * Enhanced base query with error handling
 * Intercepts all API responses and handles errors globally
 * Matches axios interceptor behavior with toast notifications and logout on 401
 */
const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseUrl = getBaseUrl();
  const requestUrl = typeof args === "string" ? args : args.url;
  const method = typeof args === "string" ? "GET" : args.method || "GET";
  const fullUrl = `${baseUrl}${requestUrl}`;

  // Log request
  if (typeof window !== "undefined") {
    const isLoginRequest = fullUrl.includes("/auth/login");
    const headers: Record<string, string> = {};
    if (typeof args !== "string" && args.headers) {
      Object.entries(args.headers).forEach(([key, value]) => {
        if (key.toLowerCase() !== "authorization") {
          headers[key] = String(value);
        } else {
          headers[key] = "Bearer [REDACTED]";
        }
      });
    }

    // console.group(`🚀 ${method} ${requestUrl}`);
    // console.log("Full URL:", fullUrl);
    // console.log("Headers:", headers);
    if (isLoginRequest) {
      const body = typeof args !== "string" ? args.body : undefined;
      if (body && typeof body === "object") {
        const safeBody = { ...(body as Record<string, unknown>) };
        if ("password" in safeBody) {
          safeBody.password = "[REDACTED]";
        }
        // console.log("Body:", safeBody);
      }
    } else {
      // console.log("Body:", typeof args !== "string" ? args.body : undefined);
    }
    // console.log("Timestamp:", new Date().toISOString());
    console.groupEnd();
  }

  const startTime = Date.now();
  const result = await rawBaseQuery(args, api, extraOptions);
  const duration = Date.now() - startTime;

  // Log response
  if (typeof window !== "undefined") {
    if (result.data) {
      const response = result.data as
        | { status?: boolean; status_code?: number }
        | undefined;
      const isSuccess =
        response?.status === true ||
        (response?.status_code && response.status_code < 400);

      if (isSuccess) {
        // console.group(`✅ ${method} ${requestUrl} - Success (${duration}ms)`);
        // console.log(
        //   "Response Status:",
        //   response?.status,
        //   response?.status_code,
        // );
        // console.log("Response Data:", result.data);
        console.groupEnd();
      } else {
        console.group(`❌ ${method} ${requestUrl} - Failed (${duration}ms)`);
        console.error(
          "Response Status:",
          response?.status,
          response?.status_code,
        );
        console.error("Response:", result.data);
        console.groupEnd();
      }
    } else if (result.error) {
      console.group(`❌ ${method} ${requestUrl} - Error (${duration}ms)`);
      console.error("Status:", result.error.status);
      console.error("Error Data:", result.error.data);
      console.groupEnd();
    }
  }

  // Check response status field - if status is false, treat as error
  if (result.data) {
    const response = result.data as
      | { status?: boolean; status_code?: number; message?: string }
      | undefined;

    if (
      response?.status === false ||
      (response?.status_code && response.status_code >= 400)
    ) {
      const errorMessage = response?.message || "Request failed";
      return {
        error: {
          status: response?.status_code || 400,
          data: { message: errorMessage },
        } as FetchBaseQueryError,
      };
    }

    // Show success toast if message is present
    if (response?.status === true && response?.message) {
      // toast.success(response.message);
    }
  }

  // Handle errors
  if (result.error) {
    const status = result.error.status;
    const data = result.error.data;

    // Check if we got an HTML response (404 from Next.js routing)
    const isHtmlResponse =
      typeof data === "string" && (data as string).includes("<!DOCTYPE html>");

    // Descriptive message from API body (Django field errors, detail, message, etc.)
    let errorMessage = getApiErrorMessage(data);

    // If we got HTML, or 404 without any API error message, treat as endpoint not found
    const defaultMsg = "Something went wrong. Please try again.";
    if (isHtmlResponse || (status === 404 && errorMessage === defaultMsg)) {
      errorMessage = `API endpoint not found. Check API configuration. Attempted: ${fullUrl}`;
      console.error("❌ API Request Failed:", {
        baseUrl,
        endpoint: requestUrl,
        fullUrl,
        status,
      });
    }

    // Handle specific error status codes
    if (status === 401) {
      // Unauthorized - only logout if already authenticated
      const state = api.getState() as RootState;
      const isAuthenticated = state.auth.isAuthenticated;

      if (isAuthenticated) {
        toast.error(`Session expired. Please log in again.`);
        api.dispatch(logout());
      } else {
        // Don't show toast for login page errors (handled by form)
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/signin")
        ) {
          toast.error(`Unauthorized: ${errorMessage}`);
        }
      }
    } else if (status === 403) {
      // Forbidden
      toast.error(`Forbidden: ${errorMessage}`);
    } else {
      // Other errors - don't show toast for login page (handled by form)
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/signin")
      ) {
        toast.error(errorMessage);
      }
    }

    // Dispatch error to global error state
    api.dispatch(
      setError({
        code: status,
        message: errorMessage,
        details: data,
      }),
    );
  } else {
    // Clear any previous errors on successful request
    api.dispatch(clearError());
  }

  return result;
};

/**
 * Shared API Instance
 *
 * All services inject endpoints into this single baseApi instance.
 * This ensures data is cached globally and shared across all dashboards.
 *
 * Key Benefits:
 * - Data fetched in admin dashboard is immediately available in parent/teacher dashboards
 * - Single source of truth for cached API responses
 * - Tag-based invalidation keeps cache synchronized across the app
 * - Reduces redundant API calls when same data is accessed from different dashboards
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: [
    "Vacancy",
    "TeacherCourse",
    "TeacherQuestion",
    "CanteenProduct",
    "Auth",
    "User",
    "Product",
    "Order",
    "School",
    "Student",
    "Course",
    "ContentSubmission",
    "TeacherActivity",
    "Assignment",
    "Grade",
    "Attendance",
    "CalendarEvent",
    "Message",
    "Notice",
    "Notification",
    "Timetable",
    "Fee",
    "Wallet",
    "WalletTransaction",
    "Transaction",
    "Admission",
    "LeaveRequest",
    "Note",
    "Schedule",
    "Subject",
    "Stakeholder",
    "Chat",
    "Attachment",
    "CbtExam",
    "CbtResult",
    "CbtQuestion",
    "ExamResult",
    "Subscription",
    "Transport",
    "Hostel",
    "UserRequest",
    "LeavePolicy",
    "PersonalTask",
  ],
  endpoints: () => ({}),
});
