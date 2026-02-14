"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { usePagination } from "@/hooks/use-pagination";
import { useGetOrdersQuery } from "@/services/shared";

interface Transaction {
  id: string;
  dateTime: Date;
  transactionId: string;
  itemCount: string;
  runningBalance: string;
  status: "Completed" | "Pending" | "Cancelled";
}

/** Format order items for display */
function formatItemCount(items: { quantity?: number; product?: { name?: string } }[] | undefined): string {
  if (!items?.length) return "—";
  return items
    .map((i) => `${i.quantity ?? 1}x ${i.product?.name ?? "Item"}`)
    .join(" + ");
}

export default function SalesReportPage() {
  const today = new Date();
  const formattedDate = format(today, "MMM. d, yyyy");

  const startOfDay = useMemo(() => {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }, [today]);

  const { data: ordersData } = useGetOrdersQuery({ _all: true });

  const allTransactions: Transaction[] = useMemo(() => {
    const list = Array.isArray(ordersData?.data)
      ? ordersData.data
      : (ordersData as { data?: Array<{ id: string; code?: string; total_amount?: string | number; status?: string; created_at?: string; items_details?: { quantity?: number; product?: { name?: string } }[]; items?: { quantity?: number; product?: { name?: string } }[] }> })?.data ?? [];
    const todayOrders = list.filter((o) => {
      if (!o.created_at) return true;
      return new Date(o.created_at) >= new Date(startOfDay);
    });
    return todayOrders.map((o) => ({
      id: o.id,
      dateTime: o.created_at ? new Date(o.created_at) : new Date(),
      transactionId: o.code ?? o.id,
      itemCount: formatItemCount(o.items_details ?? o.items),
      runningBalance: typeof o.total_amount === "number"
        ? `₦${o.total_amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
        : `₦${parseFloat(String(o.total_amount ?? 0)).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`,
      status: (o.status === "completed" ? "Completed" : o.status === "cancelled" ? "Cancelled" : "Pending") as Transaction["status"],
    }));
  }, [ordersData, startOfDay]);

  const { totalRevenue, cashReceived } = useMemo(() => {
    const list = Array.isArray(ordersData?.data) ? ordersData.data : [];
    const todayList = list.filter((o) => {
      if (!o.created_at) return true;
      return new Date(o.created_at) >= new Date(startOfDay);
    });
    let total = 0;
    let cash = 0;
    for (const o of todayList) {
      const amt = typeof o.total_amount === "number" ? o.total_amount : parseFloat(String(o.total_amount ?? 0));
      total += amt;
      const pm = (o.transaction as { payment_method?: string })?.payment_method;
      if (pm === "cash" || pm === "manual") cash += amt;
    }
    return {
      totalRevenue: total,
      cashReceived: cash,
    };
  }, [ordersData, startOfDay]);

  const {
    displayedData: transactions,
    hasMore,
    loadMore,
  } = usePagination({
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
          <p className="text-sm text-gray-600">Todays date: {formattedDate}</p>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`₦ ${totalRevenue.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
          trend="up"
        />
        <MetricCard
          title="Cash Received"
          value={`₦ ${cashReceived.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
          trend="up"
        />
        <MetricCard title="Voucher/Discount Used" value="Nil" trend="up" />
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
              <Button variant="outline" onClick={loadMore}>
                Load More
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
