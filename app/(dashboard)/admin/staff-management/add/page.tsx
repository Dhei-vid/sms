"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { StaffStepNavigation } from "@/components/dashboard-pages/admin/staff/components/staff-step-navigation/staff-step-navigation";
import { PersonalInformationForm } from "@/components/dashboard-pages/admin/staff/forms/personal-information-form";
import { ContractDetailsForm } from "@/components/dashboard-pages/admin/staff/forms/contract-details-form";
import { AccessDocumentationForm } from "@/components/dashboard-pages/admin/staff/forms/access-documentation-form";
import {
  getInitialStaffFormState,
  buildStaffFormData,
} from "@/components/dashboard-pages/admin/staff/forms/staff-form-state";
import { useCreateStakeholderMutation } from "@/services/stakeholders/stakeholders";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { generateSchoolID } from "@/common/helper";
import { toast } from "sonner";

const STEPS = ["personal", "contract", "access"] as const;
type StepId = (typeof STEPS)[number];

export default function AddStaffPage() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [currentStep, setCurrentStep] = useState<StepId>("personal");
  const [formState, setFormState] = useState(getInitialStaffFormState());
  const [createStakeholder, { isLoading: isCreating }] =
    useCreateStakeholderMutation();

  const go = (dir: 1 | -1) => {
    const i = STEPS.indexOf(currentStep) + dir;
    if (i >= 0 && i < STEPS.length) setCurrentStep(STEPS[i]);
  };

  const update = <K extends keyof typeof formState>(
    key: K,
    value: (typeof formState)[K],
  ) => setFormState((s) => ({ ...s, [key]: value }));

  const handleNext = () => {
    go(1);
  };

  const handleBack = () => {
    go(-1);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    // Use schoolId from form state if provided, otherwise fall back to user's school_id or generate one
    const schoolIdFromForm = formState.personal.schoolId;
    const fallbackSchoolId = user?.school_id ?? generateSchoolID();
    const schoolId = schoolIdFromForm || fallbackSchoolId;

    if (!schoolId) {
      toast.error("School ID is required");
      return;
    }

    if (!formState.contract.staffType) {
      toast.error("Please select a staff type");
      return;
    }

    if (!formState.personal.email) {
      toast.error("Email is required");
      return;
    }

    if (!formState.personal.firstName || !formState.personal.lastName) {
      toast.error("First name and last name are required");
      return;
    }

    try {
      // Build FormData with user and stakeholder fields + documents
      const formData = buildStaffFormData(formState, schoolId);

      // Use createStakeholder mutation with FormData
      // Note: Backend will need to handle user creation from the FormData fields
      await createStakeholder(formData as any).unwrap();

      toast.success("Staff member created successfully");
      router.push("/admin/staff-management");
    } catch (err: any) {
      console.error("Staff creation failed:", err);
      const errorMessage =
        err?.data?.error || err?.message || "Failed to create staff member";
      toast.error(errorMessage);
    }
  };

  const handleStepChange = (stepId: StepId) => {
    setCurrentStep(stepId);
  };

  const handleSchoolEmailChange = useCallback((email: string) => {
    setFormState((prev) => ({
      ...prev,
      access: { ...prev.access, schoolEmail: email },
    }));
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <PersonalInformationForm
            value={formState.personal}
            onChange={(v) => update("personal", v)}
            onNext={handleNext}
            onCancel={handleCancel}
            onSchoolEmailChange={handleSchoolEmailChange}
          />
        );
      case "contract":
        return (
          <ContractDetailsForm
            value={formState.contract}
            onChange={(v) => update("contract", v)}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case "access":
        return (
          <AccessDocumentationForm
            value={formState.access}
            onChange={(v) => update("access", v)}
            documents={formState.documents}
            onDocumentsChange={(v) => update("documents", v)}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onCancel={handleCancel}
            isSubmitting={isCreating}
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
