"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function CheckboxField({
  id,
  label,
  checked,
  onCheckedChange,
  className,
}: CheckboxFieldProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label
        htmlFor={id}
        className="text-sm font-normal cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
}

