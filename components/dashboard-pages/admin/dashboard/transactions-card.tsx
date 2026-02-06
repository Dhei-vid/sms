"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/general/huge-icon";
import { ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";

interface Transaction {
  title: string;
  amount: string;
  date: string;
  description: string;
  type?: "debit" | "credit";
  icon?: any;
}

interface TransactionsCardProps {
  transactions?: Transaction[];
}

const defaultTransactions: Transaction[] = [
  {
    title: "Canteen Debit Paid",
    amount: "₦49,499",
    date: "Oct. 20, 3:33 PM",
    description: "Paid off Ms. Adebayo Snacks",
    type: "debit",
    icon: ArrowUp01Icon,
  },
  {
    title: "Canteen Purchase",
    amount: "₦800",
    date: "Oct. 20, 11:33 AM",
    description: "musa.m120789 bought meat pie % smoothies",
    type: "credit",
    icon: ArrowDown01Icon,
  },
  {
    title: "Canteen Purchase",
    amount: "₦800",
    date: "Oct. 20, 11:33 AM",
    description: "musa.m120789 bought meat pie % smoothies",
    type: "credit",
    icon: ArrowDown01Icon,
  },
];

export function TransactionsCard({
  transactions = defaultTransactions,
}: TransactionsCardProps) {
  const getIconColor = (type?: "debit" | "credit") => {
    if (type === "debit") return "text-red-600";
    return "text-green-600";
  };

  const getIconBgColor = (type?: "debit" | "credit") => {
    if (type === "debit") return "bg-red-100";
    return "bg-green-100";
  };

  const getAmountColor = (type?: "debit" | "credit") => {
    if (type === "debit") return "text-red-600";
    return "text-green-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex gap-3">
            <div
              className={`h-5 w-5 rounded-full ${getIconBgColor(
                transaction.type,
              )} flex items-center justify-center shrink-0`}
            >
              {transaction.icon && (
                <Icon
                  icon={transaction.icon}
                  size={16}
                  className={getIconColor(transaction.type)}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-800">
                  {transaction.title}
                </p>
                <span
                  className={`text-sm font-semibold ${getAmountColor(
                    transaction.type,
                  )}`}
                >
                  {transaction.amount}
                </span>
              </div>
              <p className="text-xs text-gray-500">{transaction.date}</p>
              <p className="text-xs text-gray-600 mt-1">
                {transaction.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
