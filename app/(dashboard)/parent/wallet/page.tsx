"use client";

import { useState } from "react";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Eye, EyeOff } from "lucide-react";
import { WalletAdd02Icon, Download02Icon } from "@hugeicons/core-free-icons";
import { TopUpWalletModal } from "@/components/dashboard-pages/parent/dashboard/top-up-wallet-modal";

interface Transaction {
  id: string;
  dateTime: string;
  transactionType: "Wallet Debit" | "Top - Up";
  itemSource: string;
  amount: string;
  runningBalance: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Meat Pie",
    amount: "- ₦700",
    runningBalance: "₦4,500",
  },
  {
    id: "2",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Top - Up",
    itemSource: "Deposit",
    amount: "+ ₦5,000",
    runningBalance: "₦7,200",
  },
  {
    id: "3",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Jollof Rice + Chicken",
    amount: "- ₦1,500",
    runningBalance: "₦2,200",
  },
  {
    id: "4",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Top - Up",
    itemSource: "Deposit",
    amount: "+ ₦2,000",
    runningBalance: "₦3,700",
  },
  {
    id: "5",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Meat Pie + Bottle Water",
    amount: "₦1,050",
    runningBalance: "₦1,700",
  },
];

export default function WalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

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
          Tunde&apos;s Wallet (Canteen/Payments)
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
                  {balanceVisible ? "₦4,500.00" : "••••••"}
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
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="bg-gray-100">
            Load More
          </Button>
        </div>
      </div>

      {/* Top Up Wallet Modal */}
      <TopUpWalletModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
        studentName="Tunde"
        currentBalance="₦4,500.00"
      />
    </div>
  );
}
