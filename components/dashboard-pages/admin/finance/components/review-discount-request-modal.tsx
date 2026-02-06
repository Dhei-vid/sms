"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/components/general/huge-icon";
import { Cancel01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface DiscountRequest {
  id: string;
  name: string;
  grade: string;
  requestType: string;
  dateSubmitted: string;
  requestedValue: string;
  policyRule: string;
  supportingDocs: string;
  requestSummary?: string;
  policyStatus?: string;
}

interface ReviewDiscountRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: DiscountRequest | null;
  onApprove?: (requestId: string, discountValue: string) => void;
  onDeny?: (requestId: string, reason: string) => void;
}

export function ReviewDiscountRequestModal({
  open,
  onOpenChange,
  request,
  onApprove,
  onDeny,
}: ReviewDiscountRequestModalProps) {
  const [discountValue, setDiscountValue] = useState("");
  const [denialReason, setDenialReason] = useState("");

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when modal closes
      setDiscountValue("");
      setDenialReason("");
    }
    onOpenChange(open);
  };

  const handleApprove = () => {
    if (request && discountValue && onApprove) {
      onApprove(request.id, discountValue);
      handleClose(false);
    }
  };

  const handleDeny = () => {
    if (request && denialReason && onDeny) {
      onDeny(request.id, denialReason);
      handleClose(false);
    }
  };

  if (!request) return null;

  // Request details from the request object
  const requestDetails = [
    {
      field: "Request Summary",
      content:
        request.requestSummary ||
        "Reason: Temporary financial difficulty due to recent medical expenses.",
    },
    {
      field: "Supporting Docs",
      content:
        request.supportingDocs === "View Docs" ? (
          <div className="flex items-center gap-2">
            <span>Letter of Request.pdf</span>
            <Button
              variant="link"
              className="text-main-blue p-0 h-auto text-sm ml-auto border-0"
              onClick={() => {
                // Handle view docs
                console.log("View docs for", request.id);
              }}
            >
              View docs.
            </Button>
          </div>
        ) : (
          <span className="text-gray-500">No documents provided</span>
        ),
    },
    {
      field: "Policy Status Check",
      content: request.policyStatus || "A+",
    },
  ];

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title={`Request from ${request.name} (${request.grade})`}
      size="3xl"
      maxHeight="90vh"
    >
      <div className="space-y-6 py-4">
        {/* Request Details Section */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-blue/5">
                  <TableHead className="px-4 py-3">Form Field</TableHead>
                  <TableHead className="px-4 py-3">Content</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-sm font-medium text-gray-600">
                      {detail.field}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-800">
                      {typeof detail.content === "string"
                        ? detail.content
                        : detail.content}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Admin Decision Input Section */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-800">
            Admin Decision Input
          </h3>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Discount Value to Apply
            </Label>
            <Input
              type="text"
              placeholder="Currency/Percent Input"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Discount amount requested by the parent.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Denial Reason</Label>
            <Input
              type="text"
              placeholder="placeholder"
              value={denialReason}
              onChange={(e) => setDenialReason(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleDeny}
            disabled={!denialReason}
            className="gap-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <Icon icon={Cancel01Icon} size={16} />
            Deny & Send Reason
          </Button>
          <Button
            onClick={handleApprove}
            disabled={!discountValue}
            className="gap-2"
          >
            <Icon icon={Tick01Icon} size={16} />
            Approve & Apply Discount
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
