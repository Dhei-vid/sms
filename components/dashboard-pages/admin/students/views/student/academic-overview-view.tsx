"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const academicOverviewRows = [
  {
    field: "Overall Academic Average",
    content: "78%. Came in 6th position last term",
  },
  {
    field: "Academic Track Status",
    content: "Good standing",
  },
  {
    field: "Next Scheduled Exam Date.",
    content: "November 14th, 2025",
  },
];

export function AcademicOverviewView() {
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
