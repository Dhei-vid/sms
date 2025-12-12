"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            <Table>
              <TableHeader>
                <TableRow className="bg-main-blue/5">
                  <TableHead className="px-4 py-3">Name & Grade</TableHead>
                  <TableHead className="px-4 py-3">Request Type</TableHead>
                  <TableHead className="px-4 py-3">Date Submitted</TableHead>
                  <TableHead className="px-4 py-3">Requested Value</TableHead>
                  <TableHead className="px-4 py-3">Policy/Rule</TableHead>
                  <TableHead className="px-4 py-3">Supporting Docs</TableHead>
                  <TableHead className="w-12 px-4 py-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-gray-500"
                    >
                      No pending requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="px-4 py-3 font-medium">
                        {request.name} ({request.grade})
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {request.requestType}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-600">
                        {request.dateSubmitted}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-semibold">
                        {request.requestedValue}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-600">
                        {request.policyRule}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {request.supportingDocs === "View Docs" ? (
                          <Button
                            variant="link"
                            className="text-main-blue p-0 h-auto"
                            onClick={() => {
                              // Handle view docs
                              console.log("View docs for", request.id);
                            }}
                          >
                            {request.supportingDocs}
                          </Button>
                        ) : (
                          <span className="text-gray-500">
                            {request.supportingDocs}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Icon icon={MoreVerticalIcon} size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {requestActions.map((action) => (
                              <DropdownMenuItem
                                key={action.action}
                                className={cn(
                                  action.variant === "destructive"
                                    ? "text-red-600"
                                    : "",
                                  "group"
                                )}
                                onClick={() => {
                                  if (action.action === "view") {
                                    setSelectedRequest(request);
                                    setReviewModalOpen(true);
                                  } else {
                                    // Handle other actions
                                    console.log(action.action, request.id);
                                  }
                                }}
                              >
                                <Icon
                                  icon={action.icon}
                                  size={15}
                                  className={cn(
                                    "group-hover:text-gray-700",
                                    action.variant === "destructive" &&
                                      "text-red-600"
                                  )}
                                />
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
