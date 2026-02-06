"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicantHeader } from "@/components/dashboard-pages/admin/staff/components/applicant-header/applicant-header";
import { ApplicantTabs } from "@/components/dashboard-pages/admin/staff/components/applicant-tabs/applicant-tabs";
import { ApplicationDetailsView } from "@/components/dashboard-pages/admin/staff/views/applicant/application-details-view";
import { ApplicationDocumentsView } from "@/components/dashboard-pages/admin/staff/views/applicant/application-documents-view";
import { InterviewAssessmentView } from "@/components/dashboard-pages/admin/staff/views/applicant/interview-assessment-view";
import {
  RecordAssessmentModal,
  AssessmentData,
} from "@/components/dashboard-pages/admin/staff/components/record-assessment-modal/record-assessment-modal";
import {
  AssignmentsIcon,
  MailOpenIcon,
  CancelCircleIcon,
} from "@hugeicons/core-free-icons";

/**
 * Interface for assessment display in the interview view
 * Matches the structure expected by InterviewAssessmentView component
 */
interface Assessment {
  assessment: string;
  interviewer: string;
  date: string;
  rating: string;
  note: string;
}
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";

type TabId = "details" | "documents" | "interview";

/**
 * Applicant Detail Page Component
 * Displays detailed information about a job applicant
 * Handles dynamic route params which may be a Promise in Next.js 15+
 *
 * @param params - Route parameters containing applicant ID
 */
export default function ApplicantDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("details");
  const [isRecordAssessmentOpen, setIsRecordAssessmentOpen] = useState(false);
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  // In a real app, fetch applicant data based on params.id
  const applicant = {
    name: "Ms. Elizabeth Johnson",
    role: "JSS Science Teacher",
    status: "Interview Scheduled",
    interviewDate: "October 30, 2025",
    profilePicture:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    compositeScore: "4.5/5.0",
    experience: "5 Years",
    lastActivity: "Nil",
    salaryExpectation: "₦2.2M - ₦2.5M/Year",
    jobAppliedFor: "JSS Science Teacher",
    dateApplied: "October 1, 2025",
    currentAddress: "45 Unity Crescent, Garki, Abuja",
    primaryPhone: "+234 809 123 4567",
    primaryEmail: "elizabeth.johnson@example.com",
    qualifications: "M.Sc. Chemistry, B.Ed. Science Education",
    documents: [
      {
        type: "Curriculum Vitae (CV)",
        fileName: "Elizabeth.Johnson.CV.pdf",
      },
      {
        type: "Cover Letter",
        fileName: "Elizabeth.Johnson.Cover Letter.pdf",
      },
      {
        type: "Academic Transcript",
        fileName: "Elizabeth.Johnson.Academic Transcript.pdf",
      },
    ],
  };

  /**
   * Handle recording a new assessment
   * Converts AssessmentData from modal to Assessment format for display
   *
   * @param data - Assessment data from the record assessment modal
   */
  const handleRecordAssessment = (data: AssessmentData) => {
    // Convert AssessmentData to Assessment format
    const newAssessment: Assessment = {
      assessment: data.assessmentType,
      interviewer: data.interviewer,
      date: new Date().toLocaleDateString(),
      rating: data.rating,
      note: data.note,
    };
    setAssessments([...assessments, newAssessment]);
  };

  const handleSendOfferEmail = () => {
    console.log("Send offer email");
    // Implement email sending logic
  };

  const handleRejectCandidate = () => {
    console.log("Reject candidate");
    // Implement rejection logic
  };

  const handleViewDocument = (fileName: string) => {
    console.log("View document:", fileName);
    // Implement document viewing logic
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <ApplicationDetailsView
            jobAppliedFor={applicant.jobAppliedFor}
            dateApplied={applicant.dateApplied}
            currentAddress={applicant.currentAddress}
            primaryPhone={applicant.primaryPhone}
            primaryEmail={applicant.primaryEmail}
            qualifications={applicant.qualifications}
          />
        );
      case "documents":
        return (
          <ApplicationDocumentsView
            documents={applicant.documents}
            onViewDocument={handleViewDocument}
          />
        );
      case "interview":
        return (
          <InterviewAssessmentView
            assessments={assessments}
            onRecordAssessment={() => setIsRecordAssessmentOpen(true)}
          />
        );
      default:
        return (
          <ApplicationDetailsView
            jobAppliedFor={applicant.jobAppliedFor}
            dateApplied={applicant.dateApplied}
            currentAddress={applicant.currentAddress}
            primaryPhone={applicant.primaryPhone}
            primaryEmail={applicant.primaryEmail}
            qualifications={applicant.qualifications}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Applicant Header */}
      <ApplicantHeader
        name={applicant.name}
        role={applicant.role}
        status={applicant.status}
        interviewDate={applicant.interviewDate}
        profilePicture={applicant.profilePicture}
      />

      {/* Summary Cards and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          <MetricCard
            title="Composite Score"
            value={applicant.compositeScore}
            trend={"up"}
            trendColor={"text-main-blue"}
          />
          <MetricCard
            title="Experience"
            value={applicant.experience}
            trend={"up"}
            trendColor={"text-main-blue"}
          />
          <MetricCard
            title="Last Activity"
            value={applicant.lastActivity}
            trend={"up"}
            trendColor={"text-main-blue"}
          />
          <MetricCard
            title="Salary Expectation"
            value={applicant.salaryExpectation}
            trend={"up"}
            trendColor={"text-main-blue"}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Actions</CardTitle>
          </CardHeader>
          <CardContent className="px-1">
            <div className="space-y-0">
              <QuickActionCard
                title="Record Assessment"
                icon={AssignmentsIcon}
                onClick={() => setIsRecordAssessmentOpen(true)}
              />

              <QuickActionCard
                title={"Send Offer Email"}
                icon={MailOpenIcon}
                onClick={handleSendOfferEmail}
              />

              <QuickActionCard
                title="Reject Candidate"
                icon={CancelCircleIcon}
                onClick={handleRejectCandidate}
                textColor={"text-red-600"}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-3">
              <ApplicantTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-4">{renderTabContent()}</CardContent>
          </Card>
        </div>
      </div>

      {/* Record Assessment Modal */}
      <RecordAssessmentModal
        open={isRecordAssessmentOpen}
        onOpenChange={setIsRecordAssessmentOpen}
        candidateName={applicant.name}
        role={applicant.role}
        onRecord={handleRecordAssessment}
      />
    </div>
  );
}
