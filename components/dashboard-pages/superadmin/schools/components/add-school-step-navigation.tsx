"use client";

import { User03Icon, TransactionHistoryIcon } from "@hugeicons/core-free-icons";
import { StepNavigation, Step } from "@/components/ui/step-navigation";

export type AddSchoolStepId = "identity" | "branding" | "subscription";

const steps: Step[] = [
  {
    id: "identity",
    label: "Identity & Technical Infrastructure",
    icon: User03Icon,
  },
  {
    id: "branding",
    label: "Branding & White-Labeling",
    icon: TransactionHistoryIcon,
  },
  {
    id: "subscription",
    label: "Subscription & Feature Gating",
    icon: TransactionHistoryIcon,
  },
];

interface AddSchoolStepNavigationProps {
  activeStep: AddSchoolStepId;
  onStepChange: (stepId: AddSchoolStepId) => void;
}

export function AddSchoolStepNavigation({
  activeStep,
  onStepChange,
}: AddSchoolStepNavigationProps) {
  const handleStepChange = (stepId: string) => {
    if (
      stepId === "identity" ||
      stepId === "branding" ||
      stepId === "subscription"
    ) {
      onStepChange(stepId as AddSchoolStepId);
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
