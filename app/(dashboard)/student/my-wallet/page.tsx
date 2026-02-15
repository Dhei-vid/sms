"use client";

import { useState, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import {
  ViewIcon,
  ViewOffIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import { useGetWalletBalanceQuery } from "@/services/wallet/wallet";
import { useGetTransactionsQuery } from "@/services/transactions/transactions";
import {
  mapTransactionsToRows,
  type WalletTransactionRow,
} from "@/lib/student-wallet-utils";

const PAGE_SIZE = 20;

export default function MyWalletPage() {
  const user = useAppSelector(selectUser);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const printRef = useRef<HTMLDivElement>(null);

  const { data: walletData, isLoading: isWalletLoading } =
    useGetWalletBalanceQuery(user?.id ?? undefined, {
      skip: !user?.id,
    });

  const { data: transactionsData, isLoading: isTransactionsLoading } =
    useGetTransactionsQuery({ _all: "true" }, { skip: !user?.id });

  const balance = walletData?.data?.balance ?? "0";
  const formattedBalance = `₦${parseFloat(String(balance)).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
  })}`;

  const transactions = Array.isArray(transactionsData?.data)
    ? transactionsData.data
    : [];
  const allRows = mapTransactionsToRows(transactions, balance);
  const displayedRows = allRows.slice(0, displayCount);
  const hasMore = allRows.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + PAGE_SIZE);
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head><title>Transaction Statement</title></head>
        <body>
          <h2>Wallet Transaction Statement</h2>
          <p>Generated: ${new Date().toLocaleString()}</p>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const columns: TableColumn<WalletTransactionRow>[] = [
    { key: "dateTime", title: "Date/Time" },
    { key: "transactionType", title: "Transaction Type" },
    { key: "itemSource", title: "Item/Source" },
    {
      key: "amount",
      title: "Amount",
      render: (value, row) => {
        const prefix = row.isDebit ? "- " : "+ ";
        const color = row.isDebit ? "text-red-600" : "text-green-600";
        return (
          <span className={color}>
            {prefix}
            {value as string}
          </span>
        );
      },
    },
    { key: "runningBalance", title: "Running Balance" },
  ];

  const isLoading = isWalletLoading || isTransactionsLoading;

  return (
    <div className="space-y-6">
      {/* Page Title and Description */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          My Wallet (Canteen/Payments)
        </h1>
        <p className="text-gray-600">
          This screen manages your internal digital account for school-related
          payments, ensuring a cashless environment.
        </p>
      </div>

      {/* Wallet Balance Section */}
      <Card className="p-0 bg-main-blue text-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-white/80 mb-1">Wallet Balance</p>
              <div className="flex items-center justify-between gap-2 rounded-md py-2">
                <p className="text-4xl font-bold text-white min-w-sm py-2 rounded-md">
                  {isBalanceVisible ? formattedBalance : "••••••"}
                </p>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="text-white/80 hover:text-white transition-colors ml-0"
                  type="button"
                >
                  <Icon
                    icon={isBalanceVisible ? ViewIcon : ViewOffIcon}
                    size={24}
                  />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History Table Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Transaction History Table
          </CardTitle>
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Icon icon={Download01Icon} size={18} />
            Print Transaction Statement
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Loading wallet and transactions…
            </div>
          ) : (
            <>
              <div ref={printRef} className="border rounded-lg overflow-hidden">
                <DataTable
                  columns={columns}
                  data={displayedRows}
                  showActionsColumn={false}
                  emptyMessage="No transactions yet. Your wallet activity will appear here."
                />
              </div>
              {hasMore && (
                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={handleLoadMore}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
