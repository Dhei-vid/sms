"use client";

import { useState } from "react";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ScoreScriptModal } from "@/components/dashboard-pages/teacher/grade-entry-portal/score-script-modal";

interface SubmittedGrade {
  id: string;
  assessmentName: string;
  subject: string;
  totalSubmissions: number;
  totalMarks: number;
  verificationStatus: string;
}

// Sample data - in production, this would come from an API
const allSubmittedGrades: SubmittedGrade[] = [
  {
    id: "1",
    assessmentName: "Integrated Science Final Exam",
    subject: "Integrated Science",
    totalSubmissions: 45,
    totalMarks: 100,
    verificationStatus: "Approved by Exam Officer",
  },
  {
    id: "2",
    assessmentName: "CA 3: Acids & Bases",
    subject: "Introduction to Chemisty",
    totalSubmissions: 45,
    totalMarks: 25,
    verificationStatus: "Awaiting Processing",
  },
  {
    id: "3",
    assessmentName: "Mid-Term Project",
    subject: "Arts & Crafts",
    totalSubmissions: 45,
    totalMarks: 10,
    verificationStatus: "Approved by HOD",
  },
  {
    id: "4",
    assessmentName: "Unit 2 Quiz",
    subject: "History",
    totalSubmissions: 45,
    totalMarks: 40,
    verificationStatus: "Approved by Exam Officer",
  },
  {
    id: "5",
    assessmentName: "Integrated Science Final Exam",
    subject: "Integrated Science",
    totalSubmissions: 45,
    totalMarks: 100,
    verificationStatus: "Awaiting Processing",
  },
  {
    id: "6",
    assessmentName: "CA 3: Acids & Bases",
    subject: "Introduction to Chemisty",
    totalSubmissions: 45,
    totalMarks: 25,
    verificationStatus: "Approved by HOD",
  },
  {
    id: "7",
    assessmentName: "Mid-Term Project",
    subject: "Arts & Crafts",
    totalSubmissions: 45,
    totalMarks: 10,
    verificationStatus: "Approved by Exam Officer",
  },
  {
    id: "8",
    assessmentName: "Unit 2 Quiz",
    subject: "History",
    totalSubmissions: 45,
    totalMarks: 40,
    verificationStatus: "Approved by HOD",
  },
];

const getStatusColor = (status: string) => {
  if (status.includes("Approved")) {
    return "text-green-600";
  } else if (status.includes("Awaiting")) {
    return "text-orange-600";
  }
  return "text-gray-600";
};

export default function SubmittedGradesHistoryPage() {
  const [yearFilter, setYearFilter] = useState("2025-2026");
  const [termFilter, setTermFilter] = useState("first-term");
  const [classFilter, setClassFilter] = useState("jss3");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<
    string | null
  >(null);
  const [scoreScriptModalOpen, setScoreScriptModalOpen] = useState(false);

  // Pagination
  const {
    displayedData: submittedGrades,
    hasMore,
    loadMore,
  } = usePagination({
    data: allSubmittedGrades,
    initialItemsPerPage: 8,
    itemsPerPage: 8,
  });

  const columns: TableColumn<SubmittedGrade>[] = [
    {
      key: "assessmentName",
      title: "Assessment Name",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "subject",
      title: "Subject",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "totalSubmissions",
      title: "Total Submissions",
      render: (value) => (
        <span className="text-gray-700">{value as number}</span>
      ),
    },
    {
      key: "totalMarks",
      title: "Total Marks",
      render: (value) => (
        <span className="text-gray-700">{value as number}</span>
      ),
    },
    {
      key: "verificationStatus",
      title: "Verification Status",
      render: (value) => {
        const status = value as string;
        return (
          <span className={cn("text-sm font-medium", getStatusColor(status))}>
            {status}
          </span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        return (
          <button
            onClick={() => {
              setSelectedAssessmentId(row.id);
              setScoreScriptModalOpen(true);
            }}
            className="text-main-blue hover:underline"
          >
            View Script
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Submitted Grades History
        </h1>
        <p className="text-gray-600">
          This screen provides a read-only, archived log of all grade
          submissions.
        </p>
      </div>

      {/* Grading Task Table Section */}
      <div className="bg-background rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Grading Task Table
          </h2>
          <div className="flex items-center gap-3">
            {/* Year Filter */}
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">Year 2024/2025</SelectItem>
                <SelectItem value="2025-2026">Year 2025/2026</SelectItem>
                <SelectItem value="2026-2027">Year 2026/2027</SelectItem>
              </SelectContent>
            </Select>
            {/* Term Filter */}
            <Select value={termFilter} onValueChange={setTermFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first-term">First Term</SelectItem>
                <SelectItem value="second-term">Second Term</SelectItem>
                <SelectItem value="third-term">Third Term</SelectItem>
              </SelectContent>
            </Select>
            {/* Class Filter */}
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jss1">JSS 1</SelectItem>
                <SelectItem value="jss2">JSS 2</SelectItem>
                <SelectItem value="jss3">JSS 3</SelectItem>
                <SelectItem value="ss1">SS 1</SelectItem>
                <SelectItem value="ss2">SS 2</SelectItem>
                <SelectItem value="ss3">SS 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grading Task Table */}
        <div className="border rounded-lg overflow-hidden">
          <DataTable
            columns={columns}
            data={submittedGrades}
            showActionsColumn={false}
          />
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>

      {/* Score Script Modal */}
      <ScoreScriptModal
        open={scoreScriptModalOpen}
        onOpenChange={setScoreScriptModalOpen}
        assessmentId={selectedAssessmentId || undefined}
      />
    </div>
  );
}
