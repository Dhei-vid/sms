"use client";

import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { WalletBalanceCard } from "@/components/dashboard-pages/student/dashboard/wallet-balance-card";
import { UpcomingEventsCard } from "@/components/dashboard-pages/student/dashboard/upcoming-events-card";
import { StudentNoticeBoardCard } from "@/components/dashboard-pages/student/dashboard/notice-board-card";
import { PersonalTaskList } from "@/components/dashboard-pages/student/dashboard/personal-task-list";
import { Icon } from "@/components/general/huge-icon";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export default function StudentDashboard() {
  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, Tunde Oluwole
        </h1>
        <div className="flex flex-wrap gap-3">
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-700">
              Class: Junior Secondary School (JSS) 2B
            </span>
          </div>
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-700">
              oluwole.m178023@penetraliahub.edu
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MetricCard
            title="Next Class"
            value="Mathematics"
            subtitle="9:00 AM - 9:45 AM"
            trend={"up"}
          />
        </div>
        <div className="relative">
          <MetricCard
            title="Assignment Due Tomorrow"
            value="2 Assignments"
            subtitle="High-visibility banner for immediate action."
            trend={"up"}
          />
        </div>
        <WalletBalanceCard />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Events */}
        <UpcomingEventsCard />

        {/* Today on the Notice Board */}
        <StudentNoticeBoardCard />
      </div>

      {/* Personal Task List */}
      <PersonalTaskList />
    </div>
  );
}
