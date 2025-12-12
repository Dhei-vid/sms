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
import { cn } from "@/lib/utils";
import { QuestionReviewModal } from "@/components/dashboard-pages/admin/cbt-management/components/question-review-modal";

interface QuestionListing {
  subject: string;
  topicsCovered: number;
  questionTypesCovered: string;
  submittedBy: string;
  status: "pending-approval" | "sent-back" | "approved" | "rejected";
}

const questionListingData: QuestionListing[] = [
  {
    subject: "Arts & Crafts",
    topicsCovered: 4,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "pending-approval",
  },
  {
    subject: "Computer Science",
    topicsCovered: 7,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "pending-approval",
  },
  {
    subject: "English Language",
    topicsCovered: 8,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "pending-approval",
  },
  {
    subject: "Information Technology",
    topicsCovered: 3,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "sent-back",
  },
  {
    subject: "Integrated Science",
    topicsCovered: 9,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "approved",
  },
  {
    subject: "Mathematics",
    topicsCovered: 7,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "approved",
  },
  {
    subject: "Physical Education",
    topicsCovered: 7,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "approved",
  },
  {
    subject: "Yoruba Language",
    topicsCovered: 3,
    questionTypesCovered: "All 4 question types",
    submittedBy: "Ms. Zara A.",
    status: "rejected",
  },
];

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

const mockQuestions = [
  {
    id: "1",
    questionType: "Multiple Choice Single Answer (MCQ)",
    question:
      "In the traditional Yoruba art of fabric decoration, which method involves tying or stitching the fabric before dipping it into indigo dye to create patterns?",
    answerOptions: [
      { label: "A", text: "Appliqué", isCorrect: false },
      { label: "B", text: "Batik", isCorrect: false },
      { label: "C", text: "Adire", isCorrect: true },
      { label: "D", text: "Mosaic", isCorrect: false },
    ],
    explanation:
      "Adire specifically refers to the Yoruba resist-dyeing technique where patterns are created by resisting the dye, typically by tying (Adire Elèso) or starching (Adire Eléko). Batik uses wax as the resist agent, and Appliqué involves stitching fabric pieces onto a background.",
    topicTag: "Topic Tag 1: Nigerian Traditional Textiles: Tie-Dye (Adire)",
  },
  {
    id: "2",
    questionType: "Multiple Choice Single Answer (MCQ)",
    question: "What is the primary material used in traditional Adire making?",
    answerOptions: [
      { label: "A", text: "Cotton fabric", isCorrect: true },
      { label: "B", text: "Silk fabric", isCorrect: false },
      { label: "C", text: "Polyester fabric", isCorrect: false },
      { label: "D", text: "Linen fabric", isCorrect: false },
    ],
    explanation:
      "Traditional Adire is primarily made using cotton fabric, which is ideal for absorbing the indigo dye and creating the characteristic patterns.",
    topicTag: "Topic Tag 1: Nigerian Traditional Textiles: Tie-Dye (Adire)",
  },
];

export default function QuestionBankManagementPage() {
  const [grade, setGrade] = useState("jss-3");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

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
          setSelectedQuestionIndex(0);
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
    if (selectedQuestionIndex < mockQuestions.length - 1) {
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
          value="4,580 Questions"
          subtitle="Measures the availability of the question bank"
          trend="up"
        />
        <MetricCard
          title="Total Pending Approval"
          value="48 Questions"
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
            <DataTable
              columns={columns}
              data={questionListingData}
              actions={actions}
              emptyMessage="No questions found."
              tableClassName="border-collapse"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Question Review Modal */}
      <QuestionReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        examTitle="JSS 3 Arts & Craft"
        totalQuestions={30}
        submittedBy="Ms. Zara A."
        questions={mockQuestions}
        currentQuestionIndex={selectedQuestionIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSendBack={handleSendBack}
        onApprove={handleApprove}
      />
    </div>
  );
}
