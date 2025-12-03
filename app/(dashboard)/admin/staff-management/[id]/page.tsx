"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StaffHeader } from "@/components/dashboard-pages/admin/staff/components/staff-header/staff-header";
import { StaffTabs } from "@/components/dashboard-pages/admin/staff/components/staff-tabs/staff-tabs";
import { PersonalDetailsView } from "@/components/dashboard-pages/admin/staff/views/personal-details-view";
import { AssignmentsScheduleView } from "@/components/dashboard-pages/admin/staff/views/assignments-schedule-view";
import { HRComplianceView } from "@/components/dashboard-pages/admin/staff/views/hr-compliance-view";
import { ActivityLogView } from "@/components/dashboard-pages/admin/staff/views/activity-log-view";

type TabId = "personal" | "assignments" | "hr" | "activity";

export default function StaffDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  // In a real app, fetch staff data based on params.id
  const staff = {
    name: "Mr. Chinedu Okafor",
    staffId: "okafor.T178023",
    role: "JS 2 Science Teacher",
    contractStatus: "Expires 2026-08-31",
    leaveBalance: 10,
    status: "active" as const,
    statusLabel: "Active",
    profilePicture:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg", // Add profile picture URL if available
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetailsView />;
      case "assignments":
        return <AssignmentsScheduleView />;
      case "hr":
        return <HRComplianceView />;
      case "activity":
        return <ActivityLogView />;
      default:
        return <PersonalDetailsView />;
    }
  };

  return (
    <div className="space-y-6">
      <StaffHeader
        name={staff.name}
        staffId={staff.staffId}
        role={staff.role}
        contractStatus={staff.contractStatus}
        leaveBalance={staff.leaveBalance}
        status={staff.status}
        statusLabel={staff.statusLabel}
        profilePicture={staff.profilePicture}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StaffTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderTabContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
