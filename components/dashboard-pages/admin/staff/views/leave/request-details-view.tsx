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
import { Icon } from "@/components/general/huge-icon";
import { FileDownloadIcon } from "@hugeicons/core-free-icons";

interface RequestDetailsViewProps {
  reason: string;
  requestedSubstitute: string;
  supportingDocument?: string;
  onViewDocument?: () => void;
}

export function RequestDetailsView({
  reason,
  requestedSubstitute,
  supportingDocument,
  onViewDocument,
}: RequestDetailsViewProps) {
  const rows = [
    { field: "Reason for Leave", content: reason },
    { field: "Requested Substitute", content: requestedSubstitute },
    {
      field: "Supporting Document",
      content: supportingDocument || "No document attached",
      isLink: !!supportingDocument,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Request Details & Documentation
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
                <TableCell className="text-gray-600">
                  {row.isLink ? (
                    <Button
                      variant="link"
                      className="text-main-blue p-0 h-auto font-normal"
                      onClick={onViewDocument}
                    >
                      <Icon
                        icon={FileDownloadIcon}
                        size={16}
                        className="mr-2"
                      />
                      {row.content}
                    </Button>
                  ) : (
                    row.content
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
