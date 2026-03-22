"use client";

import { useState, Dispatch, SetStateAction } from "react";
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
  paymentDate: undefined as Date | undefined,
  paymentMethod: "",
  transactionRef: "",
  amountReceived: "",
  isOutstandingBalance: false,
  isVerified: false,
  sendReceipt: false,
};

interface LogPaymentForm {
  searchQuery: string;
  payerName: string;
  paymentDate: Date | undefined;
  paymentMethod: string;
  transactionRef: string;
  amountReceived: string;
  isOutstandingBalance: boolean;
  isVerified: boolean;
  sendReceipt: boolean;
}

interface LogPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogPaymentModal({ open, onOpenChange }: LogPaymentModalProps) {
  const [formData, setFormData] = useState<LogPaymentForm>(initialData);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleDateChange: Dispatch<SetStateAction<Date | undefined>> = (
    date,
  ) => {
    setFormData((prev) => ({
      ...prev,
      paymentDate: typeof date === "function" ? date(prev.paymentDate) : date,
    }));
  };

  const handleSubmit = () => {
    console.log("Log payment submitted", {
      ...formData,
    });
    setFormData(initialData);
    onOpenChange(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setFormData(initialData);
    }
    onOpenChange(open);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Log Payment (Manual Entry)"
      size="2xl"
    >
      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="search-account" className="text-sm font-medium">
            Search Student Account
          </Label>
          <div className="relative">
            <Input
              id="search-account"
              placeholder="Search by Student Name, Student ID, or Invoice Number"
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

        <InputField
          label="Payer/Student Name"
          placeholder="Pre-filled after search"
          value={formData.payerName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, payerName: e.target.value }))
          }
        />

        <DatePickerIcon
          label="Date of Payment"
          date={formData.paymentDate}
          setDate={handleDateChange}
          open={datePickerOpen}
          setOpen={setDatePickerOpen}
          placeholder="mm/dd/yy"
        />

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
          <SelectItem value="pos">POS Card</SelectItem>
          <SelectItem value="cheque">Cheque</SelectItem>
          <SelectItem value="online">Online Payment</SelectItem>
        </SelectField>

        <InputField
          label="Transaction Reference"
          placeholder="placeholder"
          value={formData.transactionRef}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              transactionRef: e.target.value,
            }))
          }
        />

        <InputField
          label="Amount Received (₦)"
          placeholder="placeholder"
          type="number"
          value={formData.amountReceived}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              amountReceived: e.target.value,
            }))
          }
        />

        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2">
            <div className="space-y-1">
              <Label
                htmlFor="outstanding-balance"
                className="text-sm font-normal cursor-pointer"
              >
                Payment for an Outstanding Balance
              </Label>
              <p className="text-xs text-gray-600">
                Payment for the student's current debt.
              </p>
            </div>
            <Checkbox
              id="outstanding-balance"
              checked={formData.isOutstandingBalance}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isOutstandingBalance: checked === true,
                }))
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <Label
            htmlFor="verified"
            className="text-sm font-normal cursor-pointer"
          >
            I verify this amount has been deposited/verified by the Finance
            Team.
          </Label>
          <Checkbox
            id="verified"
            checked={formData.isVerified}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                isVerified: checked === true,
              }))
            }
          />
        </div>

        <div className="flex justify-between items-center gap-2">
          <Label
            htmlFor="send-receipt"
            className="text-sm font-normal cursor-pointer"
          >
            Send Payment Confirmation Receipt to Parent/Payer.
          </Label>
          <Checkbox
            id="send-receipt"
            checked={formData.sendReceipt}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                sendReceipt: checked === true,
              }))
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Log Payment</Button>
        </div>
      </div>
    </ModalContainer>
  );
}
