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
import { Icon } from "@/components/general/huge-icon";
import { Tick01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

interface RequestSnapshotViewProps {
  staffName: string;
  leaveType: string;
  dateRange: string;
  status: string;
  onApprove?: () => void;
  onDeny?: () => void;
}

export function RequestSnapshotView({
  staffName,
  leaveType,
  dateRange,
  status,
  onApprove,
  onDeny,
}: RequestSnapshotViewProps) {
  const rows = [
    { field: "Staff Header", content: staffName },
    { field: "Leave Type", content: leaveType },
    { field: "Date Range", content: dateRange },
    { field: "Current Status", content: status },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes("PENDING")) return "text-orange-600";
    if (status.includes("APPROVED")) return "text-green-600";
    if (status.includes("DENIED")) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Request Snapshot & Action Panel
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {row.field}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-gray-600",
                    row.field === "Current Status" &&
                      getStatusColor(row.content)
                  )}
                >
                  {row.content}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="outline"
          onClick={onDeny}
          className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
        >
          <Icon icon={Cancel01Icon} size={18} />
          Deny Request
        </Button>
        <Button onClick={onApprove} className="gap-2">
          <Icon icon={Tick01Icon} size={18} />
          Approve Request
        </Button>
      </div>
    </div>
  );
}
