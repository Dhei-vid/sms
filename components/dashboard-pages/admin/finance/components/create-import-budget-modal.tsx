"use client";

import { useState, useRef } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";

const initialData = {
  importFile: null as File | null,
  fiscalYear: "",
  budgetCategory: "",
  budgetTitle: "",
  budgetAmount: "",
};

interface CreateImportBudgetForm {
  importFile: File | null;
  fiscalYear: string;
  budgetCategory: string;
  budgetTitle: string;
  budgetAmount: string;
}

interface CreateImportBudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateImportBudgetModal({
  open,
  onOpenChange,
}: CreateImportBudgetModalProps) {
  const [formData, setFormData] = useState<CreateImportBudgetForm>(initialData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    // Handle form submission
    console.log("Create/Import budget submitted", {
      ...formData,
    });
    // Reset form and close modal
    setFormData(initialData);
    onOpenChange(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when modal closes
      setFormData(initialData);
    }
    onOpenChange(open);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, importFile: file }));
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const fiscalYearOptions = [
    { value: "2026-2027", label: "Academic year 2026/2027" },
    { value: "2025-2026", label: "Academic year 2025/2026" },
    { value: "2024-2025", label: "Academic year 2024/2025" },
  ];

  const budgetCategoryOptions = [
    { value: "expenses", label: "Expenses" },
    { value: "income", label: "Income" },
  ];

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Create or Import New Budget"
      size="2xl"
    >
      <div className="space-y-6 py-4">
          {/* Import from Template */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Import from Template (Excel/CSV)
            </Label>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleFileButtonClick}
                className="w-full h-10 justify-center gap-2"
              >
                Import file
              </Button>
              {formData.importFile && (
                <p className="text-xs text-gray-600 mt-1">
                  Selected: {formData.importFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Budget Fiscal Year */}
          <SelectField
            label="Budget Fiscal Year"
            value={formData.fiscalYear}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, fiscalYear: value }))
            }
            placeholder="Select fiscal year: E.g., Academic year 2026/2027"
          >
            {fiscalYearOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          {/* Budget Category */}
          <SelectField
            label="Budget Category"
            value={formData.budgetCategory}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, budgetCategory: value }))
            }
            placeholder="E.g., expenses or Income"
          >
            {budgetCategoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectField>

          {/* Budget Title */}
          <InputField
            label="Budget Title"
            placeholder="E.g., Salaries, Utilities"
            type="text"
            value={formData.budgetTitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, budgetTitle: e.target.value }))
            }
          />

          {/* Budget Amount */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Budget Amount (₦)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                ₦
              </span>
              <Input
                type="number"
                placeholder="placeholder"
                value={formData.budgetAmount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    budgetAmount: e.target.value,
                  }))
                }
                className="pl-8"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save & Approve Budget</Button>
          </div>
        </div>
    </ModalContainer>
  );
}
