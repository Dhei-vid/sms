import { cn } from "@/lib/utils";
import { formattedAmount } from "@/common/helper";

interface IProgressbar {
  value: number;
  total: number;
  className?: string;
  barColor?: string;
  displayAmount?: number;
  label?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  total,
  className,
  barColor = "bg-main-blue",
  displayAmount,
  label,
  showLabel = true,
}: IProgressbar) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  const amountToDisplay = displayAmount !== undefined ? displayAmount : total;
  const displayLabel = label !== undefined ? label : "Total amount:";

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex-1 relative h-8 bg-gray-100 overflow-hidden rounded-xs">
        <div
          className={cn(
            "h-full flex items-center transition-all duration-300 rounded-xs",
            barColor
          )}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && (
            <span className="text-white text-xs font-medium pl-3">
              {percentage}%
            </span>
          )}
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
          {displayLabel} {formattedAmount(amountToDisplay)}
        </span>
      )}
      {!showLabel && displayAmount !== undefined && (
        <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
          {formattedAmount(amountToDisplay)}
        </span>
      )}
    </div>
  );
}
