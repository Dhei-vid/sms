"use client";

import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { TableWithCheckboxColumn } from "@/components/ui/table-with-checkbox-column";

export interface FeatureCategory {
  id: string;
  name: string;
  modules: { id: string; label: string }[];
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: "core_academics",
    name: "Core Academics",
    modules: [
      { id: "gradebook", label: "Gradebook" },
      { id: "report_card", label: "Report Card Generation" },
      { id: "attendance", label: "Attendance" },
      { id: "lesson_notes", label: "Lesson Notes" },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    modules: [
      { id: "student_wallet", label: "Student Wallet" },
      { id: "expense_management", label: "Expense Management" },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    modules: [
      { id: "canteen_pos", label: "Canteen POS" },
      { id: "library_management", label: "Library Management" },
    ],
  },
  {
    id: "premium_tools",
    name: "Premium Tools",
    modules: [
      { id: "bulk_sms", label: "Bulk SMS" },
      { id: "cbt", label: "CBT" },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    modules: [
      { id: "parent_portal", label: "Parent Portal" },
      { id: "live_chat", label: "Live Chat Support" },
    ],
  },
];

export interface UsageQuotasState {
  studentCapacity: string;
  staffCapacity: string;
  cloudStorage: string;
  monthlySmsUnits: string;
}

export interface FeatureGatingState {
  modules: Record<string, boolean>;
  usageQuotas: UsageQuotasState;
}

interface FeatureGatingFormProps {
  value: FeatureGatingState;
  onChange: (next: FeatureGatingState) => void;
  onSubmit: () => void;
  onBack: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function FeatureGatingForm({
  value,
  onChange,
  onSubmit,
  onBack,
  onCancel,
  isSubmitting = false,
}: FeatureGatingFormProps) {
  const setCategoryModules = (category: FeatureCategory, checked: boolean) => {
    const next = { ...value.modules };
    category.modules.forEach((mod) => {
      next[mod.id] = checked;
    });
    onChange({ ...value, modules: next });
  };

  const isCategoryChecked = (category: FeatureCategory) =>
    category.modules.every((m) => value.modules[m.id]);

  const setQuota = <K extends keyof UsageQuotasState>(
    key: K,
    val: UsageQuotasState[K],
  ) => {
    onChange({
      ...value,
      usageQuotas: { ...value.usageQuotas, [key]: val },
    });
  };

  const quotas = value.usageQuotas;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Feature Gating & Usage Quotas
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Feature Gating
          </h3>
          <div className="rounded-lg border border-border overflow-hidden">
            <TableWithCheckboxColumn
              columns={[
                {
                  key: "name",
                  title: "Feature Category",
                  className: "border-r border-border py-4 px-4",
                  headerClassName: "border-r border-border py-3 px-4",
                  render: (_, row) => (
                    <span className="font-medium text-gray-800">
                      {row.name}
                    </span>
                  ),
                },
                {
                  key: "modules",
                  title: "Individual Module Toggles",
                  className:
                    "py-4 pl-5 pr-4 text-sm text-muted-foreground whitespace-normal",
                  headerClassName: "py-3 pl-5 pr-4",
                  render: (_, row) =>
                    `${row.modules.map((m) => m.label).join(", ")}.`,
                },
              ]}
              data={FEATURE_CATEGORIES}
              getChecked={isCategoryChecked}
              onCheckedChange={setCategoryModules}
              emptyMessage="No feature categories."
              headerClassName="bg-main-blue/10 hover:bg-main-blue/10 border-b border-border font-medium text-gray-800"
              rowClassName="border-b border-border"
              tableClassName="border-border"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Usage Quotas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Student Capacity"
              placeholder="e.g., Basic: 200 Students"
              value={quotas.studentCapacity}
              onChange={(e) => setQuota("studentCapacity", e.target.value)}
            />
            <InputField
              label="Staff/Teacher Capacity"
              placeholder="e.g., Basic: 20 Staff"
              value={quotas.staffCapacity}
              onChange={(e) => setQuota("staffCapacity", e.target.value)}
            />
            <InputField
              label="Cloud Storage"
              placeholder="e.g., 50GB for assignment uploads"
              value={quotas.cloudStorage}
              onChange={(e) => setQuota("cloudStorage", e.target.value)}
            />
            <div className="space-y-2">
              <InputField
                label="Monthly SMS Units"
                placeholder='How many "free" notifications are included in the plan?'
                value={quotas.monthlySmsUnits}
                onChange={(e) => setQuota("monthlySmsUnits", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Confirm & Update"}
        </Button>
      </div>
    </div>
  );
}

export function getInitialFeatureGatingState(): FeatureGatingState {
  const modules: Record<string, boolean> = {};
  FEATURE_CATEGORIES.forEach((cat) => {
    cat.modules.forEach((mod) => {
      modules[mod.id] = false;
    });
  });
  return {
    modules,
    usageQuotas: {
      studentCapacity: "",
      staffCapacity: "",
      cloudStorage: "",
      monthlySmsUnits: "",
    },
  };
}
