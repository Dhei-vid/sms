"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { WalletBalanceCard } from "@/components/dashboard-pages/student/dashboard/wallet-balance-card";
import { UpcomingEventsCard } from "@/components/dashboard-pages/parent/dashboard/upcoming-events-card";
import { QuickActionsCard } from "@/components/dashboard-pages/parent/dashboard/quick-actions-card";
import { StudentNoticeBoardCard } from "@/components/dashboard-pages/student/dashboard/notice-board-card";
import { useGetNotificationsQuery } from "@/services/shared";
import { useGetParentByUserIdQuery } from "@/services/stakeholders/stakeholders";
import { useGetUpcomingEventsQuery } from "@/services/schedules/schedules";
import { format } from "date-fns";

export default function ParentDashboard() {
  const user = useAppSelector(selectUser);
  const { data: parentData } = useGetParentByUserIdQuery(user?.id ?? "", {
    skip: !user?.id,
  });
  const parent = parentData?.data ?? null;
  const childrenDetails = parent?.children_details ?? [];
  const primaryChild = Array.isArray(childrenDetails) ? childrenDetails[0] : null;
  const primaryChildName = primaryChild && typeof primaryChild === "object"
    ? (primaryChild as { class_assigned?: string }).class_assigned
      ? `Student (${(primaryChild as { class_assigned: string }).class_assigned})`
      : "your child"
    : "your child";

  const { data: notificationsData } = useGetNotificationsQuery(
    { per_page: 5 },
    { skip: !user?.id },
  );
  const { data: eventsData } = useGetUpcomingEventsQuery(
    { limit: 2 },
    { skip: !user?.id },
  );

  const upcomingEvents = useMemo(() => {
    const list = eventsData?.data ?? [];
    return list.map((e) => ({
      title: e.title ?? "",
      description: e.description ?? "",
      date: e.date && e.start_time
        ? format(new Date(`${e.date}T${e.start_time}`), "MMM d, yyyy; h:mm a")
        : e.date
          ? format(new Date(e.date), "MMM d, yyyy")
          : "",
    }));
  }, [eventsData?.data]);

  const latestNotices = useMemo(() => {
    const list = notificationsData?.data ?? [];
    const forParent = list.filter(
      (n) =>
        n.target_audience === "general" ||
        (Array.isArray(n.specifics) && n.specifics.includes("parent")),
    );
    return forParent.slice(0, 5).map((n) => ({
      title: n.title ?? "",
      description: n.content ?? "",
      time: n.created_at
        ? format(new Date(n.created_at), "MMM d, yyyy; h:mm a")
        : "",
    }));
  }, [notificationsData?.data]);

  const displayName = (() => {
    if (parent?.user?.first_name || parent?.user?.last_name) {
      return [parent?.user?.first_name, parent?.user?.last_name].filter(Boolean).join(" ");
    }
    if (parent?.parent_name) return parent.parent_name;
    if (user?.first_name || user?.last_name) {
      return [user?.first_name, user?.last_name].filter(Boolean).join(" ");
    }
    return "Parent";
  })();

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {displayName}
        </h1>
        <p className="text-gray-600">
          The main dashboard consolidates the most critical and actionable
          information of {primaryChildName} for the parent.
        </p>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Attendance (Today)"
          value="Present"
          subtitle="Since 7:45 AM"
          trend="up"
        />
        <MetricCard
          title="Latest Grade"
          value="History: 85%"
          subtitle="Academic performance update."
          trend="up"
        />
        <WalletBalanceCard />
      </div>

      {/* Upcoming Event Section */}
      <UpcomingEventsCard events={upcomingEvents} />

      {/* Notice Board */}
      <StudentNoticeBoardCard notices={latestNotices} />

      {/* Quick Actions Section */}
      <QuickActionsCard />
    </div>
  );
}
