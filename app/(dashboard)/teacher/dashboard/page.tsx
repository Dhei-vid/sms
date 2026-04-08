"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import Link from "next/link";
import { useGetNotificationsQuery } from "@/services/shared";
import { useGetTeacherByUserIdQuery } from "@/services/stakeholders/stakeholders";
import { format } from "date-fns";

interface TaskItem {
  id: string;
  taskType: string;
  subjectAssessment: string;
  deadline: string;
  actionLabel: string;
  actionHref: string;
}

export default function TeacherDashboardPage() {
  const user = useAppSelector(selectUser);
  const { data: teacherData } = useGetTeacherByUserIdQuery(user?.id ?? "", {
    skip: !user?.id,
  });
  const teacher = teacherData?.data ?? null;
  const teacherId = teacher?.id ?? null;

  const { data: notificationsData } = useGetNotificationsQuery(
    { per_page: 5 },
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

  const displayName =
    teacher?.user?.first_name || teacher?.user?.last_name
      ? [teacher.user.first_name, teacher.user.last_name]
          .filter(Boolean)
          .join(" ")
      : user?.first_name || user?.last_name
        ? [user.first_name, user.last_name].filter(Boolean).join(" ")
        : "Teacher";

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
            Welcome, {displayName}
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
          value={`1 Student`}
          trend="up"
          trendColor="text-main-blue"
          subtitle="Across all assigned classes"
        />
        <MetricCard
          title="Total Class Covered"
          value={`2 Classes`}
          trend="up"
          trendColor="text-main-blue"
          subtitle="Current academic term"
        />
        <MetricCard
          title="Compliance Rate"
          value={0}
          trend="up"
          trendColor="text-main-blue"
          subtitle="Content submission status"
        />
        <MetricCard
          title="Attendance"
          value={0}
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
              data={[]}
              isLoading={false}
              showActionsColumn={false}
              emptyMessage="No tasks yet."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
