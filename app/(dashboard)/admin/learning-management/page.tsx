"use client";

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

interface ContentSubmission {
  id: string;
  resourceName: string;
  subjectClass: string;
  submittedBy: string;
  status: "pending-review" | "approved" | "rejected";
}

const recentContentSubmissions: ContentSubmission[] = [
  {
    id: "1",
    resourceName: "Video: Energy Conservation",
    subjectClass: "SS2 Physics",
    submittedBy: "Mr. Femi T.",
    status: "pending-review",
  },
  {
    id: "2",
    resourceName: "Quiz: Arts Crafting",
    subjectClass: "JS3 Arts & Crafts",
    submittedBy: "Ms. Zara A.",
    status: "approved",
  },
];

const getStatusColor = (status: ContentSubmission["status"]) => {
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
};

const getStatusLabel = (status: ContentSubmission["status"]) => {
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
};

export default function LearningManagementDashboardPage() {
  const router = useRouter();

  const columns: TableColumn<ContentSubmission>[] = [
    {
      key: "resourceName",
      title: "Resource Name",
      className: "font-medium",
    },
    {
      key: "subjectClass",
      title: "Subject/Class",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "submittedBy",
      title: "Submitted By",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => (
        <span className={cn("text-sm font-medium", getStatusColor(row.status))}>
          {getStatusLabel(row.status)}
        </span>
      ),
    },
  ];

  const actions: TableAction<ContentSubmission>[] = [
    {
      type: "button",
      config: {
        label: "Review Content",
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
        onClick: (row) => {
          console.log("Review content for", row.resourceName);
          // Handle review content action
        },
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Learning Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This dashboard is the central control panel for administering digital
          courses, managing teacher contributions, and monitoring content usage.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Courses Active"
          value="78 Courses"
          subtitle="Number of active digital courses"
          trend="up"
        />
        <MetricCard
          title="Teacher Content Contributions"
          value="95%"
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
          value="12 Lesson Plans"
          subtitle="Items awaiting administrative review"
          trend="up"
        />
      </div>

      {/* Quick Actions */}
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
            onClick={() =>
              router.push("/admin/learning-management/course-structure")
            }
            className="border-b"
          />
          <QuickActionCard
            title="Content Library & Repository"
            description="Direct access to manage all uploaded resources: PDFs, videos, presentations"
            icon={LibrariesIcon}
            onClick={() =>
              router.push("/admin/learning-management/content-library")
            }
            className="border-b"
          />
          <QuickActionCard
            title="Teacher Activity Audit"
            description="Links to a log tracking teacher lesson plan submissions and content uploads"
            icon={TransactionHistoryIcon}
            onClick={() =>
              router.push("/admin/learning-management/teacher-activity")
            }
          />
        </CardContent>
      </Card>

      {/* Recent Content Submission Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent Content Submission Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={recentContentSubmissions}
              actions={actions}
              emptyMessage="No content submissions found."
              tableClassName="border-collapse"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
