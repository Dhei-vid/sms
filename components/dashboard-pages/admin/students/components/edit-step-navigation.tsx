"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/general/huge-icon";
import {
  UserIcon,
  GraduateMaleIcon,
  TransactionHistoryIcon,
  DocumentValidationIcon,
} from "@hugeicons/core-free-icons";

export type EditStepId = "details" | "academic" | "documents" | "status";

interface Step {
  id: EditStepId;
  label: string;
  icon: any;
}

const steps: Step[] = [
  { id: "details", label: "Personal & Parent Details", icon: UserIcon },
  { id: "academic", label: "Academic Details", icon: GraduateMaleIcon },
  { id: "documents", label: "Document Upload", icon: TransactionHistoryIcon },
  { id: "status", label: "Status & Notes", icon: DocumentValidationIcon },
];

interface EditStepNavigationProps {
  activeStep: EditStepId;
  onStepChange?: (step: EditStepId) => void;
}

export function EditStepNavigation({
  activeStep,
  onStepChange,
}: EditStepNavigationProps) {
  return (
    <div className="space-y-3">
      {steps.map((step) => {
        const isActive = step.id === activeStep;
        return (
          <div
            key={step.id}
            onClick={() => onStepChange?.(step.id)}
            className={cn(
              "cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive
                ? "bg-main-blue/5 text-main-blue"
                : "text-gray-600 hover:bg-main-blue/5 hover:text-main-blue",
            )}
          >
            <Icon icon={step.icon} size={20} />
            <span className="text-sm font-medium">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
