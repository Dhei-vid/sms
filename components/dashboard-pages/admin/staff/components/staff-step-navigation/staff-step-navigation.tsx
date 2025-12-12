"use client";

import {
  User03Icon,
  DocumentValidationIcon,
  FolderIcon,
} from "@hugeicons/core-free-icons";
import { StepNavigation, Step } from "@/components/ui/step-navigation";

type StepId = "personal" | "contract" | "access";

const steps: Step[] = [
  { id: "personal", label: "Personal Information", icon: User03Icon },
  { id: "contract", label: "Contract Details", icon: DocumentValidationIcon },
  { id: "access", label: "Access & Documentation", icon: FolderIcon },
];

interface StaffStepNavigationProps {
  activeStep: StepId;
  onStepChange: (stepId: StepId) => void;
}

export function StaffStepNavigation({
  activeStep,
  onStepChange,
}: StaffStepNavigationProps) {
  return (
    <StepNavigation
      steps={steps}
      activeStep={activeStep}
      onStepChange={onStepChange}
      orientation="vertical"
    />
  );
}

