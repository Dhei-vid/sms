"use client";

import { useState, useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { usePagination } from "@/hooks/use-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { useGetParentByUserIdQuery } from "@/services/stakeholders/stakeholders";
import { useGetTransactionsQuery } from "@/services/transactions/transactions";
import { PayFeesModal } from "@/components/dashboard-pages/parent/pay-fees-modal";
import { format } from "date-fns";
import type { Transaction } from "@/services/transactions/transaction-types";

interface Ward {
  id: string;
  user_id: string;
  school_id?: string;
  user?: { first_name?: string; last_name?: string };
  class_assigned?: string | null;
  school_fees?: {
    total_owed?: number;
    total_paid?: number;
    total?: number;
    last_payment?: string | null;
  };
}

interface PaymentRow {
  id: string;
  description: string;
  paymentDate: string;
  amountPaid: string;
  status: string;
}

const CURRENCY = "₦";
const formatAmount = (n: number | string) =>
  `${CURRENCY}${Number(n).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

function txToPaymentRow(tx: Transaction): PaymentRow {
  const amt = typeof tx.amount === "string" ? parseFloat(tx.amount) : Number(tx.amount);
  return {
    id: tx.id,
    description: tx.description ?? tx.payment_type ?? "Payment",
    paymentDate: tx.created_at ? format(new Date(tx.created_at), "MMM. d, yyyy") : "—",
    amountPaid: formatAmount(Math.abs(amt)),
    status: tx.status === "completed" ? "Completed" : tx.status ?? "—",
  };
}

export default function FeePaymentManagementPage() {
  const user = useAppSelector(selectUser);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payPrefill, setPayPrefill] = useState<{ amount?: number; feesType?: string }>({});

  const { data: parentData } = useGetParentByUserIdQuery(user?.id ?? "", { skip: !user?.id });
  const parent = parentData?.data ?? null;
  const wards = (parent?.children_details ?? []) as Ward[];
  const schoolId = parent?.school_id ?? wards[0]?.school_id ?? user?.school_id ?? "";

  const { data: txData, refetch: refetchTx } = useGetTransactionsQuery(
    { _all: "true" },
    { skip: !user?.id }
  );
  const apiTx = (txData?.data ?? []) as Transaction[];
  const feePayments = useMemo(
    () =>
      apiTx
        .filter((t) => (t.payment_type ?? "").toLowerCase() === "fees")
        .sort((a, b) => {
          const da = a.created_at ? new Date(a.created_at).getTime() : 0;
          const db = b.created_at ? new Date(b.created_at).getTime() : 0;
          return db - da;
        }),
    [apiTx]
  );
  const paymentRows = useMemo(() => feePayments.map(txToPaymentRow), [feePayments]);

  const { displayedData, hasMore, loadMore } = usePagination({
    data: paymentRows,
    initialItemsPerPage: 5,
    itemsPerPage: 5,
  });

  const totalOutstanding = useMemo(() => {
    let sum = 0;
    for (const w of wards) {
      const fees = w.school_fees ?? {};
      const owed = fees.total_owed ?? (Number(fees.total ?? 0) - Number(fees.total_paid ?? 0));
      if (owed > 0) sum += owed;
    }
    return sum;
  }, [wards]);

  const lastPaymentDate = useMemo(() => {
    let latest: string | null = null;
    for (const w of wards) {
      const last = w.school_fees?.last_payment;
      if (last && (!latest || last > latest)) latest = last;
    }
    return latest;
  }, [wards]);

  const handlePayNow = (amount?: number, feesType?: string) => {
    setPayPrefill({ amount, feesType });
    setPayModalOpen(true);
  };

  const paymentColumns: TableColumn<PaymentRow>[] = [
    { key: "description", title: "Description", render: (v) => <span className="font-medium text-gray-800">{v as string}</span> },
    { key: "paymentDate", title: "Date" },
    { key: "amountPaid", title: "Amount" },
    { key: "status", title: "Status", render: (v) => <span className="text-sm font-medium text-green-600">{v as string}</span> },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Fees & Payments Management</h1>
        <p className="text-gray-600">
          Manage school fees for your wards. Make payments from your wallet and view history.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-col-1 lg:grid-cols-2 2xl:grid-cols-2 gap-3">
          <MetricCard
            title="Total Outstanding Balance"
            value={formatAmount(totalOutstanding)}
            trend={totalOutstanding > 0 ? "up" : undefined}
          />
          <MetricCard
            title="Last Payment"
            value={lastPaymentDate ? format(new Date(lastPaymentDate), "MMM. d, yyyy") : "—"}
          />
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => handlePayNow()}
            className="w-full h-11"
            disabled={wards.length === 0 || !schoolId}
          >
            <Icon icon={AddSquareIcon} size={18} />
            Make Quick Payment
          </Button>
        </div>
      </div>

      {wards.length > 0 && totalOutstanding > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Outstanding Fees by Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {wards.map((w) => {
                const fees = w.school_fees ?? {};
                const owed = fees.total_owed ?? (Number(fees.total ?? 0) - Number(fees.total_paid ?? 0));
                if (owed <= 0) return null;
                const name = w.user
                  ? [w.user.first_name, w.user.last_name].filter(Boolean).join(" ") || "Student"
                  : "Student";
                return (
                  <div
                    key={w.id}
                    className="flex items-center justify-between rounded border p-3"
                  >
                    <span className="font-medium">
                      {name}
                      {w.class_assigned ? ` (${w.class_assigned})` : ""}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{formatAmount(owed)}</span>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-main-blue"
                        onClick={() => handlePayNow(owed)}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentRows.length === 0 ? (
            <p className="text-gray-500 py-4">No fee payments yet.</p>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <DataTable columns={paymentColumns} data={displayedData} showActionsColumn={false} />
              </div>
              {hasMore && (
                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={loadMore}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <PayFeesModal
        open={payModalOpen}
        onOpenChange={setPayModalOpen}
        wards={wards}
        schoolId={schoolId}
        prefillAmount={payPrefill.amount}
        feesType={payPrefill.feesType}
      />
    </div>
  );
}
