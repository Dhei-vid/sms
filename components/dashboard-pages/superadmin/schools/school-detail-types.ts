import type { School } from "@/services/schools/schools-type";

export type SchoolDetailSectionId =
  | "school-details"
  | "academic"
  | "subscription";

export interface SchoolDetailSectionConfig {
  id: SchoolDetailSectionId;
  label: string;
  icon: any;
}

export interface KeyValueRow {
  label: string;
  value: React.ReactNode;
}

export interface SchoolSubscriptionDisplay {
  planName: string;
  endDate: string | null;
  status: string;
  startDate: string | null;
  enabledFeatureIds: string[];
}

export function getSchoolSubscriptionDisplay(
  school: School,
): SchoolSubscriptionDisplay {
  const sub = school.subscription_details ?? school.subscription;
  const planName =
    (sub && "subscription" in sub ? sub.subscription?.plan : undefined) ??
    (school.subscription as { plan?: string })?.plan ??
    "—";
  const endDate =
    sub?.end_date ??
    (school.subscription as { end_date?: string })?.end_date ??
    null;
  const status =
    sub?.status ?? (school.subscription as { status?: string })?.status ?? "—";
  const startDate =
    sub?.start_date ??
    (school.subscription as { start_date?: string })?.start_date ??
    null;
  const enabledFeatureIds =
    sub &&
    "subscription" in sub &&
    sub.subscription?.features &&
    Array.isArray(sub.subscription.features)
      ? (sub.subscription.features as string[])
      : [];
  return {
    planName,
    endDate,
    status,
    startDate,
    enabledFeatureIds,
  };
}
