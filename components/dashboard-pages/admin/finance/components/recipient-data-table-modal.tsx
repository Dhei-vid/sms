"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Recipient {
  id: string;
  name: string;
  studentId: string;
  gradeClass: string;
  invoiceValue: number;
  discountApplied: string;
  discountAmount?: number;
  discountPercentage?: number;
}

interface RecipientDataTableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipients: Recipient[];
}

export function RecipientDataTableModal({
  open,
  onOpenChange,
  recipients,
}: RecipientDataTableModalProps) {
  const [displayCount, setDisplayCount] = useState(8);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const displayedRecipients = recipients.slice(0, displayCount);
  const hasMore = recipients.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 8, recipients.length));
  };

  const handleExclude = (id: string) => {
    // Handle exclude action
    console.log("Exclude recipient:", id);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Recipient Data Table"
      size="6xl"
      contentClassName="flex flex-col"
    >
      <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
        {/* Table */}
        <div className="border rounded-lg overflow-hidden flex-1 overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="bg-main-blue/5">
                <TableHead className="px-4 py-3">
                  Full Name + School ID
                </TableHead>
                <TableHead className="px-4 py-3">Grade/Class</TableHead>
                <TableHead className="px-4 py-3">Invoice Value</TableHead>
                <TableHead className="px-4 py-3">Discount Applied</TableHead>
                <TableHead className="px-4 py-3">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRecipients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-gray-500"
                  >
                    No recipients found
                  </TableCell>
                </TableRow>
              ) : (
                displayedRecipients.map((recipient) => (
                  <TableRow key={recipient.id}>
                    <TableCell className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm">
                          {recipient.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({recipient.studentId})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {recipient.gradeClass}
                    </TableCell>
                    <TableCell className="px-4 py-3 font-semibold text-gray-800 text-sm">
                      {formatCurrency(recipient.invoiceValue)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {recipient.discountApplied === "Nil" ? (
                        <span className="text-gray-600">Nil</span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-800">
                            {formatCurrency(recipient.discountAmount || 0)}
                          </span>
                          {recipient.discountPercentage && (
                            <span className="text-xs text-muted-foreground">
                              ({recipient.discountPercentage}%
                              {recipient.discountApplied.includes("Sibling")
                                ? " Sibling"
                                : ""}
                              )
                            </span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleExclude(recipient.id);
                        }}
                        className="text-main-blue hover:underline text-sm"
                      >
                        Exclude from Batch
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center pt-2">
            <Button variant="outline" onClick={handleLoadMore} className="w-32">
              Load More
            </Button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
