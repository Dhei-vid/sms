"use client";

import { useState, useEffect } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { TextareaField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectItem } from "@/components/ui/select";

interface DiscountRule {
  id: string;
  ruleName: string;
  discountValue: string;
  applicableTo: string;
  policyType: string;
  lastModified: string;
  modifiedBy: string;
  triggerCriteria: string;
}

interface RuleModificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule: DiscountRule | null;
  onSave?: (ruleId: string, data: RuleModificationData) => void;
}

interface RuleModificationData {
  ruleName: string;
  discountValue: string;
  triggerCriteria: string;
  policyType: string;
  statusControl: boolean;
  reasonForChange: string;
}

const policyTypeOptions = [
  { value: "automated", label: "Automated" },
  { value: "manual-approval", label: "Manual Approval" },
];

export function RuleModificationModal({
  open,
  onOpenChange,
  rule,
  onSave,
}: RuleModificationModalProps) {
  const [formData, setFormData] = useState<RuleModificationData>({
    ruleName: "",
    discountValue: "",
    triggerCriteria: "",
    policyType: "",
    statusControl: false,
    reasonForChange: "",
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        ruleName: rule.ruleName,
        discountValue: rule.discountValue,
        triggerCriteria: rule.triggerCriteria,
        policyType:
          rule.policyType === "Automated" ? "automated" : "manual-approval",
        statusControl: false,
        reasonForChange: "",
      });
    }
  }, [rule]);

  const handleClose = (open: boolean) => {
    if (!open) {
      if (rule) {
        setFormData({
          ruleName: rule.ruleName,
          discountValue: rule.discountValue,
          triggerCriteria: rule.triggerCriteria,
          policyType:
            rule.policyType === "Automated" ? "automated" : "manual-approval",
          statusControl: false,
          reasonForChange: "",
        });
      }
    }
    onOpenChange(open);
  };

  const handleSubmit = () => {
    if (rule && onSave) {
      onSave(rule.id, formData);
    }
    handleClose(false);
  };

  if (!rule) return null;

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Rule Modification"
      size="2xl"
    >
      <div className="space-y-6 py-4">
        <InputField
          label="Rule Name"
          placeholder="placeholder"
          value={formData.ruleName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, ruleName: e.target.value }))
          }
        />

        <InputField
          label="Discount Value"
          placeholder="placeholder"
          value={formData.discountValue}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              discountValue: e.target.value,
            }))
          }
        />

        <InputField
          label="Trigger Criteria"
          placeholder="placeholder"
          value={formData.triggerCriteria}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              triggerCriteria: e.target.value,
            }))
          }
        />

        <SelectField
          label="Policy Type"
          value={formData.policyType}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, policyType: value }))
          }
          placeholder="placeholder"
        >
          {policyTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Status Control</Label>
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-600 flex-1">
              Temporarily stop applying the rule without deleting it.
            </p>
            <Checkbox
              checked={formData.statusControl}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  statusControl: checked === true,
                }))
              }
            />
          </div>
        </div>

        <TextareaField
          label="Reason for Change"
          placeholder="placeholder"
          value={formData.reasonForChange}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              reasonForChange: e.target.value,
            }))
          }
          rows={4}
        />

        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes & Update Policy</Button>
        </div>
      </div>
    </ModalContainer>
  );
}
