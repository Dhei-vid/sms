"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn, TableAction } from "@/components/ui/data-table";
import { format } from "date-fns";
import Link from "next/link";

interface ApprovalQueueItem {
  id: string;
  gradeLevel: string;
  totalStudents: number;
  submissionStatus: string;
  submissionPercentage: number;
  lastUpdate: Date;
}

const approvalQueueData: ApprovalQueueItem[] = [
  {
    id: "1",
    gradeLevel: "Primary 5 First Term 2025/2026",
    totalStudents: 50,
    submissionStatus: "100% Submitted",
    submissionPercentage: 100,
    lastUpdate: new Date(2025, 10, 4),
  },
  {
    id: "2",
    gradeLevel: "JSS 1 First Term 2025/2026",
    totalStudents: 65,
    submissionStatus: "98% Submitted",
    submissionPercentage: 98,
    lastUpdate: new Date(2025, 10, 4),
  },
  {
    id: "3",
    gradeLevel: "JSS 2 First Term 2025/2026",
    totalStudents: 60,
    submissionStatus: "100% Submitted",
    submissionPercentage: 100,
    lastUpdate: new Date(2025, 10, 4),
  },
  {
    id: "4",
    gradeLevel: "SS 1 First Term 2025/2026",
    totalStudents: 55,
    submissionStatus: "75% Submitted",
    submissionPercentage: 75,
    lastUpdate: new Date(2025, 10, 4),
  },
];

export default function FinalResultApprovalQueuePage() {
  const columns: TableColumn<ApprovalQueueItem>[] = [
    {
      key: "gradeLevel",
      title: "Grade Level",
      className: "font-medium",
    },
    {
      key: "totalStudents",
      title: "Total Students",
      align: "center",
    },
    {
      key: "submissionStatus",
      title: "Submission Status",
      align: "center",
      render: (value, row) => (
        <span
          className={
            row.submissionPercentage === 100
              ? "text-green-600 font-medium"
              : "text-orange-600 font-medium"
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: "lastUpdate",
      title: "Last Update",
      render: (value) => (
        <span className="text-sm">{format(value, "MMM. d, yyyy")}</span>
      ),
    },
  ];

  const actions: TableAction<ApprovalQueueItem>[] = [
    {
      type: "link",
      config: {
        label: "Review & Approve",
        href: (row) =>
          `/admin/academic/assessment-grading/final-result-approval-queue/${row.id}`,
        className: "text-main-blue underline underline-offset-3",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Final Results Approval Queue
        </h2>
        <p className="text-gray-600 mt-1">
          This screen lists all fully processed results batches.
        </p>
      </div>

      {/* Approval Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Approval Queue Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={approvalQueueData}
              actions={actions}
              emptyMessage="No results pending approval."
              tableClassName="border-collapse"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

