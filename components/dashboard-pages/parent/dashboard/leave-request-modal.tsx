"use client";

import { useState, useRef } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerIcon from "@/components/ui/date-picker";

interface LeaveRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveRequestModal({
  open,
  onOpenChange,
}: LeaveRequestModalProps) {
  const [requestType, setRequestType] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState<Date | undefined>(
    undefined
  );
  const [leaveEndDate, setLeaveEndDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when modal closes
      setRequestType("");
      setLeaveStartDate(undefined);
      setLeaveEndDate(undefined);
      setReason("");
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
    console.log("Leave request:", {
      requestType,
      leaveStartDate,
      leaveEndDate,
      reason,
      file: selectedFile,
    });
    // Reset form and close modal
    handleClose(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Leave Request Form"
      size="lg"
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
            Submit Leave Request
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
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student-leave">
                Student Leave of Absence
              </SelectItem>
              <SelectItem value="medical-leave">Medical Leave</SelectItem>
              <SelectItem value="emergency-leave">Emergency Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerIcon
            label="Leave Start Date"
            date={leaveStartDate}
            setDate={setLeaveStartDate}
            placeholder="Placeholder"
          />
          <DatePickerIcon
            label="Leave End Date"
            date={leaveEndDate}
            setDate={setLeaveEndDate}
            placeholder="Placeholder"
          />
        </div>

        {/* Reason for Absence */}
        <div className="space-y-2">
          <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
            Reason for Absence
          </Label>
          <Textarea
            id="reason"
            placeholder="Detailed explanation of the circumstances necessitating the request."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
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
