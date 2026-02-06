"use client";

import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { WalletBalanceCard } from "@/components/dashboard-pages/student/dashboard/wallet-balance-card";
import { UpcomingEventsCard } from "@/components/dashboard-pages/student/dashboard/upcoming-events-card";
import { StudentNoticeBoardCard } from "@/components/dashboard-pages/student/dashboard/notice-board-card";
import { PersonalTaskList } from "@/components/dashboard-pages/student/dashboard/personal-task-list";
import { useGetCoursesQuery } from "@/services/shared";
import { useGetAssignmentsQuery } from "@/services/shared";
import { useGetNoticesQuery } from "@/services/shared";
import { useGetCalendarEventsQuery } from "@/services/shared";
import { useGetStudentByIdQuery } from "@/services/shared";
import { useGetWalletBalanceQuery } from "@/services/wallet/wallet";
import { format } from "date-fns";

export default function StudentDashboard() {
  const user = useAppSelector(selectUser);

  // Fetch student data by ID - this ensures data is cached and shared across dashboards
  // When admin/parent views this same student, they'll get cached data
  const { data: studentData } = useGetStudentByIdQuery(user?.id || "", {
    skip: !user?.id, // Skip if no user ID
  });

  console.log("User ", user);

  // Use student data if available, fallback to auth user
  const student = studentData || user;

  const { data: coursesData } = useGetCoursesQuery({ limit: 10 });
  const { data: assignmentsData } = useGetAssignmentsQuery(
    student?.id ? { studentId: student.id, limit: 5 } : undefined,
  );
  const { data: noticesData } = useGetNoticesQuery({ limit: 2 });
  const { data: calendarData } = useGetCalendarEventsQuery({ limit: 2 });
  const { data: walletData } = useGetWalletBalanceQuery(user?.id ?? undefined, {
    skip: !user?.id,
  });

  const upcomingAssignments =
    assignmentsData?.data?.filter((assignment) => {
      if (!assignment.dueDate) return false;
      const dueDate = new Date(assignment.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate >= today;
    }) || [];

  const upcomingEvents =
    calendarData?.data?.map((event) => ({
      title: event.title,
      description: event.description || "",
      date: event.startDate
        ? format(new Date(event.startDate), "MMM d, yyyy; h:mm a")
        : "",
    })) || [];

  const latestNotices = noticesData?.data?.slice(0, 2) || [];

  const nextClass = upcomingEvents[0] || null;

  const displayName = student
    ? `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
      student.first_name ||
      "Student"
    : "Student";
  const displayEmail = student?.email || "";
  const className =
    (student as any)?.className || (student as any)?.class?.name || "";

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {displayName}
        </h1>
        <div className="flex flex-wrap gap-3">
          {className && (
            <div className="bg-gray-100 rounded-md px-4 py-2">
              <span className="text-sm text-gray-700">Class: {className}</span>
            </div>
          )}
          {displayEmail && (
            <div className="bg-gray-100 rounded-md px-4 py-2">
              <span className="text-sm text-gray-700">{displayEmail}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MetricCard
            title="Next Class"
            value={nextClass?.title || "No upcoming class"}
            subtitle={nextClass?.date || ""}
            trend={"up"}
          />
        </div>
        <div className="relative">
          <MetricCard
            title="Assignments Due"
            value={`${upcomingAssignments.length} ${
              upcomingAssignments.length === 1 ? "Assignment" : "Assignments"
            }`}
            subtitle={
              upcomingAssignments.length > 0
                ? "Check your assignments"
                : "No upcoming assignments"
            }
            trend={"up"}
          />
        </div>
        <WalletBalanceCard
          balance={
            walletData?.data?.balance
              ? `₦ ${parseFloat(String(walletData.data.balance)).toLocaleString(
                  "en-NG",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                )}`
              : undefined
          }
          lastTransaction={
            walletData?.data?.updated_at
              ? format(
                  new Date(walletData.data.updated_at),
                  "MMM d, yyyy; h:mm a",
                )
              : undefined
          }
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Events */}
        <UpcomingEventsCard events={upcomingEvents} />

        {/* Today on the Notice Board */}
        <StudentNoticeBoardCard
          notices={latestNotices.map((notice) => ({
            title: notice.title,
            description: notice.content || "",
            time: notice.createdAt
              ? format(new Date(notice.createdAt), "MMM d, yyyy; h:mm a")
              : "",
          }))}
        />
      </div>

      {/* Personal Task List */}
      <PersonalTaskList />
    </div>
  );
}
