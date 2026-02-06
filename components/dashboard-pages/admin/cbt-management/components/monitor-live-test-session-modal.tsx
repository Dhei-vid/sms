"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StudentExamProgress {
  id: string;
  fullName: string;
  schoolId: string;
  examStartTime: string;
  timeElapsed: string;
  questionsAnswered: number;
  totalQuestions: number;
  status: "active" | "submitted";
}

interface MonitorLiveTestSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examTitle: string;
  totalStudents: number;
  invigilator: string;
  timeRemaining: string;
  students: StudentExamProgress[];
  onReviewScript?: (studentId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function MonitorLiveTestSessionModal({
  open,
  onOpenChange,
  examTitle,
  totalStudents,
  invigilator,
  timeRemaining,
  students,
  onReviewScript,
  onLoadMore,
  hasMore = false,
}: MonitorLiveTestSessionModalProps) {
  const columns: TableColumn<StudentExamProgress>[] = [
    {
      key: "fullName",
      title: "Full Name + School ID",
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium">{value}</p>
          <p className="text-xs text-gray-500">({row.schoolId})</p>
        </div>
      ),
    },
    {
      key: "examStartTime",
      title: "Exam Start Time",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "timeElapsed",
      title: "Time Elapsed",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "questionsAnswered",
      title: "Questions Answered",
      render: (value, row) => (
        <span className="text-sm">
          {value}/{row.totalQuestions}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => (
        <span
          className={cn(
            "text-sm font-medium capitalize",
            row.status === "active" ? "text-green-600" : "text-blue-600",
          )}
        >
          {value}
        </span>
      ),
    },
  ];

  // Table actions
  const actions: TableAction<StudentExamProgress>[] = [
    {
      type: "button",
      config: {
        label: "Review Script",
        variant: "link",
        className: "text-main-blue underline underline-offset-3 p-0 h-auto",
        onClick: (row) => {
          if (onReviewScript) {
            onReviewScript(row.id);
          }
        },
      },
    },
  ];

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title={examTitle}
      size="6xl"
    >
      <div className="space-y-4">
        {/* Summary Tags */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-600">
              Total number of Students:{" "}
              <span className="font-semibold text-gray-800">
                {totalStudents} Students
              </span>
            </span>
          </div>
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-600">
              Invigilator:{" "}
              <span className="font-semibold text-gray-800">{invigilator}</span>
            </span>
          </div>
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-600">
              Time Remaining:{" "}
              <span className="font-semibold text-gray-800">
                {timeRemaining}
              </span>
            </span>
          </div>
        </div>

        {/* Students Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[60vh]">
            <DataTable
              columns={columns}
              data={students}
              actions={actions}
              emptyMessage="No students found."
              tableClassName="border-collapse"
            />
          </div>
        </div>

        {/* Load More Button */}
        {hasMore && onLoadMore && (
          <div className="flex justify-center pt-2">
            <Button variant="outline" onClick={onLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
