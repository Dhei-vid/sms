"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { usePagination } from "@/hooks/use-pagination";
import { useGetOrdersQuery, useGetProductsQuery } from "@/services/shared";

interface SalesItem {
  id: string;
  productName: string;
  category: string;
  quantitySoldToday: string;
  avgDailySale: string;
}

export default function InventoryManagementPage() {
  const { data: ordersData } = useGetOrdersQuery({ _all: true });
  const { data: productsData } = useGetProductsQuery({ _all: true });

  const { salesItems: allSalesItems, totalStockValue } = useMemo(() => {
    const orders = Array.isArray(ordersData?.data) ? ordersData.data : [];
    const products = Array.isArray(productsData?.data) ? productsData.data : [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const productMap = new Map(products.map((p) => [p.id, p]));
    const byProduct = new Map<string, { today: number; last7Days: number }>();

    for (const o of orders) {
      const orderDate = o.created_at ? new Date(o.created_at) : new Date();
      const isToday = orderDate >= today;
      const isLast7 = orderDate >= sevenDaysAgo;
      if (!isLast7) continue;

      const items = (o.items_details ?? o.items ?? []) as Array<{
        product_id?: string;
        quantity?: number;
        product?: { name?: string };
      }>;
      for (const item of items) {
        const pid = item.product_id ?? "";
        if (!pid) continue;
        const qty = item.quantity ?? 1;
        if (!byProduct.has(pid)) byProduct.set(pid, { today: 0, last7Days: 0 });
        const v = byProduct.get(pid)!;
        v.last7Days += qty;
        if (isToday) v.today += qty;
      }
    }

    const items: SalesItem[] = [];
    let stockValue = 0;
    for (const [pid, stats] of byProduct) {
      const p = productMap.get(pid);
      const price = p ? parseFloat(String(p.sale_price || p.price || 0)) : 0;
      stockValue += (p?.stock ?? 0) * price;
      items.push({
        id: pid,
        productName: p?.name ?? "Unknown",
        category: (p?.category ?? "Other").charAt(0).toUpperCase() + (p?.category ?? "").slice(1),
        quantitySoldToday: `${stats.today} Units`,
        avgDailySale: `${Math.round(stats.last7Days / 7)} Units`,
      });
    }
    items.sort((a, b) => b.productName.localeCompare(a.productName));
    return { salesItems: items, totalStockValue: stockValue };
  }, [ordersData, productsData]);

  const {
    displayedData: salesItems,
    hasMore,
    loadMore,
  } = usePagination({
    data: allSalesItems,
    initialItemsPerPage: 4,
    itemsPerPage: 4,
  });

  const columns: TableColumn<SalesItem>[] = [
    {
      key: "productName",
      title: "Product Name (Sold)",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "category",
      title: "Category",
      render: (value) => <span className="text-sm">{value as string}</span>,
    },
    {
      key: "quantitySoldToday",
      title: "Quantity Sold (Today)",
      render: (value) => <span className="text-sm">{value as string}</span>,
    },
    {
      key: "avgDailySale",
      title: "Avg. Daily Sale (7 Days)",
      render: (value) => <span className="text-sm">{value as string}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Inventory Management
        </h1>
        <p className="text-gray-600">
          This screen provides the canteen staff with the tools to monitor stock
          levels, receive new goods, and analyze consumption patterns.
        </p>
      </div>

      {/* Total Stock Value Card */}
      <MetricCard
        title="Total Stock Value"
        value={`₦ ${totalStockValue.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
        trend="up"
      />

      {/* Sales By Item Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Sales By Item (Consumption Analysis)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={salesItems}
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
