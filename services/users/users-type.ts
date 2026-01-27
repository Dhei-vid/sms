import { School } from "../schools/schools-type";
import type {
  Roles,
  Gender,
  UserStatus,
  ApiResponse,
  ApiListResponse,
  ApiDeleteResponse,
  BaseQueryParams,
} from "../shared-types";

/**
 * Type definitions for Users API responses
 * These types are based on the API response structure from the backend
 */

/**
 * User entity structure
 */
export interface User {
  id: string;
  creator_id: string;
  updated_by_id: string | null;
  school_id: string | null;

  username: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;

  date_of_birth: string | null; // ISO date or null
  gender: Gender;
  status: UserStatus;

  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;

  role: Roles;

  phone_number: string | null;
  residential_address: string | null;

  profile_image_url: string | null;
  profile_image_public_id: string | null;

  language_preference: string;
  theme: "light" | "dark";

  api_usage: number;

  model_preferences: unknown[];
  training_data: unknown[];
  personalization_settings: Record<string, unknown>;

  two_factor_enabled: boolean;
  data_sharing_consent: boolean;

  groups: unknown[];
  user_permissions: unknown[];
  permissions: unknown[];

  ip_address: string | null;
  last_login_ip: string | null;

  is_deleted: boolean;

  creator: User | null;
  updated_by: User | null;
  school: School | null;

  date_joined: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null;
}

/**
 * User creation request payload
 */
export interface CreateUserRequest {
  user_name: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  password: string;
  role: Roles;
  phone?: string;
  theme: "dark" | "light" | string;
  permissions: string[];
}

// Re-export shared types for convenience
export type { Roles, Gender, UserStatus } from "../shared-types";

/**
 * User update request payload
 */
export interface UpdateUserRequest {
  school_id: string;
  username: string;
  first_name: string;
  last_name: string;
  birthday?: string | null;
  gender: string;
  status: UserStatus;
  is_active: false;
  is_staff: false;
  is_superuser: false;
  role: Roles;
  profile_image_url?: string | null;
  profile_image_public_id?: string | null;
  language_preference?: string | null;
  theme: "dark" | "light" | string;
  api_usage: number;
  model_preferences: string[];
  training_data: string[];
  personalization_settings: { height: string };
  two_factor_enabled?: boolean | null;
  data_sharing_consent?: boolean | null;
  permissions: string[];
}

export interface AdmissionRegister {
  school_id: string;
  username: string;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  admission_number: string;
  email: string;
  date_of_birth?: string | null;
  gender: string;
  class_assigned?: string | null;
  role: Roles;
  password: string;
  parent_name: string;
  phone_number: string;
  stage: number;
  initial_status: "Inititated" | string;
  admin_notes: string;
  date_joined?: string | null;
  documents: Documents[];
}

export interface Documents {
  name: string;
  type: string;
  file: string;
}

/**
 * Standard API response wrapper
 * Used for single entity responses (getById, create, update)
 */
export type UserResponse = ApiResponse<User>;

/**
 * Users list response with pagination
 * Matches the actual API response structure
 */
export type UsersListResponse = ApiListResponse<User>;

/**
 * Delete user response
 * Standard API response for delete operations
 */
export type DeleteUserResponse = ApiDeleteResponse;

/**
 * User query parameters for filtering and pagination
 * Matches the RTK Query implementation in users.ts
 * All parameters are optional and will only be added to the query string if provided
 */
export interface UsersQueryParams extends BaseQueryParams {
  role?: Roles;
  status?: UserStatus;
  schoolId?: string;
  isActive?: boolean;
  isStaff?: boolean;
  isSuperuser?: boolean;
}
