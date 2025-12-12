"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { AssignStaffDutyModal } from "@/components/dashboard-pages/admin/academic/components/assign-staff-duty-modal";
import {
  PassportValidIcon,
  Calendar03Icon,
  PayByCheckIcon,
  TransactionHistoryIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface AcademicTask {
  id: string;
  type: string;
  date: string;
  description: string;
  assignedTo: string;
}

const gradeDistribution = [
  { label: "A-Grade", value: 70, color: "bg-teal-500" },
  { label: "B-Grade", value: 45, color: "bg-orange-500" },
  { label: "C-Grade", value: 65, color: "bg-purple-500" },
  { label: "D-Grade", value: 25, color: "bg-blue-500" },
  { label: "E-Grade", value: 10, color: "bg-red-500" },
  { label: "F-Grade", value: 5, color: "bg-gray-400" },
];

const staffUtilization = [
  { label: "Teaching Time", value: 70, color: "bg-blue-600" },
  { label: "Admin/Duty", value: 18, color: "bg-blue-300" },
  { label: "Free Periods", value: 12, color: "bg-orange-500" },
];

const quickActions = [
  {
    icon: PayByCheckIcon,
    title: "Create New Timetable",
    description: "Leads to the scheduling interface",
  },
  {
    icon: Calendar03Icon,
    title: "Current Exam Schedule",
    description: "Quick link to assessment dates",
  },
  {
    icon: PassportValidIcon,
    title: "Assign Teacher to Duty",
    description: "Direct access to fill scheduling gaps",
  },
  {
    icon: TransactionHistoryIcon,
    title: "Review Curriculum Gaps",
    description: "Links to the curriculum audit tool.",
  },
];

const upcomingTasks: AcademicTask[] = [
  {
    id: "1",
    type: "Assessment Setup",
    date: "Nov 08, 2025",
    description: "SS2 Chemistry Mid-Term Exam (Upload Questions)",
    assignedTo: "Mr. Uche E.",
  },
  {
    id: "2",
    type: "Administrative Duty",
    date: "Nov. 11, 2025",
    description: "SS3 Mock Exam Invigilation (Hall B)",
    assignedTo: "Dr. Femi I.",
  },
  {
    id: "3",
    type: "Grade Submission",
    date: "Nov. 22, 2025",
    description: "Primary 4 Art (Submit Continuous Assessment Scores)",
    assignedTo: "Mrs. Kemi O.",
  },
];

const classOptions = [
  { value: "all", label: "All Classes" },
  { value: "primary", label: "Primary" },
  { value: "jss", label: "JSS" },
  { value: "sss", label: "SSS" },
];

const yearOptions = [
  { value: "2025-2026", label: "2025/2026 Year" },
  { value: "2024-2025", label: "2024/2025 Year" },
  { value: "2023-2024", label: "2023/2024 Year" },
];

export default function AcademicManagementPage() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2025-2026");
  const [assignDutyModalOpen, setAssignDutyModalOpen] = useState(false);

  // Calculate donut chart segments
  const total = staffUtilization.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const segments = staffUtilization.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return {
      ...item,
      percentage,
      startAngle,
      angle,
    };
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Academic Management Overview Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This dashboard provides a snapshot of academic health, staff workload,
          and critical tasks related to curriculum and assessment.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinancialMetricCard
          title="Average Student Grade (Current Term)"
          value="78.5% (B)"
          subtitle="Tracks overall academic performance."
          trend="up"
        />
        <FinancialMetricCard
          title="Staff Workload Utilization"
          value="85%"
          subtitle="Measures teacher time allocated to classes."
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Grade Distribution Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Grade Distribution
              </CardTitle>
              <div className="w-32">
                <SelectField
                  label=""
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                  placeholder="All Classes"
                >
                  {classOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {gradeDistribution.map((grade) => (
                <div
                  key={grade.label}
                  className="flex-1 flex flex-col items-center"
                >
                  <div className="w-full flex flex-col items-center justify-end h-full">
                    <div
                      className={cn(
                        "w-full rounded-t transition-all",
                        grade.color
                      )}
                      style={{ height: `${grade.value}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                    {grade.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full h-auto">
                View Student Progress
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                icon={action.icon}
                description={action.description}
                onClick={() => {
                  if (action.title === "Assign Teacher to Duty") {
                    setAssignDutyModalOpen(true);
                  }

                  if (action.title === "Current Exam Schedule") {
                    router.push("dashboard/current-exam-schedule");
                  }

                  if (action.title === "Create New Timetable") {
                    router.push("dashboard/create-timetable");
                  }

                  if (action.title === "Review Curriculum Gaps") {
                    router.push("dashboard/curriculum-management");
                  }
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Staff Utilization Breakdown Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Staff Utilization Breakdown
              </CardTitle>
              <div className="w-40">
                <SelectField
                  label=""
                  value={selectedYear}
                  onValueChange={setSelectedYear}
                  placeholder="2025/2026 Year"
                >
                  {yearOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              {/* Donut Chart */}
              <div className="relative w-48 h-48 shrink-0">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {segments.map((segment, index) => {
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    const offset = segments
                      .slice(0, index)
                      .reduce(
                        (sum, s) => sum + (s.value / total) * circumference,
                        0
                      );
                    const dashArray = (segment.value / total) * circumference;
                    const colorMap: Record<string, string> = {
                      "bg-blue-600": "#2563eb",
                      "bg-blue-300": "#93c5fd",
                      "bg-orange-500": "#f97316",
                    };

                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={colorMap[segment.color] || segment.color}
                        strokeWidth="12"
                        strokeDasharray={`${dashArray} ${circumference}`}
                        strokeDashoffset={-offset}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{total}%</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3">
                {staffUtilization.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={cn("w-4 h-4 rounded", item.color)} />
                    <span className="text-sm text-gray-700">
                      {item.label}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Academic Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Upcoming Academic Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-main-blue mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800">
                          {task.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({task.date})
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {task.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        - {task.assignedTo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assign Staff to Duty Modal */}
      <AssignStaffDutyModal
        open={assignDutyModalOpen}
        onOpenChange={setAssignDutyModalOpen}
        onConfirm={(data) => {
          console.log("Assign staff to duty", data);
          // Handle confirmation logic
        }}
      />
    </div>
  );
}
