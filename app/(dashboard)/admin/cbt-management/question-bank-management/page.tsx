"use client";

import { useState, useMemo } from "react";
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
import { cn } from "@/lib/utils";
import { QuestionReviewModal } from "@/components/dashboard-pages/admin/cbt-management/components/question-review-modal";
import { useGetCbtQuestionsQuery } from "@/services/cbt-questions/cbt-questions";
import type { CbtQuestion } from "@/services/cbt-questions/cbt-question-types";

interface QuestionListing {
  id: string;
  subject: string;
  topicsCovered: number;
  questionTypesCovered: string;
  submittedBy: string;
  status: "pending-approval" | "sent-back" | "approved" | "rejected";
}

function getQuestionsList(data: unknown): CbtQuestion[] {
  if (!data || typeof data !== "object") return [];
  const d = data as { data?: CbtQuestion[] | { data?: CbtQuestion[] } };
  if (Array.isArray(d.data)) return d.data;
  if (d.data && typeof d.data === "object" && Array.isArray((d.data as { data?: CbtQuestion[] }).data)) {
    return (d.data as { data: CbtQuestion[] }).data;
  }
  return [];
}

function mapApiQuestionToListing(q: CbtQuestion): QuestionListing {
  const status = (q.status?.toLowerCase() ?? "approved") as QuestionListing["status"];
  const normalizedStatus: QuestionListing["status"] =
    status === "pending" || status === "pending-approval"
      ? "pending-approval"
      : status === "sent-back"
        ? "sent-back"
        : status === "rejected"
          ? "rejected"
          : "approved";
  const submittedBy =
    q.creator?.first_name || q.creator?.last_name
      ? [q.creator.first_name, q.creator.last_name].filter(Boolean).join(" ")
      : q.creator?.email ?? "—";
  return {
    id: q.id,
    subject: q.subject ?? "—",
    topicsCovered: q.topic_covered ?? 0,
    questionTypesCovered: q.type ?? q.category ?? "—",
    submittedBy,
    status: normalizedStatus,
  };
}

function mapApiQuestionToModalQuestion(q: CbtQuestion): {
  id: string;
  questionType: string;
  question: string;
  answerOptions: { label: string; text: string; isCorrect: boolean }[];
  explanation: string;
  topicTag: string;
} {
  const options = q.answer_options ?? [];
  const correctIndex = q.correct_answer ?? 0;
  const answerOptions = options.map((text, i) => ({
    label: String.fromCharCode(65 + i),
    text: String(text),
    isCorrect: i === correctIndex,
  }));
  return {
    id: q.id,
    questionType: q.type ?? "Multiple Choice",
    question: q.question ?? "",
    answerOptions,
    explanation: q.explanation ?? "",
    topicTag: [q.tag, q.category, q.subject].filter(Boolean).join(" · ") || "—",
  };
}

const getStatusColor = (status: QuestionListing["status"]) => {
  switch (status) {
    case "pending-approval":
      return "text-orange-600";
    case "sent-back":
      return "text-main-blue";
    case "approved":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStatusLabel = (status: QuestionListing["status"]) => {
  switch (status) {
    case "pending-approval":
      return "Pending Approval";
    case "sent-back":
      return "Sent Back for Revision";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
};

const gradeOptions = [
  { value: "jss-1", label: "JSS 1" },
  { value: "jss-2", label: "JSS 2" },
  { value: "jss-3", label: "JSS 3" },
  { value: "ss-1", label: "SS 1" },
  { value: "ss-2", label: "SS 2" },
  { value: "ss-3", label: "SS 3" },
];

const statusFilterOptions = [
  { value: "all", label: "All Status" },
  { value: "pending-approval", label: "Pending Approval" },
  { value: "sent-back", label: "Sent Back for Revision" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function QuestionBankManagementPage() {
  const [grade, setGrade] = useState("jss-3");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const { data: questionsResponse, isLoading: isLoadingQuestions } = useGetCbtQuestionsQuery({ _all: true });
  const questionsList = useMemo(() => getQuestionsList(questionsResponse), [questionsResponse]);
  const questionListingData: QuestionListing[] = useMemo(
    () => questionsList.map(mapApiQuestionToListing),
    [questionsList],
  );
  const filteredListing = useMemo(() => {
    if (statusFilter === "all") return questionListingData;
    return questionListingData.filter((q) => q.status === statusFilter);
  }, [questionListingData, statusFilter]);
  const modalQuestions = useMemo(
    () => questionsList.map(mapApiQuestionToModalQuestion),
    [questionsList],
  );
  const pendingCount = useMemo(
    () => questionListingData.filter((q) => q.status === "pending-approval").length,
    [questionListingData],
  );

  const columns: TableColumn<QuestionListing>[] = [
    {
      key: "subject",
      title: "Subjects",
      className: "font-medium",
    },
    {
      key: "topicsCovered",
      title: "Topic Covered",
      render: (value) => `${value} topics`,
    },
    {
      key: "questionTypesCovered",
      title: "Question Type Covered",
    },
    {
      key: "submittedBy",
      title: "Submitted By",
    },
    {
      key: "status",
      title: "Current Status",
      render: (value, row) => (
        <span className={cn("text-sm font-medium", getStatusColor(row.status))}>
          {getStatusLabel(row.status)}
        </span>
      ),
    },
  ];

  const actions: TableAction<QuestionListing>[] = [
    {
      type: "button",
      config: {
        label: "Review Content",
        onClick: (row) => {
          const idx = filteredListing.findIndex((r) => r.id === row.id);
          setSelectedQuestionIndex(idx >= 0 ? idx : 0);
          setReviewModalOpen(true);
        },
        variant: "outline",
      },
    },
  ];

  const handleSendBack = (questionId: string) => {
    console.log("Send back question", questionId);
    // Handle send back logic
    setReviewModalOpen(false);
  };

  const handleApprove = (questionId: string) => {
    console.log("Approve question", questionId);
    // Handle approve logic
    setReviewModalOpen(false);
  };

  const handlePrevious = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (selectedQuestionIndex < modalQuestions.length - 1) {
      setSelectedQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Question Bank Management
        </h2>
        <p className="text-gray-600 mt-1">
          This is the critical interface to build and maintain the secure pool
          of questions for CBT exams.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Questions in Database"
          value={isLoadingQuestions ? "—" : `${questionsList.length.toLocaleString()} Questions`}
          subtitle="Measures the availability of the question bank"
          trend="up"
        />
        <MetricCard
          title="Total Pending Approval"
          value={isLoadingQuestions ? "—" : `${pendingCount} Questions`}
          subtitle="Immediate focus on the review backlog"
          trend="up"
        />
      </div>

      {/* Question Listing Table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Question Listing Table
          </CardTitle>
          <div className="flex gap-2">
            <SelectField
              value={grade}
              onValueChange={setGrade}
              placeholder="Grade"
            >
              {gradeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>
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
            {isLoadingQuestions ? (
              <div className="py-8 text-center text-muted-foreground text-sm">
                Loading questions…
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={filteredListing}
                actions={actions}
                emptyMessage="No questions found."
                tableClassName="border-collapse"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question Review Modal */}
      <QuestionReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        examTitle="Question Bank"
        totalQuestions={modalQuestions.length}
        submittedBy={filteredListing[selectedQuestionIndex]?.submittedBy ?? "—"}
        questions={modalQuestions}
        currentQuestionIndex={selectedQuestionIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSendBack={handleSendBack}
        onApprove={handleApprove}
      />
    </div>
  );
}
