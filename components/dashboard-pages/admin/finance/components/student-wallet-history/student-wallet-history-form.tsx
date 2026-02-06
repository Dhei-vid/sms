"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/components/general/huge-icon";
import {
  WalletAdd02Icon,
  Download01Icon,
  ViewIcon,
  ViewOffIcon,
  Download02Icon,
} from "@hugeicons/core-free-icons";
import { formattedAmount } from "@/common/helper";
import { cn } from "@/lib/utils";
import { AddWalletTopUpModal } from "../add-wallet-topup-modal";
import Image from "next/image";

interface Transaction {
  id: string;
  dateTime: string;
  transactionType: string;
  itemSource: string;
  amount: number;
  runningBalance: number;
}

// Mock student data - in real app, this would come from props or API
const mockStudent = {
  name: "Adaeze Okoro",
  studentId: "okoroum178023",
  currentClass: "Senior Secondary 2 (SS2)",
  profilePicture:
    "https://images.pexels.com/photos/1068209/pexels-photo-1068209.jpeg", // Placeholder for profile picture
  walletBalance: 4500,
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Meat Pie",
    amount: 700,
    runningBalance: 4500,
  },
  {
    id: "2",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Top-Up",
    itemSource: "Online Portal",
    amount: 5000,
    runningBalance: 7200,
  },
  {
    id: "3",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Jollof Rice + Chicken",
    amount: 1500,
    runningBalance: 2200,
  },
  {
    id: "4",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Top-Up",
    itemSource: "Manual Top-Up",
    amount: 2000,
    runningBalance: 3700,
  },
  {
    id: "5",
    dateTime: "Oct. 20, 2025; 12:30 PM",
    transactionType: "Wallet Debit",
    itemSource: "Meat Pie + Bottle Water",
    amount: 1050,
    runningBalance: 1700,
  },
];

interface StudentWalletHistoryFormProps {
  onTopUp?: () => void;
}

export function StudentWalletHistoryForm({
  onTopUp,
}: StudentWalletHistoryFormProps) {
  const [topUpModalOpen, setTopUpModalOpen] = useState<boolean>(false);
  const [hideBalance, setHideBalance] = useState<boolean>(false);

  const handlePrintStatement = () => {
    // Handle print transaction statement
    console.log("Print transaction statement");
    window.print();
  };

  const getTransactionTypeColor = (type: string) => {
    if (type.toLowerCase().includes("debit")) {
      return "text-red-600";
    } else if (type.toLowerCase().includes("top-up")) {
      return "text-green-600";
    }
    return "text-gray-600";
  };

  return (
    <div className="space-y-6 py-4">
      {/* Student Information Section */}
      <div className="grid grid-cols-2 items-start gap-2">
        <div className="flex items-start gap-2 border rounded-md h-full">
          {/* Profile Picture */}
          <div className="w-35 h-35 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {mockStudent.profilePicture ? (
              <Image
                width={200}
                height={200}
                src={mockStudent.profilePicture}
                alt={mockStudent.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-main-blue/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-main-blue">
                  {mockStudent.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Student Details */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {mockStudent.name}
            </h3>
            <div className="border rounded-md px-2 py-1 w-fit">
              <p className="text-xs text-gray-600 mb-1">
                Student ID: {mockStudent.studentId}
              </p>
            </div>
            <div className="border rounded-md px-2 py-1 w-fit">
              <p className="text-xs text-gray-600">
                Current class: {mockStudent.currentClass}
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="flex flex-col bg-main-blue rounded-lg p-4 min-w-[200px] relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white/90">
              Wallet Balance
            </span>
            <button
              onClick={() => setHideBalance((prev) => !prev)}
              className="cursor-pointer"
            >
              <Icon
                icon={hideBalance ? ViewIcon : ViewOffIcon}
                size={16}
                className="text-white/80 cursor-pointer hover:text-white"
              />
            </button>
          </div>
          <div className="text-3xl font-bold text-white mb-4">
            {hideBalance
              ? "*********"
              : formattedAmount(mockStudent.walletBalance)}
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="bg-white hover:bg-white/90 place-self-end"
            onClick={() => {
              setTopUpModalOpen(true);
              onTopUp?.();
            }}
          >
            <Icon icon={WalletAdd02Icon} size={16} />
            Top-Up Wallet
          </Button>
        </div>
      </div>

      {/* Transaction History Table Section */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Transaction History Table
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintStatement}
            className="gap-2 text-muted-foreground"
          >
            <Icon icon={Download02Icon} size={16} />
            Print Transaction Statement
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-main-blue/5">
                <TableHead className="px-4 py-3">Date/Time</TableHead>
                <TableHead className="px-4 py-3">Transaction Type</TableHead>
                <TableHead className="px-4 py-3">Item/Source</TableHead>
                <TableHead className="px-4 py-3">Amount</TableHead>
                <TableHead className="px-4 py-3">Running Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="px-4 py-3 text-sm text-gray-600">
                    {transaction.dateTime}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        getTransactionTypeColor(transaction.transactionType),
                      )}
                    >
                      {transaction.transactionType}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-700">
                    {transaction.itemSource}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold">
                    {formattedAmount(transaction.amount)}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold text-gray-800">
                    {formattedAmount(transaction.runningBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pt-2">
          <Button variant="outline" onClick={() => console.log("Load more")}>
            Load More
          </Button>
        </div>
      </div>

      {/* Add Wallet Top-Up Modal */}
      <AddWalletTopUpModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
      />
    </div>
  );
}
