"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/components/general/huge-icon";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

const hrComplianceRows = [
  {
    field: "Payroll Status",
    content: "Monthly Salary (Grade Level 8)",
  },
  {
    field: "Bank Details",
    content: (
      <div className="flex items-center gap-2">
        <span>Bank: Zenith (Acct: 0012345678)</span>
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Copy account number"
        >
          <Icon icon={Copy01Icon} size={16} />
        </button>
      </div>
    ),
  },
  {
    field: "Signed Contract",
    content: (
      <Link href="#" className="text-main-blue hover:underline">
        View PDF
      </Link>
    ),
  },
  {
    field: "Certification",
    content: (
      <Link href="#" className="text-main-blue hover:underline">
        View Document
      </Link>
    ),
  },
  {
    field: "Criminal Check",
    content: (
      <Link href="#" className="text-main-blue hover:underline">
        View Document
      </Link>
    ),
  },
];

export function HRComplianceView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">HR & Compliance</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hrComplianceRows.map((row, index) => (
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

