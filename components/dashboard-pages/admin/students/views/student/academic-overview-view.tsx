"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

interface AcademicOverviewViewProps {
  stakeholder: Stakeholders;
}

export function AcademicOverviewView({
  stakeholder,
}: AcademicOverviewViewProps) {
  const commonExamScore = stakeholder.common_exam_score
    ? typeof stakeholder.common_exam_score === "object"
      ? JSON.stringify(stakeholder.common_exam_score)
      : String(stakeholder.common_exam_score)
    : "—";
  const performanceHighlights = stakeholder.performance_highlights
    ? typeof stakeholder.performance_highlights === "object"
      ? JSON.stringify(stakeholder.performance_highlights)
      : String(stakeholder.performance_highlights)
    : "—";
  const performance = stakeholder.performance
    ? typeof stakeholder.performance === "object"
      ? JSON.stringify(stakeholder.performance)
      : String(stakeholder.performance)
    : "—";

  const academicOverviewRows = [
    {
      field: "Current Class",
      content: stakeholder.class_assigned || "—",
    },
    {
      field: "Grade",
      content: stakeholder.grade || "—",
    },
    {
      field: "Overall Academic Average",
      content: performance !== "—" ? performance : "—",
    },
    {
      field: "Common Entrance Score",
      content: commonExamScore,
    },
    {
      field: "Performance Highlights",
      content: performanceHighlights,
    },
    {
      field: "Last Grade Completed",
      content: stakeholder.last_grade_completed
        ? String(stakeholder.last_grade_completed)
        : stakeholder.grade || "—",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Academic Overview</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {academicOverviewRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {row.field}
                </TableCell>
                <TableCell className="text-gray-600">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
