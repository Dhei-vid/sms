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
import { Icon } from "@/components/general/huge-icon";
import {
  Clock01Icon,
  MoreVerticalIcon,
  PencilEdit02Icon,
  PolicyIcon,
} from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { cn } from "@/lib/utils";
import { RuleModificationModal } from "@/components/dashboard-pages/admin/finance/components/rule-modification-modal";

interface DiscountRule {
  id: string;
  ruleName: string;
  discountValue: string;
  applicableTo: string;
  policyType: string;
  lastModified: string;
  modifiedBy: string;
  triggerCriteria: string;
}

const ruleActions = [
  {
    label: "Edit Rule",
    action: "edit",
    icon: PencilEdit02Icon,
    variant: undefined,
  },
  {
    label: "Deactivate Rule",
    action: "deactivate",
    variant: "destructive" as const,
    icon: PencilEdit02Icon,
  },
];

export default function DiscountPolicyManagementPage() {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<DiscountRule | null>(null);
  const [rules] = useState<DiscountRule[]>([
    {
      id: "1",
      ruleName: "Sibling Discount (Tier 1)",
      discountValue: "15% off Tuition",
      applicableTo: "3rd Child ONLY",
      policyType: "Automated",
      lastModified: "Oct. 20, 2025",
      modifiedBy: "Principal",
      triggerCriteria: "Sibling Count > 2",
    },
    {
      id: "2",
      ruleName: "School Scholarship",
      discountValue: "10% off Tuition",
      applicableTo: "Merit students",
      policyType: "Automated",
      lastModified: "Oct. 20, 2025",
      modifiedBy: "Principal",
      triggerCriteria: "Best overall in department",
    },
    {
      id: "3",
      ruleName: "Payment Plan Discount",
      discountValue: "5% off Tuition",
      applicableTo: "Installment Payment",
      policyType: "Manual Approval",
      lastModified: "Oct. 20, 2025",
      modifiedBy: "Principal",
      triggerCriteria: "Text summary",
    },
    {
      id: "4",
      ruleName: "Hardship Discount",
      discountValue: "15% off Tuition",
      applicableTo: "All Students",
      policyType: "Manual Approval",
      lastModified: "Oct. 20, 2025",
      modifiedBy: "Principal",
      triggerCriteria: "95% Payment Consistency",
    },
  ]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Discount Policy Rules Management
        </h2>
        <p className="text-gray-600 mt-1">
          The control center for the school's fee exceptions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinancialMetricCard
          title="Total Discount Rules"
          value="6"
          subtitle=""
          trend="up"
        />
        <FinancialMetricCard
          title="Active Rules"
          value="4"
          subtitle=""
          trend="up"
        />
        <FinancialMetricCard
          title="Inactive Rules"
          value="2"
          subtitle=""
          trend="up"
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={"outline"}
          className="h-11 flex items-center gap-2"
          onClick={() => router.push("new-discount-rules")}
        >
          <Icon icon={PolicyIcon} size={18} />
          Create New Discount Rule
        </Button>
        <Button variant="outline" className="h-11 flex items-center gap-2">
          <Icon icon={PolicyIcon} size={18} />
          View Policy History
        </Button>
      </div>

      {/* Active Discount Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Active Discount Rules Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-blue/5">
                  <TableHead className="px-4 py-3">Rule Name</TableHead>
                  <TableHead className="px-4 py-3">Discount Value</TableHead>
                  <TableHead className="px-4 py-3">Applicable To</TableHead>
                  <TableHead className="px-4 py-3">Policy Type</TableHead>
                  <TableHead className="px-4 py-3">Last Modified</TableHead>
                  <TableHead className="px-4 py-3">Trigger Criteria</TableHead>
                  <TableHead className="w-12 px-4 py-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-gray-500"
                    >
                      No discount rules found
                    </TableCell>
                  </TableRow>
                ) : (
                  rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="px-4 py-3 font-medium">
                        {rule.ruleName}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {rule.discountValue}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {rule.applicableTo}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            rule.policyType === "Automated"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {rule.policyType}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-600">
                        {rule.lastModified} by {rule.modifiedBy}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-600">
                        {rule.triggerCriteria}
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
                            {ruleActions.map((action) => (
                              <DropdownMenuItem
                                key={action.action}
                                className={cn(
                                  action.variant === "destructive" &&
                                    "text-red-600",
                                  "group"
                                )}
                                onClick={() => {
                                  if (action.action === "edit") {
                                    setSelectedRule(rule);
                                    setEditModalOpen(true);
                                  } else {
                                    // Handle other actions
                                    console.log(action.action, rule.id);
                                  }
                                }}
                              >
                                {action.icon && (
                                  <Icon
                                    icon={action.icon}
                                    size={16}
                                    className={cn(
                                      action.variant === "destructive" &&
                                        "text-red-600 group-hover:text-gray-600"
                                    )}
                                  />
                                )}
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

      {/* Rule Modification Modal */}
      <RuleModificationModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        rule={selectedRule}
        onSave={(ruleId, data) => {
          console.log("Save rule modification", ruleId, data);
          // Handle save logic
        }}
      />
    </div>
  );
}
