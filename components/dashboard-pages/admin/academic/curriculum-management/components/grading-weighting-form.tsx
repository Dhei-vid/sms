"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";

interface GradingWeightingFormProps {
  formData: {
    creditUnits: string;
    continuousAssessment: string;
    finalExam: string;
  };
  onFormDataChange: (data: Partial<GradingWeightingFormProps["formData"]>) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onSaveContinue: () => void;
}

export function GradingWeightingForm({
  formData,
  onFormDataChange,
  onBack,
  onSaveDraft,
  onSaveContinue,
}: GradingWeightingFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Grading & Weighting
      </h3>

      <InputField
        label="Credit Units"
        placeholder="E.g., 3"
        type="number"
        value={formData.creditUnits}
        onChange={(e) => onFormDataChange({ creditUnits: e.target.value })}
      />

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Assessment Breakdown Table
        </h4>

        <InputField
          label="Continuous Assessment (CA)"
          placeholder="E.g., 40"
          type="number"
          value={formData.continuousAssessment}
          onChange={(e) =>
            onFormDataChange({ continuousAssessment: e.target.value })
          }
        />

        <InputField
          label="Final Exam"
          placeholder="E.g., 60%"
          value={formData.finalExam}
          onChange={(e) => onFormDataChange({ finalExam: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="outline" onClick={onSaveDraft}>
          Save as Draft
        </Button>
        <Button className="w-60" onClick={onSaveContinue}>
          Save & Continue
        </Button>
      </div>
    </div>
  );
}

