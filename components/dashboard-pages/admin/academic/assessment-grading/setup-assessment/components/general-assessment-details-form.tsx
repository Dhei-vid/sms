"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";

interface GeneralAssessmentDetailsFormProps {
  formData: {
    assessmentName: string;
    assessmentType: string;
    applicableGrades: string;
    applicableSubjects: string;
    totalMarksAvailable: string;
  };
  onFormDataChange: (data: Partial<GeneralAssessmentDetailsFormProps["formData"]>) => void;
  onCancel: () => void;
  onSaveSetup: () => void;
  assessmentTypeOptions: { value: string; label: string }[];
  gradeOptions: { value: string; label: string }[];
}

export function GeneralAssessmentDetailsForm({
  formData,
  onFormDataChange,
  onCancel,
  onSaveSetup,
  assessmentTypeOptions,
  gradeOptions,
}: GeneralAssessmentDetailsFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        General Assessment Details
      </h3>

      <InputField
        label="Assessment Name"
        placeholder="E.g., First Term Final Examination"
        value={formData.assessmentName}
        onChange={(e) => onFormDataChange({ assessmentName: e.target.value })}
      />

      <SelectField
        label="Assessment Type"
        value={formData.assessmentType}
        onValueChange={(value) => onFormDataChange({ assessmentType: value })}
        placeholder="Choose assessment type (Exam (Summative), Continuous Assessment (CA), Project, Lab Practical)"
      >
        {assessmentTypeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <SelectField
        label="Applicable Grade(s)"
        value={formData.applicableGrades}
        onValueChange={(value) => onFormDataChange({ applicableGrades: value })}
        placeholder="Choose grades (JSS1, SS2, Primary 5, etc.)"
      >
        {gradeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <InputField
        label="Applicable Subject(s)"
        placeholder="E.g., Mathematics, Biology, English."
        value={formData.applicableSubjects}
        onChange={(e) => onFormDataChange({ applicableSubjects: e.target.value })}
      />

      <InputField
        label="Total Marks Available"
        placeholder="E.g., 100 marks"
        value={formData.totalMarksAvailable}
        onChange={(e) => onFormDataChange({ totalMarksAvailable: e.target.value })}
      />

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

