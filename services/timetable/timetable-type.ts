/**
 * Type definitions for Timetable API responses
 */

export interface TimetableEntry {
  id: string;
  classId: string;
  className?: string;
  courseId: string;
  courseName?: string;
  teacherId: string;
  teacherName?: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  room?: string;
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTimetableEntryRequest {
  classId: string;
  courseId: string;
  teacherId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
}

export interface UpdateTimetableEntryRequest {
  classId?: string;
  courseId?: string;
  teacherId?: string;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  room?: string;
  status?: "active" | "inactive";
}

export interface TimetableListResponse {
  data: TimetableEntry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TimetableQueryParams {
  page?: number;
  limit?: number;
  classId?: string;
  courseId?: string;
  teacherId?: string;
  dayOfWeek?: number;
  status?: "active" | "inactive";
}

