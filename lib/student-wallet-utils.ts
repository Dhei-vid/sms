import { format } from "date-fns";
import type { Transaction } from "@/services/transactions/transaction-types";

export interface WalletTransactionRow {
  dateTime: string;
  transactionType: string;
  itemSource: string;
  amount: string;
  runningBalance: string;
  isDebit: boolean;
}

const CURRENCY_SYMBOL = "₦";

function formatAmount(amount: string | number, currency?: string | null): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  const sym = currency === "NGN" || !currency ? CURRENCY_SYMBOL : String(currency);
  return `${sym}${Number.isNaN(num) ? "0" : num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

function getTransactionTypeLabel(tx: Transaction): string {
  const tt = tx.transaction_type?.toLowerCase();
  const pt = tx.payment_type?.toLowerCase();
  if (tt === "income" || pt === "deposit") return "Top-Up";
  if (pt === "order") return "Wallet Debit";
  if (pt === "fees") return "Fee Payment";
  if (pt === "payment" || pt === "transfer") return tt === "income" ? "Transfer In" : "Transfer Out";
  return tt === "expense" ? "Wallet Debit" : "Credit";
}

function getItemSource(tx: Transaction): string {
  if (tx.description) return tx.description;
  const pt = tx.payment_type?.toLowerCase();
  if (pt === "deposit") return "Deposit";
  if (pt === "order") return "Canteen Purchase";
  if (pt === "fees") return "School Fees";
  if (pt === "transfer" || pt === "payment") return "Transfer";
  return pt ?? "—";
}

/**
 * Maps API transactions to UI rows with running balance.
 * Transactions are sorted by created_at descending (newest first).
 * Running balance is computed from current balance working backwards.
 */
export function mapTransactionsToRows(
  transactions: Transaction[],
  currentBalance: string | number
): WalletTransactionRow[] {
  const sorted = [...transactions].sort((a, b) => {
    const da = a.created_at ? new Date(a.created_at).getTime() : 0;
    const db = b.created_at ? new Date(b.created_at).getTime() : 0;
    return db - da;
  });

  let runningBalance = typeof currentBalance === "string" ? parseFloat(currentBalance) : currentBalance;
  const rows: WalletTransactionRow[] = [];

  for (const tx of sorted) {
    const amount = typeof tx.amount === "string" ? parseFloat(tx.amount) : Number(tx.amount);
    const isDebit = (tx.transaction_type?.toLowerCase() ?? "") === "expense";
    const signedAmount = isDebit ? -amount : amount;

    rows.push({
      dateTime: tx.created_at
        ? format(new Date(tx.created_at), "MMM. d, yyyy; h:mm a")
        : "—",
      transactionType: getTransactionTypeLabel(tx),
      itemSource: getItemSource(tx),
      amount: formatAmount(Math.abs(amount), tx.currency),
      runningBalance: formatAmount(runningBalance, tx.currency),
      isDebit,
    });

    runningBalance -= signedAmount;
  }

  return rows;
}
