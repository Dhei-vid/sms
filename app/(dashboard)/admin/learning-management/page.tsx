"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  PayByCheckIcon,
  LibrariesIcon,
  TransactionHistoryIcon,
} from "@hugeicons/core-free-icons";
import {
  useGetCoursesQuery,
  useGetContentSubmissionsQuery,
  useGetTeacherActivityQuery,
} from "@/services/courses/courses";
import type { Course, ContentSubmission as ApiContentSubmission } from "@/services/courses/courses-type";

interface ContentSubmissionRow {
  id: string;
  resourceName: string;
  subjectClass: string;
  submittedBy: string;
  status: "pending-review" | "approved" | "rejected";
}

function getStatusColor(status: ContentSubmissionRow["status"]) {
  switch (status) {
    case "pending-review":
      return "text-orange-600";
    case "approved":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

function getStatusLabel(status: ContentSubmissionRow["status"]) {
  switch (status) {
    case "pending-review":
      return "Pending Review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

function mapApiStatus(status: string): ContentSubmissionRow["status"] {
  if (status === "pending_review") return "pending-review";
  if (status === "approved") return "approved";
  return "rejected";
}

export default function LearningManagementDashboardPage() {
  const router = useRouter();
  const { data: coursesResponse, isLoading: isLoadingCourses } = useGetCoursesQuery({ _all: true });
  const { data: submissionsResponse, isLoading: isLoadingSubmissions } = useGetContentSubmissionsQuery({ _all: true });
  const { data: teacherActivityResponse } = useGetTeacherActivityQuery();

  const coursesList = useMemo(() => {
    const d = coursesResponse as { data?: Course[] | { data?: Course[] } } | undefined;
    if (!d?.data) return [];
    return Array.isArray(d.data) ? d.data : (d.data as { data?: Course[] }).data ?? [];
  }, [coursesResponse]);

  const submissionsList = useMemo(() => {
    const d = submissionsResponse as { data?: ApiContentSubmission[] | { data?: ApiContentSubmission[] } } | undefined;
    if (!d?.data) return [];
    return Array.isArray(d.data) ? d.data : (d.data as { data?: ApiContentSubmission[] }).data ?? [];
  }, [submissionsResponse]);

  const teacherActivityList = useMemo(() => {
    const d = teacherActivityResponse as { data?: Array<{ id: string; fullName: string; contentSubmissionsCount: number }> } | undefined;
    return d?.data ?? [];
  }, [teacherActivityResponse]);

  const activeCoursesCount = useMemo(
    () => coursesList.filter((c) => (c as { is_active?: boolean }).is_active !== false).length,
    [coursesList],
  );

  const pendingReviewCount = useMemo(
    () => submissionsList.filter((s) => s.status === "pending_review").length,
    [submissionsList],
  );

  const teacherContributionPct = useMemo(() => {
    const total = teacherActivityList.length;
    if (total === 0) return "0%";
    const contributing = teacherActivityList.filter((t) => t.contentSubmissionsCount > 0).length;
    return `${Math.round((100 * contributing) / total)}%`;
  }, [teacherActivityList]);

  const tableData: ContentSubmissionRow[] = useMemo(
    () =>
      submissionsList.slice(0, 20).map((s) => ({
        id: s.id,
        resourceName: s.resource_name,
        subjectClass: s.course_location ?? (s.course as { title?: string } | undefined)?.title ?? "—",
        submittedBy:
          (s.submitted_by as { display_name?: string } | undefined)?.display_name ?? "—",
        status: mapApiStatus(s.status),
      })),
    [submissionsList],
  );

  const columns: TableColumn<ContentSubmissionRow>[] = [
    { key: "resourceName", title: "Resource Name", className: "font-medium" },
    { key: "subjectClass", title: "Subject/Class", render: (v) => <span className="text-sm">{v}</span> },
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

  const actions: TableAction<ContentSubmissionRow>[] = [
    {
      type: "button",
      config: {
        label: "Review Content",
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
        onClick: (row) => {
          router.push(`/admin/learning-management/content-library?submission=${row.id}`);
        },
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Learning Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This dashboard is the central control panel for administering digital
          courses, managing teacher contributions, and monitoring content usage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Courses Active"
          value={isLoadingCourses ? "—" : `${activeCoursesCount} Course${activeCoursesCount !== 1 ? "s" : ""}`}
          subtitle="Number of active digital courses"
          trend="up"
        />
        <MetricCard
          title="Teacher Content Contributions"
          value={teacherContributionPct}
          subtitle="Percentage of teachers contributing content"
          trend="up"
        />
        <MetricCard
          title="Student Daily Login Rate"
          value="85% (Avg.)"
          subtitle="Average daily student engagement"
          trend="up"
        />
        <MetricCard
          title="Content Pending Review"
          value={isLoadingSubmissions ? "—" : `${pendingReviewCount} Item${pendingReviewCount !== 1 ? "s" : ""}`}
          subtitle="Items awaiting administrative review"
          trend="up"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuickActionCard
            title="Create New Course Shell"
            description="Initiates the process to set up a new subject/class for digital content"
            icon={PayByCheckIcon}
            onClick={() => router.push("/admin/learning-management/course-structure")}
            className="border-b"
          />
          <QuickActionCard
            title="Content Library & Repository"
            description="Direct access to manage all uploaded resources: PDFs, videos, presentations"
            icon={LibrariesIcon}
            onClick={() => router.push("/admin/learning-management/content-library")}
            className="border-b"
          />
          <QuickActionCard
            title="Teacher Activity Audit"
            description="Links to a log tracking teacher lesson plan submissions and content uploads"
            icon={TransactionHistoryIcon}
            onClick={() => router.push("/admin/learning-management/teacher-activity")}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent Content Submission Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            {isLoadingSubmissions ? (
              <div className="py-8 text-center text-muted-foreground text-sm">
                Loading content submissions…
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={tableData}
                actions={actions}
                emptyMessage="No content submissions found."
                tableClassName="border-collapse"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
