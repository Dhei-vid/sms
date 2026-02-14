import type {
  ApiListResponse,
  ApiResponse,
  BaseQueryParams,
} from "../shared-types";

export interface Course {
  id: string;
  title: string;
  name?: string;
  school_id: string | null;
  subject_id: string | null;
  applicable_grade: string | null;
  lead_instructor_id: string | null;
  units: string[];
  topics: string[];
  content_approval: string | null;
  is_active: boolean;
  school?: { id: string; name?: string };
  subject?: { id: string; name?: string };
  lead_instructor?: { id: string; display_name?: string };
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface CreateCourseRequest {
  school_id: string;
  title: string;
  subject_id?: string | null;
  applicable_grade?: string | null;
  lead_instructor_id?: string | null;
  units?: string[];
  topics?: string[];
  content_approval?: string | null;
  [key: string]: unknown;
}

export interface UpdateCourseRequest {
  title?: string;
  subject_id?: string | null;
  applicable_grade?: string | null;
  lead_instructor_id?: string | null;
  units?: string[];
  topics?: string[];
  content_approval?: string | null;
  is_active?: boolean;
  [key: string]: unknown;
}

export type CoursesListResponse = ApiListResponse<Course>;
export type CourseResponse = ApiResponse<Course>;
export interface CoursesQueryParams extends BaseQueryParams {
  _all?: boolean;
  schoolId?: string;
  limit?: number;
}

/** Content submission / learning resource */
export interface ContentSubmission {
  id: string;
  resource_name: string;
  file_type: string;
  file_url: string | null;
  course_location: string | null;
  status: "pending_review" | "approved" | "sent_back";
  course_id: string | null;
  submitted_by_id: string | null;
  submitted_by?: { id: string; display_name?: string };
  course?: Course;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface CreateContentSubmissionRequest {
  course_id?: string | null;
  submitted_by_id: string;
  resource_name: string;
  file_type?: string;
  file_url?: string | null;
  course_location?: string | null;
  status?: string;
  [key: string]: unknown;
}

export interface ContentSubmissionsQueryParams extends BaseQueryParams {
  _all?: boolean;
}

/** Teacher activity item from /courses/teacher-activity */
export interface TeacherActivityItem {
  id: string;
  fullName: string;
  staffId: string;
  department: string;
  lmsLogin: number;
  contentSubmissionsCount: number;
  approvedCount: number;
  complianceRate: string;
  complianceStatus: string;
}

/** Activity log entry from /courses/teachers/:staffId/activity (camelCase to match API) */
export interface TeacherActivityLogEntry {
  id: string;
  loggedAction: string;
  dateTime: string | null;
  associatedCourseResource: string;
  status: string;
}
