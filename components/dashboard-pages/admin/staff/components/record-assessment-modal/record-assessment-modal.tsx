"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";

interface RecordAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  role: string;
  onRecord?: (data: AssessmentData) => void;
}

export interface AssessmentData {
  assessmentType: string;
  interviewer: string;
  rating: string;
  note: string;
}

export function RecordAssessmentModal({
  open,
  onOpenChange,
  candidateName,
  role,
  onRecord,
}: RecordAssessmentModalProps) {
  const [formData, setFormData] = useState<AssessmentData>({
    assessmentType: "",
    interviewer: "",
    rating: "",
    note: "",
  });

  const handleSubmit = () => {
    if (onRecord) {
      onRecord(formData);
    }
    // Reset form
    setFormData({
      assessmentType: "",
      interviewer: "",
      rating: "",
      note: "",
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      assessmentType: "",
      interviewer: "",
      rating: "",
      note: "",
    });
    onOpenChange(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Record Assessment"
      size="md"
    >
      <div className="space-y-4 py-4">
        <InputField
          label="Candidate Name"
          value={candidateName}
          disabled
          readOnly
        />
        <InputField label="Role" value={role} disabled readOnly />
        <SelectField
          label="Assessment Type"
          value={formData.assessmentType}
          onValueChange={(value) =>
            setFormData({ ...formData, assessmentType: value })
          }
          placeholder="Select assessment type"
        >
          <SelectItem value="technical">Technical Assessment</SelectItem>
          <SelectItem value="behavioral">Behavioral Assessment</SelectItem>
          <SelectItem value="panel">Panel Interview</SelectItem>
          <SelectItem value="final">Final Interview</SelectItem>
        </SelectField>
        <InputField
          label="Interviewer"
          value={formData.interviewer}
          onChange={(e) =>
            setFormData({ ...formData, interviewer: e.target.value })
          }
          placeholder="Enter interviewer name"
        />
        <SelectField
          label="Rating"
          value={formData.rating}
          onValueChange={(value) => setFormData({ ...formData, rating: value })}
          placeholder="Select rating"
        >
          <SelectItem value="5">5 - Excellent</SelectItem>
          <SelectItem value="4">4 - Very Good</SelectItem>
          <SelectItem value="3">3 - Good</SelectItem>
          <SelectItem value="2">2 - Fair</SelectItem>
          <SelectItem value="1">1 - Poor</SelectItem>
        </SelectField>
        <TextareaField
          label="Note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Enter assessment notes"
          rows={4}
        />
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Record Assessment</Button>
      </div>
    </ModalContainer>
  );
}
