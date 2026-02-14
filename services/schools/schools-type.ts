import { User } from "../users/users-type";
import type {
  GeneralStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Schools API responses
 * These types are based on the API response structure from the backend
 */

/**
 * School entity structure
 */
export type School = {
  id: string;
  creator_id: string;
  updated_by_id: string | null;

  name: string;
  address: string;
  motto: string;
  type: "primary" | "secondary" | "tertiary" | string;

  phone: string;
  email: string;
  website: string;

  term: Term;
  bank: Record<string, unknown>; // empty object from API
  score: Score;

  discount: string | null;

  established_date: string;
  accreditation_number: string;
  license_number: string;

  student_capacity: number;
  current_enrollment: number;

  subscription: SubscriptionSummary;
  subscription_details: SubscriptionDetails;

  color: SchoolColor;
  logo: SchoolLogo;

  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;

  is_active: boolean;

  classes: string[];

  timetable_name: string | null;
  applicable_school_grade: string | null;
  academic_term: string | null;

  school_days: string[];
  no_of_periods_per_day: number | null;
  default_period_duration: number | null;

  break_periods: Record<string, unknown>;
  subjects: string[];

  status: GeneralStatus;
  is_deleted: boolean;

  creator: User;
};

export interface SubscriptionPlan {
  id: string;
  creator: string;
  updated_by: string | null;
  plan: string;
  cost: string; // money as string
  total_students: number;
  total_teachers: number;
  total_users: number;
  duration: number; // months
  features: string[];
  description: string;
  discount: string;
  status: "available" | "unavailable" | string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionDetails {
  subscription_id: string;
  start_date: string;
  end_date: string;
  status: "active" | "inactive" | "expired" | string;
  subscription: SubscriptionPlan;
}

export interface SubscriptionSummary {
  status: "active" | "inactive" | "expired" | string;
  start_date: string;
  end_date: string;
  subscription_id: string;
}

export interface SchoolColor {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
}

export interface SchoolLogo {
  svg: string;
  image_url: string | null;
  image_public_id: string | null;
}

export interface Term {
  name: string;
  session: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
}

export interface Score {
  ca: number;
  exam: number;
  total: number;
}

export interface Bank {
  bank_id: string;
  bank_code: string;
  bank_name: string;
  account_name: string;
  account_number: string;
}

export interface Break {
  title: string;
  type: "break" | "period"; // break, period
  start_time: string;
  end_time: string;
}

/**
 * School creation request payload
 */
export interface CreateSchoolRequest {
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;

  motto: string;
  type: "secondary" | string;
  status: "active" | string;

  established_date: string;
  accreditation_number: string;
  license_number: string;
  student_capacity: number;
  current_enrollment: number;

  color: SchoolColor;
  logo: SchoolLogo;
  subscription: {
    plan: "standard" | string;
    start_date: string;
    end_date: string;
    status: "active" | string;
  };

  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;

  is_active: boolean;
  term: Term;
}

/**
 * Timetable fields only - for partial update via PUT /schools/<id>
 */
export interface TimetableUpdatePayload {
  timetable_name?: string;
  applicable_school_grade?: string;
  academic_term?: string;
  school_days?: string[];
  no_of_periods_per_day?: number;
  default_period_duration?: number;
  break_periods?: Break[];
}

/**
 * School update request payload
 */
export interface UpdateSchoolRequest {
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;

  motto: string;
  type: "secondary" | string;
  status: "active" | string;

  established_date: string;
  accreditation_number: string;
  license_number: string;
  student_capacity: number;
  current_enrollment: number;

  color: SchoolColor;
  logo: SchoolLogo;
  subscription: SubscriptionDetails;

  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;

  is_active: boolean;
  term: Term;

  bank: Bank;
  score: Score;

  discount: string;
  classes: string[];
  subjects: string[];
  timetable_name: string;
  applicable_school_grade: string;
  academic_term: string;
  school_days: string[];
  no_of_periods_per_day: number;
  default_period_duration: number;
  break_periods: Break[];
}

/**
 * Schools list response with pagination
 */
export type SchoolListResponse = ApiListResponse<School>;

/**
 * School response for single entity operations
 */
export type SchoolResponse = ApiResponse<School>;

/**
 * Delete school response
 */
export type DeleteSchoolResponse = ApiDeleteResponse;

/**
 * School query parameters for filtering and pagination
 */
export interface SchoolQueryParams extends BaseQueryParams {
  _all?: boolean;
}

/**
 * Application config returned by GET/PUT /schools/:id/application-config
 */
export interface SchoolApplicationConfig {
  term: Term;
  score: Score;
  timetable_name: string | null;
  applicable_school_grade: string | null;
  academic_term: string | null;
  school_days: string[];
  no_of_periods_per_day: number | null;
  default_period_duration: number | null;
  break_periods: Break[];
}

/**
 * Payload for PUT /schools/:id/application-config (all optional)
 */
export interface SchoolApplicationConfigUpdate {
  term?: Term;
  score?: Score;
  timetable_name?: string | null;
  applicable_school_grade?: string | null;
  academic_term?: string | null;
  school_days?: string[];
  no_of_periods_per_day?: number | null;
  default_period_duration?: number | null;
  break_periods?: Break[];
}

/**
 * Admin roster entry from GET /schools/:id/settings-dashboard
 */
export interface SettingsDashboardAdminRole {
  id: string;
  primaryRole: string;
  assignedTo: string;
  coreModulesAccessible: string;
  lastPermissionUpdate: string | null;
}

/**
 * Response from GET/PUT /schools/:id/settings-dashboard
 */
export interface SchoolSettingsDashboard {
  activeAdminsCount: number;
  lastSecurityAudit: string | null;
  systemUptime: string | null;
  adminRoster: SettingsDashboardAdminRole[];
}

/**
 * Payload for PUT /schools/:id/settings-dashboard (optional metrics)
 */
export interface SchoolSettingsDashboardUpdate {
  lastSecurityAudit?: string | null;
  systemUptime?: string | null;
}

/**
 * Module permission for role template (edit-role)
 */
export interface RoleTemplateModulePermission {
  module: string;
  readOnly: boolean;
  readWrite: boolean;
  none: boolean;
}

/**
 * Role template (edit-role).
 * `permissions` is resolved from modulePermissions and matches User.permissions / stakeholder.user.permissions.
 * When assigning this role to a user or stakeholder, set the linked user's permissions to this array.
 */
export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  modulePermissions: RoleTemplateModulePermission[];
  /** Resolved permission strings for User.permissions (and stakeholder.user); use when assigning this role. */
  permissions?: string[];
}

/**
 * Response from GET /schools/:id/role-template-modules (canonical list from backend)
 */
export interface RoleTemplateModulesResponse {
  modules: string[];
}

/**
 * Response from GET /schools/:id/role-templates
 */
export interface RoleTemplatesListResponse {
  roleTemplates: RoleTemplate[];
  /** Canonical list of module names for permission matrix (from backend). */
  modules: string[];
}

/**
 * Payload for PUT /schools/:id/role-templates/:templateId
 */
export interface RoleTemplateUpdatePayload {
  id: string;
  name: string;
  description: string;
  modulePermissions: RoleTemplateModulePermission[];
}
