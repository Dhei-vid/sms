import { ResponseStatus } from "@/common/types";

export type LeavePolicyListRequest = { data: [] } & ResponseStatus;

export interface CreateLeavePolicyPayload {
  school_id: string;
  name: string;

  applicable_staff: string;
  applicable_staffs: string[]; // staff IDs

  max_days: number;
  accrual_period: string;

  minimum_notice: number;
  effective_date: string; // YYYY-MM-DD
  status: "assignment" | "draft" | "active" | string;
}

export interface UpdateLeavePolicyPayload {
  school_id: string;

  name: string;

  applicable_staff: string;
  applicable_staffs: string[];

  max_days: number;
  accrual_period: string;

  minimum_notice: number;

  effective_date: string; // YYYY-MM-DD

  status: "assignment" | "draft" | "active" | string;
}
