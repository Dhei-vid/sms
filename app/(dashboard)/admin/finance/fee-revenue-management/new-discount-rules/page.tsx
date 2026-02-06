"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

type StepId = "identity" | "scope" | "automation";

const steps: Step[] = [
  {
    id: "identity",
    label: "Rule Identity and Value",
    icon: AssignmentsIcon,
  },
  {
    id: "scope",
    label: "Scope and Exclusions",
    icon: ResourcesAddIcon,
  },
  {
    id: "automation",
    label: "Automation Criteria",
    icon: ResourcesAddIcon,
  },
];

const initialData = {
  // Step 1: Rule Identity and Value
  ruleName: "",
  discountType: "",
  discountValue: "",
  supervisor: "",

  // Step 2: Scope and Exclusions
  applicableTo: "",
  exclusions: "",
  scopeSupervisor: "",

  // Step 3: Automation Criteria
  ruleCondition: "",
  conflictResolution: "",
};

interface DiscountRuleForm {
  ruleName: string;
  discountType: string;
  discountValue: string;
  supervisor: string;
  applicableTo: string;
  exclusions: string;
  scopeSupervisor: string;
  ruleCondition: string;
  conflictResolution: string;
}

const discountTypeOptions = [
  { value: "fixed", label: "Fixed Amount" },
  { value: "percentage", label: "Percentage" },
];

const supervisorOptions = [
  { value: "principal", label: "Principal" },
  { value: "finance-manager", label: "Finance Manager" },
  { value: "admin", label: "Administrator" },
];

export default function CreateDiscountRulePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("identity");
  const [formData, setFormData] = useState<DiscountRuleForm>(initialData);

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId as StepId);
  };

  const handleNext = () => {
    if (activeStep === "identity") {
      setActiveStep("scope");
    } else if (activeStep === "scope") {
      setActiveStep("automation");
    }
  };

  const handleBack = () => {
    if (activeStep === "scope") {
      setActiveStep("identity");
    } else if (activeStep === "automation") {
      setActiveStep("scope");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle final submission
    console.log("Create discount rule submitted", {
      ...formData,
    });
    // In a real app, this would submit to an API
    router.push(
      "/admin/finance/fee-revenue-management/discount-policy-management",
    );
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "identity":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Rule Identity and Value
            </h3>

            <InputField
              label="Rule Name"
              placeholder="placeholder"
              value={formData.ruleName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ruleName: e.target.value }))
              }
            />

            <SelectField
              label="Discount Type"
              value={formData.discountType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, discountType: value }))
              }
              placeholder="Select either fixed amount or percentage"
            >
              {discountTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <InputField
              label="Discount Value"
              placeholder="Number/Currency Input"
              type="number"
              value={formData.discountValue}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discountValue: e.target.value,
                }))
              }
            />

            <SelectField
              label="Supervisor"
              value={formData.supervisor}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, supervisor: value }))
              }
              placeholder="Select the manager responsible for overseeing this duty."
            >
              {supervisorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        );

      case "scope":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Scope and Exclusions
            </h3>

            <InputField
              label="Applicable To"
              placeholder="E.g., All Grades, JSS Only, Primary Track Only"
              value={formData.applicableTo}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  applicableTo: e.target.value,
                }))
              }
            />

            <InputField
              label="Exclusions"
              placeholder="E.g., Students already on Full Scholarship, Students on Payment Plans."
              value={formData.exclusions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  exclusions: e.target.value,
                }))
              }
            />

            <SelectField
              label="Supervisor"
              value={formData.scopeSupervisor}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  scopeSupervisor: value,
                }))
              }
              placeholder="Select the manager responsible for overseeing this duty."
            >
              {supervisorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        );

      case "automation":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Automation Criteria
            </h3>

            <div className="space-y-2">
              <InputField
                label="Rule Condition"
                placeholder="The main logical trigger for the discount application."
                value={formData.ruleCondition}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ruleCondition: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-gray-600">
                The main logical trigger for the discount application.
              </p>
            </div>

            <div className="space-y-2">
              <InputField
                label="Conflict Resolution"
                placeholder="Defines how the system handles a student who qualifies for multiple discounts."
                value={formData.conflictResolution}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conflictResolution: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-gray-600">
                Defines how the system handles a student who qualifies for
                multiple discounts.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Save and Activate Rule</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Create New Discount Rule
        </h2>
        <p className="text-gray-600 mt-1">
          Clearly define the who, what, and how of a discount.
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
