"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { usePagination } from "@/hooks/use-pagination";

interface SalesItem {
  id: string;
  productName: string;
  category: string;
  quantitySoldToday: string;
  avgDailySale: string;
}

// Sample data - in production, this would come from an API
const allSalesItems: SalesItem[] = [
  {
    id: "1",
    productName: "Jollof Rice",
    category: "Food",
    quantitySoldToday: "55 Plates",
    avgDailySale: "88 Plates",
  },
  {
    id: "2",
    productName: "Bottled Water",
    category: "Drinks",
    quantitySoldToday: "110 Units",
    avgDailySale: "105 Units",
  },
  {
    id: "3",
    productName: "Meat Pie",
    category: "Snacks",
    quantitySoldToday: "40 Units",
    avgDailySale: "55 Units",
  },
  {
    id: "4",
    productName: "Zobo Drink",
    category: "Drinks",
    quantitySoldToday: "55 Units",
    avgDailySale: "78 Units",
  },
  {
    id: "5",
    productName: "Fried Rice",
    category: "Food",
    quantitySoldToday: "45 Plates",
    avgDailySale: "60 Plates",
  },
  {
    id: "6",
    productName: "Donuts",
    category: "Snacks",
    quantitySoldToday: "30 Units",
    avgDailySale: "40 Units",
  },
];

export default function InventoryManagementPage() {
  // Pagination
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
      <MetricCard title="Total Stock Value" value="₦ 850,000.00" trend="up" />

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
