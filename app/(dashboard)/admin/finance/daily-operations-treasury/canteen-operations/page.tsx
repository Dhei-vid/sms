"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  RepositoryIcon,
  PayByCheckIcon,
  TransactionHistoryIcon,
  DiscountIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { formattedAmount } from "@/common/helper";
import { cn } from "@/lib/utils";
import { PostCanteenItemModal } from "@/components/dashboard-pages/admin/finance/components/post-canteen-item-modal";
import { AddWalletTopUpModal } from "@/components/dashboard-pages/admin/finance/components/add-wallet-topup-modal";
import { StudentWalletHistoryModal } from "@/components/dashboard-pages/admin/finance/components/student-wallet-history-modal";
import { SetDailySpendingLimitModal } from "@/components/dashboard-pages/admin/finance/components/set-daily-spending-limit-modal";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";

interface TopSellingItem {
  id: string;
  item: string;
  totalRevenue: number;
  studentConsumption: number;
}

interface RecentActivity {
  id: string;
  time: string;
  name: string;
  studentId: string;
  transactionType: string;
  amount: number;
  item: string;
  reconciliationStatus: string;
}

const topSellingItems: TopSellingItem[] = [
  {
    id: "1",
    item: "Jollof Rice & Chicken",
    totalRevenue: 45000,
    studentConsumption: 75,
  },
  {
    id: "2",
    item: "Bottled Water (50cl)",
    totalRevenue: 32000,
    studentConsumption: 70,
  },
  {
    id: "3",
    item: "Meat Pie",
    totalRevenue: 25000,
    studentConsumption: 50,
  },
];

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    time: "11:15 AM",
    name: "Sola Adebayo",
    studentId: "adebayoum178031",
    transactionType: "Wallet Sales",
    amount: 2000,
    item: "Jollof Rice & Chicken",
    reconciliationStatus: "Reconciled",
  },
  {
    id: "2",
    time: "11:15 AM",
    name: "Helen Davies",
    studentId: "daviesm178032",
    transactionType: "Top-up",
    amount: 5000,
    item: "Wallet Top-up",
    reconciliationStatus: "Pending",
  },
  {
    id: "3",
    time: "11:15 AM",
    name: "Tolu Adebayo",
    studentId: "adebayoum170833",
    transactionType: "Wallet Sales",
    amount: 1050,
    item: "Meat Pie + Bottled Water (50cl)",
    reconciliationStatus: "Failed",
  },
  {
    id: "4",
    time: "11:15 AM",
    name: "Biodun Eke",
    studentId: "ekem178000",
    transactionType: "Top-up",
    amount: 5000,
    item: "Wallet Top-up",
    reconciliationStatus: "Reconciled",
  },
  {
    id: "5",
    time: "11:15 AM",
    name: "Uche Nwachukwu",
    studentId: "nwachukwum170044",
    transactionType: "Wallet Sales",
    amount: 1500,
    item: "Coke + Fish Pie",
    reconciliationStatus: "Reconciled",
  },
];

const quickActions = [
  {
    icon: RepositoryIcon,
    title: "Post Canteen Item",
    description: "Quick access to set up a new sales item or price change.",
  },
  {
    icon: PayByCheckIcon,
    title: "Add Wallet Top-Up (Manual)",
    description: "Process an offline/cash deposit.",
  },
  {
    icon: TransactionHistoryIcon,
    title: "Student Wallet History",
    description: "Look up a specific student's account history.",
  },
  {
    icon: DiscountIcon,
    title: "Set Daily Spending Limits",
    description: "Adjust the maximum amount a student can spend per day.",
  },
];

const filterOptions = [
  { value: "all", label: "ALL" },
  { value: "reconciled", label: "Reconciled" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

export default function CanteenOperationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [postCanteenItemModalOpen, setPostCanteenItemModalOpen] =
    useState(false);
  const [addWalletTopUpModalOpen, setAddWalletTopUpModalOpen] = useState(false);
  const [studentWalletHistoryModalOpen, setStudentWalletHistoryModalOpen] =
    useState(false);
  const [setDailySpendingLimitModalOpen, setSetDailySpendingLimitModalOpen] =
    useState(false);

  const filteredActivities =
    filter === "all"
      ? recentActivities
      : recentActivities.filter(
          (activity) =>
            activity.reconciliationStatus.toLowerCase() === filter.toLowerCase()
        );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "reconciled":
        return "text-green-600";
      case "pending":
        return "text-orange-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const topSellingColumns: TableColumn<TopSellingItem>[] = [
    {
      key: "item",
      title: "Item",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "totalRevenue",
      title: "Total Revenue (7 Days)",
      render: (value) => (
        <span className="font-semibold">{formattedAmount(value)}</span>
      ),
    },
    {
      key: "studentConsumption",
      title: "Student Consumption",
      render: (value) => (
        <span className="text-sm text-gray-600">{value}%</span>
      ),
    },
  ];

  const activityColumns: TableColumn<RecentActivity>[] = [
    {
      key: "time",
      title: "Time",
    },
    {
      key: "name",
      title: "Name & Student ID",
      render: (_, row) => (
        <span>
          {row.name} ({row.studentId})
        </span>
      ),
    },
    {
      key: "transactionType",
      title: "Transaction Type",
    },
    {
      key: "amount",
      title: "Amount",
      render: (value) => (
        <span className="font-semibold">{formattedAmount(value)}</span>
      ),
    },
    {
      key: "item",
      title: "Item",
    },
    {
      key: "reconciliationStatus",
      title: "Reconciliation Status",
      render: (value) => (
        <span className={cn("text-sm font-medium", getStatusColor(value))}>
          {value}
        </span>
      ),
    },
  ];

  const actions: TableAction<RecentActivity>[] = [
    {
      type: "button",
      config: {
        label: "",
        onClick: (row) => {
          router.push(
            `/admin/finance/daily-operations-treasury/canteen-operations/${row.id}`
          );
        },
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
        <h2 className="text-2xl font-bold text-gray-800">
          Wallet & Canteen Operations Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This dashboard focuses on real-time cash flow, student spending
          patterns, and immediate audit tasks.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinancialMetricCard
          title="Total Wallet Liability"
          value={120000}
          subtitle="+2% increase on short term debt"
          currency
          trend="up"
          trendColor="text-green-600"
        />
        <FinancialMetricCard
          title="Today's Canteen Sales"
          value={150000}
          subtitle="+1.5% Tracks real-time operational revenue"
          currency
          trend="up"
          trendColor="text-green-600"
        />
        <FinancialMetricCard
          title="Wallet Top-Ups (24hrs)"
          value={50000}
          subtitle="+5% increase in rate of deposit to wallet"
          currency
          trend="up"
          trendColor="text-green-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top-Selling Canteen Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Top-Selling Canteen Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <DataTable
                columns={topSellingColumns}
                data={topSellingItems}
                headerClassName="bg-main-blue/5"
                showActionsColumn={false}
              />
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
                  if (action.title === "Post Canteen Item") {
                    setPostCanteenItemModalOpen(true);
                  } else if (action.title === "Add Wallet Top-Up (Manual)") {
                    setAddWalletTopUpModalOpen(true);
                  } else if (action.title === "Student Wallet History") {
                    setStudentWalletHistoryModalOpen(true);
                  } else if (action.title === "Set Daily Spending Limits") {
                    setSetDailySpendingLimitModalOpen(true);
                  }
                }}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Activity
            </CardTitle>
            <div className="w-32">
              <SelectField
                label=""
                value={filter}
                onValueChange={setFilter}
                placeholder="Filter: ALL"
              >
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectField>
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

      {/* Post Canteen Item Modal */}
      <PostCanteenItemModal
        open={postCanteenItemModalOpen}
        onOpenChange={setPostCanteenItemModalOpen}
      />

      {/* Add Wallet Top-Up Modal */}
      <AddWalletTopUpModal
        open={addWalletTopUpModalOpen}
        onOpenChange={setAddWalletTopUpModalOpen}
      />

      {/* Student Wallet History Modal */}
      <StudentWalletHistoryModal
        open={studentWalletHistoryModalOpen}
        onOpenChange={setStudentWalletHistoryModalOpen}
      />

      {/* Set Daily Spending Limit Modal */}
      <SetDailySpendingLimitModal
        open={setDailySpendingLimitModalOpen}
        onOpenChange={setSetDailySpendingLimitModalOpen}
      />
    </div>
  );
}
