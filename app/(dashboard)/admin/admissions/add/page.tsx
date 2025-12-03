"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation } from "@/components/dashboard-pages/admin/admissions/components/step-navigation";
import { ApplicantDetailsForm } from "@/components/dashboard-pages/admin/admissions/forms/applicant-details-form";
import { DocumentUploadForm } from "@/components/dashboard-pages/admin/admissions/forms/document-upload-form";
import { ApplicationStatusForm } from "@/components/dashboard-pages/admin/admissions/forms/application-status-form";

type StepId = "details" | "documents" | "status";

export default function AddApplicantPage() {
  const [currentStep, setCurrentStep] = useState<StepId>("details");

  const handleNext = () => {
    if (currentStep === "details") setCurrentStep("documents");
    else if (currentStep === "documents") setCurrentStep("status");
  };

  const handleBack = () => {
    if (currentStep === "status") setCurrentStep("documents");
    else if (currentStep === "documents") setCurrentStep("details");
  };

  const handleStepChange = (step: StepId) => {
    setCurrentStep(step);
  };

  const handleCancel = () => {
    // Navigate back to admissions list
    window.history.back();
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Application submitted");
    // Navigate back to admissions list
    window.history.back();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "details":
        return (
          <ApplicantDetailsForm onNext={handleNext} onCancel={handleCancel} />
        );
      case "documents":
        return (
          <DocumentUploadForm
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case "status":
        return (
          <ApplicationStatusForm
            onBack={handleBack}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Add Applicant Manually
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Sidebar - Steps */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StepNavigation
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
