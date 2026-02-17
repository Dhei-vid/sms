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
import { useTransferFundsMutation } from "@/services/wallet/wallet";
import { getApiErrorMessage } from "@/lib/format-api-error";

interface Ward {
  id: string;
  user_id: string;
  user?: { first_name?: string; last_name?: string };
  class_assigned?: string | null;
}

interface TransferFundsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wards: Ward[];
  parentBalance: string | number;
  onSuccess?: () => void;
}

function formatBalance(bal: string | number): string {
  const n = typeof bal === "string" ? parseFloat(bal) : bal;
  return `₦${Number.isNaN(n) ? "0" : n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

export function TransferFundsModal({
  open,
  onOpenChange,
  wards,
  parentBalance,
  onSuccess,
}: TransferFundsModalProps) {
  const [wardUserId, setWardUserId] = useState<string>(wards[0]?.user_id ?? "");
  const [amount, setAmount] = useState("");
  const [transferFunds, { isLoading }] = useTransferFundsMutation();

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) setAmount("");
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
    const bal = typeof parentBalance === "string" ? parseFloat(parentBalance) : parentBalance;
    if (Number.isNaN(bal) || bal < amt) {
      toast.error("Insufficient wallet balance");
      return;
    }
    try {
      await transferFunds({
        receiver_id: wardUserId,
        amount: amt,
      }).unwrap();
      toast.success("Transfer successful");
      handleClose(false);
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Transfer failed"));
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
      title="Transfer to Ward"
      size="lg"
      footer={
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" onClick={() => handleClose(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
            {isLoading ? "Processing…" : "Transfer"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Transfer from your wallet to your ward&apos;s wallet. Your balance will be debited and
          credited to the selected student.
        </p>
        <div>
          <Label className="text-sm font-medium text-gray-700">Your balance</Label>
          <Input value={formatBalance(parentBalance)} readOnly className="bg-gray-50 mt-1 w-fit" />
        </div>
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
          <Label htmlFor="transfer-amount" className="text-sm font-medium text-gray-700">
            Amount (₦)
          </Label>
          <Input
            id="transfer-amount"
            type="text"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
            className="mt-1 h-11"
          />
        </div>
      </div>
    </ModalContainer>
  );
}
