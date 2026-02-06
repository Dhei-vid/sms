"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePickerIcon from "@/components/ui/date-picker";
import { Search } from "lucide-react";
import { SelectItem } from "@/components/ui/select";

const initialData = {
  searchQuery: "",
  payerName: "",
  amount: "",
  paymentMethod: "",
  transactionRef: "",
  depositedBy: "",
  paymentDate: undefined as Date | undefined,
  sendConfirmation: false,
};

interface AddWalletTopUpForm {
  searchQuery: string;
  payerName: string;
  amount: string;
  paymentMethod: string;
  transactionRef: string;
  depositedBy: string;
  paymentDate: Date | undefined;
  sendConfirmation: boolean;
}

interface AddWalletTopUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWalletTopUpModal({
  open,
  onOpenChange,
}: AddWalletTopUpModalProps) {
  const [formData, setFormData] = useState<AddWalletTopUpForm>(initialData);

  const handleSubmit = () => {
    // Handle form submission
    console.log("Add wallet top-up submitted", {
      ...formData,
    });
    // Reset form and close modal
    setFormData(initialData);
    onOpenChange(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when modal closes
      setFormData(initialData);
    }
    onOpenChange(open);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Add Wallet Top-Up"
      size="2xl"
    >
      <div className="space-y-6 py-4">
        {/* Search Student Account */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Search Student Account</Label>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search by Student Name, Student ID, or Invoice Number."
              value={formData.searchQuery}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  searchQuery: e.target.value,
                }))
              }
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Payer/Student Name */}
        <InputField
          label="Payer/Student Name"
          placeholder="Pre-filled after search."
          type="text"
          value={formData.payerName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              payerName: e.target.value,
            }))
          }
        />

        {/* Amount to Credit */}
        <InputField
          label="Amount to Credit (₦)"
          placeholder="placeholder"
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              amount: e.target.value,
            }))
          }
        />

        {/* Payment Method */}
        <SelectField
          label="Payment Method"
          value={formData.paymentMethod}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, paymentMethod: value }))
          }
          placeholder="placeholder"
        >
          <SelectItem value="cash">Cash</SelectItem>
          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
          <SelectItem value="pos">POS</SelectItem>
          <SelectItem value="cheque">Cheque</SelectItem>
        </SelectField>

        {/* Transaction Reference */}
        <InputField
          label="Transaction Reference"
          placeholder="placeholder"
          type="text"
          value={formData.transactionRef}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              transactionRef: e.target.value,
            }))
          }
        />

        {/* Deposited By */}
        <InputField
          label="Deposited By"
          placeholder="placeholder"
          type="text"
          value={formData.depositedBy}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              depositedBy: e.target.value,
            }))
          }
        />

        {/* Date of Payment */}
        <div className="space-y-2">
          <DatePickerIcon
            label="Date of Payment"
            date={formData.paymentDate}
            setDate={(date) =>
              setFormData((prev) => ({
                ...prev,
                paymentDate: date as Date | undefined,
              }))
            }
            placeholder="Pre-filled by the day of transaction."
          />
        </div>

        {/* Send Confirmation Checkbox */}
        <div className="flex justify-between items-center gap-2">
          <Label
            htmlFor="send-confirmation"
            className="text-sm font-normal cursor-pointer"
          >
            Send Wallet Top-Up Confirmation to Parent/Payer.
          </Label>
          <Checkbox
            id="send-confirmation"
            checked={formData.sendConfirmation}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                sendConfirmation: checked === true,
              }))
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Log Top-Up & Credit Wallet</Button>
        </div>
      </div>
    </ModalContainer>
  );
}
