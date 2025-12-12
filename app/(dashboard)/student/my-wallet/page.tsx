"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import {
  ViewIcon,
  ViewOffIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons";

interface Transaction {
  dateTime: string;
  transactionType: string;
  itemSource: string;
  amount: string;
  runningBalance: string;
  isDebit: boolean;
}

const defaultTransactions: Transaction[] = [
  {
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Meat Pie",
    amount: "₦700",
    runningBalance: "₦4,500",
    isDebit: true,
  },
  {
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Top - Up",
    itemSource: "Deposit",
    amount: "₦5,000",
    runningBalance: "₦7,200",
    isDebit: false,
  },
  {
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Jollof Rice + Chicken",
    amount: "₦1,500",
    runningBalance: "₦2,200",
    isDebit: true,
  },
  {
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Top - Up",
    itemSource: "Deposit",
    amount: "₦2,000",
    runningBalance: "₦3,700",
    isDebit: false,
  },
  {
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Meat Pie + Bottle Water",
    amount: "₦1,050",
    runningBalance: "₦1,700",
    isDebit: true,
  },
];

export default function MyWalletPage() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const balance = "₦4,500.00";

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
    {
      key: "runningBalance",
      title: "Running Balance",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title and Description */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          My Wallet (Canteen/Payments)
        </h1>
        <p className="text-gray-600">
          This screen manages the student&apos;s internal digital account for
          school-related payments, ensuring a cashless environment.
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
                  {isBalanceVisible ? balance : "••••••"}
                </p>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="text-white/80 hover:text-white transition-colors ml-0"
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
          <Button variant="outline" className="gap-2">
            <Icon icon={Download01Icon} size={18} />
            Print Transaction Statement
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={defaultTransactions}
              showActionsColumn={false}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
