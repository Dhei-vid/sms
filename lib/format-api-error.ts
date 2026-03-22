// API error → single string (DRF fields, detail, message).
const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

export function getApiErrorMessage(
  data: unknown,
  fallback = DEFAULT_MESSAGE,
): string {
  if (data == null) return fallback;
  if (typeof data === "string") {
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : fallback;
  }
  if (typeof data !== "object") return String(data);

  const d = data as Record<string, unknown>;

  if (typeof d.detail === "string" && d.detail.trim()) return d.detail.trim();
  if (typeof d.message === "string" && d.message.trim())
    return d.message.trim();
  if (typeof d.error === "string" && d.error.trim()) return d.error.trim();

  // { data: { field: ["msg"] } }
  const inner = d.data;
  if (inner != null && typeof inner === "object" && !Array.isArray(inner)) {
    const fromInner = formatFieldErrors(inner as Record<string, unknown>);
    if (fromInner) return fromInner;
  }

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
