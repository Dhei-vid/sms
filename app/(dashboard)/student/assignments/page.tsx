"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
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
import { useGetAssignmentsQuery } from "@/services/shared";
import { useGetGradesQuery } from "@/services/shared";
import { format, isAfter, isPast, parseISO } from "date-fns";
import type { Assignment } from "@/services/assignments/assignments-type";
import type { Grade } from "@/services/grades/grades-type";

/** Row type for the assignments table (assignment + computed fields, all string/number where needed). */
type AssignmentRow = Assignment & {
  assignmentName: string;
  subject: string;
  totalMarks: string;
  dueDateTime: string;
  status: string;
  actionLabel: string;
  grade?: Grade;
  maxScore?: number;
};

export default function AssignmentsPage() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const { data: assignmentsData, isLoading: assignmentsLoading } =
    useGetAssignmentsQuery(user?.id ? { studentId: user.id } : undefined, {
      skip: !user?.id,
    });

  const { data: gradesData } = useGetGradesQuery(
    user?.id ? { studentId: user.id } : undefined,
    { skip: !user?.id },
  );

  const assignments = useMemo(() => {
    if (!assignmentsData?.data) return [];

    return assignmentsData.data
      .map((assignment) => {
        const grade = gradesData?.data?.find(
          (g) => g.assignmentId === assignment.id,
        );
        const isDueDatePassed = assignment.dueDate
          ? isPast(parseISO(assignment.dueDate))
          : false;
        const isGraded = !!grade && grade.score != null;

        let status = "Pending Submission";
        let actionLabel =
          assignment.type === "quiz" ? "Start Quiz" : "Submit Assignment";

        const maxScoreNum =
          typeof assignment.maxScore === "number"
            ? assignment.maxScore
            : Number(assignment.maxScore);
        if (isGraded && grade?.score != null && maxScoreNum > 0) {
          const percentage = Math.round(
            (Number(grade.score) / maxScoreNum) * 100,
          );
          status = `Graded (${percentage}%)`;
          actionLabel = "View Feedback";
        } else if (isDueDatePassed) {
          status = "Overdue";
        }

        return {
          ...assignment,
          assignmentName: assignment.title ?? "Untitled",
          subject:
            typeof assignment.courseName === "string"
              ? assignment.courseName
              : "N/A",
          totalMarks:
            maxScoreNum > 0 ? `${maxScoreNum} Marks` : "N/A",
          dueDateTime: assignment.dueDate
            ? format(parseISO(assignment.dueDate), "MMM d, yyyy; h:mm a")
            : "N/A",
          status,
          actionLabel,
          grade,
          maxScore: maxScoreNum > 0 ? maxScoreNum : undefined,
        };
      })
      .filter((assignment) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        const title = String(assignment.title ?? "");
        const subject = String(assignment.subject ?? "");
        return (
          title.toLowerCase().includes(query) ||
          subject.toLowerCase().includes(query)
        );
      }) as AssignmentRow[];
  }, [assignmentsData, gradesData, searchQuery]);

  const upcomingAssignments = assignments.filter((assignment) => {
    if (!assignment.dueDate) return false;
    const dueDate = parseISO(assignment.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isPast(dueDate) && isAfter(dueDate, today);
  });

  const dueTodayCount = assignments.filter((assignment) => {
    if (!assignment.dueDate) return false;
    const dueDate = parseISO(assignment.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateOnly = new Date(dueDate);
    dueDateOnly.setHours(0, 0, 0, 0);
    return dueDateOnly.getTime() === today.getTime();
  }).length;

  const dueTomorrowCount = assignments.filter((assignment) => {
    if (!assignment.dueDate) return false;
    const dueDate = parseISO(assignment.dueDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const dueDateOnly = new Date(dueDate);
    dueDateOnly.setHours(0, 0, 0, 0);
    return dueDateOnly.getTime() === tomorrow.getTime();
  }).length;

  const gradedAssignments = assignments.filter((a) => a.grade);
  const averageScore =
    gradedAssignments.length > 0
      ? Math.round(
          gradedAssignments.reduce((sum, a) => {
            const score = a.grade?.score;
            const maxS = a.maxScore;
            if (score != null && typeof maxS === "number" && maxS > 0) {
              return sum + (Number(score) / maxS) * 100;
            }
            return sum;
          }, 0) / gradedAssignments.length,
        )
      : 0;

  const nextUpcomingQuiz = upcomingAssignments.find((a) => a.type === "quiz");

  const latestGraded = [...gradedAssignments].sort((a, b) => {
    const aAt = a.grade?.createdAt;
    const bAt = b.grade?.createdAt;
    const aStr = typeof aAt === "string" ? aAt : "";
    const bStr = typeof bAt === "string" ? bAt : "";
    if (!aStr || !bStr) return 0;
    return parseISO(bStr).getTime() - parseISO(aStr).getTime();
  })[0];

  const handleViewFeedback = (row: AssignmentRow) => {
    setSelectedAssignment(row);
    setFeedbackModalOpen(true);
  };

  const handleAcknowledge = () => {
    setFeedbackModalOpen(false);
  };

  const columns: TableColumn<AssignmentRow>[] = [
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
        const isOverdue = status === "Overdue";
        const colorClass = isGraded
          ? "text-green-600"
          : isInProgress
            ? "text-blue-600"
            : isOverdue
              ? "text-red-600"
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
          <Button
            variant="link"
            className="h-auto p-0 text-main-blue"
            onClick={() =>
              row.type === "quiz" && row.id
                ? router.push(`/student/assignments/${row.id}`)
                : undefined
            }
          >
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
          value={dueTodayCount.toString()}
          trend="up"
        />
        <MetricCard
          title="Assignments/Quizzes Due Tomorrow"
          value={dueTomorrowCount.toString()}
          trend="up"
        />
        <MetricCard
          title="Overall Average Score"
          value={`${averageScore}%`}
          trend="up"
        />
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nextUpcomingQuiz && (
          <UpcomingQuizCard
            onAction={() =>
              nextUpcomingQuiz.id &&
              router.push(`assignments/${nextUpcomingQuiz.id}`)
            }
          />
        )}
        {latestGraded && (
          <NewGradeCard
            assignmentName={`${latestGraded.title} Scored`}
            grade={
              latestGraded.grade &&
              latestGraded.grade.score != null &&
              typeof latestGraded.maxScore === "number" &&
              latestGraded.maxScore > 0
                ? `Grade: ${Math.round((Number(latestGraded.grade.score) / latestGraded.maxScore) * 100)}%`
                : "Grade: N/A"
            }
            assignment={latestGraded}
            onAction={() => {
              setSelectedAssignment(latestGraded);
              setFeedbackModalOpen(true);
            }}
          />
        )}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            {assignmentsLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading assignments...
              </div>
            ) : assignments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No assignments found
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={assignments}
                showActionsColumn={false}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Teacher Feedback Modal */}
      {selectedAssignment && (selectedAssignment as any).grade && (
        <TeacherFeedbackModal
          open={feedbackModalOpen}
          onOpenChange={setFeedbackModalOpen}
          assignmentName={
            (selectedAssignment as any).assignmentName ||
            selectedAssignment.title
          }
          finalScore={
            (selectedAssignment as any).grade &&
            (selectedAssignment as any).maxScore != null &&
            (selectedAssignment as any).grade?.score != null
              ? `${(selectedAssignment as any).grade.score} / ${(selectedAssignment as any).maxScore} Marks`
              : "N/A"
          }
          teacherFeedback={
            (selectedAssignment as any).grade?.remarks ||
            "No feedback available"
          }
          onAcknowledge={handleAcknowledge}
        />
      )}
    </div>
  );
}

