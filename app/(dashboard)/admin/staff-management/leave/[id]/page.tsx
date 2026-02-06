"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LeaveTabs } from "@/components/dashboard-pages/admin/staff/components/leave-tabs/leave-tabs";
import { RequestSnapshotView } from "@/components/dashboard-pages/admin/staff/views/leave/request-snapshot-view";
import { RequestDetailsView } from "@/components/dashboard-pages/admin/staff/views/leave/request-details-view";
import { PolicyCheckView } from "@/components/dashboard-pages/admin/staff/views/leave/policy-check-view";

type TabId = "snapshot" | "details" | "policy";

export default function LeaveDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<TabId>("snapshot");

  // In a real app, fetch leave request data based on params.id
  const leaveRequest = {
    staffName: "Mr. Chinedu Okafor",
    leaveType: "Annual Leave",
    dateRange: "November 15, 2025 - November 20, 2025",
    status: "PENDING APPROVAL",
    reason: "Attending family engagement ceremony in my home state.",
    requestedSubstitute: "Mr. Sola Adeniyi (JS3 History Teacher)",
    supportingDocument: "View Attached Flight Itinerary.PDF",
  };

  const handleApprove = () => {
    // Handle approve action
    console.log("Approve leave request");
    // Could show confirmation modal, update status, etc.
  };

  const handleDeny = () => {
    // Handle deny action
    console.log("Deny leave request");
    // Could show confirmation modal, update status, etc.
  };

  const handleViewDocument = () => {
    // Handle view document action
    console.log("View supporting document");
    // Could open document viewer, download, etc.
  };

  const handleAssignCoverage = () => {
    // Handle assign coverage action
    console.log("Assign coverage");
    // Could open modal to assign coverage, etc.
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "snapshot":
        return (
          <RequestSnapshotView
            staffName={leaveRequest.staffName}
            leaveType={leaveRequest.leaveType}
            dateRange={leaveRequest.dateRange}
            status={leaveRequest.status}
            onApprove={handleApprove}
            onDeny={handleDeny}
          />
        );
      case "details":
        return (
          <RequestDetailsView
            reason={leaveRequest.reason}
            requestedSubstitute={leaveRequest.requestedSubstitute}
            supportingDocument={leaveRequest.supportingDocument}
            onViewDocument={handleViewDocument}
          />
        );
      case "policy":
        return <PolicyCheckView onAssignCoverage={handleAssignCoverage} />;
      default:
        return (
          <RequestSnapshotView
            staffName={leaveRequest.staffName}
            leaveType={leaveRequest.leaveType}
            dateRange={leaveRequest.dateRange}
            status={leaveRequest.status}
            onApprove={handleApprove}
            onDeny={handleDeny}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Leave Request Details: {leaveRequest.staffName}
        </h2>
        <p className="text-gray-600 mt-1">All necessary context for approval</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <LeaveTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderTabContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
