"use client";

import { InfoTable } from "../components/info-table";
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

interface AcademicHistoryViewProps {
  stakeholder: Stakeholders;
}

export function AcademicHistoryView({ stakeholder }: AcademicHistoryViewProps) {
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

  const rows = [
    {
      field: "Current/Previous School",
      content: stakeholder.current_previous_school
        ? String(stakeholder.current_previous_school)
        : "—",
      status: stakeholder.current_previous_school
        ? ("verified" as const)
        : undefined,
    },
    {
      field: "Last Grade Completed",
      content: stakeholder.last_grade_completed
        ? String(stakeholder.last_grade_completed)
        : stakeholder.grade || "—",
      status:
        stakeholder.last_grade_completed || stakeholder.grade
          ? ("verified" as const)
          : undefined,
    },
    {
      field: "Common Entrance Score",
      content: commonExamScore,
      status: stakeholder.common_exam_score ? ("verified" as const) : undefined,
    },
    {
      field: "Performance Highlights",
      content: performanceHighlights,
    },
    {
      field: "Transfer Reason",
      content: stakeholder.transfer_reason
        ? String(stakeholder.transfer_reason)
        : "—",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Academic History</h2>
      <InfoTable rows={rows} />
    </div>
  );
}
