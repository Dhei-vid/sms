"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const personalDetailsRows = [
  {
    field: "Primary Phone Number",
    content: "+234 803 123 4567",
  },
  {
    field: "School Email",
    content: "okafor.T178023@penetraliahub.edu",
  },
  {
    field: "Residential Address",
    content: "45 Unity Crescent, Garki, Abuja",
  },
  {
    field: "Date of Birth",
    content: "January 12, 1997 (Age: 28)",
  },
  {
    field: "Gender",
    content: "Male",
  },
  {
    field: "Qualifications",
    content: "M.Sc. Mathematics, University of Lagos",
  },
  {
    field: "Emergency Contact",
    content: "Mrs. Ada Okafor (Wife) - +234 809 987 6543",
  },
];

export function PersonalDetailsView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personalDetailsRows.map((row, index) => (
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
