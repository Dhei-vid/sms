"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import TimePicker from "@/components/ui/time-picker";

const initialData = {
  applyTo: "",
  maxDailySpend: "",
  resetTime: "",
  policyReference: "",
};

interface SetDailySpendingLimitForm {
  applyTo: string;
  maxDailySpend: string;
  resetTime: string;
  policyReference: string;
}

interface SetDailySpendingLimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SetDailySpendingLimitModal({
  open,
  onOpenChange,
}: SetDailySpendingLimitModalProps) {
  const [formData, setFormData] =
    useState<SetDailySpendingLimitForm>(initialData);

  const handleSubmit = () => {
    // Handle form submission
    console.log("Set daily spending limit submitted", {
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

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Set Daily Spending Limit"
      size="2xl"
    >
      <div className="space-y-6 py-4">
        {/* Apply To */}
        <InputField
          label="Apply To:"
          placeholder="E.g., All Students, Specific Grade/Class, Individual Student"
          type="text"
          value={formData.applyTo}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              applyTo: e.target.value,
            }))
          }
        />

        {/* Max Daily Spend */}
        <InputField
          label="Max Daily Spend (₦)"
          placeholder="placeholder"
          type="number"
          value={formData.maxDailySpend}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              maxDailySpend: e.target.value,
            }))
          }
        />

        {/* Reset Time */}
        <TimePicker
          label="Reset Time"
          time={formData.resetTime}
          setTime={(time) =>
            setFormData((prev) => ({
              ...prev,
              resetTime:
                typeof time === "function"
                  ? (time(prev.resetTime) as string)
                  : (time as string),
            }))
          }
        />

        {/* Policy Reference */}
        <InputField
          label="Policy Reference"
          placeholder='E.g., "Parent requested low limit for dietary control."'
          type="text"
          value={formData.policyReference}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              policyReference: e.target.value,
            }))
          }
        />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Apply Limit & Notify Parents</Button>
        </div>
      </div>
    </ModalContainer>
  );
}
