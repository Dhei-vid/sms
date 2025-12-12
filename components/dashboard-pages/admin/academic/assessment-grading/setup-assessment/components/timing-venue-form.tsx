"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import DatePickerIcon from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";

interface TimingVenueFormProps {
  formData: {
    startDate: Date | undefined;
    startTime: string;
    duration: string;
    locationVenue: string;
    assignInvigilators: string;
    questionPaperDeadlineDate: Date | undefined;
    questionPaperDeadlineTime: string;
  };
  onFormDataChange: (data: Partial<TimingVenueFormProps["formData"]>) => void;
  onBack: () => void;
  onCancel: () => void;
  onSaveSetup: () => void;
  invigilatorOptions: { value: string; label: string }[];
}

export function TimingVenueForm({
  formData,
  onFormDataChange,
  onBack,
  onCancel,
  onSaveSetup,
  invigilatorOptions,
}: TimingVenueFormProps) {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [deadlineDateOpen, setDeadlineDateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Schedule and Logistics (Timing & Venue)
      </h3>

      <DatePickerIcon
        label="Start Date"
        date={formData.startDate}
        setDate={(date) => {
          onFormDataChange({
            startDate:
              typeof date === "function" ? date(formData.startDate) : date,
          });
        }}
        open={startDateOpen}
        setOpen={setStartDateOpen}
        placeholder="mm/dd/yy"
      />

      <TimePicker
        label="Time"
        time={formData.startTime}
        setTime={(time) => {
          const newTime =
            typeof time === "function" ? time(formData.startTime) : time;
          onFormDataChange({
            startTime: newTime,
          });
        }}
      />

      <InputField
        label="Duration (Minutes)"
        placeholder="E.g., 120 minutes"
        type="number"
        value={formData.duration}
        onChange={(e) => onFormDataChange({ duration: e.target.value })}
      />

      <InputField
        label="Location/Venue"
        placeholder="E.g., Hall A, Classroom 3B, Chemistry Lab."
        value={formData.locationVenue}
        onChange={(e) => onFormDataChange({ locationVenue: e.target.value })}
      />

      <SelectField
        label="Assign Invigilators"
        value={formData.assignInvigilators}
        onValueChange={(value) =>
          onFormDataChange({ assignInvigilators: value })
        }
        placeholder="Choose from staff directory"
      >
        {invigilatorOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Question Paper Submission Deadline
        </h4>

        <DatePickerIcon
          label="Date"
          date={formData.questionPaperDeadlineDate}
          setDate={(date) => {
            onFormDataChange({
              questionPaperDeadlineDate:
                typeof date === "function"
                  ? date(formData.questionPaperDeadlineDate)
                  : date,
            });
          }}
          open={deadlineDateOpen}
          setOpen={setDeadlineDateOpen}
          placeholder="mm/dd/yy"
        />

        <TimePicker
          label="Time"
          time={formData.questionPaperDeadlineTime}
          setTime={(time) => {
            const newTime =
              typeof time === "function"
                ? time(formData.questionPaperDeadlineTime)
                : time;
            onFormDataChange({
              questionPaperDeadlineTime: newTime,
            });
          }}
        />
      </div>

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
