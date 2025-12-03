"use client";

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

export default function AdmissionsPage() {
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
            value="350"
            subtitle="+15% increase in marketing volume."
            trend="up"
            trendColor="text-green-600"
          />
          <MetricCard
            title="Application Started (Stage 2)"
            value="280"
            subtitle="80% Conversion rate from stage 1"
            trend="up"
          />
          <MetricCard
            title="Submitted Forms (Stage 3)"
            value="245"
            subtitle="+26.5% Forms under review"
            trend="up"
            trendColor="text-green-600"
          />
          <MetricCard
            title="Under Review (In-Process - Stage 4)"
            value="65"
            subtitle="4 Day Avg. Review Time"
            trend="up"
          />
          <MetricCard
            title="Accepted Offers (Stage 5)"
            value="180"
            subtitle="73% Acceptance rate from submitted"
            trend="up"
            trendColor="text-green-600"
          />
          <MetricCard
            title="Enrolled/Confirmed (Final stage)"
            value="155"
            subtitle="+84% Enrollment Rate from acceptance"
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
                <QuickActionCard
                  title="New Applications"
                  description="Review new applications."
                  icon={DocumentValidationIcon}
                  onClick={() => console.log("New Applications clicked")}
                />
                <Separator />
                <QuickActionCard
                  title="Pending Fees"
                  description="See applications awaiting enrollment payment."
                  icon={PendulumIcon}
                  onClick={() => console.log("Pending Fees clicked")}
                />
                <Separator />
                <QuickActionCard
                  title="Add New Applicant"
                  description="Manually add an applicant."
                  icon={UserAdd01Icon}
                  onClick={() => console.log("Add New Applicant clicked")}
                />
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
            <ApplicationTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
