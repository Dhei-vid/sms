"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/general/huge-icon";

export interface Step {
  id: string;
  label: string;
  icon: any;
}

interface StepNavigationProps {
  steps: Step[];
  activeStep: string;
  onStepChange?: (stepId: string) => void;
  orientation?: "vertical" | "horizontal";
}

export function StepNavigation({
  steps,
  activeStep,
  onStepChange,
  orientation = "vertical",
}: StepNavigationProps) {
  const containerClass =
    orientation === "vertical" ? "space-y-3" : "flex gap-0";
  const itemClass =
    orientation === "vertical"
      ? "flex items-center gap-3 px-4 py-3 rounded-lg"
      : "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px]";

  return (
    <div className={containerClass}>
      {steps.map((step) => {
        const isActive = step.id === activeStep;
        return (
          <div
            key={step.id}
            onClick={() => onStepChange?.(step.id)}
            className={cn(
              itemClass,
              onStepChange && "cursor-pointer",
              orientation === "horizontal"
                ? isActive
                  ? "border-main-blue text-main-blue"
                  : "border-transparent text-gray-600 hover:text-gray-800"
                : isActive
                  ? "bg-main-blue/5 text-main-blue"
                  : "text-gray-600 hover:bg-main-blue/5 hover:text-gray-800",
            )}
          >
            <Icon icon={step.icon} size={18} />
            <span className="text-sm font-medium">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
