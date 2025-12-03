"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ApplicantHeader } from "@/components/dashboard-pages/admin/admissions/components/applicant-header";
import { ApplicantTabs } from "@/components/dashboard-pages/admin/admissions/components/applicant-tabs";
import { PersonalDetailsView } from "@/components/dashboard-pages/admin/admissions/views/personal-details-view";
import { AcademicHistoryView } from "@/components/dashboard-pages/admin/admissions/views/academic-history-view";
import { DocumentsView } from "@/components/dashboard-pages/admin/admissions/views/documents-view";
import { ReviewersNotesView } from "@/components/dashboard-pages/admin/admissions/views/reviewers-notes-view";

type TabId = "personal" | "academic" | "documents" | "notes";

export default function ApplicantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  // In a real app, fetch applicant data based on params.id
  const applicant = {
    name: "Chinedu Nwokodi",
    status: "new" as const,
    statusLabel: "New Applicant",
    applicationId: "nwokodi.m178023",
    classApplyingFor: "Junior Secondary 1 (JS1)",
    dateSubmitted: "October 15, 2025",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetailsView />;
      case "academic":
        return <AcademicHistoryView />;
      case "documents":
        return <DocumentsView />;
      case "notes":
        return <ReviewersNotesView />;
      default:
        return <PersonalDetailsView />;
    }
  };

  return (
    <div className="space-y-6">
      <ApplicantHeader
        name={applicant.name}
        status={applicant.status}
        statusLabel={applicant.statusLabel}
        applicationId={applicant.applicationId}
        classApplyingFor={applicant.classApplyingFor}
        dateSubmitted={applicant.dateSubmitted}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <ApplicantTabs activeTab={activeTab} onTabChange={setActiveTab} />
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
