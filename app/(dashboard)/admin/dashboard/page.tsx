"use client";

import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { GradeDistributionChart } from "@/components/dashboard-pages/admin/dashboard/grade-distribution-chart";
import { TodaysEventCard } from "@/components/dashboard-pages/admin/dashboard/todays-event-card";
import { NoticeBoardCard } from "@/components/dashboard-pages/admin/dashboard/notice-board-card";
import { RecentActivitiesCard } from "@/components/dashboard-pages/admin/dashboard/recent-activities-card";
import { TransactionsCard } from "@/components/dashboard-pages/admin/dashboard/transactions-card";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Welcome back. Here is what is happening today.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value="1,900"
          subtitle="+34% Compared to last term"
          trend="up"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Total Staffs"
          value="240"
          subtitle="Total active workforce"
          trend="up"
        />
        <MetricCard
          title="Finance"
          value="₦12,187,000"
          subtitle="Total income"
          trend="up"
        />
        <MetricCard
          title="Attendance"
          value="94%"
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
          <TodaysEventCard />

          {/* Today on the Notice Board */}
          <NoticeBoardCard />
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
