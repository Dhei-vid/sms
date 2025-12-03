"use client";

import { useState } from "react";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";

export function FinancialPayrollForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    monthlySalary: "150000",
    bankName: "Zenith",
    accountNumber: "0012345678",
    taxId: "1234567890",
  });

  const banks = [
    "Zenith",
    "Access Bank",
    "First Bank",
    "GTBank",
    "UBA",
    "Fidelity Bank",
    "Stanbic IBTC",
    "Union Bank",
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log("Financial & Payroll:", formData);
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Financial & Payroll
      </h2>

      <div className="space-y-6">
        <InputField
          id="monthlySalary"
          label="Monthly Salary/Wage"
          placeholder="placeholder"
          value={formData.monthlySalary}
          onChange={(e) =>
            setFormData({ ...formData, monthlySalary: e.target.value })
          }
        />

        <SelectField
          label="Bank Name"
          placeholder="Select bank name"
          value={formData.bankName}
          onValueChange={(value) =>
            setFormData({ ...formData, bankName: value })
          }
        >
          {banks.map((bank) => (
            <SelectItem key={bank} value={bank}>
              {bank}
            </SelectItem>
          ))}
        </SelectField>

        <InputField
          id="accountNumber"
          label="Account Number"
          placeholder="placeholder"
          value={formData.accountNumber}
          onChange={(e) =>
            setFormData({ ...formData, accountNumber: e.target.value })
          }
        />

        <InputField
          id="taxId"
          label="Tax ID/Pension No."
          placeholder="placeholder"
          value={formData.taxId}
          onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

