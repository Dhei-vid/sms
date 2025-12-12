"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import DatePickerIcon from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";

interface GradingScoreEntryFormProps {
  formData: {
    scoreSubmissionDeadlineDate: Date | undefined;
    scoreSubmissionDeadlineTime: string;
    finalGradeWeight: string;
    scaleType: string;
  };
  onFormDataChange: (
    data: Partial<GradingScoreEntryFormProps["formData"]>
  ) => void;
  onBack: () => void;
  onCancel: () => void;
  onSaveSetup: () => void;
  scaleTypeOptions: { value: string; label: string }[];
}

export function GradingScoreEntryForm({
  formData,
  onFormDataChange,
  onBack,
  onCancel,
  onSaveSetup,
  scaleTypeOptions,
}: GradingScoreEntryFormProps) {
  const [deadlineDateOpen, setDeadlineDateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Grading and Score Entry Rules
      </h3>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Score Submission Deadline
        </h4>

        <DatePickerIcon
          label="Date"
          date={formData.scoreSubmissionDeadlineDate}
          setDate={(date) => {
            onFormDataChange({
              scoreSubmissionDeadlineDate:
                typeof date === "function"
                  ? date(formData.scoreSubmissionDeadlineDate)
                  : date,
            });
          }}
          open={deadlineDateOpen}
          setOpen={setDeadlineDateOpen}
          placeholder="mm/dd/yy"
        />

        <TimePicker
          label="Time"
          time={formData.scoreSubmissionDeadlineTime}
          setTime={(time) => {
            const newTime =
              typeof time === "function"
                ? time(formData.scoreSubmissionDeadlineTime)
                : time;
            onFormDataChange({
              scoreSubmissionDeadlineTime: newTime,
            });
          }}
        />
      </div>

      <InputField
        label="Final Grade Weight (%)"
        placeholder="E.g., 60"
        type="number"
        value={formData.finalGradeWeight}
        onChange={(e) => onFormDataChange({ finalGradeWeight: e.target.value })}
      />

      <SelectField
        label="Scale Type"
        value={formData.scaleType}
        onValueChange={(value) => onFormDataChange({ scaleType: value })}
        placeholder="Choose Numerical (0-100) / Letter Grade (A-F)"
      >
        {scaleTypeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="w-60" onClick={onSaveSetup}>
          Save Setup
        </Button>
      </div>
    </div>
  );
}
