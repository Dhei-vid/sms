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

interface LineItem {
  quantity: number;
  item: string;
  price: number;
}

interface Transaction {
  id: string;
  lineItems: LineItem[];
  previousBalance: number;
  newBalance: number;
}

interface AllocationAndItemsViewProps {
  transaction: Transaction;
}

export function AllocationAndItemsView({
  transaction,
}: AllocationAndItemsViewProps) {
  const lineItemDetails = transaction.lineItems
    .map(
      (item) =>
        `${item.quantity} x ${item.item} (${formattedAmount(item.price)})`
    )
    .join(" + ");

  const allocationDetails = [
    {
      label: "Line Item Details",
      value: lineItemDetails,
    },
    {
      label: "Previous Balance",
      value: formattedAmount(transaction.previousBalance),
    },
    {
      label: "New Balance",
      value: formattedAmount(transaction.newBalance),
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Allocation and Items
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
            {allocationDetails.map((detail, index) => (
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

