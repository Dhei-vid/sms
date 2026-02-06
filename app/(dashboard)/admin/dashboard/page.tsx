"use client";

import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { GradeDistributionChart } from "@/components/dashboard-pages/admin/dashboard/grade-distribution-chart";
import { TodaysEventCard } from "@/components/dashboard-pages/admin/dashboard/todays-event-card";
import { NoticeBoardCard } from "@/components/dashboard-pages/admin/dashboard/notice-board-card";
import { RecentActivitiesCard } from "@/components/dashboard-pages/admin/dashboard/recent-activities-card";
import { TransactionsCard } from "@/components/dashboard-pages/admin/dashboard/transactions-card";
import { useGetStudentsQuery } from "@/services/shared";
import { useGetUsersQuery } from "@/services/users/users";
import { useGetNotificationsQuery } from "@/services/shared";
import { format, isToday } from "date-fns";
import { useEffect } from "react";

export default function AdminDashboard() {
  const user = useAppSelector(selectUser);

  // Always fetch students and staff data (don't skip)
  const {
    data: studentsData,
    error: studentsError,
    isLoading: studentsLoading,
  } = useGetStudentsQuery({ limit: 1 });
  const {
    data: staffData,
    error: staffError,
    isLoading: staffLoading,
  } = useGetUsersQuery({ role: "teacher", limit: 1 });
  const { data: notificationsData, error: notificationsError } =
    useGetNotificationsQuery({ limit: 5 });

  // Debug logging for students and staff
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (studentsError) {
        console.error("❌ Students Query Error:", {
          error: studentsError,
          status: (studentsError as any)?.status,
          data: (studentsError as any)?.data,
        });
      }
      if (staffError) {
        console.error("❌ Staff Query Error:", {
          error: staffError,
          status: (staffError as any)?.status,
          data: (staffError as any)?.data,
        });
      }
      if (studentsData) {
        console.log("✅ Students Response:", {
          status: studentsData.status,
          status_code: studentsData.status_code,
          dataArrayLength: studentsData.data?.length,
          data: studentsData.data, // The actual array
        });
      }
      if (staffData) {
        console.log("✅ Staff Response:", {
          status: staffData.status,
          status_code: staffData.status_code,
          dataArrayLength: staffData.data?.length,
          data: staffData.data, // The actual array
        });
      }
    }
  }, [
    studentsData,
    studentsError,
    studentsLoading,
    staffData,
    staffError,
    staffLoading,
  ]);

  // Extract data from API responses
  const totalStudents = studentsData?.data?.length ?? 0;
  const totalStaff = staffData?.data?.length ?? 0;
  const totalFinance = 0;

  interface CalendarEvent {
    startDate?: string;
    endDate?: string;
    title: string;
    description?: string;
    type?: string;
  }

  // const todayEvents = calendarData?.data?.filter((event: CalendarEvent) => {
  //   if (!event.startDate) return false;
  //   return isToday(new Date(event.startDate));
  // }) || [];

  interface Notification {
    title: string;
    content?: string;
    created_at?: string | null;
  }

  const todayNotifications =
    notificationsData?.data?.filter((notification: Notification) => {
      if (!notification.created_at) return false;
      return isToday(new Date(notification.created_at));
    }) || [];

  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
      user.email ||
      "Admin"
    : "Admin";

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Welcome back, {displayName}. Here is what is happening today.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value={totalStudents ?? 0}
          subtitle="Active students"
          trend="up"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Total Staffs"
          value={totalStaff ?? 0}
          subtitle="Total active workforce"
          trend="up"
        />
        <MetricCard
          title="Finance"
          value={`₦${totalFinance.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          subtitle="Total income"
          trend="up"
        />
        <MetricCard
          title="Attendance"
          value={`${0}%`}
          subtitle="Average attendance both staffs & students"
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Grade Distribution Chart */}
        <GradeDistributionChart className="lg:col-span-2" />

        <div className="grid grid-rows-2 gap-4">
          {/* Today's Event */}
          <TodaysEventCard
            events={[].map((event: CalendarEvent) => ({
              title: event.title,
              description: event.description || "",
              time:
                event.startDate && event.endDate
                  ? `${format(new Date(event.startDate), "h:mm a")} - ${format(
                      new Date(event.endDate),
                      "h:mm a",
                    )}`
                  : event.startDate
                    ? format(new Date(event.startDate), "h:mm a")
                    : "",
              color: event.type === "event" ? "bg-purple-600" : "bg-blue-600",
            }))}
          />

          {/* Today on the Notice Board */}
          <NoticeBoardCard
            notices={todayNotifications.map((notification: Notification) => ({
              title: notification.title,
              time: notification.created_at
                ? format(new Date(notification.created_at), "h:mm a")
                : "",
              description: notification.content || "",
            }))}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activities */}
        <RecentActivitiesCard />

        {/* Transactions */}
        <TransactionsCard />
      </div>
    </div>
  );
}
