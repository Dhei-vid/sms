"use client";

import { useState } from "react";
import { SelectField, TextareaField } from "@/components/ui/input-field";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ManageLeaveBalanceForm({
  onCancel,
  onApply,
}: {
  onCancel: () => void;
  onApply: () => void;
}) {
  const [formData, setFormData] = useState({
    currentBalance: 10,
    leaveType: "",
    adjustmentValue: "",
    reason: "",
  });

  const leaveTypes = [
    "Annual Leave",
    "Sick Leave",
    "Casual Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Study Leave",
    "Emergency Leave",
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log("Leave Balance Adjustment:", formData);
    if (onApply) {
      onApply();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Manage Leave Balance
      </h2>

      <div className="space-y-6">
        <div className="flex flex-row gap-3">
          <Label>Current Leave Balance</Label>
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-medium text-xs border text-muted-foreground">
              {formData.currentBalance} Days Remaining
            </span>
          </div>
        </div>

        <SelectField
          label="Leave Type"
          placeholder="Select leave type"
          value={formData.leaveType}
          onValueChange={(value) =>
            setFormData({ ...formData, leaveType: value })
          }
        >
          {leaveTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectField>

        <InputField
          id="adjustmentValue"
          label="Adjustment Value"
          placeholder="placeholder"
          type="number"
          value={formData.adjustmentValue}
          onChange={(e) =>
            setFormData({ ...formData, adjustmentValue: e.target.value })
          }
        />

        <TextareaField
          id="reason"
          label="Reason for Adjustment"
          placeholder="placeholder"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          rows={4}
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
          Apply
        </Button>
      </div>
    </div>
  );
}
