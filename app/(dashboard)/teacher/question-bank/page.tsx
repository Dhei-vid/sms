"use client";

import { useState } from "react";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { usePagination } from "@/hooks/use-pagination";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/components/general/huge-icon";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateQuestionModal } from "@/components/dashboard-pages/teacher/question-bank/create-question-modal";

interface Question {
  id: string;
  questionSnippet: string;
  subjectTopic: string;
  class: string;
  status: "Approved" | "Pending" | "Draft" | "Rejected";
}

// Sample data - in production, this would come from an API
const allQuestions: Question[] = [
  {
    id: "Q152",
    questionSnippet: "Which color of light is least effective in...",
    subjectTopic: "Biology / Photosynthesis",
    class: "SS2",
    status: "Approved",
  },
  {
    id: "Q153",
    questionSnippet: "Define the concept of cultural hybridization.",
    subjectTopic: "Arts & Crafts / Culture",
    class: "JSS3",
    status: "Pending",
  },
  {
    id: "Q154",
    questionSnippet: "Calculate the velocity of the moving object...",
    subjectTopic: "Physics / Motion",
    class: "SS2",
    status: "Draft",
  },
  {
    id: "Q155",
    questionSnippet: "What is the formula for calculating work done?",
    subjectTopic: "Physics / Work",
    class: "SS2",
    status: "Rejected",
  },
  {
    id: "Q156",
    questionSnippet: "Explain the process of photosynthesis in plants.",
    subjectTopic: "Biology / Photosynthesis",
    class: "SS2",
    status: "Approved",
  },
  {
    id: "Q157",
    questionSnippet: "What are the main components of the cell?",
    subjectTopic: "Biology / Cell Biology",
    class: "SS1",
    status: "Pending",
  },
  {
    id: "Q158",
    questionSnippet: "Calculate the force required to move an object.",
    subjectTopic: "Physics / Mechanics",
    class: "SS2",
    status: "Draft",
  },
  {
    id: "Q159",
    questionSnippet: "Describe the water cycle process.",
    subjectTopic: "Geography / Climate",
    class: "JSS2",
    status: "Approved",
  },
];

const getStatusColor = (status: Question["status"]) => {
  switch (status) {
    case "Approved":
      return "text-green-600";
    case "Pending":
      return "text-orange-600";
    case "Draft":
      return "text-gray-600";
    case "Rejected":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default function QuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Filter questions based on search and status
  const filteredQuestions = allQuestions.filter((question) => {
    const matchesSearch =
      !searchQuery ||
      question.questionSnippet
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      question.subjectTopic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || question.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const {
    displayedData: questions,
    hasMore,
    loadMore,
  } = usePagination({
    data: filteredQuestions,
    initialItemsPerPage: 4,
    itemsPerPage: 4,
  });

  const columns: TableColumn<Question>[] = [
    {
      key: "id",
      title: "Question ID",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "questionSnippet",
      title: "Question Snippet",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "subjectTopic",
      title: "Subject/Topic",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "class",
      title: "Class",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as Question["status"];
        return (
          <span className={cn("text-sm font-medium", getStatusColor(status))}>
            {status}
          </span>
        );
      },
    },
  ];

  const actions: TableAction<Question>[] = [
    {
      type: "dropdown",
      config: {
        items: [
          {
            label: "View Details",
            onClick: (row) => {
              console.log("View details for:", row.id);
            },
          },
          {
            label: "Edit Question",
            onClick: (row) => {
              console.log("Edit question:", row.id);
            },
            separator: true,
          },
          {
            label: "Delete Question",
            onClick: (row) => {
              console.log("Delete question:", row.id);
            },
            variant: "destructive",
          },
        ],
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Question Bank (Teacher Workflow)
        </h1>
        <p className="text-gray-600">
          This screen allows the teacher to manage, create, and submit new
          assessment questions to the central repository for review and
          potential use in CBTs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Total Questions Created"
          value="150 Questions"
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Pending Approval"
          value="15 Questions"
          trend="up"
          trendColor="text-main-blue"
        />
      </div>

      {/* Create New Question Button */}
      <Button
        variant={"outline"}
        className="w-full h-11 flex items-center gap-2"
        onClick={() => setCreateModalOpen(true)}
      >
        <Icon icon={AddSquareIcon} size={18} />
        Create New Question
      </Button>

      {/* My Question Bank Table Section */}
      <div className="bg-background rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            My Question Bank Table
          </h2>
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by e.g., Kinetic Energy"
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Filter Dropdown */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter: Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Question Table */}
        <div className="border rounded-lg overflow-hidden">
          <DataTable
            columns={columns}
            data={questions}
            actions={actions}
            showActionsColumn={true}
            actionsColumnTitle="Action"
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

      {/* Create Question Modal */}
      <CreateQuestionModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
}
