"use client";

import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";

interface TemplateSelectionFormProps {
  selectedTemplate: string;
  templateName: string;
  templateDescription: string;
  onTemplateChange: (value: string) => void;
  onTemplateNameChange: (value: string) => void;
  onTemplateDescriptionChange: (value: string) => void;
}

const templateOptions = [
  { value: "hod", label: "HOD (Head of Department)" },
  { value: "teacher", label: "Teacher" },
  { value: "exam-officer", label: "Exam Officer" },
  { value: "finance-admin", label: "Finance Admin" },
  { value: "academic-dean", label: "Academic Dean" },
  { value: "super-admin", label: "Super Admin" },
];

export function TemplateSelectionForm({
  selectedTemplate,
  templateName,
  templateDescription,
  onTemplateChange,
  onTemplateNameChange,
  onTemplateDescriptionChange,
}: TemplateSelectionFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Template Selection and Overview
        </h3>
      </div>

      <div className="space-y-6">
        <SelectField
          label="Select Template to Edit"
          value={selectedTemplate}
          onValueChange={onTemplateChange}
          placeholder="Dropdown Select"
        >
          {templateOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>

        <div className="space-y-2">
          <InputField
            label="Template Name"
            value={templateName}
            onChange={(e) => onTemplateNameChange(e.target.value)}
            placeholder="placeholder"
          />
          <p className="text-sm text-gray-600">Allows renaming the template.</p>
        </div>

        <div className="space-y-2">
          <TextareaField
            label="Template Description"
            value={templateDescription}
            onChange={(e) => onTemplateDescriptionChange(e.target.value)}
            placeholder=""
            className="min-h-[100px]"
          />
          <p className="text-sm text-gray-600">
            Notes on the typical duties and intended access level for this role.
          </p>
        </div>
      </div>
    </div>
  );
}
