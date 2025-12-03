"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchoolFileNav } from "@/components/dashboard-pages/admin/students/components/school-file-nav";
import { ContactInformationView } from "@/components/dashboard-pages/admin/students/views/student-files/contact-information-view";
import { LogisticsInformationView } from "@/components/dashboard-pages/admin/students/views/student-files/logistics-information-view";
import { MedicalNotesView } from "@/components/dashboard-pages/admin/students/views/student-files/medical-notes-view";
import { LogActivityView } from "@/components/dashboard-pages/admin/students/views/student-files/log-activity-view";
import { ResetPasswordView } from "@/components/dashboard-pages/admin/students/views/student-files/reset-password-view";
import Image from "next/image";

type SectionId =
  | "contact"
  | "logistics"
  | "medical"
  | "activity"
  | "results"
  | "password";

export default function SchoolFilesPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeSection, setActiveSection] = useState<SectionId>("contact");

  // In a real app, fetch student data based on params.id
  const student = {
    name: "Chinedu Nwokodi",
    profilePicture: undefined, // Add profile picture URL if available
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "contact":
        return <ContactInformationView />;
      case "logistics":
        return <LogisticsInformationView />;
      case "medical":
        return <MedicalNotesView />;
      case "activity":
        return <LogActivityView />;
      case "password":
        return <ResetPasswordView />;
      case "results":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              View Students Result
            </h2>
            <p className="text-gray-600">
              Student results will be displayed here.
            </p>
          </div>
        );
      default:
        return <ContactInformationView />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-row items-center gap-6 bg-background rounded-md p-6">
        {/* Profile Picture Section */}
        <div className="flex items-start gap-6 mb-6">
          <div className="relative flex flex-col items-center gap-3">
            {student.profilePicture ? (
              <Image
                src={student.profilePicture}
                alt={student.name}
                width={120}
                height={120}
                className="rounded-full object-cover w-30 h-30"
              />
            ) : (
              <div className="w-30 h-30 rounded-md bg-gray-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-400">
                  {student.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute bottom-2">
              <input type="file" className="hidden" />
              <Button variant="outline" size="sm" className="w-full">
                Change photo
              </Button>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit {student.name}'s School File
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <SchoolFileNav
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderSectionContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
