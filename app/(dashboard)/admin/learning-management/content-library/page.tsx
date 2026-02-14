"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import { useGetContentSubmissionsQuery } from "@/services/courses/courses";
import type { ContentSubmission } from "@/services/courses/courses-type";

interface ResourceRow {
  id: string;
  resourceName: string;
  fileType: string;
  courseLocation: string;
  submittedBy: string;
  status: "pending-approval" | "approved" | "sent-back";
}

function mapStatus(s: string): ResourceRow["status"] {
  if (s === "pending_review") return "pending-approval";
  if (s === "approved") return "approved";
  return "sent-back";
}

function getStatusColor(status: ResourceRow["status"]) {
  switch (status) {
    case "pending-approval":
      return "text-orange-600";
    case "approved":
      return "text-green-600";
    case "sent-back":
      return "text-main-blue";
    default:
      return "text-gray-600";
  }
}

function getStatusLabel(status: ResourceRow["status"]) {
  switch (status) {
    case "pending-approval":
      return "Pending Approval";
    case "approved":
      return "Approved";
    case "sent-back":
      return "Sent Back for Revision";
    default:
      return status;
  }
}

export default function ContentLibraryPage() {
  const { data: response, isLoading } = useGetContentSubmissionsQuery({ _all: true });

  const list = useMemo(() => {
    const d = response as { data?: ContentSubmission[] | { data?: ContentSubmission[] } } | undefined;
    if (!d?.data) return [];
    return Array.isArray(d.data) ? d.data : (d.data as { data?: ContentSubmission[] }).data ?? [];
  }, [response]);

  const tableData: ResourceRow[] = useMemo(
    () =>
      list.map((s) => ({
        id: s.id,
        resourceName: s.resource_name,
        fileType: (s.file_type || "other").toUpperCase(),
        courseLocation: s.course_location ?? (s.course as { title?: string })?.title ?? "—",
        submittedBy: (s.submitted_by as { display_name?: string })?.display_name ?? "—",
        status: mapStatus(s.status),
      })),
    [list],
  );

  const pendingCount = useMemo(() => list.filter((s) => s.status === "pending_review").length, [list]);

  const columns: TableColumn<ResourceRow>[] = [
    { key: "resourceName", title: "Resource Name", className: "font-medium" },
    { key: "fileType", title: "File Type", render: (v) => <span className="text-sm">{v}</span> },
    { key: "courseLocation", title: "Course Location", render: (v) => <span className="text-sm">{v}</span> },
    { key: "submittedBy", title: "Submitted By", render: (v) => <span className="text-sm">{v}</span> },
    {
      key: "status",
      title: "Status",
      render: (_, row) => (
        <span className={cn("text-sm font-medium", getStatusColor(row.status))}>
          {getStatusLabel(row.status)}
        </span>
      ),
    },
  ];

  const actions: TableAction<ResourceRow>[] = [
    {
      type: "button",
      config: {
        label: "Review Content",
        onClick: () => {},
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Content Library & Repository
        </h2>
        <p className="text-gray-600 mt-1">
          This screen serves as the single administrative hub for viewing all
          digital resources and managing their quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Files Stored"
          value={isLoading ? "—" : `${list.length} Resource${list.length !== 1 ? "s" : ""}`}
          subtitle="Total digital resources in the library"
          trend="up"
        />
        <MetricCard
          title="Total Storage Used"
          value="—"
          subtitle="Storage capacity utilization"
          trend="up"
        />
        <MetricCard
          title="Files Pending Review"
          value={isLoading ? "—" : `${pendingCount} Resource${pendingCount !== 1 ? "s" : ""}`}
          subtitle="Resources awaiting administrative review"
          trend="up"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Resource Management Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground text-sm">
                Loading resources…
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={tableData}
                actions={actions}
                emptyMessage="No resources found."
                tableClassName="border-collapse"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
