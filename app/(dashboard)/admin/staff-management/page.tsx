"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { StaffActivityItem } from "@/components/dashboard-pages/admin/staff/components/staff-activity-item/staff-activity-item";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  DocumentValidationIcon,
  UserCheck01Icon,
  FileUploadIcon,
  Alert01Icon,
  UserAdd01Icon,
  UserMinus01Icon,
  TeamviewerIcon,
} from "@hugeicons/core-free-icons";

// API
import { useGetAllStaffQuery } from "@/services/stakeholders/stakeholders";

export default function StaffDashboardPage() {
  const router = useRouter();

  const { data: staffData, isLoading } = useGetAllStaffQuery();

  console.log("Stakeholders Data:", staffData);

  // Quick Actions Configuration
  interface QuickAction {
    title: string;
    description: string;
    icon: any;
    onClick: () => void;
  }

  const quickActions: QuickAction[] = [
    {
      title: "Manage All Staff Directory",
      description: "Complete database table of all staffs",
      icon: DocumentValidationIcon,
      onClick: () => router.push("/admin/staff-management/all"),
    },
    {
      title: "Applicant Tracking",
      description:
        "Tracks candidates currently in the interviewing process for open vacancies.",
      icon: UserCheck01Icon,
      onClick: () => router.push("/admin/staff-management/applicant-tracking"),
    },
    {
      title: "Schedule & Assignments",
      description:
        "Formally document a staff member's new duty, task, or the allocation of a school asset.",
      icon: FileUploadIcon,
      onClick: () => router.push("/admin/staff-management/schedule"),
    },
    {
      title: "Staff Leave Requests Management",
      description:
        "For reviewing, prioritizing, and acting on pending staff leave requests.",
      icon: Alert01Icon,
      onClick: () => router.push("/admin/staff-management/leave"),
    },
  ];

  // Recent Activities Configuration
  interface StaffActivity {
    type: "hired" | "absent" | "resignation" | "leave" | "appraisal";
    title: string;
    description: string;
    timestamp: string;
    icon: any;
  }

  const recentActivities: StaffActivity[] = [
    {
      type: "hired",
      title: "New Teacher Hired",
      description: "Mr. Chinadu Okafor (JSS Science) - Start Date: 2025-11-01",
      timestamp: "10:00 AM",
      icon: UserAdd01Icon,
    },
    {
      type: "absent",
      title: "Absent Staff",
      description: "Ms. Sola Adeniyi (SS3 History) - Reason: Annual Leave",
      timestamp: "8:15 AM",
      icon: Alert01Icon,
    },
    {
      type: "resignation",
      title: "Resignation",
      description: "Mrs. Helen Davies (SS2 English) - Last Day: 2025-12-15",
      timestamp: "Oct. 22, 8:15 AM",
      icon: UserMinus01Icon,
    },
    {
      type: "leave",
      title: "Leave Approved",
      description:
        "Ms. Tolu Adebayo (Admin) - Annual Leave: 2025-10-28 to 2025-11-04",
      timestamp: "Oct. 21, 9:32 AM",
      icon: TeamviewerIcon,
    },
    {
      type: "appraisal",
      title: "Appraisal Due",
      description: "Mr. Biodun Blue (P4 Teacher) - Due: 2025-11-10",
      timestamp: "Oct. 21, 9:32 AM",
      icon: TeamviewerIcon,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Staff Overview Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Manage staff accounts, assign roles/permissions, staff contact
          directory.
        </p>
      </div>

      {/* Workforce Status Section */}
      <div className="space-y-4">
        <div className="bg-card py-6 px-3 rounded-md">
          <div className="border-l-3 border-amber-500 pl-3">
            <h3 className="text-lg font-semibold">Workforce Status</h3>
            <p className="text-sm text-gray-600">
              A snapshot of the entire staff body.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Total Active Staffs"
            value="145 Employees"
            subtitle=""
            trend="up"
            trendColor="text-main-blue"
          />
          <MetricCard
            title="Staff On Leave"
            value="4 Employees"
            subtitle=""
            trend="up"
            trendColor="text-main-blue"
          />
          <MetricCard
            title="Staff-to-Student Ratio"
            value="1:8.6"
            subtitle=""
            trend="up"
            trendColor="text-main-blue"
          />
        </div>
      </div>

      {/* HR & Risk Metrics Section */}
      <div className="space-y-4">
        <div className="bg-card py-6 px-3 rounded-md">
          <div className="border-l-3 border-green-500 pl-3">
            <h3 className="text-lg font-semibold">HR & Risk Metrics</h3>
            <p className="text-sm text-gray-600">
              Personnel issues that require immediate administrative or HR
              action.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Leave Requests Pending"
            value="7 Requests"
            subtitle=""
            trend="up"
            trendColor="text-main-blue"
          />
          <MetricCard
            title="Contract Expiring (Next 90 Days)"
            value="12 Employees"
            subtitle=""
            trend="up"
            trendColor="text-main-blue"
          />
          <MetricCard
            title="Current Vacancies"
            value="3 Open Positions"
            subtitle=""
            trend="up"
            trendColor="text-main-blue"
          />
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activities Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <StaffActivityItem
                  key={index}
                  type={activity.type}
                  title={activity.title}
                  description={activity.description}
                  timestamp={activity.timestamp}
                  icon={activity.icon}
                />
              ))}
              <div className="flex justify-center pt-4">
                <Button variant="outline" size="sm">
                  Load more
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <div className="lg:col-span-1">
          <Card className="bg-background py-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-1">
              <div className="space-y-0">
                {quickActions.map((action, index) => (
                  <div key={index}>
                    <QuickActionCard
                      title={action.title}
                      description={action.description}
                      icon={action.icon}
                      onClick={action.onClick}
                    />
                    {index < quickActions.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
