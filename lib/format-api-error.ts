/**
 * Format API error payloads into a single user-facing message for toasts/UI.
 * Use this everywhere we show API errors (baseApi global handler, mutation catch blocks, etc.)
 * so validation messages (e.g. Django REST field errors) are descriptive instead of "Bad request".
 *
 * Supports:
 * - Django REST: { "field_name": ["Error message."] } or { "field_name": "Error message." }
 * - Generic: { "detail": "..." } | { "message": "..." } | { "error": "..." }
 * - String response bodies
 */

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

export function getApiErrorMessage(data: unknown, fallback = DEFAULT_MESSAGE): string {
  if (data == null) return fallback;
  if (typeof data === "string") {
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : fallback;
  }
  if (typeof data !== "object") return String(data);

  const d = data as Record<string, unknown>;

  // Single-message keys (common in APIs; backend may put descriptive text in message/error)
  if (typeof d.detail === "string" && d.detail.trim()) return d.detail.trim();
  if (typeof d.message === "string" && d.message.trim()) return d.message.trim();
  if (typeof d.error === "string" && d.error.trim()) return d.error.trim();

  // Wrapped shape: { data: { field: ["msg"] } } (e.g. ApiResponse.error(http_data=serializer.errors))
  const inner = d.data;
  if (inner != null && typeof inner === "object" && !Array.isArray(inner)) {
    const fromInner = formatFieldErrors(inner as Record<string, unknown>);
    if (fromInner) return fromInner;
  }

  // Django REST / field-level validation: { field: ["msg"] } or { field: "msg" }
  const fromTop = formatFieldErrors(d);
  if (fromTop) return fromTop;

  return fallback;
}

function formatFieldErrors(obj: Record<string, unknown>): string | null {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      const msgs = value.filter((m): m is string => typeof m === "string");
      if (msgs.length) parts.push(`${key}: ${msgs.join(" ")}`);
    } else if (typeof value === "string" && value.trim()) {
      parts.push(`${key}: ${value.trim()}`);
    }
  }
  return parts.length > 0 ? parts.join(" ") : null;
}
