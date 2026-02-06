"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { TransactionHeader } from "@/components/dashboard-pages/admin/finance/canteen-operations/transaction-header";
import { TransactionTabs } from "@/components/dashboard-pages/admin/finance/canteen-operations/transaction-tabs";
import { CoreTransactionDetailsView } from "@/components/dashboard-pages/admin/finance/canteen-operations/core-transaction-details-view";
import { AllocationAndItemsView } from "@/components/dashboard-pages/admin/finance/canteen-operations/allocation-and-items-view";

type TabId = "core" | "allocation";

export default function CanteenTransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<TabId>("core");
  const transactionId = params.id as string;

  // Mock transaction data - in real app, this would be fetched based on transactionId
  const transaction = {
    id: transactionId,
    studentName: "Sola Adebayo",
    studentId: "adebayo.m178031",
    dateTime: "Oct. 31, 2025; 11:15 AM",
    amount: 1500,
    transactionType: "Wallet Sale",
    paymentMethod: "Wallet Debit (POS Terminal 3)",
    sourceOperator: "Canteen Staff: Mrs. Kemi",
    lineItems: [
      { quantity: 1, item: "Jollof Rice & Chicken", price: 1850 },
      { quantity: 1, item: "Bottled Water", price: 150 },
    ],
    previousBalance: 4600,
    newBalance: 2600,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "core":
        return <CoreTransactionDetailsView transaction={transaction} />;
      case "allocation":
        return <AllocationAndItemsView transaction={transaction} />;
      default:
        return <CoreTransactionDetailsView transaction={transaction} />;
    }
  };

  return (
    <div className="space-y-6">
      <TransactionHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <TransactionTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderTabContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
