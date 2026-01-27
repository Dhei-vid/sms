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
export interface SchoolQueryParams extends BaseQueryParams {}
