"use client";

import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { WalletBalanceCard } from "@/components/dashboard-pages/student/dashboard/wallet-balance-card";
import { UpcomingEventsCard } from "@/components/dashboard-pages/parent/dashboard/upcoming-events-card";
import { QuickActionsCard } from "@/components/dashboard-pages/parent/dashboard/quick-actions-card";

export default function ParentDashboard() {
  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, Mr. & Mrs. Kunle Oluwole
        </h1>
        <p className="text-gray-600">
          The main dashboard consolidates the most critical and actionable
          information of Tunde O. for the parent.
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
      <UpcomingEventsCard />

      {/* Quick Actions Section */}
      <QuickActionsCard />
    </div>
  );
}
