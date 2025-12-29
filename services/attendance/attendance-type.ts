/**
 * Type definitions for Attendance API responses
 */

export interface Attendance {
  id: string;
  studentId: string;
  studentName?: string;
  classId: string;
  className?: string;
  courseId?: string;
  courseName?: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  remarks?: string;
  markedBy?: string;
  createdAt?: string;
}

export interface CreateAttendanceRequest {
  studentId: string;
  classId: string;
  courseId?: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  remarks?: string;
}

export interface BulkAttendanceRequest {
  classId: string;
  courseId?: string;
  date: string;
  attendances: {
    studentId: string;
    status: "present" | "absent" | "late" | "excused";
    remarks?: string;
  }[];
}

export interface AttendanceListResponse {
  data: Attendance[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AttendanceQueryParams {
  page?: number;
  limit?: number;
  studentId?: string;
  classId?: string;
  courseId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: "present" | "absent" | "late" | "excused";
}

