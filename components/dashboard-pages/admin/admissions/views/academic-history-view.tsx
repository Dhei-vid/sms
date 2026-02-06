"use client";

import { InfoTable } from "../components/info-table";

const academicHistoryRows = [
  {
    field: "Current/Previous School",
    content: "Hope Primary School (Primary 6)",
    status: "verified" as const,
  },
  {
    field: "Last Grade Completed",
    content: "Primary 6",
    status: "verified" as const,
  },
  {
    field: "Common Entrance Score",
    content: "92% (Score: 276/300)",
    status: "verified" as const,
  },
  {
    field: "Performance Highlights",
    content:
      "Distinction in Mathematics and Verbal Reasoning. Served as Head Girl in Primary 6.",
  },
  {
    field: "Transfer Reason",
    content: "Graduating Primary School.",
  },
];

export function AcademicHistoryView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Academic History</h2>
      <InfoTable rows={academicHistoryRows} />
    </div>
  );
}
