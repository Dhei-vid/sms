"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DatabaseLockedIcon,
  ComputerUserIcon,
  Calendar03Icon,
  PayByCheckIcon,
} from "@hugeicons/core-free-icons";
import { MonitorLiveTestSessionModal } from "@/components/dashboard-pages/admin/cbt-management/components/monitor-live-test-session-modal";
import { ScriptReviewModal } from "@/components/dashboard-pages/admin/cbt-management/components/script-review-modal";
import { DeploySchedulingModal } from "@/components/dashboard-pages/admin/cbt-management/components/schedule-deploy-test-modal";

interface RecentTestActivity {
  id: string;
  testName: string;
  dateTime: Date;
  status: "graded" | "scheduled" | "in-progress";
}

const recentTestActivity: RecentTestActivity[] = [
  {
    id: "1",
    testName: "SS2 Chemistry Mid-Term",
    dateTime: new Date(2025, 10, 7, 10, 45),
    status: "graded",
  },
  {
    id: "2",
    testName: "JSS1 Computer Science Quiz",
    dateTime: new Date(2025, 10, 7, 10, 45),
    status: "scheduled",
  },
  {
    id: "3",
    testName: "JSS 3 Arts & Crafts CBT Examination",
    dateTime: new Date(2025, 10, 7, 10, 0),
    status: "in-progress",
  },
];

const getStatusColor = (status: RecentTestActivity["status"]) => {
  switch (status) {
    case "graded":
      return "text-green-600";
    case "scheduled":
      return "text-blue-600";
    case "in-progress":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
};

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

export default function CBTManagementDashboardPage() {
  const router = useRouter();
  const [monitorModalOpen, setMonitorModalOpen] = useState(false);
  const [scriptReviewModalOpen, setScriptReviewModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedExamTitle, setSelectedExamTitle] = useState<string>("");

  const columns: TableColumn<RecentTestActivity>[] = [
    {
      key: "testName",
      title: "Test Name",
      className: "font-medium",
    },
    {
      key: "dateTime",
      title: "Date/Time",
      render: (value) => (
        <span className="text-sm">{format(value, "MMM. d, yyyy; h:mma")}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => (
        <span
          className={cn(
            "text-sm font-medium capitalize",
            getStatusColor(row.status),
          )}
        >
          {value}
        </span>
      ),
    },
  ];

  const actions: TableAction<RecentTestActivity>[] = [
    {
      type: "button",
      config: {
        label: "Monitor Session",
        onClick: (row) => {
          if (row.status === "in-progress") {
            setMonitorModalOpen(true);
          }
        },
        variant: "outline",
        disabled: (row) => row.status !== "in-progress",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          CBT Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This dashboard is the central control panel for administering,
          monitoring, and analyzing computer-based tests.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Active Exams Scheduled"
          value="5 Tests"
          subtitle="Number of tests currently scheduled"
          trend="up"
        />
        <MetricCard
          title="System Reliability Score"
          value="85%"
          subtitle="Tracks successful test sessions vs. technical failures"
          trend="up"
        />
        <MetricCard
          title="Questions in Database"
          value="4,580 Questions"
          subtitle="Measures the availability of the question bank"
          trend="up"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuickActionCard
            title="Create New CBT Exam"
            description="Leads to the test configuration workflow"
            icon={PayByCheckIcon}
            onClick={() => router.push("/admin/cbt-management/new-cbt-exam")}
            className="border-b"
          />
          <QuickActionCard
            title="Question Bank Management"
            description="Direct access to add, edit, or categorize questions"
            icon={DatabaseLockedIcon}
            onClick={() =>
              router.push("/admin/cbt-management/question-bank-management")
            }
            className="border-b"
          />
          <QuickActionCard
            title="Monitor Live Test Sessions"
            description="Links to the real-time proctoring view"
            icon={ComputerUserIcon}
            onClick={() =>
              router.push("/admin/cbt-management/monitor-test-sessions")
            }
            className="border-b"
          />
          <QuickActionCard
            title="Schedule & Deploy Test"
            description="The final step to set the date, time, and class for a test"
            icon={Calendar03Icon}
            onClick={() => setScheduleModalOpen(true)}
          />
        </CardContent>
      </Card>

      {/* Recent Test Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent Test Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={recentTestActivity}
              actions={actions}
              emptyMessage="No recent test activity."
              tableClassName="border-collapse"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Monitor Live Test Session Modal */}
      <MonitorLiveTestSessionModal
        open={monitorModalOpen}
        onOpenChange={setMonitorModalOpen}
        examTitle="JSS 3 Arts & Crafts CBT Examination"
        totalStudents={43}
        invigilator="Ms. Zara A."
        timeRemaining="00:45:30"
        students={mockStudents}
        onReviewScript={(studentId) => {
          setSelectedStudentId(studentId);
          setSelectedExamTitle("JSS 3 Arts & Crafts CBT Examination");
          setCurrentQuestionIndex(0);
          setScriptReviewModalOpen(true);
        }}
        onLoadMore={() => {
          console.log("Load more students");
          // Handle load more
        }}
        hasMore={true}
      />

      {/* Script Review Modal */}
      {selectedStudentId && (
        <ScriptReviewModal
          open={scriptReviewModalOpen}
          onOpenChange={setScriptReviewModalOpen}
          examTitle={selectedExamTitle}
          student={mockStudentInfo}
          questions={mockQuestionResponses}
          currentQuestionIndex={currentQuestionIndex}
          onPrevious={() => {
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex((prev) => prev - 1);
            }
          }}
          onNext={() => {
            if (currentQuestionIndex < mockQuestionResponses.length - 1) {
              setCurrentQuestionIndex((prev) => prev + 1);
            }
          }}
        />
      )}

      {/* Schedule & Deploy Test Modal */}
      {scheduleModalOpen && (
        <DeploySchedulingModal
          open={scheduleModalOpen}
          onOpenChange={setScheduleModalOpen}
          onScheduleAndActivate={({ exam, venue, invigilator }) => {
            console.log(
              "Scheduled Exam:",
              exam,
              "at Venue:",
              venue,
              "with Invigilator:",
              invigilator,
            );

            setScheduleModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
