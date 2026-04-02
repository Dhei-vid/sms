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
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { getApiErrorMessage } from "@/lib/format-api-error";
import { DiscountRule } from "@/services/schools/schools-type";

import { useUpdateSchoolMutation } from "@/services/schools/schools";
import { useGetAllStaffQuery } from "@/services/stakeholders/stakeholders";
import { toast } from "sonner";

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
  rule_name: "",
  discount_value: 0,
  trigger_criteria: "",
  policy_type: "",
  status_control: false,
  reason: "",
  supervisor: "",
  rule_condition: "",
  conflict_resolution: "",
  applicable_to: "",
  exclusions: "",
};

// const discountTypeOptions = [
//   { value: "fixed", label: "Fixed Amount" },
//   { value: "percentage", label: "Percentage" },
// ];

export default function CreateDiscountRulePage() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [activeStep, setActiveStep] = useState<StepId>("identity");
  const [formData, setFormData] = useState<DiscountRule>(initialData);

  const { data: staffResponse, isLoading: isLoadingStaff } =
    useGetAllStaffQuery();
  const teacherOptions = (staffResponse?.data ?? [])
    .filter((s) => s.type === "teacher" || s.type === "staff")
    .map((t) => ({
      value: t.id,
      label: t.user
        ? `${t.user.first_name} ${t.user.last_name}`.trim() || t.id
        : t.id,
    }));

  const [updateSchool] = useUpdateSchoolMutation();

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

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    const schoolId = user?.school_id;
    if (!schoolId) {
      toast.error("School ID not found. Please try again.");
      return;
    }

    try {
      await updateSchool({
        id: schoolId,
        data: { discount_rules: [formData] } as any,
      }).unwrap();

      router.push(
        "/admin/finance/fee-revenue-management/discount-policy-management",
      );
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Failed to create discount rule. Please try again.",
      );
      toast.error(message);
    }
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
              value={formData.rule_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rule_name: e.target.value }))
              }
            />

            {/* <SelectField
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
            </SelectField> */}

            <InputField
              label="Discount Value"
              placeholder="Number/Currency Input"
              type="number"
              value={formData.discount_value}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discount_value: Number(e.target.value),
                }))
              }
            />

            <div className="grid grid-cols-3 gap-4 pt-4 justify-self-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button className="col-span-2" onClick={handleNext}>
                Next
              </Button>
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
              placeholder="E.g., All Grades, JSS Only"
              value={formData.applicable_to}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  applicable_to: e.target.value,
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
              value={formData.supervisor}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  supervisor: value,
                }))
              }
              placeholder={
                isLoadingStaff
                  ? "Loading teachers..."
                  : "Select a supervising teacher"
              }
            >
              {teacherOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <div className="grid grid-cols-3 gap-4 pt-4 justify-self-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button className="col-span-2" onClick={handleNext}>
                Next
              </Button>
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
                value={formData.rule_condition}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rule_condition: e.target.value,
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
                value={formData.conflict_resolution}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conflict_resolution: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-gray-600">
                Defines how the system handles a student who qualifies for
                multiple discounts.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 justify-self-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button className="col-span-2" onClick={handleSubmit}>
                Save and Activate Rule
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold text-gray-800">
            Create New Discount Rule
          </h2>
          <p className="text-gray-600 mt-1">
            Clearly define the who, what, and how of a discount.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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

        <div className="lg:col-span-3">
          <Card className="p-0 bg-background">
            <CardContent className="p-6">{renderStepContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
