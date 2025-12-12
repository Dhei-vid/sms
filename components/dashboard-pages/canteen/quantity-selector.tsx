"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import {
  Delete02Icon,
  MinusSignIcon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  className?: string;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  className,
  min = 1,
  max,
}: QuantitySelectorProps) {
  const canDecrease = quantity > min;
  const canIncrease = max ? quantity < max : true;

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-purple-50 rounded-md px-2 py-1",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onDecrease}
        disabled={!canDecrease}
        className="h-6 w-6 p-0 hover:bg-purple-100"
      >
        <Icon icon={MinusSignIcon} size={14} />
      </Button>
      <span className="text-sm font-semibold text-gray-800 min-w-5 text-center">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onIncrease}
        disabled={!canIncrease}
        className="h-6 w-6 p-0 hover:bg-purple-100"
      >
        <Icon icon={Add01Icon} size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onRemove}
        className="h-6 w-6 p-0 hover:bg-purple-100 ml-1"
      >
        <Icon icon={Delete02Icon} size={14} className="text-red-500" />
      </Button>
    </div>
  );
}
