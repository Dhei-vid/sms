"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SubjectIdentityScopeFormProps {
  formData: {
    mode: "create" | "edit";
    selectedSubject: string;
    subjectName: string;
    subjectCode: string;
    applicableGrade: string;
    headOfDepartment: string;
  };
  onFormDataChange: (data: Partial<SubjectIdentityScopeFormProps["formData"]>) => void;
  onSaveDraft: () => void;
  onSaveContinue: () => void;
  gradeOptions: { value: string; label: string }[];
  hodOptions: { value: string; label: string }[];
}

export function SubjectIdentityScopeForm({
  formData,
  onFormDataChange,
  onSaveDraft,
  onSaveContinue,
  gradeOptions,
  hodOptions,
}: SubjectIdentityScopeFormProps) {
  const subjectOptions = [
    { value: "integrated-science", label: "Integrated Science" },
    { value: "mathematics", label: "Mathematics" },
    { value: "english", label: "English" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Subject Identity & Scope
      </h3>

      {/* Mode Selection */}
      <div className="flex gap-2 border rounded-md p-1">
        <Button
          type="button"
          variant={formData.mode === "create" ? "default" : "outline"}
          onClick={() => onFormDataChange({ mode: "create" })}
          className={cn(
            "flex-1",
            formData.mode === "create"
              ? "bg-main-blue/5 text-main-blue hover:bg-main-blue/10"
              : "bg-white text-gray-700 hover:bg-main-blue/5 border-0 shadow-none"
          )}
        >
          Create New Subject
        </Button>
        <Button
          type="button"
          variant={formData.mode === "edit" ? "default" : "outline"}
          onClick={() => onFormDataChange({ mode: "edit" })}
          className={cn(
            "flex-1",
            formData.mode === "edit"
              ? "bg-main-blue/5 text-main-blue hover:bg-main-blue/10"
              : "bg-white text-gray-700 hover:bg-main-blue/5 border-0 shadow-none"
          )}
        >
          Edit Existing Subject
        </Button>
      </div>

      {formData.mode === "edit" ? (
        <SelectField
          label="Select Subject"
          value={formData.selectedSubject}
          onValueChange={(value) => onFormDataChange({ selectedSubject: value })}
          placeholder="E.g., Integrated Science"
        >
          {subjectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>
      ) : (
        <InputField
          label="Subject Name"
          placeholder="E.g., Integrated Science"
          value={formData.subjectName}
          onChange={(e) => onFormDataChange({ subjectName: e.target.value })}
        />
      )}

      <InputField
        label="Subject Code"
        placeholder="E.g., ISC-JSS2"
        value={formData.subjectCode}
        onChange={(e) => onFormDataChange({ subjectCode: e.target.value })}
      />

      <SelectField
        label="Applicable Grade/ Class"
        value={formData.applicableGrade}
        onValueChange={(value) => onFormDataChange({ applicableGrade: value })}
        placeholder="E.g., JSS1, JSS2, JSS3, etc."
      >
        {gradeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <SelectField
        label="Head of Department (HOD)"
        value={formData.headOfDepartment}
        onValueChange={(value) => onFormDataChange({ headOfDepartment: value })}
        placeholder="Select from Staff Directory"
      >
        {hodOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectField>

      <div className="flex justify-end gap-3 pt-4">
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

