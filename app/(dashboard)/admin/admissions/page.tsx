"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { ApplicationTable } from "@/components/dashboard-pages/admin/admissions/components/application-table";
import { Separator } from "@/components/ui/separator";
import {
  DocumentValidationIcon,
  PendulumIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { useGetAdmissionsQuery } from "@/services/admissions/admissions";

export default function AdmissionsPage() {
  const router = useRouter();
  const { data: admissionsData, isLoading } = useGetAdmissionsQuery({ limit: 100 });
  
  const admissions = admissionsData?.data || [];
  
  // Transform admissions to match Application interface expected by ApplicationTable
  const applications = admissions.map((admission) => ({
    id: admission.id,
    name: admission.applicantName,
    classApplyingFor: admission.className || "N/A",
    dateSubmitted: admission.applicationDate ? new Date(admission.applicationDate).toLocaleDateString() : "N/A",
    timeSubmitted: admission.applicationDate ? new Date(admission.applicationDate).toLocaleTimeString() : "N/A",
    status: admission.status === "pending" ? "pending" as const : 
            admission.status === "approved" ? "accepted" as const :
            admission.status === "enrolled" ? "enrolled" as const :
            admission.status === "rejected" ? "rejected" as const : "pending" as const,
    statusLabel: admission.status === "pending" ? "Pending" :
                 admission.status === "approved" ? "Accepted" :
                 admission.status === "enrolled" ? "Enrolled" :
                 admission.status === "rejected" ? "Rejected" : "Pending",
  }));
  
  const [selectedApplications, setSelectedApplications] = useState(applications);

  const metrics = useMemo(() => {
    const inquiries = applications.filter((app) => !app.status || app.status === "pending").length;
    const started = applications.length;
    const submitted = applications.filter((app) => app.status === "pending").length;
    const underReview = applications.filter((app) => app.status === "pending").length;
    const accepted = applications.filter((app) => app.status === "accepted").length;
    const enrolled = applications.filter((app) => app.status === "enrolled").length;
    
    const conversionRate1 = started > 0 ? Math.round((started / (inquiries || 1)) * 100) : 0;
    const conversionRate2 = submitted > 0 ? Math.round((submitted / started) * 100) : 0;
    const acceptanceRate = submitted > 0 ? Math.round((accepted / submitted) * 100) : 0;
    const enrollmentRate = accepted > 0 ? Math.round((enrolled / accepted) * 100) : 0;
    
    return {
      inquiries,
      started,
      submitted,
      underReview,
      accepted,
      enrolled,
      conversionRate1,
      conversionRate2,
      acceptanceRate,
      enrollmentRate,
    };
  }, [applications]);

  interface QuickAction {
    title: string;
    description: string;
    icon: any;
    onClick: () => void;
  }

  const quickActions: QuickAction[] = [
    {
      title: "New Applications",
      description: "Review new applications.",
      icon: DocumentValidationIcon,
      onClick: () => router.push("admissions/add"),
    },
    {
      title: "Pending Fees",
      description: "See applications awaiting enrollment payment.",
      icon: PendulumIcon,
      onClick: () => console.log("Pending Fees clicked"),
    },
    {
      title: "Add New Applicant",
      description: "Manually add an applicant.",
      icon: UserAdd01Icon,
      onClick: () => router.push("admissions/add"),
    },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md mb-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Admissions & Enrollments
        </h2>
        <p className="text-gray-600 mt-1">
          Review inquiries/applications, and onboard new students
        </p>
      </div>

      {/* Key Metrics and Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Key Metrics Section */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Inquiries/Interest (Stage 1)"
            value={metrics.inquiries.toLocaleString()}
            subtitle={`${metrics.conversionRate1}% conversion rate`}
            trend="up"
            trendColor="text-green-600"
          />
          <MetricCard
            title="Application Started (Stage 2)"
            value={metrics.started.toLocaleString()}
            subtitle={`${metrics.conversionRate2}% Conversion rate from stage 1`}
            trend="up"
          />
          <MetricCard
            title="Submitted Forms (Stage 3)"
            value={metrics.submitted.toLocaleString()}
            subtitle="Forms under review"
            trend="up"
            trendColor="text-green-600"
          />
          <MetricCard
            title="Under Review (In-Process - Stage 4)"
            value={metrics.underReview.toLocaleString()}
            subtitle="Applications under review"
            trend="up"
          />
          <MetricCard
            title="Accepted Offers (Stage 5)"
            value={metrics.accepted.toLocaleString()}
            subtitle={`${metrics.acceptanceRate}% Acceptance rate from submitted`}
            trend="up"
            trendColor="text-green-600"
          />
          <MetricCard
            title="Enrolled/Confirmed (Final stage)"
            value={metrics.enrolled.toLocaleString()}
            subtitle={`${metrics.enrollmentRate}% Enrollment Rate from acceptance`}
            trend="up"
            trendColor="text-green-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="bg-background">
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

      {/* Application Management */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Application Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No applications found</div>
            ) : (
              <ApplicationTable
                applications={selectedApplications}
                onApplicationsChange={setSelectedApplications}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
