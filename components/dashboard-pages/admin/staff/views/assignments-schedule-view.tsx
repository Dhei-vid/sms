"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const assignmentsRows = [
  {
    field: "Assigned Classes",
    content: "JSS2 Math (Periods 1, 3, 5) | SS2 Calculus (Period 4)",
  },
  {
    field: "Official Duties",
    content: "House Master (Green House) | Discipline Committee Member",
  },
  {
    field: "Office No.",
    content: "Room B-204 (Office)",
  },
  {
    field: "Current Timetable",
    content: (
      <Link href="#" className="text-main-blue hover:underline">
        View Full Timetable
      </Link>
    ),
  },
];

export function AssignmentsScheduleView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Assignments & Schedule
      </h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignmentsRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {row.field}
                </TableCell>
                <TableCell className="text-gray-600">
                  {typeof row.content === "string" ? row.content : row.content}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
