"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { UpcomingQuizCard } from "@/components/dashboard-pages/student/assignments/upcoming-quiz-card";
import { NewGradeCard } from "@/components/dashboard-pages/student/assignments/new-grade-card";
import { TeacherFeedbackModal } from "@/components/dashboard-pages/student/assignments/teacher-feedback-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/general/huge-icon";
import { Search01Icon, FilterIcon } from "@hugeicons/core-free-icons";

interface Assignment {
  assignmentName: string;
  subject: string;
  totalMarks: string;
  dueDateTime: string;
  status: string;
  actionLabel: string;
}

const assignments: Assignment[] = [
  {
    assignmentName: "Algebra Review Quiz",
    subject: "Mathematics",
    totalMarks: "20 Marks",
    dueDateTime: "Nov. 17, 2025; 2:00 PM",
    status: "Pending Submission",
    actionLabel: "Start Quiz",
  },
  {
    assignmentName: "Solar System Project",
    subject: "Integrated Science",
    totalMarks: "40 Marks",
    dueDateTime: "Nov. 18, 2025; 8:30 AM",
    status: "Pending Submission",
    actionLabel: "Submit Assignment",
  },
  {
    assignmentName: "Essay: Cultural Impact",
    subject: "Arts & Crafts",
    totalMarks: "50 Marks",
    dueDateTime: "Nov. 20, 2025; 12:30 PM",
    status: "In Progress",
    actionLabel: "Continue to Upload",
  },
  {
    assignmentName: "Photosynthesis CA",
    subject: "Integrated Science",
    totalMarks: "15 Marks",
    dueDateTime: "Passed",
    status: "Graded (85%)",
    actionLabel: "View Feedback",
  },
  {
    assignmentName: "Water Cycle Report",
    subject: "Geography",
    totalMarks: "30 Marks",
    dueDateTime: "Passed",
    status: "Graded (80%)",
    actionLabel: "View Feedback",
  },
];

export default function AssignmentsPage() {
  const router = useRouter();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const handleViewFeedback = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFeedbackModalOpen(true);
  };

  const handleAcknowledge = () => {
    // Handle acknowledgment logic here
    console.log(
      "Feedback acknowledged for:",
      selectedAssignment?.assignmentName
    );
  };

  const columns: TableColumn<Assignment>[] = [
    {
      key: "assignmentName",
      title: "Assignment Name",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "subject",
      title: "Subject",
    },
    {
      key: "totalMarks",
      title: "Total Marks",
    },
    {
      key: "dueDateTime",
      title: "Due Date/Time",
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as string;
        const isGraded = status.includes("Graded");
        const isInProgress = status === "In Progress";
        const colorClass = isGraded
          ? "text-green-600"
          : isInProgress
          ? "text-blue-600"
          : "text-orange-600";
        return <span className={`text-sm ${colorClass}`}>{status}</span>;
      },
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        if (row.actionLabel === "View Feedback") {
          return (
            <Button
              variant="link"
              className="h-auto p-0 text-main-blue"
              onClick={() => handleViewFeedback(row)}
            >
              {row.actionLabel}
            </Button>
          );
        }
        return (
          <Button variant="link" className="h-auto p-0 text-main-blue">
            {row.actionLabel}
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
          Assignments & Quizzes Hub
        </h1>
        <p className="text-gray-600">
          This screen provides a complete, organized view of all pending,
          in-progress, and completed academic tasks for the student.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Assignments/Quizzes Due Today"
          value="3"
          trend="up"
        />
        <MetricCard
          title="Assignments/Quizzes Due Tomorrow"
          value="2"
          trend="up"
        />
        <MetricCard title="Overall Average Score" value="82%" trend="up" />
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UpcomingQuizCard onAction={() => router.push("assignments/1")} />
        <NewGradeCard
          assignmentName="Art & Culture Project Scored"
          grade="Grade: 88%"
          assignment={{
            assignmentName: "Art & Culture Project",
            subject: "Arts & Crafts",
            totalMarks: "50 Marks",
            dueDateTime: "Passed",
            status: "Graded (88%)",
            actionLabel: "View Feedback",
          }}
          onAction={(assignment) => {
            if (assignment) {
              setSelectedAssignment(assignment);
              setFeedbackModalOpen(true);
            }
          }}
        />
      </div>

      {/* Assignments & Quizzes Management Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Assignments & Quizzes Management Table
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Icon
                  icon={Search01Icon}
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="search"
                  placeholder="Text Input (e.g., Physics, Essay)"
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Icon icon={FilterIcon} size={18} />
                Filter: All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={assignments}
              showActionsColumn={false}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Feedback Modal */}
      {selectedAssignment && (
        <TeacherFeedbackModal
          open={feedbackModalOpen}
          onOpenChange={setFeedbackModalOpen}
          assignmentName={selectedAssignment.assignmentName}
          finalScore={
            selectedAssignment.status.includes("Graded")
              ? (() => {
                  const percentageMatch =
                    selectedAssignment.status.match(/\((\d+)%\)/);
                  const percentage = percentageMatch ? percentageMatch[1] : "0";
                  const totalMarks = selectedAssignment.totalMarks.replace(
                    " Marks",
                    ""
                  );
                  // Calculate score based on percentage
                  const score = Math.round(
                    (parseInt(percentage) / 100) * parseInt(totalMarks)
                  );
                  return `${score} / ${totalMarks} Marks`;
                })()
              : "N/A"
          }
          teacherFeedback="Rich Text display of specific comments from the teacher. Rich Text display of specific comments from the teacher. Rich Text display of specific comments from the teacher.Rich Text display of specific comments from the teacher."
          onAcknowledge={handleAcknowledge}
        />
      )}
    </div>
  );
}
