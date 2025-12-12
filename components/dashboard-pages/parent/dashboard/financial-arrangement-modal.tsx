"use client";

import { useState, useRef } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FinancialArrangementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FinancialArrangementModal({
  open,
  onOpenChange,
}: FinancialArrangementModalProps) {
  const [requestType, setRequestType] = useState("");
  const [justification, setJustification] = useState("");
  const [proposedPlan, setProposedPlan] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when modal closes
      setRequestType("");
      setJustification("");
      setProposedPlan("");
      setSelectedFile(null);
    }
    onOpenChange(isOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Financial arrangement request:", {
      requestType,
      justification,
      proposedPlan,
      file: selectedFile,
    });
    // Reset form and close modal
    handleClose(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="New Financial Arrangement Request"
      size="xl"
      footer={
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Submit Request to Bursar
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Request Type */}
        <div className="space-y-2">
          <Label
            htmlFor="requestType"
            className="text-sm font-medium text-gray-700"
          >
            Request Type
          </Label>
          <Select value={requestType} onValueChange={setRequestType}>
            <SelectTrigger id="requestType" className="w-full">
              <SelectValue placeholder="Dropdown Select: Fee Discount / Installment Plan / Late Payment Extension" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fee-discount">Fee Discount</SelectItem>
              <SelectItem value="installment-plan">Installment Plan</SelectItem>
              <SelectItem value="late-payment-extension">
                Late Payment Extension
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Justification */}
        <div className="space-y-2">
          <Label
            htmlFor="justification"
            className="text-sm font-medium text-gray-700"
          >
            Justification
          </Label>
          <Textarea
            id="justification"
            placeholder="Detailed explanation of the circumstances necessitating the request."
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Proposed Plan */}
        <div className="space-y-2">
          <Label
            htmlFor="proposedPlan"
            className="text-sm font-medium text-gray-700"
          >
            Proposed Plan
          </Label>
          <Input
            id="proposedPlan"
            type="text"
            placeholder="Text Input: e.g., Pay in three equal installments by Jan 30, Mar 30, May 30."
            value={proposedPlan}
            onChange={(e) => setProposedPlan(e.target.value)}
          />
        </div>

        {/* Attachment Field */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Attachment Field
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full h-auto min-h-[60px] py-4 px-4 border-dashed bg-gray-50 hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center w-full text-center">
              {selectedFile ? (
                <span className="text-sm text-gray-600">
                  {selectedFile.name}
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  Upload Supporting Documents (e.g., Medical Bills, Income
                  Proof)
                </span>
              )}
            </div>
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
