"use client";

import { useState } from "react";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { DetailedGradeViewModal } from "@/components/dashboard-pages/student/my-grades/detailed-grade-view-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

interface SubjectPerformance {
  subject: string;
  assignedTeacher: string;
  termAverageScore: string;
  latestGrade: string;
}

interface ReportCard {
  documentName: string;
  academicPeriod: string;
  status: string;
}

const subjectPerformances: SubjectPerformance[] = [
  {
    subject: "English Language",
    assignedTeacher: "Mr. Femi T.",
    termAverageScore: "88%",
    latestGrade: "92% (Quiz 4)",
  },
  {
    subject: "Mathematics",
    assignedTeacher: "Ms. Zara A.",
    termAverageScore: "95%",
    latestGrade: "92% (Quiz 4)",
  },
  {
    subject: "Arts & Culture",
    assignedTeacher: "Mr. D. Edeh",
    termAverageScore: "78%",
    latestGrade: "85% (CA 2)",
  },
  {
    subject: "History",
    assignedTeacher: "Ms. Sarah D.",
    termAverageScore: "82%",
    latestGrade: "92% (Quiz 4)",
  },
  {
    subject: "Integrated Science",
    assignedTeacher: "Mr. Femi T.",
    termAverageScore: "55%",
    latestGrade: "85% (CA 2)",
  },
];

const reportCards: ReportCard[] = [
  {
    documentName: "Term 1 Report Card",
    academicPeriod: "2025/2026 Term 1",
    status: "Finalized",
  },
  {
    documentName: "Term 3 Report Card",
    academicPeriod: "2024/2025 Term 3",
    status: "Finalized",
  },
];

export default function GradesReportCardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleViewDetails = (subject: string) => {
    setSelectedSubject(subject);
    setModalOpen(true);
  };

  const handleDownloadPDF = (reportCard: ReportCard) => {
    // Handle download logic
    console.log("Download PDF for:", reportCard.documentName);
  };

  const subjectColumns: TableColumn<SubjectPerformance>[] = [
    {
      key: "subject",
      title: "Subjects",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "assignedTeacher",
      title: "Assigned Teacher",
    },
    {
      key: "termAverageScore",
      title: "Term Average Score",
    },
    {
      key: "latestGrade",
      title: "Latest Grade",
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        return (
          <Button
            variant="link"
            className="h-auto p-0 text-main-blue"
            onClick={() => handleViewDetails(row.subject)}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  const reportCardColumns: TableColumn<ReportCard>[] = [
    {
      key: "documentName",
      title: "Document Name",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "academicPeriod",
      title: "Academic Period",
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as string;
        return (
          <span className="text-sm font-medium text-green-600">{status}</span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        return (
          <Button
            variant="link"
            className="h-auto p-0 text-main-blue"
            onClick={() => handleDownloadPDF(row)}
          >
            Download PDF
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Grades & Report Card Overview
        </h1>
        <p className="text-gray-600">
          This screen provides parents with a consolidated view of their
          child&apos;s academic performance, current standing, and access to all
          official reports.
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Current Term Performance" value="88.5%" trend="up" />
        <MetricCard title="Attendance Rate (Term)" value="94%" trend="up" />
        <MetricCard
          title="Lowest Term Performance"
          value="Int. Sci.: 55%"
          trend="up"
        />
      </div>

      {/* Subject-Specific Current Averages */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
              Subject-Specific Current Averages
            </CardTitle>
            <p className="text-sm text-gray-600">
              This simplified table shows the running average for each subject,
              allowing the parent to track progress week-to-week without waiting
              for the official report card.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={subjectColumns}
              data={subjectPerformances}
              showActionsColumn={false}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Official Report Card Access */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
              Official Report Card Access
            </CardTitle>
            <p className="text-sm text-gray-600">
              This table serves as the archive for all finalized, official
              report cards, which are typically generated at the end of a term
              or year.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={reportCardColumns}
              data={reportCards}
              showActionsColumn={false}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Grade View Modal */}
      {selectedSubject && (
        <DetailedGradeViewModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          subject={selectedSubject}
        />
      )}
    </div>
  );
}
