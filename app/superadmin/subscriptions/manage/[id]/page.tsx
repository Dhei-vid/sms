"use client";

import { useParams } from "next/navigation";
import { ManagePlanView } from "@/components/dashboard-pages/superadmin/subscriptions/manage-plan-view";

export default function EditPlanPage() {
  const params = useParams();
  const id = (params?.id as string) ?? null;

  return <ManagePlanView planId={id} />;
}
