"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { format } from "date-fns";
import { useGetAllExamResultsQuery } from "@/services/results/results";
import type { ExamResult } from "@/services/results/result-types";

interface ApprovalQueueItem {
  id: string;
  gradeLevel: string;
  totalStudents: number;
  submissionStatus: string;
  submissionPercentage: number;
  lastUpdate: Date;
}

function buildApprovalQueueFromResults(data: ExamResult[]): ApprovalQueueItem[] {
  const byKey = new Map<string, ExamResult[]>();
  for (const r of data) {
    const key = `${r.class_name}||${r.term}||${r.session}`;
    const list = byKey.get(key) ?? [];
    list.push(r);
    byKey.set(key, list);
  }
  return Array.from(byKey.entries()).map(([key, results]) => {
    const first = results[0]!;
    const lastUpdate = results.reduce((latest, r) => {
      const t = r.updated_at ? new Date(r.updated_at).getTime() : 0;
      return t > latest ? t : latest;
    }, 0);
    return {
      id: key,
      gradeLevel: `${first.class_name} ${first.term} ${first.session}`,
      totalStudents: results.length,
      submissionStatus: "100% Submitted",
      submissionPercentage: 100,
      lastUpdate: new Date(lastUpdate),
    };
  });
}

export default function FinalResultApprovalQueuePage() {
  const { data, isLoading, isError } = useGetAllExamResultsQuery(undefined);
  const raw = (data as { data?: ExamResult[] })?.data ?? [];
  const approvalQueueData = useMemo(
    () => buildApprovalQueueFromResults(raw),
    [raw]
  );

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
          `/admin/academic/assessment-grading/final-result-approval-queue/${encodeURIComponent(row.id)}`,
        className: "text-main-blue underline underline-offset-3",
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-background rounded-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Final Results Approval Queue
          </h2>
          <p className="text-gray-600 mt-1">
            Loading results batches...
          </p>
        </div>
      </div>
    );
  }

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
