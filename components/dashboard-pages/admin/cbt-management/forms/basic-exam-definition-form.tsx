"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";

interface BasicExamDefinitionFormProps {
  formData: {
    examName: string;
    applicableSubject: string;
    applicableGrade: string;
    totalMarks: string;
    totalQuestions: string;
    timeAllowed: string;
    examMode: string;
  };
  onFormDataChange: (
    data: Partial<BasicExamDefinitionFormProps["formData"]>,
  ) => void;
  onCancel: () => void;
  onNext: () => void;
  subjectOptions: { value: string; label: string }[];
  gradeOptions: { value: string; label: string }[];
  examModeOptions: { value: string; label: string }[];
}

export function BasicExamDefinitionForm({
  formData,
  onFormDataChange,
  onCancel,
  onNext,
  subjectOptions,
  gradeOptions,
  examModeOptions,
}: BasicExamDefinitionFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Basic Exam Definition
      </h3>

      <InputField
        label="Exam Name"
        placeholder="E.g., SS2 Biology Mid-Term CBT"
        value={formData.examName}
        onChange={(e) => onFormDataChange({ examName: e.target.value })}
      />

      <SelectField
        label="Applicable Subject"
        value={formData.applicableSubject}
        onValueChange={(value) =>
          onFormDataChange({ applicableSubject: value })
        }
        placeholder="Dropdown Select: (e.g., Biology)"
      >
        {subjectOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <SelectField
        label="Applicable Grade"
        value={formData.applicableGrade}
        onValueChange={(value) => onFormDataChange({ applicableGrade: value })}
        placeholder="Dropdown Select: (e.g., SS2)"
      >
        {gradeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <InputField
        label="Total Marks"
        type="number"
        placeholder="Number Input (e.g., 50)"
        value={formData.totalMarks}
        onChange={(e) => onFormDataChange({ totalMarks: e.target.value })}
      />

      <InputField
        label="Total Questions"
        type="number"
        placeholder="Number Input (e.g., 50)"
        value={formData.totalQuestions}
        onChange={(e) => onFormDataChange({ totalQuestions: e.target.value })}
      />

      <InputField
        label="Time Allowed (Minutes)"
        type="number"
        placeholder="Number Input (e.g., 60)"
        value={formData.timeAllowed}
        onChange={(e) => onFormDataChange({ timeAllowed: e.target.value })}
      />

      <SelectField
        label="Exam Mode"
        value={formData.examMode}
        onValueChange={(value) => onFormDataChange({ examMode: value })}
        placeholder="Dropdown Select: Practice / Test / Final Exam"
      >
        {examModeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="w-60" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
