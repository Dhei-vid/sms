"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "new" | "pending" | "accepted" | "rejected";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
}

const statusConfig: Record<
  StatusType,
  { className: string }
> = {
  new: {
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  pending: {
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
  accepted: {
    className: "bg-green-100 text-green-700 border-green-200",
  },
  rejected: {
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className)}
    >
      {label}
    </Badge>
  );
}

