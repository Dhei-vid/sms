"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DeploySchedulingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduleAndActivate?: (data: {
    exam: string;
    venue: string;
    invigilator: string;
  }) => void;
}

const examOptions = [
  { value: "ss2-biology-midterm", label: "SS2 Biology Mid-Term" },
  { value: "jss3-arts-crafts", label: "JSS 3 Arts & Crafts CBT Examination" },
  { value: "ss1-chemistry", label: "SS1 Chemistry Final Exam" },
  { value: "jss1-computer-science", label: "JSS1 Computer Science Quiz" },
];

const venueOptions = [
  { value: "cbt-lab-1", label: "CBT Lab 1" },
  { value: "hall-a", label: "Hall A" },
  { value: "library-annex", label: "Library Annex" },
  { value: "cbt-lab-2", label: "CBT Lab 2" },
];

const invigilatorOptions = [
  { value: "ms-zara-a", label: "Ms. Zara A." },
  { value: "mr-adebayo-k", label: "Mr. Adebayo K." },
  { value: "ms-fatima-b", label: "Ms. Fatima B." },
  { value: "mr-femi-t", label: "Mr. Femi T." },
];

export function DeploySchedulingModal({
  open,
  onOpenChange,
  onScheduleAndActivate,
}: DeploySchedulingModalProps) {
  const [exam, setExam] = useState("");
  const [venue, setVenue] = useState("");
  const [invigilator, setInvigilator] = useState("");

  const handleCancel = () => {
    setExam("");
    setVenue("");
    setInvigilator("");
    onOpenChange(false);
  };

  const handleScheduleAndActivate = () => {
    if (exam && venue && invigilator) {
      if (onScheduleAndActivate) {
        onScheduleAndActivate({ exam, venue, invigilator });
      }
      handleCancel();
    }
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Deployment & Scheduling Center"
      size="2xl"
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleScheduleAndActivate}
            disabled={!exam || !venue || !invigilator}
          >
            Schedule & Activate
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Select Exam to Deploy */}
        <SelectField
          label="Select Exam to Deploy"
          value={exam}
          onValueChange={setExam}
          placeholder="Dropdown Search: Lists all 'Finalized' CBT exams (e.g., SS2 Biology Mid-Term)"
        >
          {examOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>

        {/* Testing Venue */}
        <SelectField
          label="Testing Venue"
          value={venue}
          onValueChange={setVenue}
          placeholder="Dropdown Select: CBT Lab 1, Hall A, Library Annex"
        >
          {venueOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>

        {/* Invigilator Assignment */}
        <SelectField
          label="Invigilator Assignment"
          value={invigilator}
          onValueChange={setInvigilator}
          placeholder="Staff Directory Search"
        >
          {invigilatorOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>
      </div>
    </ModalContainer>
  );
}
