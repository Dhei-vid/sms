"use client";

import { Card, CardContent } from "@/components/ui/card";

interface WalletBalanceCardProps {
  balance?: string;
  lastTransaction?: string;
}

export function WalletBalanceCard({
  balance = "₦ 4,850.00",
  lastTransaction = "Nov. 13, 2025; 12:43PM",
}: WalletBalanceCardProps) {
  return (
    <Card className="p-0 bg-main-blue text-white">
      <CardContent className="p-6">
        <div>
          <p className="text-sm text-white/80 mb-1">Wallet Balance</p>
          <p className="text-2xl font-bold text-white mb-3">{balance}</p>
          <p className="text-xs text-white/70">
            Last transaction: {lastTransaction}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
