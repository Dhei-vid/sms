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
import {
  Tick01Icon,
  ArrowUp02Icon,
  DocumentValidationIcon,
  Tag01Icon,
  Settings02Icon,
  RepositoryIcon,
  AddInvoiceIcon,
  Payment01Icon,
  PayByCheckIcon,
  DiscountIcon,
} from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { ProgressBar } from "@/components/ui/progress-bar";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { ActivityItem } from "@/components/ui/activity-item";
import { Separator } from "@/components/ui/separator";

// Modals
import { ViewStudentsModal } from "@/components/dashboard-pages/admin/finance/components/view-students-modal";
import { TrackPaymentsModal } from "@/components/dashboard-pages/admin/finance/components/track-payments-modal";
import { LogPaymentModal } from "@/components/dashboard-pages/admin/finance/components/log-payment-modal";
import { PostCanteenItemModal } from "@/components/dashboard-pages/admin/finance/components/post-canteen-item-modal";
import { SetFeeStructureModal } from "@/components/dashboard-pages/admin/finance/components/set-fee-structure-modal";

export default function FinancePage() {
  const router = useRouter();
  const [viewStudentsModalOpen, setViewStudentsModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [trackPaymentsModalOpen, setTrackPaymentsModalOpen] = useState(false);
  const [logPaymentModalOpen, setLogPaymentModalOpen] = useState(false);
  const [postCanteenItemModalOpen, setPostCanteenItemModalOpen] =
    useState(false);
  const [setFeeStructureModalOpen, setSetFeeStructureModalOpen] =
    useState(false);

  // Mock student data - in real app, this would come from API based on period
  const getStudentsForPeriod = (period: string) => {
    // Sample data - would be fetched based on period
    if (period === "15 - 30 Days Overdue") {
      return [
        {
          id: "1",
          name: "Chinedu Nwokolo",
          studentId: "nwokolo.m178023",
          daysOverdue: 20,
          overdueAmount: 45000,
          primaryContactName: "Mr. Nwokolo Emmanuel",
          primaryContactNumber: "+234 803 123 4567",
          latestPayment: "Oct. 15, 2025",
        },
        {
          id: "2",
          name: "Sarah Adebisi",
          studentId: "adebisi.m178024",
          daysOverdue: 18,
          overdueAmount: 35000,
          primaryContactName: "Mrs. Adebisi",
          primaryContactNumber: "+234 809 987 6543",
          latestPayment: "Oct. 17, 2025",
        },
        {
          id: "3",
          name: "Tolu Adeyemi",
          studentId: "adeyemi.m178025",
          daysOverdue: 25,
          overdueAmount: 50000,
          primaryContactName: "Mr. Adeyemi",
          primaryContactNumber: "+234 802 456 7890",
          latestPayment: "Oct. 10, 2025",
        },
      ];
    } else if (period === "31 - 60 Days Overdue") {
      return [
        {
          id: "4",
          name: "Emeka Okafor",
          studentId: "okafor.m178026",
          daysOverdue: 45,
          overdueAmount: 60000,
          primaryContactName: "Mr. Okafor",
          primaryContactNumber: "+234 805 111 2222",
          latestPayment: "Sep. 20, 2025",
        },
        {
          id: "5",
          name: "Amina Bello",
          studentId: "bello.m178027",
          daysOverdue: 35,
          overdueAmount: 40000,
          primaryContactName: "Mrs. Bello",
          primaryContactNumber: "+234 807 333 4444",
          latestPayment: "Sep. 30, 2025",
        },
      ];
    }
    return [];
  };

  const handleViewStudents = (period: string) => {
    setSelectedPeriod(period);
    setViewStudentsModalOpen(true);
  };

  // Recent Activities Configuration
  interface Activity {
    icon: any;
    iconColor: string;
    title: string;
    description: string;
    time: string;
  }

  const recentActivities: Activity[] = [
    {
      icon: Tick01Icon,
      iconColor: "text-green-600",
      title: "Payment of Fees",
      description:
        "Mr Nwokolo Emmanuel paid school fees for Chinedu Nwokolo (nwokolo.m178023). Total sum of ₩450,000.",
      time: "10:00 AM",
    },
    {
      icon: ArrowUp02Icon,
      iconColor: "text-red-600",
      title: "Expenses",
      description: "₩120,000 logged for IT Maintenance.",
      time: "10:00 AM",
    },
    {
      icon: DocumentValidationIcon,
      iconColor: "text-blue-600",
      title: "Batch Invoice Generation",
      description:
        "Batch invoice for Second Term (T2) of 2025/2026 academic year generated for Primary 4.",
      time: "Oct. 22, 8:15 AM",
    },
    {
      icon: Tag01Icon,
      iconColor: "text-blue-400",
      title: "Discount Approval",
      description:
        "₩50,000 Hardship Discount approved for Sarah Adebisi (adebisi.m178024).",
      time: "Oct. 21, 9:32 AM",
    },
    {
      icon: Tag01Icon,
      iconColor: "text-orange-600",
      title: "Price Change for Canteen Sales",
      description:
        "The price for Meat pie purchase has changed from ₩600.00 to ₩700.00.",
      time: "Oct. 21, 9:32 AM",
    },
  ];

  // Quick Actions Configuration
  interface QuickAction {
    icon: any;
    title: string;
    description: string;
    onClick: () => void;
  }

  const quickActions: QuickAction[] = [
    {
      icon: RepositoryIcon,
      title: "Set Fee Structures",
      description:
        "This is the configuration area that determines what a student owes.",
      onClick: () => setSetFeeStructureModalOpen(true),
    },
    {
      icon: AddInvoiceIcon,
      title: "Generate Bulk Invoices",
      description: "Issue fees for a new term.",
      onClick: () => router.push("fee-revenue-management/bulk-invoices"),
    },
    {
      icon: Payment01Icon,
      title: "Log Payment",
      description: "Records a physical payment.",
      onClick: () => setLogPaymentModalOpen(true),
    },
    {
      icon: PayByCheckIcon,
      title: "Track Payment",
      description: "Entry form for recording non-fee transactions.",
      onClick: () => setTrackPaymentsModalOpen(true),
    },
    {
      icon: DiscountIcon,
      title: "Pending Discount Requests",
      description: "Review Discount Requests.",
      onClick: () => router.push("fee-revenue-management/discount-requests"),
    },
  ];

  // Fee Ageing Report Data
  interface FeeAgeingData {
    period: string;
    value: number;
    total: number;
    barColor: string;
    actionLabel: string;
  }

  const feeAgeingData: FeeAgeingData[] = [
    {
      period: "0 - 14 Days Overdue",
      value: 1110000,
      total: 2500000,
      barColor: "bg-blue-500",
      actionLabel: "Send Bulk Reminder",
    },
    {
      period: "15 - 30 Days Overdue",
      value: 890000,
      total: 2500000,
      barColor: "bg-orange-500",
      actionLabel: "View Students",
    },
    {
      period: "31 - 60 Days Overdue",
      value: 500000,
      total: 2500000,
      barColor: "bg-red-500",
      actionLabel: "View Students",
    },
  ];

  const feeAgeingColumns: TableColumn<FeeAgeingData>[] = [
    {
      key: "period",
      title: "Ageing Period",
      className: "w-[300px]",
      render: (value) => (
        <span className="text-sm font-medium text-gray-700">{value}</span>
      ),
    },
    {
      key: "value",
      title: "Outstanding Value",
      className: "min-w-[300px]",
      render: (value, row) => (
        <ProgressBar
          value={value}
          total={row.total}
          barColor={row.barColor}
          displayAmount={value}
        />
      ),
    },
    {
      key: "actionLabel",
      title: "Action",
      className: "w-[200px]",
      render: (_, row) => (
        <Button
          variant="link"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            if (row.actionLabel === "View Students") {
              handleViewStudents(row.period);
            } else {
              console.log("Send bulk reminder");
            }
          }}
          className="text-main-blue hover:text-main-blue/80 p-0 h-auto font-normal"
        >
          {row.actionLabel}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Fee & Revenue Management Overview Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Use this overview to monitor outstanding risk, track cash flow, and
          ensure compliance with all budgetary controls.
        </p>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinancialMetricCard
          title="Net Available Cash"
          value={12580000}
          subtitle={"+1.5% Compared to last month"}
          currency
          trend="up"
          trendColor="text-green-600"
        />
        <FinancialMetricCard
          title="Total Outstanding Fees"
          value={2500000}
          subtitle="+5% Compared to last term"
          trend="up"
          currency
          trendColor="text-red-600"
        />
        <FinancialMetricCard
          title="Budget Adherence"
          value="95%"
          subtitle="+5% Strict adherence"
          trend="up"
          trendColor="text-green-600"
        />
      </div>

      {/* Fee Ageing Report */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Fee Ageing Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={feeAgeingColumns}
              data={feeAgeingData}
              headerClassName="bg-main-blue/5"
              showActionsColumn={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Bottom Section: Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Financial Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Financial Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentActivities.map((activity, index) => (
                <div key={index}>
                  <ActivityItem
                    icon={activity.icon}
                    iconColor={activity.iconColor}
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                  />
                  {index < recentActivities.length - 1 && <Separator />}
                </div>
              ))}
            </div>
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
            <div className="space-y-0">
              {quickActions.map((action, index) => (
                <div key={index}>
                  <QuickActionCard
                    icon={action.icon}
                    title={action.title}
                    description={action.description}
                    onClick={action.onClick}
                  />
                  {index < quickActions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Students Modal */}
      <ViewStudentsModal
        open={viewStudentsModalOpen}
        onOpenChange={setViewStudentsModalOpen}
        period={selectedPeriod}
        students={getStudentsForPeriod(selectedPeriod)}
      />

      {/* Track Payments Modal */}
      <TrackPaymentsModal
        open={trackPaymentsModalOpen}
        onOpenChange={setTrackPaymentsModalOpen}
      />

      {/* Log Payment Modal */}
      <LogPaymentModal
        open={logPaymentModalOpen}
        onOpenChange={setLogPaymentModalOpen}
      />

      {/* Post Canteen Item Modal */}
      <PostCanteenItemModal
        open={postCanteenItemModalOpen}
        onOpenChange={setPostCanteenItemModalOpen}
      />

      {/* Set Fee Structure Modal */}
      <SetFeeStructureModal
        open={setFeeStructureModalOpen}
        onOpenChange={setSetFeeStructureModalOpen}
      />
    </div>
  );
}
