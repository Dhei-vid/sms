"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EditProfileHeader } from "@/components/dashboard-pages/admin/staff/components/edit-profile-header/edit-profile-header";
import { EditTabs } from "@/components/dashboard-pages/admin/staff/components/edit-tabs/edit-tabs";
import { ContactInformationForm } from "@/components/dashboard-pages/admin/staff/forms/contact-information-form";
import { EmploymentRoleForm } from "@/components/dashboard-pages/admin/staff/forms/employment-role-form";
import { SystemPermissionsForm } from "@/components/dashboard-pages/admin/staff/forms/system-permissions-form";
import { FinancialPayrollForm } from "@/components/dashboard-pages/admin/staff/forms/financial-payroll-form";

type TabId = "contact" | "employment" | "permissions" | "financial";

export default function EditStaffPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<TabId>("contact");
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg"
  );

  // In a real app, fetch staff data based on params.id
  const staff = {
    name: "Mr. Chinedu Okafor",
  };

  const handlePhotoChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving changes...");
    // In a real app, make API call to save changes
    // window.history.back();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "contact":
        return (
          <ContactInformationForm
            onCancel={handleCancel}
            onSave={handleSave}
          />
        );
      case "employment":
        return (
          <EmploymentRoleForm onCancel={handleCancel} onSave={handleSave} />
        );
      case "permissions":
        return (
          <SystemPermissionsForm onCancel={handleCancel} onSave={handleSave} />
        );
      case "financial":
        return (
          <FinancialPayrollForm onCancel={handleCancel} onSave={handleSave} />
        );
      default:
        return (
          <ContactInformationForm
            onCancel={handleCancel}
            onSave={handleSave}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <EditProfileHeader
        name={staff.name}
        profilePicture={profilePicture}
        onPhotoChange={handlePhotoChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <EditTabs activeTab={activeTab} onTabChange={setActiveTab} />
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

