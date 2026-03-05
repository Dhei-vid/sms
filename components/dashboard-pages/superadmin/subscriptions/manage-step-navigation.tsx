"use client";

import { User03Icon, TransactionHistoryIcon } from "@hugeicons/core-free-icons";
import { StepNavigation, Step } from "@/components/ui/step-navigation";

export type ManagePlanStepId = "identity" | "feature-gating";

const steps: Step[] = [
  {
    id: "identity",
    label: "Plan Identity, Pricing & Billing Logic",
    icon: User03Icon,
  },
  {
    id: "feature-gating",
    label: "Feature Gating & Usage Quotas",
    icon: TransactionHistoryIcon,
  },
];

interface ManageStepNavigationProps {
  activeStep: ManagePlanStepId;
  onStepChange: (stepId: ManagePlanStepId) => void;
}

export function ManageStepNavigation({
  activeStep,
  onStepChange,
}: ManageStepNavigationProps) {
  const handleStepChange = (stepId: string) => {
    if (stepId === "identity" || stepId === "feature-gating") {
      onStepChange(stepId as ManagePlanStepId);
    }
  };

  return (
    <StepNavigation
      steps={steps}
      activeStep={activeStep}
      onStepChange={handleStepChange}
      orientation="vertical"
    />
  );
}
