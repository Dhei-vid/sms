"use client";

import { formattedAmount } from "@/common/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  studentName: string;
  studentId: string;
  dateTime: string;
  amount: number;
  transactionType: string;
  paymentMethod: string;
  sourceOperator: string;
}

interface CoreTransactionDetailsViewProps {
  transaction: Transaction;
}

export function CoreTransactionDetailsView({
  transaction,
}: CoreTransactionDetailsViewProps) {
  const details = [
    {
      label: "Student Name (ID)",
      value: `${transaction.studentName}, ${transaction.studentId}`,
    },
    {
      label: "Transaction Date/Time",
      value: transaction.dateTime,
    },
    {
      label: "Amount",
      value: formattedAmount(transaction.amount),
    },
    {
      label: "Transaction Type",
      value: transaction.transactionType,
    },
    {
      label: "Payment Method",
      value: transaction.paymentMethod,
    },
    {
      label: "Source/Operator",
      value: transaction.sourceOperator,
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Core Transaction Details
      </h3>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="px-4 py-3">Form Field</TableHead>
              <TableHead className="px-4 py-3">Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.map((detail, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-3 text-sm font-medium text-gray-600">
                  {detail.label}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-800">
                  {detail.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

