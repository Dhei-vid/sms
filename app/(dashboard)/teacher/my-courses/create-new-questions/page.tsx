"use client";

import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Step, StepNavigation } from "@/components/ui/step-navigation";
import AssignmentConfiguration from "@/components/dashboard-pages/teacher/my-courses/views/assignment-configuration";
import AccessSubmissionRules from "@/components/dashboard-pages/teacher/my-courses/views/access-submission-rules";
import ContentBuilder from "@/components/dashboard-pages/teacher/my-courses/views/content-builder";

type StepId =
  | "assignment-configuration"
  | "access-submission-rules"
  | "content-builder";

export type ModalStepId = "verify-password" | "change-password";

export type PasswordHandler = {
  oldPass: string;
  newPass: string;
  confirmPass: string;
};

const steps: Step[] = [
  {
    id: "assignment-configuration",
    label: "Assignment Configuration",
    icon: AssignmentsIcon,
  },
  {
    id: "access-submission-rules",
    label: "Access & Submission Rules",
    icon: ResourcesAddIcon,
  },
  {
    id: "content-builder",
    label: "Content Builder",
    icon: ResourcesAddIcon,
  },
];

export default function CreateNewQuestionsPage() {
  //view state handler
  const [currentStep, setCurrentStep] = useState<StepId>(
    "assignment-configuration",
  );

  //view change handler
  const handleStepChange = (stepId: string) => {
    setCurrentStep(stepId as StepId);
  };

  const renderContent = () => {
    switch (currentStep) {
      case "assignment-configuration":
        return <AssignmentConfiguration />;
      case "access-submission-rules":
        return <AccessSubmissionRules />;
      case "content-builder":
        return <ContentBuilder />;
      default:
        return <AssignmentConfiguration />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="px-6 py-3">
          <h1 className="text-2xl font-semibold text-[#1B1B1B] mb-2 lg:text-3xl">
            Create New Assignment/Quiz
          </h1>
          <p className="text-sm text-gray-600">
            This screen guides the teacher through setting up a digital
            assessment, including defining its type, scoring, and security
            rules.
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="px-2 xl:sticky">
              <StepNavigation
                steps={steps}
                activeStep={currentStep}
                onStepChange={handleStepChange}
                orientation="vertical"
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="px-6">{renderContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
