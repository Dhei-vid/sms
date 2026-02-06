"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/input-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerIcon from "@/components/ui/date-picker";
import type { ApplicationStatusState } from "./admission-form-state";

export function ApplicationStatusForm({
  value,
  onChange,
  onBack,
  onCancel,
  onSubmit,
  isSubmitting,
}: {
  value: ApplicationStatusState;
  onChange: (next: ApplicationStatusState) => void;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}) {
  const formData = value;
  const setFormData = onChange;
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const dateValue = formData.dateSubmitted
    ? new Date(formData.dateSubmitted)
    : undefined;
  const setDateValue = (d: React.SetStateAction<Date | undefined>) => {
    const next = typeof d === "function" ? d(dateValue) : d;
    setFormData({
      ...formData,
      dateSubmitted: next ? format(next, "yyyy-MM-dd") : "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Application Status
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="initialStatus">Initial Status</Label>
          <Select
            value={formData.initialStatus}
            onValueChange={(value) =>
              setFormData({ ...formData, initialStatus: value })
            }
          >
            <SelectTrigger id="initialStatus" className="w-full">
              <SelectValue placeholder="Select applicant status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Applicant</SelectItem>
              <SelectItem value="pending">Pending Interview</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="accepted">Application Accepted</SelectItem>
              <SelectItem value="rejected">Application Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TextareaField
          id="adminNotes"
          label="Admin Notes"
          placeholder="text"
          value={formData.adminNotes}
          onChange={(e) =>
            setFormData({ ...formData, adminNotes: e.target.value })
          }
          rows={4}
        />

        <DatePickerIcon
          label="Date Submitted"
          date={dateValue}
          setDate={setDateValue}
          placeholder="yyyy-mm-dd"
          open={datePickerOpen}
          setOpen={setDatePickerOpen}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          {isSubmitting ? "Submitting…" : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}
