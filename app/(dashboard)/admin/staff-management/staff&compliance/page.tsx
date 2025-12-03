"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ComplianceTabs } from "@/components/dashboard-pages/admin/staff/components/compliance-tabs/compliance-tabs";
import { EmploymentStatusForm } from "@/components/dashboard-pages/admin/staff/forms/employment-status-form";
import { ManageLeaveBalanceForm } from "@/components/dashboard-pages/admin/staff/forms/manage-leave-balance-form";

type TabId = "employment" | "leave";

export default function StatusCompliancePage() {
  const [activeTab, setActiveTab] = useState<TabId>("employment");

  const handleCancel = () => {
    // Handle cancel logic
    console.log("Cancel clicked");
  };

  const handleConfirm = () => {
    // Handle confirm/apply logic
    console.log("Confirm/Apply clicked");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "employment":
        return (
          <EmploymentStatusForm
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        );
      case "leave":
        return (
          <ManageLeaveBalanceForm
            onCancel={handleCancel}
            onApply={handleConfirm}
          />
        );
      default:
        return (
          <EmploymentStatusForm
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Status & Compliance
        </h2>
        <p className="text-gray-600 mt-1">
          Administrative actions that directly affect an employee's official
          status, availability, and adherence to HR policy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - Sub Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <ComplianceTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Form Content */}
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderTabContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
