"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PolicyCheckRow {
  field: string;
  content: string;
  status: string;
}

interface PolicyCheckViewProps {
  onAssignCoverage?: () => void;
}

export function PolicyCheckView({ onAssignCoverage }: PolicyCheckViewProps) {
  const rows: PolicyCheckRow[] = [
    {
      field: "Leave Policy Check",
      content: "Annual Leave: Max 21 Days",
      status: "Ok",
    },
    {
      field: "Remaining Balance",
      content: "10 Days Left",
      status: "Ok",
    },
    {
      field: "Minimum Notice Met?",
      content: "Requested 30 days prior.",
      status: "Policy: 7 days.",
    },
    {
      field: "Operational Impact",
      content: "3 other staff on leave",
      status: "LOW RISK",
    },
    {
      field: "Coverage Assigned?",
      content: "PENDING",
      status: "Assign Coverage",
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Ok") return "text-green-600";
    if (status === "LOW RISK") return "text-blue-600";
    if (status.includes("Policy:")) return "text-gray-600";
    return "text-gray-600";
  };

  const getContentColor = (content: string) => {
    if (content === "PENDING") return "text-orange-600";
    return "text-gray-600";
  };

  const isStatusLink = (status: string) => {
    return status === "Assign Coverage";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Policy & Operational Check
      </h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {row.field}
                </TableCell>
                <TableCell
                  className={cn("text-gray-600", getContentColor(row.content))}
                >
                  {row.content}
                </TableCell>
                <TableCell>
                  {isStatusLink(row.status) ? (
                    <Button
                      variant="link"
                      className="text-main-blue p-0 h-auto font-normal underline"
                      onClick={onAssignCoverage}
                    >
                      {row.status}
                    </Button>
                  ) : (
                    <span
                      className={cn("font-medium", getStatusColor(row.status))}
                    >
                      {row.status}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
