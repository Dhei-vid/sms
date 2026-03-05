"use client";

import { format, parseISO } from "date-fns";
import { type TableColumn } from "@/components/ui/data-table";
import { TableWithCheckboxColumn } from "@/components/ui/table-with-checkbox-column";
import {
  FEATURE_CATEGORIES,
  type FeatureCategory,
} from "@/components/dashboard-pages/superadmin/subscriptions/forms/feature-gating-form";
import {
  getSchoolSubscriptionDisplay,
  type KeyValueRow,
} from "../school-detail-types";
import { SchoolDetailKeyValueTable } from "./school-detail-key-value-table";
import type { School } from "@/services/schools/schools-type";

function capitalizePlan(plan: string | null | undefined): string {
  if (plan == null || plan === "—") return "—";
  return String(plan).charAt(0).toUpperCase() + String(plan).slice(1);
}

function buildSubscriptionRows(school: School): KeyValueRow[] {
  const sub = getSchoolSubscriptionDisplay(school);
  return [
    { label: "Current Plan", value: capitalizePlan(sub.planName) },
    {
      label: "Status",
      value: (
        <span className="text-main-blue font-medium capitalize">
          {String(sub.status)}
        </span>
      ),
    },
    {
      label: "Start Date",
      value: sub.startDate
        ? format(parseISO(sub.startDate), "yyyy-MM-dd")
        : "—",
    },
  ];
}

const FEATURE_GATING_COLUMNS: TableColumn<FeatureCategory>[] = [
  {
    key: "name",
    title: "Feature Category",
    className: "border-r border-border py-4 px-4",
    headerClassName: "border-r border-border py-3 px-4",
    render: (_, row) => (
      <span className="font-medium text-gray-800">{row.name}</span>
    ),
  },
  {
    key: "modules",
    title: "Individual Module Toggles",
    className: "py-4 pl-5 pr-4 text-sm text-muted-foreground whitespace-normal",
    headerClassName: "py-3 pl-5 pr-4",
    render: (_, row) => `${row.modules.map((m) => m.label).join(", ")}.`,
  },
];

interface SchoolSubscriptionPanelProps {
  school: School;
}

export function SchoolSubscriptionPanel({
  school,
}: SchoolSubscriptionPanelProps) {
  const sub = getSchoolSubscriptionDisplay(school);
  const subscriptionRows = buildSubscriptionRows(school);
  const isCategoryEnabled = (cat: FeatureCategory) =>
    cat.modules.some((m) => sub.enabledFeatureIds.includes(m.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Subscription & Settings
        </h2>
        <SchoolDetailKeyValueTable rows={subscriptionRows} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Feature Gating
        </h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <TableWithCheckboxColumn<FeatureCategory>
            columns={FEATURE_GATING_COLUMNS}
            data={FEATURE_CATEGORIES}
            getChecked={isCategoryEnabled}
            readOnly
            emptyMessage="No feature categories."
            headerClassName="bg-main-blue/10 hover:bg-main-blue/10 border-b border-border font-medium text-gray-800"
            rowClassName="border-b border-border"
            tableClassName="border-border"
          />
        </div>
      </div>
    </div>
  );
}
