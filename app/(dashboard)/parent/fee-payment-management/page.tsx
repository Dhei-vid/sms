"use client";

import { useState } from "react";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { usePagination } from "@/hooks/use-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/general/huge-icon";
import { AddSquareIcon, FileDownloadIcon } from "@hugeicons/core-free-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Invoice {
  id: string;
  name: string;
  amount: string;
  dateDue: string;
}

interface Payment {
  id: string;
  description: string;
  paymentDate: string;
  amountPaid: string;
  status: string;
}

const invoices: Invoice[] = [
  {
    id: "1",
    name: "Tuition Fee (Term 2)",
    amount: "₦ 200,000.00",
    dateDue: "Nov. 25, 2025",
  },
  {
    id: "2",
    name: "Extracurricular Activities",
    amount: "₦ 50,000.00",
    dateDue: "Dec. 12, 2025",
  },
];

// Sample data - in production, this would come from an API
const allPayments: Payment[] = [
  {
    id: "1",
    description: "Tuition Fee (Term 1)",
    paymentDate: "Sept., 01 2025",
    amountPaid: "₦ 200,000.00",
    status: "Completed",
  },
  {
    id: "2",
    description: "Uniform Purchase",
    paymentDate: "Sept., 01 2025",
    amountPaid: "₦ 15,000.00",
    status: "Completed",
  },
  {
    id: "3",
    description: "Admission Deposit",
    paymentDate: "Sept., 01 2025",
    amountPaid: "₦ 50,000.00",
    status: "Completed",
  },
  {
    id: "4",
    description: "Library Fee",
    paymentDate: "Aug., 15 2025",
    amountPaid: "₦ 5,000.00",
    status: "Completed",
  },
  {
    id: "5",
    description: "Sports Equipment",
    paymentDate: "Aug., 10 2025",
    amountPaid: "₦ 10,000.00",
    status: "Completed",
  },
];

export default function FeePaymentManagementPage() {
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(
    new Set(),
  );

  /**
   * Pagination hook for payment history table
   * Manages displaying payments in batches with "Load More" functionality
   * Initially shows 3 items, loads 3 more per click
   */
  const {
    displayedData: displayedPayments,
    hasMore,
    loadMore,
  } = usePagination({
    data: allPayments,
    initialItemsPerPage: 3,
    itemsPerPage: 3,
  });

  const handleToggleInvoice = (invoiceId: string) => {
    setSelectedInvoices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(invoiceId)) {
        newSet.delete(invoiceId);
      } else {
        newSet.add(invoiceId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(new Set(invoices.map((inv) => inv.id)));
    } else {
      setSelectedInvoices(new Set());
    }
  };

  const handlePayNow = (invoice: Invoice) => {
    // Handle payment logic
    console.log("Pay now for:", invoice.name);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Handle download logic
    console.log("Download invoice:", invoice.name);
  };

  const handleViewReceipt = (payment: Payment) => {
    // Handle view receipt logic
    console.log("View receipt for:", payment.description);
  };

  const handleMakeQuickPayment = () => {
    // Handle quick payment logic
    console.log("Make quick payment");
  };

  const invoiceColumns: TableColumn<Invoice>[] = [
    {
      key: "checkbox",
      title: "",
      render: (value, row) => (
        <Checkbox
          checked={selectedInvoices.has(row.id)}
          onCheckedChange={() => handleToggleInvoice(row.id)}
        />
      ),
      className: "w-12",
    },
    {
      key: "name",
      title: "Invoice",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
    },
    {
      key: "dateDue",
      title: "Date Due",
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        return (
          <div className="flex items-center gap-3">
            <Button
              variant="link"
              className="h-auto p-0 text-main-blue"
              onClick={() => handlePayNow(row)}
            >
              Pay Now
            </Button>
            <Button
              variant="link"
              className="h-auto p-0 text-main-blue"
              onClick={() => handleDownloadInvoice(row)}
            >
              Download Invoice
            </Button>
          </div>
        );
      },
    },
  ];

  const paymentColumns: TableColumn<Payment>[] = [
    {
      key: "description",
      title: "Description",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "paymentDate",
      title: "Payment Date",
    },
    {
      key: "amountPaid",
      title: "Amount Paid",
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as string;
        return (
          <span className="text-sm font-medium text-green-600">{status}</span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        return (
          <Button
            variant="link"
            className="h-auto p-0 text-main-blue"
            onClick={() => handleViewReceipt(row)}
          >
            View Receipt
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Fees & Payments Management
        </h1>
        <p className="text-gray-600">
          This screen serves as the parent&apos;s primary financial hub,
          detailing all invoices, payment history, and providing secure methods
          for settling school fees.
        </p>
      </div>

      {/* Total Outstanding Balance Section */}
      <div className="space-y-4">
        <div className={"grid grid-col-1 lg:grid-cols-2 2xl:grid-cols-2 gap-3"}>
          <MetricCard
            title="Total Outstanding Balance"
            value="₦ 250,000.00"
            trend="up"
          />
          <MetricCard title="Next Due Date" value="Nov. 25, 2025" trend="up" />
        </div>
        <div className="flex items-end">
          <Button
            variant={"outline"}
            onClick={handleMakeQuickPayment}
            className="w-full h-11"
          >
            <Icon icon={AddSquareIcon} size={18} />
            Make Quick Payment
          </Button>
        </div>
      </div>

      {/* List of all active invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            List of all active invoices:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-main-blue/5">
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedInvoices.size === invoices.length &&
                        invoices.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Invoice</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Date Due</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedInvoices.has(invoice.id)}
                        onCheckedChange={() => handleToggleInvoice(invoice.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.name}
                    </TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.dateDue}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="link"
                          className="h-auto p-0 text-main-blue"
                          onClick={() => handlePayNow(invoice)}
                        >
                          Pay Now
                        </Button>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-main-blue"
                          onClick={() => handleDownloadInvoice(invoice)}
                        >
                          Download Invoice
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={paymentColumns}
              data={displayedPayments}
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
