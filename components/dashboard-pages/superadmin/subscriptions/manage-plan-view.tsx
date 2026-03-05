"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ManageStepNavigation } from "@/components/dashboard-pages/superadmin/subscriptions/manage-step-navigation";
import { PlanIdentityForm } from "@/components/dashboard-pages/superadmin/subscriptions/forms/plan-identity-form";
import { FeatureGatingForm } from "@/components/dashboard-pages/superadmin/subscriptions/forms/feature-gating-form";
import {
  getInitialPlanIdentityState,
  type PlanIdentityState,
} from "@/components/dashboard-pages/superadmin/subscriptions/forms/plan-identity-form";
import {
  getInitialFeatureGatingState,
  type FeatureGatingState,
} from "@/components/dashboard-pages/superadmin/subscriptions/forms/feature-gating-form";
import type { ManagePlanStepId } from "@/components/dashboard-pages/superadmin/subscriptions/manage-step-navigation";
import { toast } from "sonner";

interface ManagePlanViewProps {
  planId?: string | null;
}

export function ManagePlanView({ planId }: ManagePlanViewProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ManagePlanStepId>("identity");
  const [planIdentity, setPlanIdentity] = useState<PlanIdentityState>(
    getInitialPlanIdentityState(),
  );
  const [featureGating, setFeatureGating] = useState<FeatureGatingState>(
    getInitialFeatureGatingState(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: call create/update plan API
      toast.success(planId ? "Plan updated." : "Plan created.");
      router.push("/superadmin/subscriptions/dashboard");
    } catch {
      toast.error("Failed to save plan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "identity":
        return (
          <PlanIdentityForm
            value={planIdentity}
            onChange={setPlanIdentity}
            onNext={() => setCurrentStep("feature-gating")}
            onCancel={() => router.push("/superadmin/subscriptions/dashboard")}
          />
        );
      case "feature-gating":
        return (
          <FeatureGatingForm
            value={featureGating}
            onChange={setFeatureGating}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep("identity")}
            onCancel={() => router.push("/superadmin/subscriptions/dashboard")}
            isSubmitting={isSubmitting}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Subscription Plans
        </h2>
        <p className="text-muted-foreground mt-1">
          Create &apos;Tiers&apos; that schools will choose from during
          onboarding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <ManageStepNavigation
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
