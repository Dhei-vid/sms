"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StaffStepNavigation } from "@/components/dashboard-pages/admin/staff/components/staff-step-navigation/staff-step-navigation";
import { PersonalInformationForm } from "@/components/dashboard-pages/admin/staff/forms/personal-information-form";
import { ContractDetailsForm } from "@/components/dashboard-pages/admin/staff/forms/contract-details-form";
import { AccessDocumentationForm } from "@/components/dashboard-pages/admin/staff/forms/access-documentation-form";

type StepId = "personal" | "contract" | "access";

export default function AddStaffPage() {
  const [currentStep, setCurrentStep] = useState<StepId>("personal");

  const handleNext = () => {
    if (currentStep === "personal") setCurrentStep("contract");
    else if (currentStep === "contract") setCurrentStep("access");
  };

  const handleBack = () => {
    if (currentStep === "access") setCurrentStep("contract");
    else if (currentStep === "contract") setCurrentStep("personal");
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSubmit = () => {
    console.log("Staff member added");
    window.history.back();
  };

  const handleStepChange = (stepId: StepId) => {
    setCurrentStep(stepId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <PersonalInformationForm
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case "contract":
        return (
          <ContractDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case "access":
        return (
          <AccessDocumentationForm
            onSubmit={handleSubmit}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Add New Staff Member (Onboarding Form)
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Sidebar - Steps */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StaffStepNavigation
                activeStep={currentStep}
                onStepChange={handleStepChange}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Form */}
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderStepContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
