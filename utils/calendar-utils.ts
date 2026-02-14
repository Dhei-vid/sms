import type { ScheduleEvent } from "@/services/schedules/schedule-types";
import type { EventFormData } from "@/components/dashboard-pages/admin/calendar/components/modal/create-event-modal";
import type { CreateScheduleEventPayload } from "@/services/schedules/schedule-types";
import type { AuthUser } from "@/services/auth/auth-type";

export type CalendarEventColor = "blue" | "purple" | "red" | "green" | "yellow";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: CalendarEventColor;
}

export interface SidebarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  color: "blue" | "orange" | "red" | "purple";
}

const COLORS: CalendarEventColor[] = ["blue", "purple", "red", "green", "yellow"];
const SIDEBAR_COLORS: SidebarEvent["color"][] = ["blue", "orange", "red", "purple"];

function hashToColor(str: string, palette: readonly string[]): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

function parseTime(t: string | null | undefined): string {
  if (!t) return "";
  const [h, m] = t.split(":");
  if (!h) return "";
  const hh = parseInt(h, 10);
  const mm = parseInt(m ?? "0", 10);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 || 12;
  return mm ? `${h12}:${mm.toString().padStart(2, "0")} ${ampm}` : `${h12} ${ampm}`;
}

export function mapScheduleToCalendarEvent(s: ScheduleEvent): CalendarEvent {
  const color = hashToColor(s.id, COLORS) as CalendarEventColor;
  const date = s.date ? new Date(s.date + "T00:00:00") : new Date();
  return {
    id: s.id,
    title: s.title ?? "",
    date,
    color,
  };
}

export function mapScheduleToSidebarEvent(s: ScheduleEvent): SidebarEvent {
  const color = hashToColor(s.id, SIDEBAR_COLORS) as SidebarEvent["color"];
  const date = s.date ? new Date(s.date + "T00:00:00") : new Date();
  const start = parseTime(s.start_time);
  const end = parseTime(s.end_time);
  const time = start && end ? `${start} - ${end}` : start || end || "—";
  return {
    id: s.id,
    title: s.title ?? "",
    description: s.description ?? "",
    date,
    time,
    color,
  };
}

function toBackendTime(timeStr: string, defaultH = 9, defaultM = 0): string {
  if (!timeStr?.trim()) return `${String(defaultH).padStart(2, "0")}:${String(defaultM).padStart(2, "0")}:00.000000`;
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (match) {
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const pm = (match[3] ?? "").toUpperCase() === "PM";
    if (pm && h < 12) h += 12;
    if (!pm && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00.000000`;
  }
  if (timeStr.includes(":") && /^\d{1,2}:\d{2}/.test(timeStr)) {
    const [h, m] = timeStr.split(":").map((x) => parseInt(x, 10) || 0);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00.000000`;
  }
  return `${String(defaultH).padStart(2, "0")}:${String(defaultM).padStart(2, "0")}:00.000000`;
}

export function formDataToCreatePayload(
  form: EventFormData
): CreateScheduleEventPayload {
  const date = form.date
    ? form.date.toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  const startTime = toBackendTime(form.startTime, 9, 0);
  const endTime = toBackendTime(form.endTime, 10, 0);
  const targetAudience = form.audienceVisibility;
  const specifics: string[] | undefined =
    targetAudience === "private"
      ? (["teacher", "student", "parent", "staff"] as const).filter(
          (k) => form.specifics[k]
        )
      : undefined;
  return {
    school_id: form.schoolId,
    title: form.title,
    description: form.description,
    type: "event",
    date,
    start_time: startTime,
    end_time: endTime,
    location: form.location || undefined,
    target_audience: targetAudience,
    specifics: specifics && specifics.length > 0 ? specifics : undefined,
  };
}

/** Filter schedule events by user role. Admin sees all. Others see general + their role in specifics. */
export function filterEventsByRole(
  events: ScheduleEvent[],
  user: AuthUser | null
): ScheduleEvent[] {
  if (!user) return [];
  const role = user.role;
  if (role === "admin" || role === "canteen") return events;
  const roleKey = role === "teacher" ? "teacher" : role === "parent" ? "parent" : role === "student" ? "student" : null;
  const staffKey = "staff";
  return events.filter((e) => {
    const audience = e.target_audience ?? "general";
    if (audience === "general") return true;
    if (audience !== "private") return false;
    const specifics = Array.isArray(e.specifics) ? e.specifics : [];
    if (roleKey && specifics.some((s) => String(s).toLowerCase() === roleKey)) return true;
    if (role === "teacher" && specifics.some((s) => String(s).toLowerCase() === staffKey)) return true;
    return false;
  });
}
