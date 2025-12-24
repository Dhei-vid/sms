"use client";

import { useRef, useState, Dispatch, SetStateAction } from "react";
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
import { InputField, SelectField } from "@/components/ui/input-field";
import DatePickerIcon from "@/components/ui/date-picker";

interface TeacherLeaveRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeacherLeaveRequestModal({
  open,
  onOpenChange,
}: TeacherLeaveRequestModalProps) {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState("");
  const [reason, setReason] = useState("");
  const [coverStaff, setCoverStaff] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setLeaveType("");
      setStartDate(undefined);
      setEndDate(undefined);
      setDuration("");
      setReason("");
      setCoverStaff("");
      setSelectedFile(null);
    }
    onOpenChange(isOpen);
  };

  const calculateDuration = (
    start: Date | undefined,
    end: Date | undefined
  ) => {
    if (!start || !end) {
      setDuration("");
      return;
    }
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.max(
      Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1,
      0
    );
    if (!Number.isFinite(diffDays) || diffDays <= 0) {
      setDuration("");
      return;
    }
    setDuration(`${diffDays} day${diffDays > 1 ? "s" : ""}`);
  };

  /**
   * Handle start date change
   * Updates start date state and recalculates duration
   * Accepts SetStateAction to match DatePickerIcon's expected type
   * 
   * @param value - New date value or updater function
   */
  const handleStartDateChange: Dispatch<SetStateAction<Date | undefined>> = (
    value
  ) => {
    // Handle both direct value and updater function
    const newDate =
      typeof value === "function" ? value(startDate) : value;
    setStartDate(newDate);
    calculateDuration(newDate, endDate);
  };

  /**
   * Handle end date change
   * Updates end date state and recalculates duration
   * Accepts SetStateAction to match DatePickerIcon's expected type
   * 
   * @param value - New date value or updater function
   */
  const handleEndDateChange: Dispatch<SetStateAction<Date | undefined>> = (
    value
  ) => {
    // Handle both direct value and updater function
    const newDate = typeof value === "function" ? value(endDate) : value;
    setEndDate(newDate);
    calculateDuration(startDate, newDate);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    // Handle submission (e.g., call API)
    console.log("Teacher leave request:", {
      leaveType,
      startDate,
      endDate,
      duration,
      reason,
      coverStaff,
      file: selectedFile,
    });
    handleClose(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Submit New Leave Request"
      size="lg"
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Submit Request
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Leave Type */}
        <SelectField
          label="Leave Type"
          value={leaveType}
          onValueChange={setLeaveType}
          placeholder="Dropdown: Annual Leave, Sick Leave, Casual Leave, Compassionate Leave."
        >
          <SelectItem value="annual">Annual Leave</SelectItem>
          <SelectItem value="sick">Sick Leave</SelectItem>
          <SelectItem value="casual">Casual Leave</SelectItem>
          <SelectItem value="compassionate">Compassionate Leave</SelectItem>
        </SelectField>

        {/* Start & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerIcon
            label="Start Date"
            date={startDate}
            setDate={handleStartDateChange}
            placeholder="mm/dd/yy"
          />
          <DatePickerIcon
            label="End Date"
            date={endDate}
            setDate={handleEndDateChange}
            placeholder="mm/dd/yy"
          />
        </div>

        {/* Duration */}
        <InputField
          label="Duration"
          placeholder="Calculated according to date selected"
          value={duration}
          readOnly
        />

        {/* Reason / Justification */}
        <div className="space-y-2">
          <Label
            htmlFor="teacher-leave-reason"
            className="text-sm font-medium text-gray-700"
          >
            Reason/Justification
          </Label>
          <Textarea
            id="teacher-leave-reason"
            placeholder="Detailed explanation of the circumstances necessitating the request."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[120px]"
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
                <span className="text-sm text-gray-500">Upload document</span>
              )}
            </div>
          </Button>
        </div>

        {/* Academic Cover Requirement */}
        <SelectField
          label="Academic Cover Requirement"
          value={coverStaff}
          onValueChange={setCoverStaff}
          placeholder="Dropdown: Select staff to cover in absence"
        >
          <SelectItem value="ms-zara-a">Ms. Zara A.</SelectItem>
          <SelectItem value="mr-adebayo-k">Mr. Adebayo K.</SelectItem>
          <SelectItem value="ms-fatima-b">Ms. Fatima B.</SelectItem>
          <SelectItem value="mr-femi-t">Mr. Femi T.</SelectItem>
        </SelectField>
      </div>
    </ModalContainer>
  );
}
