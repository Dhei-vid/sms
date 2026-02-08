"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";

interface Note {
  dateTime: string;
  reviewer: string;
  notes: string;
}

interface ReviewersNotesViewProps {
  stakeholder: Stakeholders;
}

export function ReviewersNotesView({ stakeholder }: ReviewersNotesViewProps) {
  const reviewersNotes: Note[] = stakeholder.notes?.length
    ? stakeholder.notes.map((note) => ({
        dateTime: note.created_at
          ? format(new Date(note.created_at), "yyyy-MM-dd, h:mm a")
          : "—",
        reviewer: note.creator
          ? `${note.creator.first_name} ${note.creator.last_name}${note.creator.role ? ` (${note.creator.role})` : ""}`
          : note.creator_id
            ? `User ${note.creator_id.slice(-6)}`
            : "System",
        notes: note.description || note.title || "—",
      }))
    : stakeholder.admin_notes
      ? [
          {
            dateTime: stakeholder.created_at
              ? format(new Date(stakeholder.created_at), "yyyy-MM-dd, h:mm a")
              : "—",
            reviewer: stakeholder.creator
              ? `${stakeholder.creator.first_name} ${stakeholder.creator.last_name}`
              : "System",
            notes: stakeholder.admin_notes,
          },
        ]
      : [];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Reviewer Notes & Activity Log
      </h2>
      {reviewersNotes.length === 0 ? (
        <div className="p-8 text-center text-gray-500 border rounded-lg">
          No notes available
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-main-blue/5">
                <TableHead className="w-[180px]">Date/Time</TableHead>
                <TableHead className="w-[250px]">Reviewer</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewersNotes.map((note, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-600 border-r">
                    {note.dateTime}
                  </TableCell>
                  <TableCell className="font-medium text-gray-700 border-r">
                    {note.reviewer}
                  </TableCell>
                  <TableCell className="text-gray-600">{note.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
