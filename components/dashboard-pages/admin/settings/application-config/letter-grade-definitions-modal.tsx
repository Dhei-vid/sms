"use client";

import { ModalContainer } from "@/components/ui/modal-container";
import { DataTable, TableColumn, TableAction } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

interface LetterGrade {
  id: string;
  gradeName: string;
  upperPercentage: number;
  lowerPercentage: number;
  gpaValue: number;
  remark: string;
}

interface LetterGradeDefinitionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditGrade?: (gradeId: string) => void;
}

const mockLetterGrades: LetterGrade[] = [
  {
    id: "1",
    gradeName: "Grade A",
    upperPercentage: 100,
    lowerPercentage: 70,
    gpaValue: 5.0,
    remark: "Excellent Performance",
  },
  {
    id: "2",
    gradeName: "Grade B",
    upperPercentage: 69,
    lowerPercentage: 60,
    gpaValue: 4.0,
    remark: "Very Good Performance",
  },
  {
    id: "3",
    gradeName: "Grade C",
    upperPercentage: 59,
    lowerPercentage: 50,
    gpaValue: 3.0,
    remark: "Good Effort",
  },
  {
    id: "4",
    gradeName: "Grade D",
    upperPercentage: 49,
    lowerPercentage: 40,
    gpaValue: 2.0,
    remark: "Fair, Needs Improvement",
  },
  {
    id: "5",
    gradeName: "Grade E",
    upperPercentage: 39,
    lowerPercentage: 0,
    gpaValue: 1.0,
    remark: "Fail, Poor Performance",
  },
];

export function LetterGradeDefinitionsModal({
  open,
  onOpenChange,
  onEditGrade,
}: LetterGradeDefinitionsModalProps) {
  const columns: TableColumn<LetterGrade>[] = [
    {
      key: "gradeName",
      title: "Grade Name",
      className: "font-medium",
    },
    {
      key: "upperPercentage",
      title: "Percentage Boundary",
      render: (value, row) => (
        <span className="text-sm">
          {row.upperPercentage} - {row.lowerPercentage}
        </span>
      ),
    },
    {
      key: "gpaValue",
      title: "Numerical Grade Point (GPA Value)",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "remark",
      title: "Principal/HOD Remark",
      render: (value) => <span className="text-sm">{value}</span>,
    },
  ];

  const actions: TableAction<LetterGrade>[] = [
    {
      type: "button",
      config: {
        label: "Edit Grade Level",
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
        onClick: (row) => {
          if (onEditGrade) {
            onEditGrade(row.id);
          }
        },
      },
    },
  ];

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Letter Grade Definitions"
      size="4xl"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This table defines the boundary for each letter grade used on report
          cards.
        </p>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[60vh]">
            <DataTable
              columns={columns}
              data={mockLetterGrades}
              actions={actions}
              emptyMessage="No letter grades defined."
              tableClassName="border-collapse"
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

