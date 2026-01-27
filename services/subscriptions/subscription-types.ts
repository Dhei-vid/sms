import { ResponseStatus } from "@/common/types";
import { User } from "../users/users-type";

export interface Subscriptions {
  id: string;
  creator_id: string;
  updated_by_id: string | null;

  plan: string;

  cost: string; // monetary value as string
  discount: string; // monetary value as string

  total_students: number;
  total_teachers: number;
  total_users: number;

  duration: number;
  features: string[];
  description: string;

  status: "available" | "unavailable";

  creator: User;
  updated_by: null | User;
  created_at: string;
  updated_at: string;
}

export interface CreateSubscriptionRequest {
  plan: string;
  cost: number;
  description: string;
}

export interface UpdateSubcriptionsRequest {
  plan: string;
  cost: string;
  total_students: number;
  total_teachers: number;
  total_users: number;
  duration: number;
  features: string[];
  description: string;
  discount: number;
  status: "completed" | string;
}

export type SubscriptionsListResponse = {
  data: Subscriptions[];
} & ResponseStatus;
