"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { usePagination } from "@/hooks/use-pagination";

interface ScoreScriptData {
  id: string;
  name: string;
  studentId: string;
  rawScore: number;
  principalHodRemark: string;
}

interface ScoreScriptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId?: string;
}

// Sample data - in production, this would come from an API
const allScoreScriptData: ScoreScriptData[] = [
  {
    id: "1",
    name: "Sola Adebayo",
    studentId: "adebayo.m178031",
    rawScore: 70,
    principalHodRemark: "Excellent Performance",
  },
  {
    id: "2",
    name: "Helen Davies",
    studentId: "davies.m178032",
    rawScore: 69,
    principalHodRemark: "Very Good Performance",
  },
  {
    id: "3",
    name: "Tolu Adebayo",
    studentId: "adebayo.m170833",
    rawScore: 50,
    principalHodRemark: "Good Effort",
  },
  {
    id: "4",
    name: "Biodun Eke",
    studentId: "eke.m178033",
    rawScore: 49,
    principalHodRemark: "Fair, Needs Improvement",
  },
  {
    id: "5",
    name: "Uche Nwachukwu",
    studentId: "nwachukwu.m170844",
    rawScore: 39,
    principalHodRemark: "Fail, Poor Performance",
  },
  {
    id: "6",
    name: "Sola Adebayo",
    studentId: "adebayo.m178031",
    rawScore: 70,
    principalHodRemark: "Excellent Performance",
  },
  {
    id: "7",
    name: "Helen Davies",
    studentId: "davies.m178032",
    rawScore: 69,
    principalHodRemark: "Very Good Performance",
  },
  {
    id: "8",
    name: "Tolu Adebayo",
    studentId: "adebayo.m170833",
    rawScore: 50,
    principalHodRemark: "Good Effort",
  },
  {
    id: "9",
    name: "Tolu Adebayo",
    studentId: "adebayo.m170833",
    rawScore: 50,
    principalHodRemark: "Good Effort",
  },
  {
    id: "10",
    name: "Tolu Adebayo",
    studentId: "adebayo.m170833",
    rawScore: 50,
    principalHodRemark: "Good Effort",
  },
  {
    id: "11",
    name: "Tolu Adebayo",
    studentId: "adebayo.m170833",
    rawScore: 50,
    principalHodRemark: "Good Effort",
  },
];

export function ScoreScriptModal({
  open,
  onOpenChange,
  assessmentId,
}: ScoreScriptModalProps) {
  // Pagination
  const {
    displayedData: scoreScriptData,
    hasMore,
    loadMore,
    reset,
  } = usePagination({
    data: allScoreScriptData,
    initialItemsPerPage: 5,
    itemsPerPage: 5,
  });

  // Reset pagination when modal closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  const columns: TableColumn<ScoreScriptData>[] = [
    {
      key: "name",
      title: "Name & Student ID",
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{row.name}</span>
          <span className="text-sm text-gray-500">({row.studentId})</span>
        </div>
      ),
    },
    {
      key: "rawScore",
      title: "Raw Score",
      render: (value) => (
        <span className="text-gray-800">{value as number}</span>
      ),
    },
    {
      key: "principalHodRemark",
      title: "Principal/HOD Remark",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
  ];

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleOpenChange}
      title="Score Script"
      size="3xl"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          A modal displaying the submitted data for that specific assignment.
        </p>

        {/* Score Script Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[60vh] scrollbar-width">
            <DataTable
              columns={columns}
              data={scoreScriptData}
              showActionsColumn={false}
              className="w-full"
              tableClassName="min-w-full"
            />
          </div>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
