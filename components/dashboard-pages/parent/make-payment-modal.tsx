"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMakePaymentMutation } from "@/services/wallet/wallet";
import { useGetOrdersQuery } from "@/services/orders/orders";
import { getApiErrorMessage } from "@/lib/format-api-error";

interface Ward {
  id: string;
  user_id: string;
  user?: { first_name?: string; last_name?: string };
  class_assigned?: string | null;
}

interface MakePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wards: Ward[];
  schoolId: string;
  onSuccess?: () => void;
}

export function MakePaymentModal({
  open,
  onOpenChange,
  wards,
  schoolId,
  onSuccess,
}: MakePaymentModalProps) {
  const [wardUserId, setWardUserId] = useState<string>(wards[0]?.user_id ?? "");
  const [makePayment, { isLoading }] = useMakePaymentMutation();
  const { data: ordersData } = useGetOrdersQuery(
    { _all: true, status: "pending" },
    { skip: !open }
  );
  const orders = (ordersData?.data ?? []) as Array<{ id: string; code?: string; total_amount?: string | number }>;
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) setSelectedOrderId("");
    onOpenChange(isOpen);
  };

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);
  const orderAmount = selectedOrder?.total_amount
    ? Number(selectedOrder.total_amount)
    : 0;

  const handleSubmit = async () => {
    if (!wardUserId || !selectedOrderId) {
      toast.error("Please select a student and an order");
      return;
    }
    if (!schoolId) {
      toast.error("School not found");
      return;
    }
    if (orderAmount < 100) {
      toast.error("Order amount must be at least ₦100");
      return;
    }
    try {
      await makePayment({
        payment_type: "order",
        amount: orderAmount,
        school_id: schoolId,
        user_id: wardUserId,
        order_id: selectedOrderId,
      }).unwrap();
      toast.success("Payment successful");
      handleClose(false);
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Payment failed"));
    }
  };

  const wardLabel = (w: Ward) => {
    const name = w.user ? [w.user.first_name, w.user.last_name].filter(Boolean).join(" ") : "Student";
    return w.class_assigned ? `${name} (${w.class_assigned})` : name;
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Pay for Order"
      size="lg"
      footer={
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" onClick={() => handleClose(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1" disabled={isLoading || !selectedOrderId}>
            {isLoading ? "Processing…" : "Pay from Wallet"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Pay for a pending canteen order using your ward&apos;s wallet balance.
        </p>
        {wards.length > 1 && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Select student</Label>
            <Select value={wardUserId} onValueChange={setWardUserId}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Choose student" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((w) => (
                  <SelectItem key={w.id} value={w.user_id}>
                    {wardLabel(w)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <Label className="text-sm font-medium text-gray-700">Select order</Label>
          <Select value={selectedOrderId} onValueChange={setSelectedOrderId}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Choose pending order" />
            </SelectTrigger>
            <SelectContent>
              {orders.length === 0 ? (
                <div className="py-4 px-2 text-sm text-gray-500">No pending orders</div>
              ) : (
                orders.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.code ?? o.id} — ₦{Number(o.total_amount ?? 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        {selectedOrder && (
          <div className="rounded border p-3 bg-gray-50">
            <p className="text-sm font-medium">Amount: ₦{orderAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
