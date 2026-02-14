"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import Link from "next/link";
import { useGetNotificationsQuery } from "@/services/shared";
import { format } from "date-fns";

interface TaskItem {
  id: string;
  taskType: string;
  subjectAssessment: string;
  deadline: string;
  actionLabel: string;
  actionHref: string;
}

const tasks: TaskItem[] = [
  {
    id: "1",
    taskType: "Attendance",
    subjectAssessment: "JSS2 Maths Class",
    deadline: "Nov. 13, 2025",
    actionLabel: "Mark Attendance",
    actionHref: "/teacher/my-class",
  },
  {
    id: "2",
    taskType: "Grade Submission",
    subjectAssessment: "JSS2 Mathematics Mid-Term Exam",
    deadline: "Nov. 13, 2025",
    actionLabel: "Submit Scores",
    actionHref: "/teacher/grade-entry-portal",
  },
  {
    id: "3",
    taskType: "Content Review",
    subjectAssessment: "SS2 Physics Lesson Plan (Unit 4)",
    deadline: "Nov. 13, 2025",
    actionLabel: "See Comments",
    actionHref: "/teacher/grade-entry-portal/submitted-grades",
  },
  {
    id: "4",
    taskType: "Question Submission",
    subjectAssessment: "Arts & Crafts (Adire Unit)",
    deadline: "Nov. 13, 2025",
    actionLabel: "Continue",
    actionHref: "/teacher/question-bank",
  },
];

export default function TeacherDashboardPage() {
  const user = useAppSelector(selectUser);
  const { data: notificationsData } = useGetNotificationsQuery(
    { limit: 5 },
    { skip: !user?.id },
  );

  const noticeBoardItems = useMemo(() => {
    const list = notificationsData?.data ?? [];
    const forTeacher = list.filter(
      (n) =>
        n.target_audience === "general" ||
        (Array.isArray(n.specifics) && n.specifics.includes("teacher")),
    );
    return forTeacher.slice(0, 5).map((n) => ({
      title: n.title ?? "",
      description: n.content ?? "",
      time: n.created_at
        ? format(new Date(n.created_at), "MMM d, yyyy; h:mm a")
        : "",
    }));
  }, [notificationsData?.data]);

  const taskColumns: TableColumn<TaskItem>[] = [
    {
      key: "taskType",
      title: "Task Type",
      render: (value) => (
        <span className="text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "subjectAssessment",
      title: "Subject/Assessment",
      render: (value) => (
        <span className="text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "deadline",
      title: "Deadline",
      render: (value) => (
        <span className="text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_value, row) => (
        <Link
          href={row.actionHref}
          className="text-main-blue hover:underline font-medium"
        >
          {row.actionLabel}
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Welcome Banner */}
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, Ms. Zara A.
          </h1>
          <p className="text-gray-600 max-w-2xl">
            This dashboard prioritizes urgent tasks and provides quick
            statistics on teaching load and compliance.
          </p>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value="180 Students"
          trend="up"
          trendColor="text-main-blue"
          subtitle="Across all assigned classes"
        />
        <MetricCard
          title="Total Class Covered"
          value="5 Classes"
          trend="up"
          trendColor="text-main-blue"
          subtitle="Current academic term"
        />
        <MetricCard
          title="Avg. Class Score (Last Assessment)"
          value="75.2%"
          trend="up"
          trendColor="text-main-blue"
          subtitle="Most recent graded task"
        />
        <MetricCard
          title="Attendance"
          value="94%"
          trend="up"
          trendColor="text-main-blue"
          subtitle="Last attendance cycle"
        />
      </div>

      {/* Today on the Notice Board */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Today on the Notice Board
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {noticeBoardItems.length === 0 ? (
            <p className="text-sm text-gray-500">No notices at the moment.</p>
          ) : (
            noticeBoardItems.map((notice, index) => (
              <div key={index}>
                <p className="font-medium text-gray-800">{notice.title}</p>
                <p className="text-sm text-gray-600">
                  {notice.description}{" "}
                  {notice.time && (
                    <span className="text-gray-500">— {notice.time}</span>
                  )}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* My Task Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            My Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={taskColumns}
              data={tasks}
              showActionsColumn={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
