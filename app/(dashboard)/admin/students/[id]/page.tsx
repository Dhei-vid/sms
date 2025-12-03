"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StudentHeader } from "@/components/dashboard-pages/admin/students/components/student-header";
import { StudentTabs } from "@/components/dashboard-pages/admin/students/components/student-tabs";
import { PersonalDetailsView } from "@/components/dashboard-pages/admin/students/views/student/personal-details-view";
import { AcademicOverviewView } from "@/components/dashboard-pages/admin/students/views/student/academic-overview-view";
import { DocumentsView } from "@/components/dashboard-pages/admin/students/views/student/documents-view";
import { ReviewersNotesView } from "@/components/dashboard-pages/admin/students/views/student/reviewers-notes-view";

type TabId = "personal" | "academic" | "documents" | "notes";

export default function StudentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  // In a real app, fetch student data based on params.id
  const student = {
    name: "Chinedu Nwokodi",
    studentId: "nwokodi.m178023",
    currentClass: "Junior Secondary 2 (JS2)",
    status: "active" as const,
    statusLabel: "Active",
    profilePicture:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg", // Add profile picture URL if available
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetailsView />;
      case "academic":
        return <AcademicOverviewView />;
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
      <StudentHeader
        name={student.name}
        studentId={student.studentId}
        currentClass={student.currentClass}
        status={student.status}
        statusLabel={student.statusLabel}
        profilePicture={student.profilePicture}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StudentTabs activeTab={activeTab} onTabChange={setActiveTab} />
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
