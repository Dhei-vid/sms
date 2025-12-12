"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TopUpWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName?: string;
  currentBalance?: string;
}

export function TopUpWalletModal({
  open,
  onOpenChange,
  studentName = "Tunde",
  currentBalance = "₦ 4,850.00",
}: TopUpWalletModalProps) {
  const [amount, setAmount] = useState("");

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when modal closes
      setAmount("");
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Top-up amount:", amount);
    // Reset form and close modal
    setAmount("");
    onOpenChange(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title={`Fund ${studentName}'s Wallet`}
      size="lg"
      footer={
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Confirm & Process Top-Up
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Current Wallet Balance */}
        <div className="flex flex-row gap-2">
          <Label
            htmlFor="currentBalance"
            className="text-sm font-medium text-gray-700"
          >
            Current Wallet Balance:
          </Label>
          <Input
            id="currentBalance"
            value={currentBalance}
            readOnly
            className="bg-gray-50 cursor-not-allowed w-fit"
          />
        </div>

        {/* Amount to Top Up */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount to Top Up (₦)
          </Label>
          <Input
            id="amount"
            type="text"
            placeholder="Text Input (e.g., 10,000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-11"
          />
        </div>
      </div>
    </ModalContainer>
  );
}
