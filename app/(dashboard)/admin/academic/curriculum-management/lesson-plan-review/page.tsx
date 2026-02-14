"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useGetLessonPlansQuery } from "@/services/notes/notes";
import type { Notes } from "@/services/notes/note-types";

interface LessonPlan {
  id: string;
  subject: string;
  submittedBy: string;
  submittedByUsername: string;
  unitTopic: string;
  dateSubmitted: Date;
  status: "pending" | "sent-back" | "approved";
}

function noteToLessonPlan(n: Notes): LessonPlan {
  const creator = n.creator as { first_name?: string; last_name?: string; username?: string } | undefined;
  const submittedBy = creator
    ? `${creator.first_name ?? ""} ${creator.last_name ?? ""}`.trim() || "—"
    : "—";
  const submittedByUsername = creator?.username ?? "—";
  const status = (n.status ?? "pending") as LessonPlan["status"];
  const validStatus = ["pending", "sent-back", "approved"].includes(status)
    ? status
    : "pending";
  return {
    id: n.id,
    subject: n.title,
    submittedBy,
    submittedByUsername,
    unitTopic: n.description ?? n.title,
    dateSubmitted: new Date(n.created_at),
    status: validStatus,
  };
}

const schoolLevelOptions = [
  { value: "junior-secondary", label: "Junior Secondary School" },
  { value: "senior-secondary", label: "Senior Secondary School" },
  { value: "primary", label: "Primary School" },
];

const gradeOptions = [
  { value: "js-1", label: "JS 1" },
  { value: "js-2", label: "JS 2" },
  { value: "js-3", label: "JS 3" },
  { value: "ss-1", label: "SS 1" },
  { value: "ss-2", label: "SS 2" },
  { value: "ss-3", label: "SS 3" },
];

const weekOptions = [
  { value: "1", label: "Week: 1" },
  { value: "2", label: "Week: 2" },
  { value: "3", label: "Week: 3" },
  { value: "4", label: "Week: 4" },
  { value: "5", label: "Week: 5" },
];

const getStatusColor = (status: LessonPlan["status"]) => {
  switch (status) {
    case "pending":
      return "text-orange-600";
    case "sent-back":
      return "text-main-blue";
    case "approved":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getStatusLabel = (status: LessonPlan["status"]) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "sent-back":
      return "Sent Back";
    case "approved":
      return "Approved";
    default:
      return status;
  }
};

const getActionLabel = (status: LessonPlan["status"]) => {
  switch (status) {
    case "pending":
    case "sent-back":
      return "Review Plan";
    case "approved":
      return "Open Plan";
    default:
      return "View";
  }
};

export default function LessonPlanReviewPage() {
  const [schoolLevel, setSchoolLevel] = useState("junior-secondary");
  const [grade, setGrade] = useState("js-2");
  const [week, setWeek] = useState("4");

  const { data: lessonPlansResponse, isLoading } = useGetLessonPlansQuery();
  const lessonPlansData: LessonPlan[] = useMemo(() => {
    const list = lessonPlansResponse?.data ?? [];
    return list.map(noteToLessonPlan);
  }, [lessonPlansResponse?.data]);

  const pendingCount = lessonPlansData.filter(
    (plan) => plan.status === "pending",
  ).length;

  const columns: TableColumn<LessonPlan>[] = [
    {
      key: "subject",
      title: "Subject",
      className: "font-medium",
    },
    {
      key: "submittedBy",
      title: "Submitted By",
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="text-sm">{row.submittedBy}</span>
          <span className="text-xs text-gray-500">
            ({row.submittedByUsername})
          </span>
        </div>
      ),
    },
    {
      key: "unitTopic",
      title: "Unit/Topic",
    },
    {
      key: "dateSubmitted",
      title: "Date Submitted",
      render: (value) => (
        <span className="text-sm">{format(value, "LLL. d, yyyy")}</span>
      ),
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

  const tableActions: TableAction<LessonPlan>[] = [
    {
      type: "link",
      config: {
        label: "Review",
        href: (row) =>
          `/admin/academic/curriculum-management/lesson-plan-review/${row.id}`,
        className: "text-main-blue hover:text-main-blue/80",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Lesson Plan Review Queue
        </h2>
        <p className="text-gray-600 mt-1">
          This screen for efficient review, comment, and approval of
          teacher-submitted lesson plans for the current term.
        </p>
      </div>

      {/* Summary Card */}
      <Card className="relative">
        <CardHeader>
          <CardTitle className="font-semibold text-gray-800">
            Lesson Plan Submissions Awaiting Approval
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {pendingCount} Pending Review
              </p>
            </div>
          </div>
        </CardContent>

        <div className="absolute top-5 right-5">
          <ArrowUpRight className="text-main-blue" size={20} />
        </div>
      </Card>

      {/* Submission Queue Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Submission Queue Table
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="w-[200px]">
                <SelectField value={schoolLevel} onValueChange={setSchoolLevel}>
                  {schoolLevelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
              <div className="w-[100px]">
                <SelectField value={grade} onValueChange={setGrade}>
                  {gradeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
              <div className="w-[120px]">
                <SelectField value={week} onValueChange={setWeek}>
                  {weekOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={lessonPlansData}
              actions={tableActions}
              emptyMessage={
                isLoading
                  ? "Loading..."
                  : "No lesson plans submitted yet."
              }
              tableClassName="border-collapse"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
