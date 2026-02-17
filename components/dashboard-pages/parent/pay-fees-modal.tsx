"use client";

import { useState, useEffect } from "react";
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
import { useInitializePaymentMutation } from "@/services/transactions/transactions";
import { getApiErrorMessage } from "@/lib/format-api-error";

interface Ward {
  id: string;
  user_id: string;
  user?: { first_name?: string; last_name?: string };
  class_assigned?: string | null;
}

interface PayFeesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wards: Ward[];
  schoolId: string;
  prefillAmount?: number;
  feesType?: string;
}

export function PayFeesModal({
  open,
  onOpenChange,
  wards,
  schoolId,
  prefillAmount,
}: PayFeesModalProps) {
  const [wardUserId, setWardUserId] = useState<string>(wards[0]?.user_id ?? "");
  const [amount, setAmount] = useState(prefillAmount ? String(prefillAmount) : "");
  const [description, setDescription] = useState("");
  const [initializePayment, { isLoading }] = useInitializePaymentMutation();

  useEffect(() => {
    if (open && wards.length > 0) {
      setWardUserId(wards[0].user_id);
    }
  }, [open, wards]);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setAmount(prefillAmount ? String(prefillAmount) : "");
      setWardUserId(wards[0]?.user_id ?? "");
      setDescription("");
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    const amt = parseFloat(amount?.replace(/,/g, "") || "0");
    if (!wardUserId) {
      toast.error("Please select a student");
      return;
    }
    if (!amt || amt < 100) {
      toast.error("Amount must be at least ₦100");
      return;
    }
    if (!schoolId) {
      toast.error("School not found");
      return;
    }
    try {
      const res = await initializePayment({
        amount: amt,
        school_id: schoolId,
        receiver_id: wardUserId,
        payment_type: "fees",
        payment_gateway: "paystack",
        ...(description.trim() && { description: description.trim() }),
      }).unwrap();
      const url = (res.data as { authorization_url?: string })?.authorization_url;
      const ref = (res.data as { reference?: string })?.reference;
      if (url) {
        if (ref) {
          sessionStorage.setItem("paystack_pending_ref", ref);
          sessionStorage.setItem("paystack_pending_time", String(Date.now()));
        }
        handleClose(false);
        window.location.href = url;
      } else {
        toast.error("Payment link could not be generated");
      }
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to initialize payment"));
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
      title="Pay School Fees"
      size="lg"
      footer={
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" onClick={() => handleClose(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
            {isLoading ? "Processing…" : "Proceed to Paystack"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          You will be redirected to Paystack to complete the payment securely.
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
          <Label htmlFor="pay-amount" className="text-sm font-medium text-gray-700">
            Amount (₦)
          </Label>
          <Input
            id="pay-amount"
            type="text"
            placeholder="e.g. 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
            className="mt-1 h-11"
          />
        </div>
        <div>
          <Label htmlFor="pay-description" className="text-sm font-medium text-gray-700">
            Description (optional)
          </Label>
          <Input
            id="pay-description"
            type="text"
            placeholder="e.g. Term 1 fees, JSS2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={225}
            className="mt-1 h-11"
          />
        </div>
      </div>
    </ModalContainer>
  );
}
