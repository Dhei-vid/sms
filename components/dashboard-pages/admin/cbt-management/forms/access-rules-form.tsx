"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import DatePickerIcon from "@/components/ui/date-picker";
import { TimeInput } from "@/components/ui/time-input";

interface AccessRulesFormProps {
  formData: {
    date: Date | undefined;
    time: string;
    maxAttempts: string;
    displayResults: string;
    locationVenue: string;
  };
  onFormDataChange: (data: Partial<AccessRulesFormProps["formData"]>) => void;
  onBack: () => void;
  onCancel: () => void;
  onSaveAndSelectQuestions: () => void;
  displayResultsOptions: { value: string; label: string }[];
  isLoading?: boolean;
}

export function AccessRulesForm({
  formData,
  onFormDataChange,
  onBack,
  onCancel,
  onSaveAndSelectQuestions,
  displayResultsOptions,
  isLoading = false,
}: AccessRulesFormProps) {
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Security and Access Rules
      </h3>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Start/End Window
        </h4>

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <DatePickerIcon
              label="Date"
              date={formData.date}
              setDate={(date) => {
                onFormDataChange({
                  date: typeof date === "function" ? date(formData.date) : date,
                });
              }}
              open={dateOpen}
              setOpen={setDateOpen}
              placeholder="mm/dd/yy"
            />
          </div>
          <div className="flex-1">
            <TimeInput
              label="Time Input"
              time={formData.time}
              setTime={(time) => {
                const newTime =
                  typeof time === "function" ? time(formData.time) : time;
                onFormDataChange({ time: newTime });
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800">Max Attempts</h4>
        <p className="text-sm text-gray-600">
          Limits how many times a student can take the test.
        </p>
        <InputField
          label=""
          type="number"
          placeholder="Number Input (e.g., 1)"
          value={formData.maxAttempts}
          onChange={(e) => onFormDataChange({ maxAttempts: e.target.value })}
        />
      </div>

      <InputField
        label="Testing Venue (Location)"
        value={formData.locationVenue}
        onChange={(e) => onFormDataChange({ locationVenue: e.target.value })}
        placeholder="e.g. CBT Lab 1, Hall A (optional)"
      />

      <SelectField
        label="Display Results"
        value={formData.displayResults}
        onValueChange={(value) => onFormDataChange({ displayResults: value })}
        placeholder="Dropdown Select: Never / Immediately / After Exam Window Closes"
      >
        {displayResultsOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="w-60"
          onClick={onSaveAndSelectQuestions}
          disabled={isLoading}
        >
          {isLoading ? "Creating…" : "Save & Select Questions"}
        </Button>
      </div>
    </div>
  );
}
