"use client";

import { useState } from "react";
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
import { Icon } from "@/components/general/huge-icon";
import { AddCircleIcon, ViewIcon } from "@hugeicons/core-free-icons";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";
import { formattedAmount } from "@/common/helper";
import { cn } from "@/lib/utils";
import { CreateImportBudgetModal } from "@/components/dashboard-pages/admin/finance/components/create-import-budget-modal";

interface BudgetItem {
  id: string;
  category: string;
  annualBudget: number;
  actualSpentYTD: number;
  budgetConsumed: number;
  remainingBudget: number;
}

const budgetItems: BudgetItem[] = [
  {
    id: "1",
    category: "Salaries & Wages",
    annualBudget: 250000000,
    actualSpentYTD: 190000000,
    budgetConsumed: 76,
    remainingBudget: 6000000,
  },
  {
    id: "2",
    category: "Utilities",
    annualBudget: 20000000,
    actualSpentYTD: 18000000,
    budgetConsumed: 90,
    remainingBudget: 2000000,
  },
  {
    id: "3",
    category: "Curriculum/Resource",
    annualBudget: 12000000,
    actualSpentYTD: 8000000,
    budgetConsumed: 67,
    remainingBudget: 4000000,
  },
  {
    id: "4",
    category: "Student Activities/Sports",
    annualBudget: 8000000,
    actualSpentYTD: 6500000,
    budgetConsumed: 81,
    remainingBudget: 1500000,
  },
  {
    id: "5",
    category: "Marketing & Admissions",
    annualBudget: 5000000,
    actualSpentYTD: 2000000,
    budgetConsumed: 40,
    remainingBudget: 3000000,
  },
  {
    id: "6",
    category: "Alumni Management",
    annualBudget: 0,
    actualSpentYTD: 0,
    budgetConsumed: 0,
    remainingBudget: 0,
  },
];

export default function BudgetTrackingPage() {
  const [createBudgetModalOpen, setCreateBudgetModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Budget Tracking & Control Center
        </h2>
        <p className="text-gray-600 mt-1">
          Allows the administrator to monitor budget adherence, analyze
          variances, and plan future spending.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinancialMetricCard
          title="Consumption Rate"
          value="78% Consumed"
          subtitle=""
          trend="up"
          trendColor="text-gray-600"
        />
        <FinancialMetricCard
          title="Overall Variance"
          value="₦1.2 Million"
          subtitle=""
          trend="up"
          trendColor="text-gray-600"
        />
        <FinancialMetricCard
          title="Months Remaining"
          value="2 Months"
          subtitle=""
          trend="up"
          trendColor="text-gray-600"
        />
      </div>

      {/* Action Button */}
      <div className="w-full">
        <Button
          variant={"outline"}
          className="gap-2 h-11 w-full"
          onClick={() => setCreateBudgetModalOpen(true)}
        >
          <Icon icon={AddCircleIcon} size={16} />
          Create/Import New Budget
        </Button>
      </div>

      {/* Budget Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Budget Summary Table
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            This table compares budgeted amounts against actual expenses for
            every category, highlighting areas of concern.
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-blue/5">
                  <TableHead className="px-4 py-3">Account Category</TableHead>
                  <TableHead className="px-4 py-3">Annual Budget (₦)</TableHead>
                  <TableHead className="px-4 py-3">
                    Actual Spent YTD (₦)
                  </TableHead>
                  <TableHead className="px-4 py-3">
                    Budget Consumed (%)
                  </TableHead>
                  <TableHead className="px-4 py-3">
                    Remaining Budget (₦)
                  </TableHead>
                  <TableHead className="w-12 px-4 py-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 py-3 text-sm font-medium text-gray-700">
                      {item.category}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-800">
                      {item.annualBudget > 0
                        ? formattedAmount(item.annualBudget)
                        : "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-800">
                      {item.actualSpentYTD > 0
                        ? formattedAmount(item.actualSpentYTD)
                        : "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-800">
                      {item.budgetConsumed > 0
                        ? `${item.budgetConsumed}%`
                        : "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-800">
                      {item.remainingBudget > 0
                        ? formattedAmount(item.remainingBudget)
                        : "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon icon={ViewIcon} size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="pt-4 flex justify-center">
            <Button variant="outline">See all Budget Categories</Button>
          </div>
        </CardContent>
      </Card>

      {/* Create/Import Budget Modal */}
      <CreateImportBudgetModal
        open={createBudgetModalOpen}
        onOpenChange={setCreateBudgetModalOpen}
      />
    </div>
  );
}
