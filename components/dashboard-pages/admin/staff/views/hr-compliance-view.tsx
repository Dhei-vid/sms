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
import type { Stakeholders } from "@/services/stakeholders/stakeholder-types";
import { format } from "date-fns";

interface HRComplianceViewProps {
  stakeholder?: Stakeholders;
}

export function HRComplianceView({ stakeholder }: HRComplianceViewProps) {
  // Format bank details
  const bankDetails = stakeholder?.bank
    ? `Bank: ${stakeholder.bank.bank_name || "—"} (Acct: ${stakeholder.bank.account_number || "—"})`
    : "—";

  // Format salary
  const salary = stakeholder?.salary
    ? `₦${parseFloat(stakeholder.salary).toLocaleString()}`
    : "—";

  // Format contract dates
  const contractStart = stakeholder?.contract_start_date
    ? format(new Date(stakeholder.contract_start_date), "MMM d, yyyy")
    : "—";
  const contractEnd = stakeholder?.contract_end_date
    ? format(new Date(stakeholder.contract_end_date), "MMM d, yyyy")
    : "—";

  const hrComplianceRows = [
    {
      field: "Salary",
      content: salary,
    },
    {
      field: "Employment Type",
      content: stakeholder?.employment_type || "—",
    },
    {
      field: "Bank Details",
      content:
        bankDetails !== "—" ? (
          <div className="flex items-center gap-2">
            <span>{bankDetails}</span>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Copy account number"
              onClick={() => {
                if (stakeholder?.bank?.account_number) {
                  navigator.clipboard.writeText(
                    stakeholder.bank.account_number,
                  );
                }
              }}
            >
              <Icon icon={Copy01Icon} size={16} />
            </button>
          </div>
        ) : (
          "—"
        ),
    },
    {
      field: "Contract Start Date",
      content: contractStart,
    },
    {
      field: "Contract End Date",
      content: contractEnd,
    },
    {
      field: "Annual Leave Entitlement",
      content: stakeholder?.annual_leave_entitlement
        ? `${stakeholder.annual_leave_entitlement} Days`
        : "—",
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
  ];
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
