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
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

interface AssignmentsScheduleViewProps {
  stakeholder?: Stakeholders;
}

export function AssignmentsScheduleView({
  stakeholder,
}: AssignmentsScheduleViewProps) {
  // Format assigned classes
  const assignedClasses =
    stakeholder?.assigned_classes && stakeholder.assigned_classes.length > 0
      ? stakeholder.assigned_classes.join(", ")
      : stakeholder?.class_assigned || "—";

  // Format teaching duty
  const teachingDuty = stakeholder?.teaching_duty_details
    ? `${stakeholder.teaching_duty_details.class_grade || ""} - ${stakeholder.teaching_duty_details.subject || ""}`
    : "—";

  const assignmentsRows = [
    {
      field: "Assigned Classes",
      content: assignedClasses,
    },
    {
      field: "Teaching Duty",
      content: teachingDuty,
    },
    {
      field: "Subjects",
      content:
        stakeholder?.subjects && stakeholder.subjects.length > 0
          ? stakeholder.subjects.join(", ")
          : "—",
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
