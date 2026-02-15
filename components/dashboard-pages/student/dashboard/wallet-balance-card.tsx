"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetWalletBalanceQuery } from "@/services/wallet/wallet";
import type { Wallet } from "@/services/wallet/wallet-type";

interface WalletBalanceCardProps {
  /** When provided (e.g. parent viewing ward), fetches that user's balance. Otherwise uses logged-in user. */
  userId?: string;
  balance?: string;
  lastTransaction?: string;
}

export function WalletBalanceCard({
  userId,
  balance,
  lastTransaction = "—",
}: WalletBalanceCardProps) {
  const { data: walletData } = useGetWalletBalanceQuery(userId ?? undefined);
  const wallet = walletData?.data as Wallet | undefined;
  const displayBalance =
    balance ??
    (wallet
      ? `${wallet.currency ?? "₦"} ${Number(wallet.balance ?? 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
      : "₦ 0.00");

  return (
    <Card className="p-0 bg-main-blue text-white">
      <CardContent className="p-6">
        <div>
          <p className="text-sm text-white/80 mb-1">Wallet Balance</p>
          <p className="text-2xl font-bold text-white mb-3">{displayBalance}</p>
          <p className="text-xs text-white/70">
            Last transaction: {lastTransaction}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
