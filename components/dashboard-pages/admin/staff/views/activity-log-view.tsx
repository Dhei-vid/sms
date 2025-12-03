"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const activityLogRows = [
  {
    dateTime: "2025-10-16, 10:30 AM",
    activityType: "Leave Approved",
    summary: "Annual Leave (5 Days) approved for November 15-20.",
  },
  {
    dateTime: "2025-10-10, 2:15 PM",
    activityType: "Contract Renewed",
    summary: "Contract extended until 2026-08-31.",
  },
  {
    dateTime: "2025-09-28, 9:00 AM",
    activityType: "Assignment Updated",
    summary: "Assigned to JSS2 Math and SS2 Calculus classes.",
  },
  {
    dateTime: "2025-09-15, 11:45 AM",
    activityType: "Document Uploaded",
    summary: "Medical report and certification documents uploaded.",
  },
  {
    dateTime: "2025-08-20, 3:30 PM",
    activityType: "Profile Updated",
    summary: "Emergency contact information updated.",
  },
];

export function ActivityLogView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Reviewer Notes & Activity Log
      </h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead>Date/Time</TableHead>
              <TableHead>Activity Type</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityLogRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-600">{row.dateTime}</TableCell>
                <TableCell className="font-medium text-gray-700">
                  {row.activityType}
                </TableCell>
                <TableCell className="text-gray-600">{row.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

