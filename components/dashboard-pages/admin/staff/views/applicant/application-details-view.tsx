"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ApplicationDetailsViewProps {
  jobAppliedFor: string;
  dateApplied: string;
  currentAddress: string;
  primaryPhone: string;
  primaryEmail: string;
  qualifications: string;
}

export function ApplicationDetailsView({
  jobAppliedFor,
  dateApplied,
  currentAddress,
  primaryPhone,
  primaryEmail,
  qualifications,
}: ApplicationDetailsViewProps) {
  const rows = [
    { field: "Job Applied For", content: jobAppliedFor },
    { field: "Date Applied", content: dateApplied },
    { field: "Current Address", content: currentAddress },
    { field: "Primary Phone Number", content: primaryPhone },
    { field: "Primary Email", content: primaryEmail },
    { field: "Qualifications", content: qualifications },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Application Details</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
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

