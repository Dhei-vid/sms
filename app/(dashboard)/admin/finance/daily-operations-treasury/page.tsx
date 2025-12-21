"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import {
  Tick01Icon,
  ArrowUp02Icon,
  PayByCheckIcon,
  SaleTag01Icon,
  KanbanIcon,
  WalletAdd02Icon,
  ContractsIcon,
} from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { formattedAmount } from "@/common/helper";

import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { ActivityItem } from "@/components/ui/activity-item";
import {
  DataTable,
  TableColumn,
} from "@/components/ui/data-table";
import { ProgressBar } from "@/components/ui/progress-bar";

interface BudgetItem {
  id: string;
  category: string;
  annualBudget: number;
  budgetConsumed: number;
  consumedPercentage: number;
  color: string;
}

interface ActivityItem {
  id: string;
  icon: any;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

interface QuickAction {
  icon: any;
  title: string;
  description: string;
}

const budgetItems: BudgetItem[] = [
  {
    id: "1",
    category: "Utilities",
    annualBudget: 20000000,
    budgetConsumed: 15000000,
    consumedPercentage: 75,
    color: "bg-teal-500",
  },
  {
    id: "2",
    category: "Maintenance",
    annualBudget: 15000000,
    budgetConsumed: 12000000,
    consumedPercentage: 80,
    color: "bg-orange-500",
  },
  {
    id: "3",
    category: "Administrative Supplies",
    annualBudget: 5000000,
    budgetConsumed: 2500000,
    consumedPercentage: 50,
    color: "bg-blue-500",
  },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    icon: Tick01Icon,
    iconColor: "text-green-600",
    title: "Alumni Donation",
    description: "₦500,000 Alumni Donation - Source: Mr. B. Adekunle",
    time: "10:00 AM",
  },
  {
    id: "2",
    icon: ArrowUp02Icon,
    iconColor: "text-red-600",
    title: "Monthly Salaries Batch",
    description: "₦4,500,000.00 paid salary to staffs",
    time: "10:00 AM",
  },
  {
    id: "3",
    icon: ArrowUp02Icon,
    iconColor: "text-red-600",
    title: "IT Maintenance",
    description: "₦120,000 IT Maintenance - Vendor: Tech Solutions",
    time: "10:00 AM",
  },
  {
    id: "4",
    icon: Tick01Icon,
    iconColor: "text-green-600",
    title: "Alumni Donation",
    description: "₦500,000 Alumni Donation - Source: Mr. B. Adekunle",
    time: "10:00 AM",
  },
  {
    id: "5",
    icon: ArrowUp02Icon,
    iconColor: "text-red-600",
    title: "Canteen Purchase",
    description: "₦120,000 purchase made from vendor for the canteen",
    time: "10:00 AM",
  },
];

const quickActions: QuickAction[] = [
  {
    icon: PayByCheckIcon,
    title: "Add New Expense/Income",
    description: "Entry form for recording non-fee transactions.",
  },
  {
    icon: SaleTag01Icon,
    title: "Wallet & Canteen Sales",
    description: "Canteen sales monitoring & reconciliation",
  },
  {
    icon: KanbanIcon,
    title: "Process Creditor Payment",
    description: "Pay upcoming Accounts Payable",
  },
  {
    icon: WalletAdd02Icon,
    title: "Add Wallet Top-Up (Manual)",
    description: "Process an offline/cash deposit",
  },
  {
    icon: ContractsIcon,
    title: "Budget Status Report",
    description: "Deep dive into Budget Tracking",
  },
];

const timeRangeOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function DailyOperationsTreasuryPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("weekly");

  const budgetColumns: TableColumn<BudgetItem>[] = [
    {
      key: "category",
      title: "Categories",
      render: (value) => (
        <span className="text-sm font-medium text-gray-700">{value}</span>
      ),
    },
    {
      key: "annualBudget",
      title: "Annual Budget",
      render: (value) => (
        <span className="text-sm text-gray-800">{formattedAmount(value)}</span>
      ),
    },
    {
      key: "budgetConsumed",
      title: "Budget Consumed",
      className: "min-w-[400px]",
      render: (value, row) => (
        <ProgressBar
          value={value}
          total={row.annualBudget}
          barColor={row.color}
          displayAmount={value}
          showLabel={false}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Daily Operations & Treasury Overview Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This dashboard focuses on liquidity, transactional volume, and budget
          control, providing real-time data from wallet, canteen, and general
          accounting features.
        </p>
      </div>

      {/* Overview Metrics */}
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
          title="Total Wallet Liability"
          value={120000}
          subtitle="+2% increase on short term debt"
          currency
          trend="up"
          trendColor="text-green-600"
        />
        <FinancialMetricCard
          title="Budget Consumption Rate"
          value="78% YTD"
          subtitle="+5% Compared to last academic year"
          trend="up"
          trendColor="text-red-600"
        />
        <FinancialMetricCard
          title="Unpaid Creditor Bills (7 Days)"
          value={520000}
          subtitle="Immediate cash outflow forecast"
          currency
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Budget vs. Actuals Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Budget vs. Actuals Summary
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              A simple report showing consumption against the allocated budget,
              critical for cost control.
            </p>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <DataTable
                columns={budgetColumns}
                data={budgetItems}
                headerClassName="bg-main-blue/5"
                showActionsColumn={false}
              />
            </div>
            <div className={"pt-4 w-full flex justify-center"}>
              <Button variant={"outline"} className={"w-full"}>
                View Full Budget Breakdown
              </Button>
            </div>
          </CardContent>
        </Card>

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
                  placeholder="Weekly"
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
                {["Mon", "Tue", "Wed", "Thurs", "Fri"].map((day, index) => (
                  <div
                    key={day}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="w-full flex gap-1 items-end justify-center h-full">
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{
                          height: `${40 + index * 10}%`,
                        }}
                      />
                      <div
                        className="w-full bg-orange-500 rounded-t"
                        style={{
                          height: `${35 + index * 8}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{day}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                View Statistics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Financial Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Financial Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 divide-y divide-gray-200">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                icon={activity.icon}
                iconColor={activity.iconColor}
                title={activity.title}
                description={activity.description}
                time={activity.time}
              />
            ))}
            <div className="flex justify-center pt-2">
              <Button variant="outline">Load more</Button>
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
                  if (action.title === "Add New Expense/Income") {
                    console.log("Modal should open here");
                  }
                  if (action.title === "Wallet & Canteen Sales") {
                    router.push("daily-operations-treasury/canteen-operations");
                  }
                  if (action.title === "Process Creditor Payment") {
                    router.push("daily-operations-treasury/canteen-operations");
                  }
                  if (action.title === "Add Wallet Top-Up (Manual)") {
                    router.push("daily-operations-treasury/canteen-operations");
                  }
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
