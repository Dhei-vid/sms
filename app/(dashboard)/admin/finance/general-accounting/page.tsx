import { Card, CardContent } from "@/components/ui/card";
import { FinancialMetricCard } from "@/components/dashboard-pages/admin/finance/finance-metrics";

export default function GeneralAccountingPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold text-gray-800">
            General Accounting
          </h2>
          <p className="text-gray-600 mt-1">
            The Centralized control panel for expense tracking, and creditor
            management.
          </p>
        </CardContent>
      </Card>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinancialMetricCard
          title="Net Available Cash"
          value="0"
          subtitle="No data"
        />
        <FinancialMetricCard
          title="Unpaid Creditor Bills (7 Days)"
          value="0"
          subtitle="No data"
        />
        <FinancialMetricCard
          title="Total Non-Fee Income YTD"
          value="0"
          subtitle="No data"
        />
        <FinancialMetricCard
          title="Active Vendors"
          value="0"
          subtitle="No data"
        />
      </div>
    </div>
  );
}
