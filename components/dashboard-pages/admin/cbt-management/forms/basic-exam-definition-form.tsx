"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";

interface BasicExamDefinitionFormProps {
  formData: {
    schoolId: string;
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
  schoolOptions: { value: string; label: string }[];
  subjectOptions: { value: string; label: string }[];
  gradeOptions: { value: string; label: string }[];
  examModeOptions: { value: string; label: string }[];
  isLoadingSchools?: boolean;
  isLoadingSubjects?: boolean;
}

export function BasicExamDefinitionForm({
  formData,
  onFormDataChange,
  onCancel,
  onNext,
  schoolOptions,
  subjectOptions,
  gradeOptions,
  examModeOptions,
  isLoadingSchools = false,
  isLoadingSubjects = false,
}: BasicExamDefinitionFormProps) {
  const totalMarksNum = formData.totalMarks.trim() !== "" ? parseInt(formData.totalMarks, 10) : NaN;
  const totalMarksInvalid = !isNaN(totalMarksNum) && totalMarksNum < 100;
  const totalMarksError = formData.totalMarks.trim() !== "" && (isNaN(totalMarksNum) || totalMarksInvalid);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Basic Exam Definition
      </h3>

      <SelectField
        label="School"
        value={formData.schoolId}
        onValueChange={(value) => onFormDataChange({ schoolId: value })}
        placeholder={isLoadingSchools ? "Loading schools…" : "Select a school"}
        disabled={isLoadingSchools}
      >
        {schoolOptions.length > 0 ? (
          schoolOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="__none__" disabled>
            {isLoadingSchools ? "Loading…" : "No schools found"}
          </SelectItem>
        )}
      </SelectField>

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
        placeholder={isLoadingSubjects ? "Loading subjects…" : "Dropdown Select: (e.g., Biology)"}
        disabled={isLoadingSubjects}
      >
        {subjectOptions.length > 0 ? (
          subjectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="__none__" disabled>
            {isLoadingSubjects ? "Loading…" : "No subjects found"}
          </SelectItem>
        )}
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

      <div className="space-y-1">
        <InputField
          label="Total Marks"
          type="number"
          min={100}
          placeholder="e.g. 100 (minimum 100)"
          value={formData.totalMarks}
          onChange={(e) => onFormDataChange({ totalMarks: e.target.value })}
          className={totalMarksError ? "border-destructive" : undefined}
          aria-invalid={totalMarksError}
        />
        {totalMarksError && (
          <p className="text-sm text-destructive">
            Total marks must be 100 or greater.
          </p>
        )}
      </div>

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
        <Button className="w-60" onClick={onNext} disabled={totalMarksError}>
          Next
        </Button>
      </div>
    </div>
  );
}
