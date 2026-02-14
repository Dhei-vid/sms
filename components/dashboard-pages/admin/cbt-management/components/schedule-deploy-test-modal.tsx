"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/input-field";
import { InputField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ExamOption {
  value: string;
  label: string;
}

interface InvigilatorOption {
  value: string;
  label: string;
}

interface DeploySchedulingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Exam options from API */
  examOptions?: ExamOption[];
  /** Suggested venues (e.g. distinct CbtExam.location_venue from API); user can type any string */
  venueSuggestions?: string[];
  /** Invigilator options (e.g. teachers from API) */
  invigilatorOptions?: InvigilatorOption[];
  onScheduleAndActivate?: (data: {
    exam: string;
    venue: string;
    invigilator: string;
  }) => void;
}

export function DeploySchedulingModal({
  open,
  onOpenChange,
  examOptions = [],
  venueSuggestions = [],
  invigilatorOptions = [],
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
    if (exam && venue.trim() && invigilator) {
      if (onScheduleAndActivate) {
        onScheduleAndActivate({ exam, venue: venue.trim(), invigilator });
      }
      handleCancel();
    }
  };

  const venueListId = "deploy-venue-list";

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
            disabled={!exam || !venue.trim() || !invigilator}
          >
            Schedule & Activate
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Select Exam to Deploy - from API */}
        <SelectField
          label="Select Exam to Deploy"
          value={exam}
          onValueChange={setExam}
          placeholder={
            examOptions.length > 0
              ? "Select a finalized CBT exam"
              : "No exams available"
          }
        >
          {examOptions.length > 0 ? (
            examOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="__none__" disabled>
              No exams available
            </SelectItem>
          )}
        </SelectField>

        {/* Testing Venue - free text, CbtExam.location_venue; suggestions from existing exams */}
        <div className="space-y-2">
          <InputField
            label="Testing Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="e.g. CBT Lab 1, Hall A (any text)"
            list={venueSuggestions.length > 0 ? venueListId : undefined}
          />
          {venueSuggestions.length > 0 && (
            <datalist id={venueListId}>
              {venueSuggestions.map((v) => (
                <option key={v} value={v} />
              ))}
            </datalist>
          )}
        </div>

        {/* Invigilator Assignment - from API (teachers) */}
        <SelectField
          label="Invigilator Assignment"
          value={invigilator}
          onValueChange={setInvigilator}
          placeholder={
            invigilatorOptions.length > 0
              ? "Select a teacher"
              : "No teachers available"
          }
        >
          {invigilatorOptions.length > 0 ? (
            invigilatorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="__none__" disabled>
              No teachers found
            </SelectItem>
          )}
        </SelectField>
      </div>
    </ModalContainer>
  );
}
