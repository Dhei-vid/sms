"use client";

import { useState, Dispatch, SetStateAction, useRef } from "react";
import { SelectField, TextareaField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function EmploymentStatusForm({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [openDate, setOpenDate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    currentStatus: "Active",
    newStatus: "",
    effectiveDate: undefined as Date | undefined,
    reason: "",
    document: null as File | null,
  });

  const statusOptions = [
    "Active",
    "On Leave",
    "Suspended",
    "Terminated",
    "Resigned",
    "Retired",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, document: file });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Employment Status Update:", formData);
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Update Employment Status
      </h2>

      <div className="space-y-6">
        <div className="flex flex-row gap-3">
          <Label>Current Status</Label>
          <div>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium",
                formData.currentStatus === "Active"
                  ? "bg-green-100 text-green-700 border border-green-600"
                  : "bg-gray-100 text-gray-700 border border-gray-600",
              )}
            >
              {formData.currentStatus}
            </span>
          </div>
        </div>

        <SelectField
          label="New Status"
          placeholder="Select employee new status"
          value={formData.newStatus}
          onValueChange={(value) =>
            setFormData({ ...formData, newStatus: value })
          }
        >
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectField>

        <DatePickerIcon
          label="Effective Date"
          date={formData.effectiveDate}
          setDate={(date) =>
            setFormData({
              ...formData,
              effectiveDate:
                typeof date === "function"
                  ? date(formData.effectiveDate)
                  : date,
            })
          }
          open={openDate}
          setOpen={setOpenDate}
        />

        <TextareaField
          id="reason"
          label="Reason for Change"
          placeholder="placeholder"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          rows={4}
        />

        <div className="space-y-2">
          <Label htmlFor="document">Upload Final Document</Label>
          <input
            ref={fileInputRef}
            type="file"
            id="document"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            File Upload
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Confirm & Update Status
        </Button>
      </div>
    </div>
  );
}
