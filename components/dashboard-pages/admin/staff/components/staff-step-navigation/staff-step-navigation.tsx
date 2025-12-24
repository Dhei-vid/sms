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

/**
 * Staff Step Navigation Component
 * Wrapper around StepNavigation component with type-safe step IDs
 * Handles conversion between string and StepId types
 * 
 * @param activeStep - Currently active step ID
 * @param onStepChange - Callback function when step changes
 */
export function StaffStepNavigation({
  activeStep,
  onStepChange,
}: StaffStepNavigationProps) {
  /**
   * Handle step change and convert string to StepId type
   * Validates that the step ID is a valid StepId before calling the callback
   * 
   * @param stepId - Step ID as string from StepNavigation component
   */
  const handleStepChange = (stepId: string) => {
    // Type guard to ensure stepId is a valid StepId
    if (stepId === "personal" || stepId === "contract" || stepId === "access") {
      onStepChange(stepId as StepId);
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

