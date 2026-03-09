"use client";

import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { CheckboxField } from "@/components/ui/checkbox-field";
import type { SubscriptionState } from "./add-school-form-state";
import { MODULE_IDS } from "./add-school-form-state";

// API
import { useGetSubscriptionsQuery } from "@/services/subscriptions/subscriptions";

const MODULE_LABELS: Record<string, string> = {
  academic_management: "Academic Management",
  cbt_management: "CBT Management",
  timetabling: "Timetabling",
  learning_management: "Learning Management",
  assessment: "Assessment",
  wallet: "Wallet",
};

interface SubscriptionFormProps {
  value: SubscriptionState;
  onChange: (next: SubscriptionState) => void;
  onSubmit: () => void;
  onBack: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function SubscriptionForm({
  value,
  onChange,
  onSubmit,
  onBack,
  onCancel,
  isSubmitting,
}: SubscriptionFormProps) {
  const { data: subscriptionsData } = useGetSubscriptionsQuery();
  const setModule = (id: string, checked: boolean) => {
    onChange({
      ...value,
      modules: { ...value.modules, [id]: checked },
    });
  };

  const subscriptions = subscriptionsData?.data ?? [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Subscription & Feature Gating
      </h2>

      <div className="space-y-2">
        <SelectField
          label="subscription plan"
          placeholder="Choose a plan"
          value={value.subscription_id}
          onValueChange={(subscriptionId) => {
            const selected = subscriptions.find((s) => s.id === subscriptionId);
            onChange({
              ...value,
              subscription_id: subscriptionId ?? "",
              plan: selected?.plan ?? value.plan,
            });
          }}
        >
          <SelectItem value={"none"}>Select a subscription plan</SelectItem>
          {subscriptions
            .filter((sub) => sub.status === "available")
            .map((sub) => (
              <SelectItem key={sub.id} value={sub.id}>
                {sub.plan}
              </SelectItem>
            ))}
        </SelectField>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-800">Module Toggles</h3>
        <p className="text-xs text-muted-foreground">
          Manually enabling/disabling specific features based on their needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {MODULE_IDS.map((id) => (
            <CheckboxField
              key={id}
              id={id}
              label={MODULE_LABELS[id] ?? id}
              checked={value.modules[id] ?? false}
              onCheckedChange={(checked) => setModule(id, !!checked)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-800">Capacity Quotas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <InputField
            label="Student Limit"
            placeholder="e.g., Cap at 1,000 students"
            value={value.studentLimit}
            onChange={(e) =>
              onChange({ ...value, studentLimit: e.target.value })
            }
          />
          <InputField
            label="Staff Limit"
            placeholder="e.g., Cap at 100 teachers"
            value={value.staffLimit}
            onChange={(e) => onChange({ ...value, staffLimit: e.target.value })}
          />
          <InputField
            label="Storage Limit"
            placeholder="e.g., 50GB for file uploads"
            value={value.storageLimit}
            onChange={(e) =>
              onChange({ ...value, storageLimit: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-800">
          Payment Gateway Config
        </h3>
        <SelectField
          label="Payment Gateway"
          placeholder="placeholder"
          value={value.paymentGateway}
          onValueChange={(v) => onChange({ ...value, paymentGateway: v })}
        >
          <SelectItem value="paystack">Paystack</SelectItem>
          <SelectItem value="flutterwave">Flutterwave</SelectItem>
        </SelectField>
        <p className="text-xs text-muted-foreground">
          Linking their Paystack/Flutterwave API keys so fee payments go
          directly to their bank account.
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating…" : "Confirm & Create School"}
        </Button>
      </div>
    </div>
  );
}
