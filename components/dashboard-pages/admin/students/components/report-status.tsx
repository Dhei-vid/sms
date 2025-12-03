"use client";

import { cn } from "@/lib/utils";

interface ReportStatusProps {
  status: "completed" | "in-progress";
  progress?: number; // 0-100 for in-progress
}

export function ReportStatus({ status, progress = 0 }: ReportStatusProps) {
  if (status === "completed") {
    return (
      <span className="text-sm font-medium text-green-600">Completed</span>
    );
  }

  return (
    <div className="flex items-center gap-2 w-[90%]">
      <div className="flex-1 h-1.5 bg-green-600/10 rounded-full overflow-hidden">
        <div
          className={cn("h-full bg-green-600 rounded-full transition-all")}
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* <span className="text-xs text-gray-600 whitespace-nowrap">
        {progress}%
      </span> */}
    </div>
  );
}
