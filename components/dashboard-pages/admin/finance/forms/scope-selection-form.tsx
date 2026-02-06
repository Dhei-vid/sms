"use client";

import { useState } from "react";
import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import DatePickerIcon from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

interface ScopeSelectionFormProps {
  formData: {
    startInvoiceNumber: string;
    academicTerm: string;
    gradeClass: string;
    paymentDeadline: Date | undefined;
    note: string;
  };
  onFormDataChange: (
    data: Partial<ScopeSelectionFormProps["formData"]>,
  ) => void;
  onNext: () => void;
  onCancel: () => void;
}

export function ScopeSelectionForm({
  formData,
  onFormDataChange,
  onNext,
  onCancel,
}: ScopeSelectionFormProps) {
  const [openPaymentDeadline, setOpenPaymentDeadline] =
    useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Configuration and Scope Selection
        </h3>

        <InputField
          label="Start Invoice Number"
          placeholder="E.g., 2025-T2-0001"
          value={formData.startInvoiceNumber}
          onChange={(e) =>
            onFormDataChange({ startInvoiceNumber: e.target.value })
          }
          required
        />

        <SelectField
          label="Academic Term"
          value={formData.academicTerm}
          onValueChange={(value) => onFormDataChange({ academicTerm: value })}
          placeholder="Select academic term or year"
          required
        >
          <SelectItem value="2024-2025-t1">
            2024/2025 - First Term (T1)
          </SelectItem>
          <SelectItem value="2024-2025-t2">
            2024/2025 - Second Term (T2)
          </SelectItem>
          <SelectItem value="2024-2025-t3">
            2024/2025 - Third Term (T3)
          </SelectItem>
          <SelectItem value="2025-2026-t1">
            2025/2026 - First Term (T1)
          </SelectItem>
          <SelectItem value="2025-2026-t2">
            2025/2026 - Second Term (T2)
          </SelectItem>
        </SelectField>

        <SelectField
          label="Grade/Class"
          value={formData.gradeClass}
          onValueChange={(value) => onFormDataChange({ gradeClass: value })}
          placeholder="E.g., JSS2, Primary 5-A"
          required
        >
          <SelectItem value="primary-1">Primary 1</SelectItem>
          <SelectItem value="primary-2">Primary 2</SelectItem>
          <SelectItem value="primary-3">Primary 3</SelectItem>
          <SelectItem value="primary-4">Primary 4</SelectItem>
          <SelectItem value="primary-5">Primary 5</SelectItem>
          <SelectItem value="primary-6">Primary 6</SelectItem>
          <SelectItem value="jss-1">JSS 1</SelectItem>
          <SelectItem value="jss-2">JSS 2</SelectItem>
          <SelectItem value="jss-3">JSS 3</SelectItem>
          <SelectItem value="sss-1">SSS 1</SelectItem>
          <SelectItem value="sss-2">SSS 2</SelectItem>
          <SelectItem value="sss-3">SSS 3</SelectItem>
        </SelectField>

        <DatePickerIcon
          open={openPaymentDeadline}
          setOpen={setOpenPaymentDeadline}
          label="Payment Deadline"
          date={formData.paymentDeadline}
          setDate={(date) => {
            if (typeof date === "function") {
              onFormDataChange({
                paymentDeadline: date(formData.paymentDeadline),
              });
            } else {
              onFormDataChange({ paymentDeadline: date });
            }
          }}
          placeholder="mm/dd/yy"
        />

        <TextareaField
          label="Note on Invoice (optional)"
          placeholder='E.g., "Late payment penalty of 5% applies after due date."'
          value={formData.note}
          onChange={(e) => onFormDataChange({ note: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="w-60">
          Preview Recipients
        </Button>
      </div>
    </form>
  );
}
