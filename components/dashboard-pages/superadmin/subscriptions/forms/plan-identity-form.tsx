"use client";

import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";

export interface PlanIdentityState {
  planName: string;
  planDescription: string;
  currency: string;
  monthlyPrice: string;
  termlyPrice: string;
  annualPrice: string;
  setupFee: string;
}

const CURRENCIES = [
  { value: "NGN", label: "Naira (₦)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "GBP", label: "British Pound (£)" },
];

interface PlanIdentityFormProps {
  value: PlanIdentityState;
  onChange: (next: PlanIdentityState) => void;
  onNext: () => void;
  onCancel: () => void;
}

export function PlanIdentityForm({
  value,
  onChange,
  onNext,
  onCancel,
}: PlanIdentityFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Plan Identity, Pricing & Billing Logic
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Plan Identity
          </h3>
          <div className="space-y-4">
            <InputField
              label="Plan Name"
              placeholder="e.g., Starter, Professional, Elite, Custom"
              value={value.planName}
              onChange={(e) => onChange({ ...value, planName: e.target.value })}
            />
            <TextareaField
              label="Plan Description"
              placeholder="e.g., 'Best for small primary schools'"
              value={value.planDescription}
              onChange={(e) =>
                onChange({ ...value, planDescription: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Pricing & Billing Logic
          </h3>
          <div className="space-y-4">
            <SelectField
              label="Currency Support"
              value={value.currency}
              onValueChange={(v) => onChange({ ...value, currency: v })}
            >
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectField>

            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Frequency Options
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Monthly Price"
                  placeholder="Standard recurring fee"
                  value={value.monthlyPrice}
                  onChange={(e) =>
                    onChange({ ...value, monthlyPrice: e.target.value })
                  }
                />
                <InputField
                  label="Termly Price"
                  placeholder="Price"
                  value={value.termlyPrice}
                  onChange={(e) =>
                    onChange({ ...value, termlyPrice: e.target.value })
                  }
                />
                <InputField
                  label="Annual Price"
                  placeholder="Price"
                  value={value.annualPrice}
                  onChange={(e) =>
                    onChange({ ...value, annualPrice: e.target.value })
                  }
                />
              </div>
            </div>

            <InputField
              label="Setup Fee"
              placeholder="Price"
              value={value.setupFee}
              onChange={(e) => onChange({ ...value, setupFee: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onNext}>
          Confirm & Update
        </Button>
      </div>
    </div>
  );
}

export function getInitialPlanIdentityState(): PlanIdentityState {
  return {
    planName: "",
    planDescription: "",
    currency: "NGN",
    monthlyPrice: "",
    termlyPrice: "",
    annualPrice: "",
    setupFee: "",
  };
}
