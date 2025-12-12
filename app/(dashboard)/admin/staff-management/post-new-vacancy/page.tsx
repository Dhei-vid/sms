"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { JobDetailsForm } from "@/components/dashboard-pages/admin/staff/forms/job-details-form";
import { DescriptionRequirementsForm } from "@/components/dashboard-pages/admin/staff/forms/description-requirements-form";
import { CompensationForm } from "@/components/dashboard-pages/admin/staff/forms/compensation-form";
import {
  DocumentValidationIcon,
  Grid02Icon,
  Money03Icon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

type StepId = "details" | "description" | "compensation";

const steps: Step[] = [
  {
    id: "details",
    label: "Job Details & Identification",
    icon: DocumentValidationIcon,
  },
  {
    id: "description",
    label: "Description & Requirements",
    icon: Grid02Icon,
  },
  {
    id: "compensation",
    label: "Compensation",
    icon: Money03Icon,
  },
];

export default function PostNewVacancyPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("details");
  const [formData, setFormData] = useState({
    // Job Details
    vacancyTitle: "",
    department: "",
    employmentType: "",
    applicationDeadline: undefined as Date | undefined,
    // Description & Requirements
    publicSummary: "",
    fullJobDescription: "",
    mandatoryRequirements: "",
    preferredQualifications: "",
    // Compensation
    salaryRange: "",
    allowances: "",
    recruitmentBudget: "",
  });

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId as StepId);
  };

  const handleNext = () => {
    if (activeStep === "details") {
      setActiveStep("description");
    } else if (activeStep === "description") {
      setActiveStep("compensation");
    }
  };

  const handleBack = () => {
    if (activeStep === "compensation") {
      setActiveStep("description");
    } else if (activeStep === "description") {
      setActiveStep("details");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting vacancy:", formData);
    // In a real app, this would submit to an API
    // router.push("/admin/staff-management/applicant-tracking");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "details":
        return (
          <JobDetailsForm
            formData={{
              vacancyTitle: formData.vacancyTitle,
              department: formData.department,
              employmentType: formData.employmentType,
              applicationDeadline: formData.applicationDeadline,
            }}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case "description":
        return (
          <DescriptionRequirementsForm
            formData={{
              publicSummary: formData.publicSummary,
              fullJobDescription: formData.fullJobDescription,
              mandatoryRequirements: formData.mandatoryRequirements,
              preferredQualifications: formData.preferredQualifications,
            }}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case "compensation":
        return (
          <CompensationForm
            formData={{
              salaryRange: formData.salaryRange,
              allowances: formData.allowances,
              recruitmentBudget: formData.recruitmentBudget,
            }}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Post New Vacancy</h2>
        <p className="text-gray-600 mt-1">
          Create a clear, detailed job posting to attract qualified candidates.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StepNavigation
                steps={steps}
                activeStep={activeStep}
                onStepChange={handleStepChange}
                orientation="vertical"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderStepContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
