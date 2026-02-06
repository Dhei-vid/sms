"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Icon } from "@/components/general/huge-icon";
import {
  KanbanIcon,
  TransactionHistoryIcon,
  PayByCheckIcon,
  DiscountIcon,
  ViewIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { formattedAmount } from "@/common/helper";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  date: string;
  type: string;
  amount: number;
  accountCategory: string;
  reference: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    date: "Oct. 31, 2025, 11:32AM",
    type: "Expense",
    amount: 4500000,
    accountCategory: "Salaries & Wages",
    reference: "AP-BATCH-1101-001",
  },
  {
    id: "2",
    date: "Oct. 31, 2025, 11:32AM",
    type: "Income",
    amount: 4500000,
    accountCategory: "Utilities",
    reference: "AP-BATCH-1101-001",
  },
  {
    id: "3",
    date: "Oct. 31, 2025, 11:32AM",
    type: "Income",
    amount: 4500000,
    accountCategory: "Curriculum/Resource",
    reference: "AP-BATCH-1101-001",
  },
  {
    id: "4",
    date: "Oct. 31, 2025, 11:32AM",
    type: "Expense",
    amount: 4500000,
    accountCategory: "Student Activities/Sports",
    reference: "AP-BATCH-1101-001",
  },
  {
    id: "5",
    date: "",
    type: "Income",
    amount: 4500000,
    accountCategory: "Marketing & Admissions",
    reference: "AP-BATCH-1101-001",
  },
];

const quickActions = [
  {
    icon: PayByCheckIcon,
    title: "Add New Expense/Income",
    description: "Entry form for recording non-fee transactions.",
  },
  {
    icon: DiscountIcon,
    title: "Add New Vendor",
    description: "Links to the Vendor Management form",
  },
  {
    icon: KanbanIcon,
    title: "Process Creditor Payment",
    description: "Pay upcoming Accounts Payable",
  },
  {
    icon: TransactionHistoryIcon,
    title: "Vendor Management",
    description: "Add and manage active vendors",
  },
];

const sortOptions = [
  { value: "all", label: "ALL" },
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

const timeRangeOptions = [
  { value: "6-months", label: "6-Months" },
  { value: "3-months", label: "3-Months" },
  { value: "1-year", label: "1-Year" },
];

export default function GeneralAccountingPage() {
  const [sortBy, setSortBy] = useState("all");
  const [timeRange, setTimeRange] = useState("6-months");

  const filteredActivities =
    sortBy === "all"
      ? activities
      : activities.filter(
          (activity) => activity.type.toLowerCase() === sortBy.toLowerCase(),
        );

  const getTypeColor = (type: string) => {
    if (type.toLowerCase() === "expense") {
      return "text-red-600";
    } else if (type.toLowerCase() === "income") {
      return "text-green-600";
    }
    return "text-gray-600";
  };

  const activityColumns: TableColumn<ActivityItem>[] = [
    {
      key: "date",
      title: "Date",
      render: (value) => (
        <span className="text-sm text-gray-600">{value || "-"}</span>
      ),
    },
    {
      key: "type",
      title: "Type",
      render: (value) => (
        <span className={cn("text-sm font-medium", getTypeColor(value))}>
          {value}
        </span>
      ),
    },
    {
      key: "amount",
      title: "Amount (₦)",
      render: (value) => (
        <span className="font-semibold">{formattedAmount(value)}</span>
      ),
    },
    {
      key: "accountCategory",
      title: "Account Category",
      className: "text-sm text-gray-600",
    },
    {
      key: "reference",
      title: "Reference",
      className: "text-sm text-gray-600",
    },
  ];

  const actions: TableAction<ActivityItem>[] = [
    {
      type: "button",
      config: {
        label: "",
        onClick: () => {},
        variant: "ghost",
        icon: <Icon icon={ViewIcon} size={16} />,
        className: "h-8 w-8",
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">General Accounting</h2>
        <p className="text-gray-600 mt-1">
          The centralized control panel for expense tracking, and creditor
          management.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinancialMetricCard
          title="Net Available Cash"
          value={12580000}
          subtitle="+1.5% Compared to last month"
          currency
          trend="up"
          trendColor="text-green-600"
        />
        <FinancialMetricCard
          title="Unpaid Creditor Bills (7 Days)"
          value={520000}
          subtitle="Immediate cash outflow forecast"
          currency
          trend="up"
        />
        <FinancialMetricCard
          title="Total Non-Fee Income YTD"
          value={950000}
          subtitle="+20% increase on intended budget"
          currency
          trend="up"
          trendColor="text-green-600"
        />
        <FinancialMetricCard
          title="Active Vendors"
          value={12}
          subtitle="+2% Compared to last term"
          trend="up"
          trendColor="text-green-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cash Flow Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Cash Flow Trend
              </CardTitle>
              <div className="w-32">
                <SelectField
                  label=""
                  value={timeRange}
                  onValueChange={setTimeRange}
                  placeholder="6-Months"
                >
                  {timeRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Legend */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-green-500" />
                  <span className="text-gray-600">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-orange-500" />
                  <span className="text-gray-600">Expenses</span>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-64 flex items-end justify-between gap-2 border rounded-lg p-4">
                {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (month, index) => (
                    <div
                      key={month}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="w-full flex gap-1 items-end justify-center h-full">
                        <div
                          className="w-full bg-green-500 rounded-t"
                          style={{
                            height: `${40 + index * 8}%`,
                          }}
                        />
                        <div
                          className="w-full bg-orange-500 rounded-t"
                          style={{
                            height: `${35 + index * 6}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{month}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                icon={action.icon}
                description={action.description}
                onClick={() => {
                  // Handle action click
                  console.log(action.title);
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Activity Log
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="w-32">
                <SelectField
                  label=""
                  value={sortBy}
                  onValueChange={setSortBy}
                  placeholder="Sort by: ALL"
                >
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Icon icon={Download01Icon} size={16} />
                Download Statement
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={activityColumns}
              data={filteredActivities}
              actions={actions}
              headerClassName="bg-main-blue/5"
              emptyMessage="No activities found"
              emptyMessageClassName="h-32 text-center text-gray-500"
              showActionsColumn={true}
              actionsColumnTitle=""
              actionsColumnClassName="w-12"
            />
          </div>
          <div className="flex justify-center pt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
