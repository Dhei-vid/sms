"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ApplicantHeader } from "@/components/dashboard-pages/admin/admissions/components/applicant-header";
import { ApplicantTabs } from "@/components/dashboard-pages/admin/admissions/components/applicant-tabs";
import { PersonalDetailsView } from "@/components/dashboard-pages/admin/admissions/views/personal-details-view";
import { AcademicHistoryView } from "@/components/dashboard-pages/admin/admissions/views/academic-history-view";
import { DocumentsView } from "@/components/dashboard-pages/admin/admissions/views/documents-view";
import { ReviewersNotesView } from "@/components/dashboard-pages/admin/admissions/views/reviewers-notes-view";
import { initialApplications } from "@/components/dashboard-pages/admin/admissions/data/applications-data";

type TabId = "personal" | "academic" | "documents" | "notes";

export default function ApplicantDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [applicantId, setApplicantId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  // Handle params which might be a Promise in Next.js App Router
  useEffect(() => {
    const resolveParams = async () => {
      try {
        // Handle both sync and async params
        const resolvedParams = params instanceof Promise ? await params : params;
        const id = resolvedParams?.id;
        if (id) {
          setApplicantId(id);
        }
        setHasChecked(true);
      } catch (error) {
        console.error("Error resolving params:", error);
        setHasChecked(true);
      }
    };
    resolveParams();
  }, [params]);

  // Find applicant data based on params.id
  const applicant = useMemo(() => {
    if (!applicantId) return null;
    
    const found = initialApplications.find((app) => app.id === applicantId);
    if (!found) {
      return null;
    }
    return {
      name: found.name,
      status: found.status,
      statusLabel: found.statusLabel,
      applicationId: found.id,
      classApplyingFor: found.classApplyingFor,
      dateSubmitted: found.dateSubmitted,
    };
  }, [applicantId]);

  // Redirect if applicant not found (only after we've checked)
  useEffect(() => {
    if (hasChecked && applicantId && !applicant) {
      router.push("/admin/admissions");
    }
  }, [applicant, applicantId, hasChecked, router]);

  if (!hasChecked || !applicantId) {
    return <div>Loading...</div>;
  }

  if (!applicant) {
    return null; // Will redirect
  }

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
