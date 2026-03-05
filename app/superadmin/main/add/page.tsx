"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AddSchoolStepNavigation } from "@/components/dashboard-pages/superadmin/schools/components/add-school-step-navigation";
import { IdentityForm } from "@/components/dashboard-pages/superadmin/schools/forms/identity-form";
import { BrandingForm } from "@/components/dashboard-pages/superadmin/schools/forms/branding-form";
import { SubscriptionForm } from "@/components/dashboard-pages/superadmin/schools/forms/subscription-form";
import {
  getInitialAddSchoolFormState,
  buildCreateSchoolPayload,
} from "@/components/dashboard-pages/superadmin/schools/forms/add-school-form-state";
import { useCreateSchoolMutation } from "@/services/schools/schools";
import { toast } from "sonner";
import type { AddSchoolStepId } from "@/components/dashboard-pages/superadmin/schools/components/add-school-step-navigation";

export default function AddNewSchoolPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<AddSchoolStepId>("identity");
  const [formState, setFormState] = useState(getInitialAddSchoolFormState());
  const [createSchool, { isLoading: isCreating }] = useCreateSchoolMutation();

  const update = <K extends keyof typeof formState>(
    key: K,
    value: (typeof formState)[K],
  ) => setFormState((s) => ({ ...s, [key]: value }));

  const handleSubmit = async () => {
    if (!formState.identity.schoolName?.trim()) {
      toast.error("School name is required");
      return;
    }
    try {
      const payload = buildCreateSchoolPayload(formState, null, null);
      await createSchool(payload).unwrap();
      toast.success("School created successfully");
      router.push("/superadmin/main");
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "error" in err.data
          ? (err.data as { error?: string }).error
          : null;
      toast.error(message || "Failed to create school");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "identity":
        return (
          <IdentityForm
            value={formState.identity}
            onChange={(v) => update("identity", v)}
            onNext={() => setCurrentStep("branding")}
            onCancel={() => router.back()}
          />
        );
      case "branding":
        return (
          <BrandingForm
            value={formState.branding}
            onChange={(v) => update("branding", v)}
            onNext={() => setCurrentStep("subscription")}
            onBack={() => setCurrentStep("identity")}
            onCancel={() => router.back()}
          />
        );
      case "subscription":
        return (
          <SubscriptionForm
            value={formState.subscription}
            onChange={(v) => update("subscription", v)}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep("branding")}
            onCancel={() => router.back()}
            isSubmitting={isCreating}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New School</h2>
        <p className="text-muted-foreground mt-1">
          Fill in the details to add a new school to the system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <AddSchoolStepNavigation
                activeStep={currentStep}
                onStepChange={setCurrentStep}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderStepContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
