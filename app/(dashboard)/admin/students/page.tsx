"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { ActivityItem } from "@/components/dashboard-pages/admin/students/components/activity-item";
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

import {
  useGetStudentStakeholderMetricsQuery,
  useGetStudentMetricsQuery,
} from "@/services/stakeholders/stakeholders";
import { useGetAllAttendanceQuery } from "@/services/attendance/attendance";
import { selectUser } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks";

export default function StudentsPage() {
  const router = useRouter();
  const authUser = useAppSelector(selectUser);

  const { data: studentStakeholderMetrics, isLoading } =
    useGetStudentStakeholderMetricsQuery();
  const { data: studentMetricsResponse, isLoading: metricsLoading } =
    useGetStudentMetricsQuery();
  const { data: attendanceData } = useGetAllAttendanceQuery();

  const studentMetrics = studentMetricsResponse?.data;

  const metrics = useMemo(
    () => ({
      totalEnrollment: studentMetrics?.total_enrollment ?? 0,
      newEnrollment: studentMetrics?.new_enrollment ?? 0,
      studentToClassAverage: studentMetrics?.student_to_class_average ?? 0,
      genderRatio: {
        male: studentMetrics?.gender_ratio?.male ?? 0,
        female: studentMetrics?.gender_ratio?.female ?? 0,
        total: studentMetrics?.gender_ratio?.total ?? 0,
      },
      absences: {
        studentsWithAbsences:
          studentMetrics?.absences?.students_with_absences ?? 0,
        periodDays: studentMetrics?.absences?.period_days ?? 30,
      },
      academicAtRisk: {
        count: studentMetrics?.academic_at_risk?.count ?? 0,
        threshold: studentMetrics?.academic_at_risk?.threshold ?? 50.0,
        session: studentMetrics?.academic_at_risk?.session ?? "",
      },
      unpaidFees: {
        studentsCount: studentMetrics?.unpaid_fees?.students_count ?? 0,
        totalAmount: studentMetrics?.unpaid_fees?.total_amount ?? 0,
        percentage: studentMetrics?.unpaid_fees?.percentage ?? 0,
      },
      total:
        studentStakeholderMetrics?.metrics?.totalStudents ??
        studentMetrics?.total_enrollment ??
        0,
      enrolled:
        studentStakeholderMetrics?.metrics?.enrolled ??
        studentMetrics?.total_enrollment ??
        0,
    }),
    [studentMetrics, studentStakeholderMetrics],
  );

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
      onClick: () => router.push("/admin/students/report-generation"),
    },
  ];

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
      <div className="bg-background rounded-md mb-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Students Overview Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Manage Student Records (IEP, Grades, Class Assignment).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Enrollment"
          value={
            isLoading || metricsLoading
              ? "..."
              : (metrics?.totalEnrollment ?? 0)
          }
          subtitle={
            isLoading || metricsLoading
              ? "Loading..."
              : `${metrics?.totalEnrollment ?? 0} enrolled students`
          }
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="New Enrollment"
          value={
            isLoading || metricsLoading ? "..." : (metrics?.newEnrollment ?? 0)
          }
          subtitle={
            isLoading || metricsLoading
              ? "Loading..."
              : `${metrics?.newEnrollment ?? 0} new students (last 30 days)`
          }
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Students/Class Average"
          value={
            isLoading || metricsLoading
              ? "..."
              : (metrics?.studentToClassAverage?.toFixed(1) ?? "0.0")
          }
          subtitle={
            isLoading || metricsLoading
              ? "Loading..."
              : "Average students per class"
          }
          trend="up"
        />
        <MetricCard
          title="Gender Ratio"
          value={
            isLoading || metricsLoading
              ? "..."
              : `F: ${metrics?.genderRatio?.female ?? 0} / M: ${metrics?.genderRatio?.male ?? 0}`
          }
          subtitle={
            isLoading || metricsLoading
              ? "Loading..."
              : metrics?.genderRatio?.total > 0
                ? `${Math.round((metrics.genderRatio.female / metrics.genderRatio.total) * 100)}% Female / ${Math.round((metrics.genderRatio.male / metrics.genderRatio.total) * 100)}% Male`
                : "No data available"
          }
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Chronic Absences"
          value={
            isLoading || metricsLoading
              ? "..."
              : `${metrics?.absences?.studentsWithAbsences ?? 0} Students`
          }
          subtitle={
            isLoading || metricsLoading
              ? "Loading..."
              : `Students with absences in last ${metrics?.absences?.periodDays ?? 30} days`
          }
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Academic At-Risk"
          value={
            isLoading || metricsLoading
              ? "..."
              : `${metrics?.academicAtRisk?.count ?? 0} Students`
          }
          subtitle={
            isLoading || metricsLoading
              ? "Loading..."
              : `Average score below ${metrics?.academicAtRisk?.threshold ?? 50}% (Session: ${metrics?.academicAtRisk?.session ?? "N/A"})`
          }
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Students Enrolled (Unpaid Fees)"
          value={
            isLoading || metricsLoading
              ? "..."
              : `${metrics?.unpaidFees?.studentsCount ?? 0} Students`
          }
          subtitle={
            isLoading || metricsLoading
              ? "Loading..."
              : `Total: ₦${(metrics?.unpaidFees?.totalAmount ?? 0).toLocaleString("en-NG")} (${metrics?.unpaidFees?.percentage ?? 0}%)`
          }
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
