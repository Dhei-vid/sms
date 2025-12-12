"use client";

import { ModalContainer } from "@/components/ui/modal-container";
import { DataTable, TableColumn } from "@/components/ui/data-table";

interface Assessment {
  assessmentName: string;
  assessmentType: string;
  totalMarks: number;
  studentScore: number;
  teacherFeedback: string;
}

interface DetailedGradeViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: string;
  assessments?: Assessment[];
}

const defaultAssessments: Assessment[] = [
  {
    assessmentName: "CA 1: Atomic Structure",
    assessmentType: "Continuous Assessment (Quiz)",
    totalMarks: 20,
    studentScore: 18,
    teacherFeedback:
      "Good effort on the quiz, but show your workings on the long answers.",
  },
  {
    assessmentName: "Unit 4 Project",
    assessmentType: "Assignment",
    totalMarks: 40,
    studentScore: 33,
    teacherFeedback:
      "Good effort on the quiz, but show your workings on the long answers.",
  },
  {
    assessmentName: "Mid-Term Exam",
    assessmentType: "Examination",
    totalMarks: 60,
    studentScore: 49,
    teacherFeedback:
      "Good effort on the quiz, but show your workings on the long answers.",
  },
];

export function DetailedGradeViewModal({
  open,
  onOpenChange,
  subject,
  assessments = defaultAssessments,
}: DetailedGradeViewModalProps) {
  const columns: TableColumn<Assessment>[] = [
    {
      key: "assessmentName",
      title: "Assessment Name",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "assessmentType",
      title: "Assessment Type",
      className: "min-w-[180px]",
    },
    {
      key: "totalMarks",
      title: "Total Marks",
    },
    {
      key: "studentScore",
      title: "Student Score",
    },
    {
      key: "teacherFeedback",
      title: "Teacher Feedback",
      render: (value) => (
        <span className="text-sm text-gray-700 wrap-break-words max-w-xs">
          {value as string}
        </span>
      ),
      className: "min-w-[200px]",
    },
  ];

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Detailed Grade View"
      size="3xl"
    >
      <div className="border rounded-md w-[68.5%]">
        <DataTable
          columns={columns}
          data={assessments}
          showActionsColumn={false}
          className="w-full"
          tableClassName="min-w-full"
        />
      </div>
    </ModalContainer>
  );
}
