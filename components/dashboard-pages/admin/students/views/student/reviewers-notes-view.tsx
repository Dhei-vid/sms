"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Note {
  dateTime: string;
  reviewer: string;
  notes: string;
}

const reviewersNotes: Note[] = [
  {
    dateTime: "2025-10-16, 10:30 AM",
    reviewer: "System Bot",
    notes: "Application Status changed from New to Under Review.",
  },
  {
    dateTime: "2025-10-17, 11:40 AM",
    reviewer: "Ms. Titi Alabi (Grade/Class Teacher)",
    notes:
      "Common Entrance Score is Excellent (92%). Called Primary Head Teacher for a verbal recommendation. Confirmed student's excellent character.",
  },
  {
    dateTime: "2025-10-21, 09:00 AM",
    reviewer: "Ms. Amaka Umeh (Principal)",
    notes:
      "Applicant interview focused on general knowledge and behavioral fit. Highly articulate and motivated. Verdict: Approved.",
  },
];

export function ReviewersNotesView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Reviewer Notes & Activity Log
      </h2>
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
                <TableCell className="text-gray-600">{note.dateTime}</TableCell>
                <TableCell className="font-medium text-gray-700">
                  {note.reviewer}
                </TableCell>
                <TableCell className="text-gray-600">{note.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
