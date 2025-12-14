"use client";

import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { usePagination } from "@/hooks/use-pagination";

interface Transaction {
  id: string;
  dateTime: Date;
  transactionId: string;
  itemCount: string;
  runningBalance: string;
  status: "Completed" | "Pending" | "Cancelled";
}

// Sample data - in production, this would come from an API
const allTransactions: Transaction[] = [
  {
    id: "1",
    dateTime: new Date(2025, 9, 20, 12, 45),
    transactionId: "WLT-10057",
    itemCount: "2x Meat Pie + Bottle Water",
    runningBalance: "₦1,800",
    status: "Completed",
  },
  {
    id: "2",
    dateTime: new Date(2025, 9, 20, 12, 42),
    transactionId: "WLT-10056",
    itemCount: "2x Donuts + Zobo Drink",
    runningBalance: "₦1,200",
    status: "Completed",
  },
  {
    id: "3",
    dateTime: new Date(2025, 9, 20, 12, 35),
    transactionId: "CASH-10003",
    itemCount: "Jollof Rice + Chicken",
    runningBalance: "₦2,000",
    status: "Completed",
  },
  {
    id: "4",
    dateTime: new Date(2025, 9, 20, 12, 30),
    transactionId: "WLT-10055",
    itemCount: "Meat Pie + Bottle Water",
    runningBalance: "₦1,000",
    status: "Completed",
  },
  {
    id: "5",
    dateTime: new Date(2025, 9, 20, 12, 25),
    transactionId: "WLT-10054",
    itemCount: "Fried Rice + Chicken",
    runningBalance: "₦2,500",
    status: "Completed",
  },
  {
    id: "6",
    dateTime: new Date(2025, 9, 20, 12, 20),
    transactionId: "CASH-10002",
    itemCount: "3x Donuts",
    runningBalance: "₦3,000",
    status: "Completed",
  },
];

export default function SalesReportPage() {
  const today = new Date();
  const formattedDate = format(today, "MMM. d, yyyy");

  // Pagination
  const { displayedData: transactions, hasMore, loadMore } = usePagination({
    data: allTransactions,
    initialItemsPerPage: 4,
    itemsPerPage: 4,
  });

  const columns: TableColumn<Transaction>[] = [
    {
      key: "dateTime",
      title: "Date/Time",
      render: (value) => (
        <span className="text-sm">
          {format(value as Date, "MMM. d, yyyy; h:mma")}
        </span>
      ),
    },
    {
      key: "transactionId",
      title: "Transaction ID",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "itemCount",
      title: "Item Count",
      render: (value) => <span className="text-sm">{value as string}</span>,
    },
    {
      key: "runningBalance",
      title: "Running Balance",
      render: (value) => (
        <span className="font-semibold text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as Transaction["status"];
        return (
          <span className="text-sm font-medium text-green-600">{status}</span>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Daily Sales Reports
          </h1>
          <p className="text-sm text-gray-600">
            Todays date: {formattedDate}
          </p>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Revenue" value="₦ 150,500.00" trend="up" />
        <MetricCard title="Cash Received" value="₦ 20,500.00" trend="up" />
        <MetricCard
          title="Voucher/Discount Used"
          value="Nil"
          trend="up"
        />
      </div>

      {/* Transaction Report Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Transaction Report Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={transactions}
              showActionsColumn={false}
            />
          </div>
          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={loadMore}>Load More</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

