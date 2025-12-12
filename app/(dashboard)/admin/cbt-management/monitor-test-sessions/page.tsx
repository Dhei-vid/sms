"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MonitorLiveTestSessionModal } from "@/components/dashboard-pages/admin/cbt-management/components/monitor-live-test-session-modal";
import { ScriptReviewModal } from "@/components/dashboard-pages/admin/cbt-management/components/script-review-modal";

interface LiveTestSession {
  id: string;
  examTitle: string;
  class: string;
  invigilator: string;
  startTime: Date;
  timeRemaining: string;
  totalStudents: number;
  activeStudents: number;
  submittedStudents: number;
  status: "in-progress" | "completed" | "scheduled";
}

const liveTestSessions: LiveTestSession[] = [
  {
    id: "1",
    examTitle: "JSS 3 Arts & Crafts CBT Examination",
    class: "JSS 3",
    invigilator: "Ms. Zara A.",
    startTime: new Date(2025, 10, 7, 10, 0),
    timeRemaining: "00:45:30",
    totalStudents: 43,
    activeStudents: 42,
    submittedStudents: 1,
    status: "in-progress",
  },
  {
    id: "2",
    examTitle: "SS2 Chemistry Mid-Term",
    class: "SS 2",
    invigilator: "Mr. Adebayo K.",
    startTime: new Date(2025, 10, 7, 9, 30),
    timeRemaining: "01:15:00",
    totalStudents: 38,
    activeStudents: 35,
    submittedStudents: 3,
    status: "in-progress",
  },
  {
    id: "3",
    examTitle: "JSS1 Computer Science Quiz",
    class: "JSS 1",
    invigilator: "Ms. Fatima B.",
    startTime: new Date(2025, 10, 7, 11, 0),
    timeRemaining: "00:00:00",
    totalStudents: 45,
    activeStudents: 0,
    submittedStudents: 45,
    status: "completed",
  },
];

const mockStudents = [
  {
    id: "1",
    fullName: "Chinedu Nwokodi",
    schoolId: "nwokodi.m178023",
    examStartTime: "10:00 AM",
    timeElapsed: "00:15:30",
    questionsAnswered: 25,
    totalQuestions: 50,
    status: "active" as const,
  },
  {
    id: "2",
    fullName: "Adebisi Deborah",
    schoolId: "adebisi.m178024",
    examStartTime: "10:00 AM",
    timeElapsed: "00:15:30",
    questionsAnswered: 32,
    totalQuestions: 50,
    status: "active" as const,
  },
  {
    id: "3",
    fullName: "Dauda Ahfiz",
    schoolId: "ahfiz.m178025",
    examStartTime: "10:00 AM",
    timeElapsed: "00:15:30",
    questionsAnswered: 45,
    totalQuestions: 50,
    status: "active" as const,
  },
  {
    id: "4",
    fullName: "Sarah Collins",
    schoolId: "collins.m178026",
    examStartTime: "10:05 AM",
    timeElapsed: "00:10:00",
    questionsAnswered: 1,
    totalQuestions: 50,
    status: "active" as const,
  },
  {
    id: "5",
    fullName: "John Terjiri",
    schoolId: "terjiri.m178027",
    examStartTime: "10:05 AM",
    timeElapsed: "00:10:00",
    questionsAnswered: 17,
    totalQuestions: 50,
    status: "active" as const,
  },
  {
    id: "6",
    fullName: "Chinedu Nwokodi",
    schoolId: "nwokodi.m178023",
    examStartTime: "10:05 AM",
    timeElapsed: "00:10:00",
    questionsAnswered: 10,
    totalQuestions: 50,
    status: "active" as const,
  },
  {
    id: "7",
    fullName: "Adebisi Deborah",
    schoolId: "adebisi.m178024",
    examStartTime: "10:10 AM",
    timeElapsed: "00:05:00",
    questionsAnswered: 25,
    totalQuestions: 50,
    status: "active" as const,
  },
  {
    id: "8",
    fullName: "Dauda Ahfiz",
    schoolId: "ahfiz.m178025",
    examStartTime: "10:00 AM",
    timeElapsed: "00:15:30",
    questionsAnswered: 50,
    totalQuestions: 50,
    status: "submitted" as const,
  },
];

const getStatusColor = (status: LiveTestSession["status"]) => {
  switch (status) {
    case "in-progress":
      return "text-orange-600";
    case "completed":
      return "text-green-600";
    case "scheduled":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

const getStatusLabel = (status: LiveTestSession["status"]) => {
  switch (status) {
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "scheduled":
      return "Scheduled";
    default:
      return status;
  }
};

const statusFilterOptions = [
  { value: "all", label: "All Status" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "scheduled", label: "Scheduled" },
];

const mockQuestionResponses = [
  {
    id: "1",
    questionType: "Multiple Choice Single Answer (MCQ)",
    question:
      "In the traditional Yoruba art of fabric decoration, which method involves tying or stitching the fabric before dipping it into indigo dye to create patterns?",
    correctAnswer: "C Adire",
    studentResponse: "C Adire",
    scoreEarned: "1/1",
    isCorrect: true,
    topicTag: "Topic Tag 1: Nigerian Traditional Textiles: Tie-Dye (Adire)",
  },
  {
    id: "2",
    questionType: "Multiple Choice Single Answer (MCQ)",
    question: "What is the primary material used in traditional Adire making?",
    correctAnswer: "A Cotton fabric",
    studentResponse: "B Silk fabric",
    scoreEarned: "0/1",
    isCorrect: false,
    topicTag: "Topic Tag 1: Nigerian Traditional Textiles: Tie-Dye (Adire)",
  },
];

const mockStudentInfo = {
  id: "1",
  fullName: "Dauda Ahifz",
  schoolId: "ahifz.m178023",
  currentClass: "Senior Secondary 2 (SS2)",
  rawScore: 45,
  totalScore: 50,
};

export default function MonitorTestSessionsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [monitorModalOpen, setMonitorModalOpen] = useState(false);
  const [scriptReviewModalOpen, setScriptReviewModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<LiveTestSession | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const filteredSessions = liveTestSessions.filter((session) => {
    if (statusFilter === "all") return true;
    return session.status === statusFilter;
  });

  const columns: TableColumn<LiveTestSession>[] = [
    {
      key: "examTitle",
      title: "Subjects",
      className: "font-medium",
    },
    {
      key: "class",
      title: "Grade",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "activeStudents",
      title: "Attendance",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "invigilator",
      title: "Invigilator",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "timeRemaining",
      title: "Time Remaining",
      render: (value) => <span className={cn("text-sm")}>{value}</span>,
    },
  ];

  const actions: TableAction<LiveTestSession>[] = [
    {
      type: "button",
      config: {
        label: "Monitor Session",
        onClick: (row) => {
          if (row.status === "in-progress") {
            setSelectedSession(row);
            setMonitorModalOpen(true);
          }
        },
        variant: "link",
        disabled: (row) => row.status !== "in-progress",
        className: "text-main-blue underline underline-offset-3 h-auto",
      },
    },
  ];

  const handleReviewScript = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentQuestionIndex(0);
    setScriptReviewModalOpen(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestionResponses.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleLoadMore = () => {
    console.log("Load more students");
    // Handle load more
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Monitor Live Test Sessions
        </h2>
        <p className="text-gray-600 mt-1">
          This screen provides a real-time status of all students currently
          taking a specific Computer-Based test (CBT) exam.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Total Number of Exams Live"
          value={liveTestSessions
            .filter((s) => s.status === "in-progress")
            .length.toString()}
          trend="up"
        />
        <MetricCard
          title="Total Number of Students on System"
          value={liveTestSessions
            .filter((s) => s.status === "in-progress")
            .reduce((sum, s) => sum + s.activeStudents, 0)
            .toString()}
          trend="up"
        />
      </div>

      {/* Live Test Sessions Table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Live Test Sessions
          </CardTitle>
          <div className="flex gap-2">
            <SelectField
              value={statusFilter}
              onValueChange={setStatusFilter}
              placeholder="Status Filter"
            >
              {statusFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredSessions}
              actions={actions}
              emptyMessage="No live test sessions found."
              tableClassName="border-collapse"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Monitor Live Test Session Modal */}
      {selectedSession && (
        <MonitorLiveTestSessionModal
          open={monitorModalOpen}
          onOpenChange={setMonitorModalOpen}
          examTitle={selectedSession.examTitle}
          totalStudents={selectedSession.totalStudents}
          invigilator={selectedSession.invigilator}
          timeRemaining={selectedSession.timeRemaining}
          students={mockStudents}
          onReviewScript={handleReviewScript}
          onLoadMore={handleLoadMore}
          hasMore={true}
        />
      )}

      {/* Script Review Modal */}
      {selectedStudentId && (
        <ScriptReviewModal
          open={scriptReviewModalOpen}
          onOpenChange={setScriptReviewModalOpen}
          examTitle={
            selectedSession?.examTitle || "JSS 3 Arts & Crafts CBT Examination"
          }
          student={mockStudentInfo}
          questions={mockQuestionResponses}
          currentQuestionIndex={currentQuestionIndex}
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
}
