"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { ScopeSelectionForm } from "@/components/dashboard-pages/admin/finance/forms/scope-selection-form";
import { RecipientPreviewForm } from "@/components/dashboard-pages/admin/finance/forms/recipient-preview-form";
import { FinalizePublishForm } from "@/components/dashboard-pages/admin/finance/forms/finalize-publish-form";
import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

type StepId = "scope" | "preview" | "finalize";

const steps: Step[] = [
  {
    id: "scope",
    label: "Scope Selection",
    icon: AssignmentsIcon,
  },
  {
    id: "preview",
    label: "Recipient Preview",
    icon: ResourcesAddIcon,
  },
  {
    id: "finalize",
    label: "Finalize and Publish",
    icon: ResourcesAddIcon,
  },
];

export default function BulkInvoicesPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("scope");
  const [formData, setFormData] = useState({
    startInvoiceNumber: "",
    academicTerm: "",
    gradeClass: "",
    paymentDeadline: undefined as Date | undefined,
    note: "",
  });

  // Mock data - in real app, this would come from API based on form data
  const [previewData] = useState({
    totalInvoices: 145,
    totalAmount: 2452000,
  });

  // Mock recipients data
  const [recipients] = useState([
    {
      id: "1",
      name: "Chinedu Nwokodi",
      studentId: "nwokodi.m178023",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "Nil",
    },
    {
      id: "2",
      name: "Adebisi Deborah",
      studentId: "adebisi.m178024",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "10%",
      discountAmount: 35000,
      discountPercentage: 10,
    },
    {
      id: "3",
      name: "Dauda Ahfiz",
      studentId: "ahfiz.m178025",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "10% Sibling",
      discountAmount: 35000,
      discountPercentage: 10,
    },
    {
      id: "4",
      name: "Sarah Collins",
      studentId: "collins.m178026",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "10% Sibling",
      discountAmount: 35000,
      discountPercentage: 10,
    },
    {
      id: "5",
      name: "John Terjini",
      studentId: "terjini.m178027",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "Nil",
    },
    {
      id: "6",
      name: "Chinedu Nwokodi",
      studentId: "nwokodi.m178023",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "Nil",
    },
    {
      id: "7",
      name: "Adebisi Deborah",
      studentId: "adebisi.m178024",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "Nil",
    },
    {
      id: "8",
      name: "Dauda Ahfiz",
      studentId: "ahfiz.m178025",
      gradeClass: "JS 3",
      invoiceValue: 350000,
      discountApplied: "Nil",
    },
  ]);

  // Mock excluded students data
  const [excludedStudents] = useState([
    {
      id: "1",
      name: "Chinedu Nwakodi",
      studentId: "mwokodi.m178023",
      gradeClass: "JS 3",
      exclusionReason: "Academic Year",
    },
    {
      id: "2",
      name: "Adebisi Deborah",
      studentId: "adebisi.m178024",
      gradeClass: "JS 3",
      exclusionReason: "One Term Scholarship",
    },
    {
      id: "3",
      name: "Dauda Ahfiz",
      studentId: "ahfiz.m178025",
      gradeClass: "JS 3",
      exclusionReason: "One Term Scholarship",
    },
    {
      id: "4",
      name: "Sarah Collins",
      studentId: "collins.m178026",
      gradeClass: "JS 3",
      exclusionReason: "One Term Scholarship",
    },
    {
      id: "5",
      name: "John Terjiri",
      studentId: "terjiri.m178027",
      gradeClass: "JS 3",
      exclusionReason: "Academic Year",
    },
    {
      id: "6",
      name: "Chinedu Nwakodi",
      studentId: "mwokodi.m178023",
      gradeClass: "JS 3",
      exclusionReason: "Academic Year",
    },
    {
      id: "7",
      name: "Adebisi Deborah",
      studentId: "adebisi.m178024",
      gradeClass: "JS 3",
      exclusionReason: "Academic Year",
    },
    {
      id: "8",
      name: "Dauda Ahfiz",
      studentId: "ahfiz.m178025",
      gradeClass: "JS 3",
      exclusionReason: "Academic Year",
    },
  ]);

  const handleStepChange = (stepId: string) => {
    // Allow navigation to any step
    setActiveStep(stepId as StepId);
  };

  const handleNext = () => {
    if (activeStep === "scope") {
      setActiveStep("preview");
    } else if (activeStep === "preview") {
      setActiveStep("finalize");
    }
  };

  const handleBack = () => {
    if (activeStep === "preview") {
      setActiveStep("scope");
    } else if (activeStep === "finalize") {
      setActiveStep("preview");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle final submission
    console.log("Generating invoices:", { formData, previewData });
    // In a real app, this would submit to an API
    // router.push("/admin/finance");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "scope":
        return (
          <ScopeSelectionForm
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case "preview":
        return (
          <RecipientPreviewForm
            totalInvoices={previewData.totalInvoices}
            totalAmount={previewData.totalAmount}
            onBack={handleBack}
            onNext={handleNext}
            recipients={recipients}
            excludedStudents={excludedStudents}
          />
        );
      case "finalize":
        return (
          <FinalizePublishForm
            totalInvoices={previewData.totalInvoices}
            totalAmount={previewData.totalAmount}
            onBack={handleBack}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
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
        <h2 className="text-2xl font-bold text-gray-800">
          Generate Bulk Invoices
        </h2>
        <p className="text-gray-600 mt-1">
          Three-step process with clear progression indicators to minimize
          errors.
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
