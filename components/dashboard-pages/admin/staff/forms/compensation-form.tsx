"use client";

import { InputField, TextareaField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

interface CompensationFormProps {
  formData: {
    salaryRange: string;
    allowances: string;
    recruitmentBudget: string;
  };
  onFormDataChange: (data: Partial<CompensationFormProps["formData"]>) => void;
  onSubmit: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function CompensationForm({
  formData,
  onFormDataChange,
  onSubmit,
  onBack,
  onCancel,
}: CompensationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Compensation & Internal Budget
        </h3>
        <p className="text-sm text-gray-600">
          This sensitive information is for internal use, recruitment analysis,
          and payroll budget approval.
        </p>

        <InputField
          label="Salary Range"
          placeholder="Budgeted range for the role"
          value={formData.salaryRange}
          onChange={(e) => onFormDataChange({ salaryRange: e.target.value })}
          required
        />

        <TextareaField
          label="Allowances"
          placeholder="E.g., Housing Allowance, Transport Allowance"
          value={formData.allowances}
          onChange={(e) => onFormDataChange({ allowances: e.target.value })}
          rows={3}
        />

        <InputField
          label="Recruitment Budget"
          placeholder="Total amount allocated for advertising, agency fees, etc."
          value={formData.recruitmentBudget}
          onChange={(e) =>
            onFormDataChange({ recruitmentBudget: e.target.value })
          }
          required
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="w-60" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
