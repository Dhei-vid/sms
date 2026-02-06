"use client";

import { DataTable, TableColumn } from "@/components/ui/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { GradeEntryQuickActionsCard } from "@/components/dashboard-pages/teacher/grade-entry-portal/quick-actions-card";
import { usePagination } from "@/hooks/use-pagination";

interface GradingTask {
  id: string;
  assignmentName: string;
  subjectClass: string;
  totalMarks: number;
  submissionStatus: "Not Started" | "Saved as Draft" | "Submitted";
  deadline: string;
}

// Sample data - in production, this would come from an API
const allGradingTasks: GradingTask[] = [
  {
    id: "1",
    assignmentName: "Mid-Term Exam",
    subjectClass: "JSS2 Mathematics",
    totalMarks: 60,
    submissionStatus: "Not Started",
    deadline: "Nov. 13, 2025",
  },
  {
    id: "2",
    assignmentName: "Unit 4 Quiz",
    subjectClass: "SS1 Physics",
    totalMarks: 15,
    submissionStatus: "Saved as Draft",
    deadline: "Nov. 13, 2025",
  },
  {
    id: "3",
    assignmentName: "Project: Energy Sources",
    subjectClass: "JSS3 Integrated Sci.",
    totalMarks: 40,
    submissionStatus: "Submitted",
    deadline: "Nov. 13, 2025",
  },
  {
    id: "4",
    assignmentName: "CA 1: Atomic Structure",
    subjectClass: "SS2 Chemistry",
    totalMarks: 20,
    submissionStatus: "Submitted",
    deadline: "Nov. 13, 2025",
  },
  {
    id: "5",
    assignmentName: "Final Exam - Biology",
    subjectClass: "SS2 Biology",
    totalMarks: 100,
    submissionStatus: "Not Started",
    deadline: "Nov. 20, 2025",
  },
  {
    id: "6",
    assignmentName: "CA 2: Organic Chemistry",
    subjectClass: "SS2 Chemistry",
    totalMarks: 25,
    submissionStatus: "Saved as Draft",
    deadline: "Nov. 15, 2025",
  },
];

const getStatusColor = (status: GradingTask["submissionStatus"]) => {
  switch (status) {
    case "Not Started":
      return "text-gray-600";
    case "Saved as Draft":
      return "text-orange-600";
    case "Submitted":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getActionLabel = (status: GradingTask["submissionStatus"]) => {
  switch (status) {
    case "Not Started":
      return "Start Entry";
    case "Saved as Draft":
      return "Continue Draft";
    case "Submitted":
      return "View Script";
    default:
      return "View";
  }
};

export default function GradeEntryPortalPage() {
  // Pagination
  const {
    displayedData: gradingTasks,
    hasMore,
    loadMore,
  } = usePagination({
    data: allGradingTasks,
    initialItemsPerPage: 4,
    itemsPerPage: 4,
  });

  const columns: TableColumn<GradingTask>[] = [
    {
      key: "assignmentName",
      title: "Assignment Name",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "subjectClass",
      title: "Subject/Class",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "totalMarks",
      title: "Total Marks",
      render: (value) => (
        <span className="text-gray-700">{value as number}</span>
      ),
    },
    {
      key: "submissionStatus",
      title: "Submission Status",
      render: (value) => {
        const status = value as GradingTask["submissionStatus"];
        return (
          <span className={`text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        );
      },
    },
    {
      key: "deadline",
      title: "Deadline",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        const actionLabel = getActionLabel(row.submissionStatus);
        const href =
          row.submissionStatus === "Submitted"
            ? `/teacher/grade-entry-portal/view/${row.id}`
            : "/teacher/grade-entry-portal/entry";
        return (
          <Link href={href} className="text-main-blue hover:underline">
            {actionLabel}
          </Link>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Grade Entry Portal Dashboard
        </h1>
        <p className="text-gray-600">
          The teacher's central command centre for all grading activities,
          prioritizing compliance and efficiency.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Pending Submissions"
          value="3 Assignments"
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Drafts Saved"
          value="2 Assignments"
          trend="up"
          trendColor="text-main-blue"
        />
      </div>

      {/* Quick Actions Section */}
      <GradeEntryQuickActionsCard />

      {/* Grading Task Table Section */}
      <div className="bg-background rounded-md p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Grading Task Table
          </h2>
        </div>

        {/* Grading Task Table */}
        <div className="border rounded-lg overflow-hidden">
          <DataTable
            columns={columns}
            data={gradingTasks}
            showActionsColumn={false}
          />
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
