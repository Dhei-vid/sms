"use client";

import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { PersonalTaskList } from "@/components/dashboard-pages/student/dashboard/personal-task-list";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Add01Icon } from "@hugeicons/core-free-icons";

export default function PersonalTaskManagerPage() {
  return (
    <div className="space-y-4">
      {/* Section Title and Description */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Personal Task Manager
        </h1>
        <p className="text-gray-600">
          This feature allows students to create and track non-academic or
          self-assigned study tasks.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard title="Tasks Due Today" value="3 Tasks" trend="up" />
        <MetricCard
          title="Completion Rate (Last 7 Days)"
          value="85% Success"
          trend="up"
        />
      </div>

      {/* Create New Personal Task Button */}
      <div className="flex justify-center">
        <Button variant={"outline"} className="w-full h-11 gap-2">
          <Icon icon={Add01Icon} size={20} />
          Create New Personal Task
        </Button>
      </div>

      {/* My Personal Task List */}
      <PersonalTaskList />
    </div>
  );
}
