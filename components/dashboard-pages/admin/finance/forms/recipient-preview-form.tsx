"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { RecipientDataTableModal } from "@/components/dashboard-pages/admin/finance/components/recipient-data-table-modal";
import { ExclusionLogModal } from "@/components/dashboard-pages/admin/finance/components/exclusion-log-modal";

interface Recipient {
  id: string;
  name: string;
  studentId: string;
  gradeClass: string;
  invoiceValue: number;
  discountApplied: string;
  discountAmount?: number;
  discountPercentage?: number;
}

interface ExcludedStudent {
  id: string;
  name: string;
  studentId: string;
  gradeClass: string;
  exclusionReason: string;
}

interface RecipientPreviewFormProps {
  totalInvoices: number;
  totalAmount: number;
  onBack: () => void;
  onNext: () => void;
  recipients?: Recipient[];
  excludedStudents?: ExcludedStudent[];
}

export function RecipientPreviewForm({
  totalInvoices,
  totalAmount,
  onBack,
  onNext,
  recipients = [],
  excludedStudents = [],
}: RecipientPreviewFormProps) {
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [isExclusionModalOpen, setIsExclusionModalOpen] = useState(false);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-gray-800">
        Recipient Preview and Exception Handling
      </h3>

      <div className="flex flex-col gap-8 mb-6">
        <div>
          <span className="text-sm text-gray-600">
            Total Invoice Generated:
          </span>
          <span className="text-sm border px-4 py-2 rounded-md ml-2 text-gray-800">
            {totalInvoices} Invoices
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Total Amount Expected:</span>
          <span className="text-sm border px-4 py-2 rounded-md ml-2 text-gray-800">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      <Button
        variant={"outline"}
        onClick={() => setIsExclusionModalOpen(true)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-700">
          See Students automatically excluded from list
        </span>
        <Icon icon={ArrowRight01Icon} size={18} className="text-gray-400" />
      </Button>

      <Button
        variant={"outline"}
        onClick={() => setIsRecipientModalOpen(true)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-700">See all recipient</span>
        <Icon icon={ArrowRight01Icon} size={18} className="text-gray-400" />
      </Button>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="w-60">
          Finalize & Publish
        </Button>
      </div>

      {/* Modals */}
      <RecipientDataTableModal
        open={isRecipientModalOpen}
        onOpenChange={setIsRecipientModalOpen}
        recipients={recipients}
      />

      <ExclusionLogModal
        open={isExclusionModalOpen}
        onOpenChange={setIsExclusionModalOpen}
        title="Students automatically excluded from list"
        totalCount={excludedStudents.length}
        excludedStudents={excludedStudents}
      />
    </div>
  );
}
