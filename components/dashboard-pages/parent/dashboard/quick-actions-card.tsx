"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import {
  Discount01Icon,
  WalletAdd02Icon,
  Payment02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { TopUpWalletModal } from "./top-up-wallet-modal";
import { OutstandingFeesModal } from "./outstanding-fees-modal";
import { FinancialArrangementModal } from "./financial-arrangement-modal";
import { LeaveRequestModal } from "./leave-request-modal";

export function QuickActionsCard() {
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [outstandingFeesModalOpen, setOutstandingFeesModalOpen] =
    useState(false);
  const [financialArrangementModalOpen, setFinancialArrangementModalOpen] =
    useState(false);
  const [leaveRequestModalOpen, setLeaveRequestModalOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuickActionCard
            title="Top Up Wallet"
            description="Opens the payment modal for instant funding."
            icon={WalletAdd02Icon}
            onClick={() => setTopUpModalOpen(true)}
            className="border-b"
          />
          <QuickActionCard
            title="View Outstanding Fees"
            description="Links directly to the invoice summary in the Fees & Payments module."
            icon={Payment02Icon}
            onClick={() => setOutstandingFeesModalOpen(true)}
            className="border-b"
          />
          <QuickActionCard
            title="Request Fee Discount/Installment"
            description="Links directly to the Fee/Request Portal for formal submission."
            icon={Discount01Icon}
            onClick={() => setFinancialArrangementModalOpen(true)}
            className="border-b"
          />
          <QuickActionCard
            title="Student Leave Request"
            description="Allows parents to formally notify the school and request an excused absence for their child"
            icon={UserIcon}
            onClick={() => setLeaveRequestModalOpen(true)}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <TopUpWalletModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
        studentName="Tunde"
      />
      <OutstandingFeesModal
        open={outstandingFeesModalOpen}
        onOpenChange={setOutstandingFeesModalOpen}
      />
      <FinancialArrangementModal
        open={financialArrangementModalOpen}
        onOpenChange={setFinancialArrangementModalOpen}
      />
      <LeaveRequestModal
        open={leaveRequestModalOpen}
        onOpenChange={setLeaveRequestModalOpen}
      />
    </>
  );
}
