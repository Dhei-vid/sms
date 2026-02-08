"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { ActivityItem } from "@/components/dashboard-pages/admin/students/components/activity-item";
import { ReportGenerationModal } from "@/components/dashboard-pages/admin/students/modals/report-generation-modal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DocumentValidationIcon,
  SchoolReportCardIcon,
  ContractsIcon,
  FileUploadIcon,
  UserCheck01Icon,
  UserMinus01Icon,
  Alert01Icon,
} from "@hugeicons/core-free-icons";

// API
import { useGetStudentStakeholderMetricsQuery } from "@/services/stakeholders/stakeholders";
import { useGetAllAttendanceQuery } from "@/services/attendance/attendance";

export default function StudentsPage() {
  const router = useRouter();
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const { data: studentStakeholderMetrics, isLoading } =
    useGetStudentStakeholderMetricsQuery();
  const { data: attendanceData } = useGetAllAttendanceQuery();

  console.log("Attendance Data:", attendanceData);

  const metrics = useMemo(
    () => ({
      total: studentStakeholderMetrics?.metrics?.totalStudents ?? 0,
      enrolled: studentStakeholderMetrics?.metrics?.enrolled ?? 0,
      genderRatio: studentStakeholderMetrics?.metrics?.genderRatio ?? {
        totalMale: 0,
        totalFemale: 0,
      },
    }),
    [studentStakeholderMetrics],
  );

  // Quick Actions Configuration
  interface QuickAction {
    title: string;
    description: string;
    icon: any;
    onClick: () => void;
  }

  const quickActions: QuickAction[] = [
    {
      title: "Manage All Students",
      description: "Complete database table of all students.",
      icon: DocumentValidationIcon,
      onClick: () => router.push("/admin/students/all"),
    },
    {
      title: "Attendance Tracking",
      description: "Daily/weekly attendance reports.",
      icon: ContractsIcon,
      onClick: () => router.push("/admin/students/attendance-tracking"),
    },
    {
      title: "Generate Report Card",
      description: "Key academic function for term-end work.",
      icon: SchoolReportCardIcon,
      onClick: () => setIsReportModalOpen(true),
    },
  ];

  // Recent Activities Configuration
  interface StudentActivity {
    type: "withdrawn" | "registered" | "attendance" | "grade";
    title: string;
    description: string;
    timestamp: string;
    icon: any;
  }

  const recentActivities: StudentActivity[] = [
    {
      type: "withdrawn",
      title: "Student Withdrawn",
      description:
        "Kemi Adekunle (JS 1) was withdrawn from the school on Oct. 22",
      timestamp: "Oct. 22, 10:00 AM",
      icon: UserMinus01Icon,
    },
    {
      type: "registered",
      title: "Newly Registered",
      description:
        "Student Funke Ojo (JSS1) successfully completed enrollment payment.",
      timestamp: "Oct. 21, 9:32 AM",
      icon: UserCheck01Icon,
    },
    {
      type: "attendance",
      title: "New Attendance Flag",
      description:
        "Taiwo Musa (SS2) marked Unexcused Absent for the third consecutive day.",
      timestamp: "8:15 AM",
      icon: Alert01Icon,
    },
    {
      type: "grade",
      title: "Grade Change/Update",
      description:
        "Grade for Math Test 2 for All SS2 Students was updated by Mr. Nnamdi.",
      timestamp: "8:15 AM",
      icon: FileUploadIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md mb-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Students Overview Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Manage Student Records (IEP, Grades, Class Assignment).
        </p>
      </div>

      {/* High-Level Enrollment Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Enrollment"
          value={metrics?.enrolled ?? 0}
          subtitle={`${metrics?.enrolled ?? 0} enrolled students`}
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="New Enrollment"
          value={metrics?.enrolled ?? 0}
          subtitle={`${metrics?.enrolled ?? 0} new enrolled students`}
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Students/Class Average"
          value="42"
          subtitle="Target: 35/Class"
          trend="up"
        />
        <MetricCard
          title="Gender Ratio"
          value={`F: ${metrics?.genderRatio?.totalFemale ?? 0} / M: ${metrics?.genderRatio?.totalMale ?? 0}`}
          subtitle={`${metrics?.genderRatio?.totalFemale ? Math.round((metrics?.genderRatio?.totalFemale / (metrics?.genderRatio?.totalFemale + metrics?.genderRatio?.totalMale || 1)) * 100) : 0}% Female / ${metrics?.genderRatio?.totalMale ? Math.round((metrics?.genderRatio?.totalMale / (metrics?.genderRatio?.totalFemale + metrics?.genderRatio?.totalMale || 1)) * 100) : 0}% Male`}
          trend="up"
        />
      </div>

      {/* Student Health & Risk Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Chronic Absences"
          value="35 Students"
          subtitle="+3% Up 5 from last week"
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Academic At-Risk"
          value="68 Students"
          subtitle="+5.4% of total with F in 2+ core subjects"
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Students Enrolled (Unpaid Fees)"
          value="12 Students"
          subtitle="Total amount of NGN500K outstanding"
          trend="up"
        />
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
                <ActivityItem
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
          <Card className="bg-background py-2">
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

      {/* Generate report Modal */}
      {isReportModalOpen && (
        <ReportGenerationModal
          isOpen={isReportModalOpen}
          onOpenChange={setIsReportModalOpen}
        />
      )}
    </div>
  );
}
