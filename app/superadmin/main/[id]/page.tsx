"use client";

import { useParams } from "next/navigation";
import { SchoolDetailView } from "@/components/dashboard-pages/superadmin/schools/school-detail-view";

export default function SchoolDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  return <SchoolDetailView schoolId={id} />;
}
