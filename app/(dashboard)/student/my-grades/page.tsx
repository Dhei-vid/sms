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
  {
    subject: "Information Technology",
    assignedTeacher: "Ms. Zara A.",
    termAverageScore: "88%",
    latestGrade: "50% (Project)",
  },
  {
    subject: "Social Studies",
    assignedTeacher: "Mr. D. Edeh",
    termAverageScore: "95%",
    latestGrade: "92% (Quiz 4)",
  },
  {
    subject: "Physical Education",
    assignedTeacher: "Ms. Sarah D.",
    termAverageScore: "78%",
    latestGrade: "92% (Quiz 4)",
  },
  {
    subject: "Yoruba Language",
    assignedTeacher: "Ms. Sarah D.",
    termAverageScore: "82%",
    latestGrade: "85% (CA 2)",
  },
];

export default function MyGradesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleViewDetails = (subject: string) => {
    setSelectedSubject(subject);
    setModalOpen(true);
  };

  const columns: TableColumn<SubjectPerformance>[] = [
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

  return (
    <div className="space-y-4">
      {/* Page Title and Description */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          My Grades & Performance Tracking
        </h1>
        <p className="text-gray-600">
          This screen serves as the student&apos;s personalized academic record,
          showing current scores, historical data, and detailed teacher
          feedback.
        </p>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard title="Overall Average Score" value="82%" trend="up" />
        <MetricCard
          title="Lowest Subject Score"
          value="Integrated Science: 55%"
          trend="up"
        />
      </div>

      {/* Subject Performance Overview */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
              Subject Performance Overview
            </CardTitle>
            <p className="text-sm text-gray-600">
              This table gives the student a quick snapshot of their cumulative
              performance in each subject for the current term.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={subjectPerformances}
              showActionsColumn={false}
            />
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
