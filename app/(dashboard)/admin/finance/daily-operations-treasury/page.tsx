"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import {
  PayByCheckIcon,
  SaleTag01Icon,
  KanbanIcon,
  WalletAdd02Icon,
  ContractsIcon,
  ArrowUpRight01Icon,
  ArrowDownLeft01Icon,
} from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { formattedAmount } from "@/common/helper";
import { Separator } from "@/components/ui/separator";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { ActivityItem } from "@/components/ui/activity-item";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { useGetAllTransactionsQuery } from "@/services/transactions/transactions";
import {
  selectTransactionsGroupedByCategory,
  selectAllTransactionsData,
} from "@/services/transactions/transaction-selectors";
import { useAppSelector } from "@/store/hooks";

/** Category bar colors for Budget vs Actual (consistent order) */
const BUDGET_CATEGORY_COLORS = [
  "bg-teal-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-sky-500",
];

interface BudgetItem {
  id: string;
  category: string;
  annualBudget: number;
  budgetConsumed: number;
  consumedPercentage: number;
  color: string;
}

interface QuickAction {
  icon: any;
  title: string;
  description: string;
}

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

interface CashFlowData {
  period: string;
  income: number;
  expenses: number;
}

export default function DailyOperationsTreasuryPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("weekly");

  const { isLoading: isTransactionLoading } = useGetAllTransactionsQuery();
  const transactions = useAppSelector(selectAllTransactionsData);
  const transactionsGroupedByCategory = useAppSelector(
    selectTransactionsGroupedByCategory,
  );

  const budgetTableData = useMemo((): BudgetItem[] => {
    return transactionsGroupedByCategory.map((g, i) => ({
      id: g.category,
      category: g.category,
      annualBudget: 0,
      budgetConsumed: g.totalAmount,
      consumedPercentage: g.percentageOfTotal,
      color: BUDGET_CATEGORY_COLORS[i % BUDGET_CATEGORY_COLORS.length],
    }));
  }, [transactionsGroupedByCategory]);

  const cashFlowData: CashFlowData[] = [];

  // Chart configuration
  const chartConfig = {
    income: {
      label: "Income",
      color: "#22c55e", // green-500
    },
    expenses: {
      label: "Expenses",
      color: "#f97316", // orange-500
    },
  } satisfies ChartConfig;

  const totalConsumed =
    budgetTableData.reduce((sum, row) => sum + row.budgetConsumed, 0) || 1;
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
        <span className="text-sm text-gray-800">
          {value > 0 ? formattedAmount(value) : "—"}
        </span>
      ),
    },
    {
      key: "budgetConsumed",
      title: "Actual (YTD)",
      className: "min-w-[400px]",
      render: (value, row) => (
        <ProgressBar
          value={value}
          total={row.annualBudget > 0 ? row.annualBudget : totalConsumed}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinancialMetricCard
          title="Net Available Cash"
          value="—"
          subtitle="No data"
        />
        <FinancialMetricCard
          title="Total Wallet Liability"
          value="—"
          subtitle="No data"
        />
        <FinancialMetricCard
          title="Budget Consumption Rate"
          value="—"
          subtitle="No data"
        />
        <FinancialMetricCard
          title="Unpaid Creditor Bills (7 Days)"
          value="—"
          subtitle="No data"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Budget vs. Actuals Summary – grouped by category from transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Budget vs. Actuals Summary
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Expense by category from transactions. Annual budget shown when
              available.
            </p>
          </CardHeader>
          <CardContent>
            {isTransactionLoading ? (
              <div className="border rounded-lg p-8 text-center text-muted-foreground text-sm">
                Loading transaction data…
              </div>
            ) : budgetTableData.length === 0 ? (
              <div className="border rounded-lg p-8 text-center text-muted-foreground text-sm">
                No budget data
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <DataTable
                  columns={budgetColumns}
                  data={budgetTableData}
                  headerClassName="bg-main-blue/5"
                  showActionsColumn={false}
                />
              </div>
            )}
            <div className={"pt-4 w-full flex justify-center mt-0"}>
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

              {cashFlowData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm border rounded-lg">
                  No cash flow data
                </div>
              ) : (
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <BarChart
                  data={cashFlowData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(value) => {
                      if (value >= 1000000) {
                        return `₦${(value / 1000000).toFixed(1)}M`;
                      } else if (value >= 1000) {
                        return `₦${(value / 1000).toFixed(0)}K`;
                      }
                      return `₦${value}`;
                    }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="border-border/50 bg-background rounded-lg border px-3 py-2 text-xs shadow-lg">
                          <div className="font-medium mb-2">
                            {payload[0]?.payload?.period}
                          </div>
                          <div className="space-y-1">
                            {payload.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between gap-4"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                      backgroundColor: item.color,
                                    }}
                                  />
                                  <span className="text-muted-foreground">
                                    {item.name === "income"
                                      ? "Income"
                                      : "Expenses"}
                                  </span>
                                </div>
                                <span className="font-semibold">
                                  {formattedAmount(item.value as number)}
                                </span>
                              </div>
                            ))}
                            <div className="pt-1 mt-1 border-t border-border/50">
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">
                                  Net
                                </span>
                                <span
                                  className={`font-semibold ${
                                    (payload[0]?.payload as CashFlowData)
                                      .income -
                                      (payload[0]?.payload as CashFlowData)
                                        .expenses >=
                                    0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {(payload[0]?.payload as CashFlowData)
                                    .income -
                                    (payload[0]?.payload as CashFlowData)
                                      .expenses >=
                                  0
                                    ? "+"
                                    : ""}
                                  {formattedAmount(
                                    (payload[0]?.payload as CashFlowData)
                                      .income -
                                      (payload[0]?.payload as CashFlowData)
                                        .expenses,
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="income"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                  <Bar
                    dataKey="expenses"
                    fill="#f97316"
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ChartContainer>
              )}

              {cashFlowData.length > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Total Income</p>
                    <p className="text-sm font-semibold text-green-700">
                      {formattedAmount(
                        cashFlowData.reduce((sum, d) => sum + d.income, 0),
                      )}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Total Expenses</p>
                    <p className="text-sm font-semibold text-orange-700">
                      {formattedAmount(
                        cashFlowData.reduce((sum, d) => sum + d.expenses, 0),
                      )}
                    </p>
                  </div>
                </div>
              )}

              <Button variant="outline" className="w-full mt-auto">
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
          <CardContent className="flex flex-col items-stretch gap-4 divide-y divide-gray-200 p-0 h-full">
            <div className="space-y-0">
              {transactions.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  No recent transactions
                </div>
              ) : (
                transactions.slice(0, 5).map((tx, index) => (
                <div key={tx.id ?? index}>
                  <ActivityItem
                    icon={
                      tx.transaction_type === "income"
                        ? ArrowUpRight01Icon
                        : ArrowDownLeft01Icon
                    }
                    iconColor={
                      tx.transaction_type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                    title={tx.description || "No description"}
                    description={
                      tx.amount
                        ? `₦${Number(tx.amount).toLocaleString()}`
                        : "No amount"
                    }
                    time={tx.created_at ?? null}
                    iconBg
                  />
                  {index < Math.min(5, transactions.length) - 1 && (
                    <Separator />
                  )}
                </div>
              ))
              )}
            </div>
            {transactions.length > 5 && (
              <div className="flex justify-center pt-2 mt-auto">
                <Button variant="outline">Load more</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {quickActions.map((action, index) => (
              <div key={index}>
                <QuickActionCard
                  title={action.title}
                  icon={action.icon}
                  description={action.description}
                  onClick={() => {
                    if (action.title === "Add New Expense/Income") {
                      console.log("Modal should open here");
                    }
                    if (action.title === "Wallet & Canteen Sales") {
                      router.push("canteen-operations");
                    }
                    if (action.title === "Process Creditor Payment") {
                      router.push("canteen-operations");
                    }
                    if (action.title === "Add Wallet Top-Up (Manual)") {
                      router.push("canteen-operations");
                    }
                    if (action.title === "Budget Status Report") {
                      router.push("budget-tracking");
                    }
                  }}
                />
                {index < quickActions.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
