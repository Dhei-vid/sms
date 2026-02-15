"use client";

import { useState, useMemo } from "react";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Eye, EyeOff } from "lucide-react";
import { WalletAdd02Icon, Download02Icon } from "@hugeicons/core-free-icons";
import { TopUpWalletModal } from "@/components/dashboard-pages/parent/dashboard/top-up-wallet-modal";
import { usePagination } from "@/hooks/use-pagination";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { useGetParentByUserIdQuery } from "@/services/stakeholders/stakeholders";
import { useGetWalletBalanceQuery } from "@/services/wallet/wallet";
import { useGetTransactionsQuery } from "@/services/transactions/transactions";
import { format } from "date-fns";
import type { Transaction as ApiTransaction } from "@/services/transactions/transaction-types";

interface Transaction {
  id: string;
  dateTime: string;
  transactionType: "Wallet Debit" | "Top - Up";
  itemSource: string;
  amount: string;
  runningBalance: string;
}


function formatTransactionRow(tx: ApiTransaction): Transaction {
  const isCredit = tx.transaction_type === "income";
  const amt = Math.abs(Number(tx.amount ?? 0));
  const currency = tx.currency ?? "₦";
  return {
    id: tx.id,
    dateTime: tx.created_at
      ? format(new Date(tx.created_at), "MMM. d, yyyy; h:mm a")
      : "—",
    transactionType: isCredit ? "Top - Up" : "Wallet Debit",
    itemSource: tx.description ?? tx.payment_type ?? "—",
    amount: isCredit ? `+ ${currency}${amt.toLocaleString()}` : `- ${currency}${amt.toLocaleString()}`,
    runningBalance: "—",
  };
}

export default function WalletPage() {
  const user = useAppSelector(selectUser);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

  const { data: parentData } = useGetParentByUserIdQuery(user?.id ?? "", {
    skip: !user?.id,
  });
  const parent = parentData?.data ?? null;
  const childrenDetails = (parent?.children_details ?? []) as Array<{
    id?: string;
    user_id?: string;
    user?: { first_name?: string; last_name?: string };
  }>;
  const primaryWard = childrenDetails[0] ?? null;
  const wardUserId = primaryWard?.user_id ?? null;
  const wardName =
    primaryWard?.user
      ? [primaryWard.user.first_name, primaryWard.user.last_name].filter(Boolean).join(" ") || "Ward"
      : "Ward";

  const { data: walletData } = useGetWalletBalanceQuery(wardUserId ?? undefined, {
    skip: !wardUserId,
  });
  const wallet = walletData?.data as { balance?: string; currency?: string } | undefined;
  const balanceFormatted =
    wallet?.balance != null && wallet?.currency
      ? `${wallet.currency} ${Number(wallet.balance).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
      : "₦0.00";

  const { data: transactionsData } = useGetTransactionsQuery(
    wardUserId ? { _all: "true", user_id: wardUserId } : { _all: "true" },
    { skip: !wardUserId }
  );
  const apiTransactions = (transactionsData?.data ?? []) as ApiTransaction[];
  const allTransactions = useMemo(
    () => apiTransactions.map(formatTransactionRow),
    [apiTransactions]
  );

  // Pagination
  const {
    displayedData: transactions,
    hasMore,
    loadMore,
  } = usePagination({
    data: allTransactions,
    initialItemsPerPage: 5,
    itemsPerPage: 5,
  });

  const getAmountColor = (amount: string) => {
    if (amount.startsWith("+")) {
      return "text-green-600";
    } else if (amount.startsWith("-")) {
      return "text-red-600";
    }
    // For amounts without sign (debits), default to red
    return "text-red-600";
  };

  const columns: TableColumn<Transaction>[] = [
    {
      key: "dateTime",
      title: "Date/Time",
    },
    {
      key: "transactionType",
      title: "Transaction Type",
    },
    {
      key: "itemSource",
      title: "Item/Source",
    },
    {
      key: "amount",
      title: "Amount",
      render: (value) => {
        const amount = value as string;
        return (
          <span className={`text-sm font-medium ${getAmountColor(amount)}`}>
            {amount}
          </span>
        );
      },
    },
    {
      key: "runningBalance",
      title: "Running Balance",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {wardName}&apos;s Wallet (Canteen/Payments)
        </h1>
        <p className="text-gray-600">
          This screen allows parents monitor their children spending in school.
        </p>
      </div>

      {/* Wallet Balance Section */}
      <div className="bg-main-blue text-white rounded-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm text-white/80 mb-1">Wallet Balance</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-white">
                  {balanceVisible ? balanceFormatted : "••••••"}
                </p>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {balanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setTopUpModalOpen(true)}
            className="bg-white text-main-blue hover:bg-gray-100 flex items-center gap-2"
          >
            <Icon icon={WalletAdd02Icon} size={18} />
            Top Up Wallet
          </Button>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-background rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Transaction History Table
          </h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Icon icon={Download02Icon} size={18} />
            Print Transaction Statement
          </Button>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <DataTable
            columns={columns}
            data={transactions}
            showActionsColumn={false}
          />
        </div>
        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className="bg-gray-100"
              onClick={loadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>

      {/* Top Up Wallet Modal */}
      <TopUpWalletModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
        studentName={wardName}
        currentBalance={balanceFormatted}
      />
    </div>
  );
}
