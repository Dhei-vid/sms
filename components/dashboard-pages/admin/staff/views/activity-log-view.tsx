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
import { format } from "date-fns";

interface ActivityLogViewProps {
  stakeholder?: Stakeholders;
}

export function ActivityLogView({ stakeholder }: ActivityLogViewProps) {
  // Build activity log from stakeholder data
  const activityLogRows = [];

  // Add creation date
  if (stakeholder?.created_at) {
    activityLogRows.push({
      dateTime: format(new Date(stakeholder.created_at), "yyyy-MM-dd, h:mm a"),
      activityType: "Profile Created",
      summary: "Staff profile was created in the system.",
    });
  }

  // Add update date
  if (
    stakeholder?.updated_at &&
    stakeholder.updated_at !== stakeholder.created_at
  ) {
    activityLogRows.push({
      dateTime: format(new Date(stakeholder.updated_at), "yyyy-MM-dd, h:mm a"),
      activityType: "Profile Updated",
      summary: "Staff profile information was updated.",
    });
  }

  // Add date joined
  if (stakeholder?.date_joined) {
    activityLogRows.push({
      dateTime: format(new Date(stakeholder.date_joined), "yyyy-MM-dd, h:mm a"),
      activityType: "Date Joined",
      summary: `Staff joined on ${format(new Date(stakeholder.date_joined), "MMMM d, yyyy")}.`,
    });
  }

  // Add contract dates
  if (stakeholder?.contract_start_date) {
    activityLogRows.push({
      dateTime: format(
        new Date(stakeholder.contract_start_date),
        "yyyy-MM-dd, h:mm a",
      ),
      activityType: "Contract Started",
      summary: `Contract started on ${format(new Date(stakeholder.contract_start_date), "MMMM d, yyyy")}.`,
    });
  }

  // Add notes if available
  if (stakeholder?.notes && stakeholder.notes.length > 0) {
    stakeholder.notes.forEach((note) => {
      if (note.created_at) {
        activityLogRows.push({
          dateTime: format(new Date(note.created_at), "yyyy-MM-dd, h:mm a"),
          activityType: "Note Added",
          summary: note.description || "A note was added.",
        });
      }
    });
  }

  // If no activity, show placeholder
  if (activityLogRows.length === 0) {
    activityLogRows.push({
      dateTime: "—",
      activityType: "No Activity",
      summary: "No activity log entries available.",
    });
  }

  // Sort by date (newest first)
  activityLogRows.sort((a, b) => {
    if (a.dateTime === "—") return 1;
    if (b.dateTime === "—") return -1;
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });
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
