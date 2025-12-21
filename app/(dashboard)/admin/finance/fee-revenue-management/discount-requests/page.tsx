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
  PolicyIcon,
  MoreVerticalIcon,
  ViewIcon,
  PencilEdit02Icon,
  UserStatusIcon,
} from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { ReviewDiscountRequestModal } from "@/components/dashboard-pages/admin/finance/components/review-discount-request-modal";
import { cn } from "@/lib/utils";
import { formattedAmount } from "@/common/helper";

interface DiscountRequest {
  id: string;
  name: string;
  grade: string;
  requestType: string;
  dateSubmitted: string;
  requestedValue: string;
  policyRule: string;
  supportingDocs: string;
  requestSummary?: string;
  policyStatus?: string;
}

const sortOptions = [
  { value: "all", label: "ALL" },
  { value: "hardship", label: "Hardship" },
  { value: "sibling", label: "Sibling" },
  { value: "scholarship", label: "Scholarship" },
];

const requestActions = [
  { label: "View Details", action: "view", icon: ViewIcon },
  {
    label: "Approve Request",
    action: "approve-request",
    icon: PencilEdit02Icon,
  },
  {
    label: "Deny Request",
    action: "reject",
    variant: "destructive" as const,
    icon: UserStatusIcon,
  },
];

export default function DiscountRequestsPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("all");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<DiscountRequest | null>(null);
  const [requests] = useState<DiscountRequest[]>([
    {
      id: "1",
      name: "Sola Adebayo",
      grade: "JSS3",
      requestType: "Hardship",
      dateSubmitted: "Oct. 20, 2025",
      requestedValue: "₦50,000",
      policyRule: "Requires Manual Principal Approval.",
      supportingDocs: "View Docs",
      requestSummary:
        "Reason: Temporary financial difficulty due to recent medical expenses.",
      policyStatus: "A+",
    },
    {
      id: "2",
      name: "Helen Davies",
      grade: "Primary 4",
      requestType: "Manual Sibling",
      dateSubmitted: "Oct. 20, 2025",
      requestedValue: "15%",
      policyRule: "Meets Sibling Rule 3",
      supportingDocs: "Nil",
    },
    {
      id: "3",
      name: "Tolu Adebayo",
      grade: "SS 1",
      requestType: "Hardship",
      dateSubmitted: "Oct. 20, 2025",
      requestedValue: "₦50,000",
      policyRule: "Requires Manual Principal Approval.",
      supportingDocs: "Nil",
    },
    {
      id: "4",
      name: "Biodun Eke",
      grade: "JS 1",
      requestType: "Hardship",
      dateSubmitted: "Oct. 20, 2025",
      requestedValue: "15%",
      policyRule: "Requires Manual Principal Approval.",
      supportingDocs: "Nil",
    },
    {
      id: "5",
      name: "Uche Nwachukwu",
      grade: "JS 3",
      requestType: "Hardship",
      dateSubmitted: "Oct. 20, 2025",
      requestedValue: "₦50,000",
      policyRule: "Requires Manual Principal Approval.",
      supportingDocs: "View Docs",
    },
  ]);

  const totalRequestedValue = requests.reduce((sum, req) => {
    const value = req.requestedValue.includes("₦")
      ? parseFloat(req.requestedValue.replace(/[₦,]/g, ""))
      : 0;
    return sum + value;
  }, 0);

  const columns: TableColumn<DiscountRequest>[] = [
    {
      key: "name",
      title: "Name & Grade",
      render: (_, row) => (
        <span className="font-medium">
          {row.name} ({row.grade})
        </span>
      ),
    },
    {
      key: "requestType",
      title: "Request Type",
    },
    {
      key: "dateSubmitted",
      title: "Date Submitted",
      className: "text-sm text-gray-600",
    },
    {
      key: "requestedValue",
      title: "Requested Value",
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: "policyRule",
      title: "Policy/Rule",
      className: "text-sm text-gray-600",
    },
    {
      key: "supportingDocs",
      title: "Supporting Docs",
      render: (value, row) =>
        value === "View Docs" ? (
          <Button
            variant="link"
            className="text-main-blue p-0 h-auto"
            onClick={(e) => {
              e.stopPropagation();
              console.log("View docs for", row.id);
            }}
          >
            {value}
          </Button>
        ) : (
          <span className="text-gray-500">{value}</span>
        ),
    },
  ];

  const actions: TableAction<DiscountRequest>[] = [
    {
      type: "dropdown",
      config: {
        items: requestActions.map((action, index) => ({
          label: action.label,
          onClick: (row) => {
            if (action.action === "view") {
              setSelectedRequest(row);
              setReviewModalOpen(true);
            } else {
              console.log(action.action, row.id);
            }
          },
          icon: <Icon icon={action.icon} size={15} />,
          variant: action.variant,
          separator: index > 0,
        })),
        align: "end",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Review Discount Requests
        </h2>
        <p className="text-gray-600 mt-1">
          Review all pending requests, allowing the Admin to quickly review the
          details and make an informed choice.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinancialMetricCard
          title="Requests Pending"
          value={requests.length}
          subtitle=""
          trend="up"
        />
        <FinancialMetricCard
          title="Total Requested Value"
          value={totalRequestedValue}
          subtitle=""
          currency
          trend="up"
        />
      </div>

      {/* Action Button */}
      <Button
        variant="outline"
        className="w-full h-11"
        onClick={() => router.push("discount-policy-management")}
      >
        <div className="flex gap-2">
          <Icon icon={PolicyIcon} size={18} />
          View Discount Policy Rules
        </div>
      </Button>

      {/* Pending Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Pending Requests Table
            </CardTitle>
            <div className="w-32">
              <SelectField
                label=""
                value={sortBy}
                onValueChange={setSortBy}
                placeholder="Sort by"
              >
                {sortOptions.map((option) => (
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
              columns={columns}
              data={requests}
              actions={actions}
              headerClassName="bg-main-blue/5"
              emptyMessage="No pending requests found"
              emptyMessageClassName="h-32 text-center text-gray-500"
              showActionsColumn={true}
              actionsColumnTitle=""
              actionsColumnClassName="w-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Review Discount Request Modal */}
      <ReviewDiscountRequestModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        request={selectedRequest}
        onApprove={(requestId, discountValue) => {
          console.log(
            "Approve request",
            requestId,
            "with value",
            discountValue
          );
          // Handle approval logic
        }}
        onDeny={(requestId, reason) => {
          console.log("Deny request", requestId, "with reason", reason);
          // Handle denial logic
        }}
      />
    </div>
  );
}
