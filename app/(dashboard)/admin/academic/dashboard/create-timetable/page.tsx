"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/general/huge-icon";
import {
  DocumentValidationIcon,
  Settings01Icon,
  AddCircleIcon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { BreaksSpecialPeriodsModal } from "@/components/dashboard-pages/admin/finance/components/breaks-special-periods-modal";
import { cn } from "@/lib/utils";

type StepId = "scope" | "time-slot";

const steps: Step[] = [
  {
    id: "scope",
    label: "Define Timetable Scope",
    icon: DocumentValidationIcon,
  },
  {
    id: "time-slot",
    label: "Define Time Slot & Structure",
    icon: Settings01Icon,
  },
];

const initialData = {
  // Step 1: Define Timetable Scope
  timetableName: "",
  applicableSchoolGrade: "",
  academicTerm: "",

  // Step 2: Define Time Slot & Structure
  schoolDays: [] as string[],
  numberOfPeriodsPerDay: "",
  defaultPeriodDuration: "",
  applicableSchoolGradeStep2: "",
  academicTermStep2: "",
};

interface TimetableForm {
  timetableName: string;
  applicableSchoolGrade: string;
  academicTerm: string;
  schoolDays: string[];
  numberOfPeriodsPerDay: string;
  defaultPeriodDuration: string;
  applicableSchoolGradeStep2: string;
  academicTermStep2: string;
}

const schoolGradeOptions = [
  { value: "primary-1", label: "Primary 1" },
  { value: "primary-2", label: "Primary 2" },
  { value: "primary-3", label: "Primary 3" },
  { value: "primary-4", label: "Primary 4" },
  { value: "primary-5", label: "Primary 5" },
  { value: "primary-6", label: "Primary 6" },
  { value: "jss-1", label: "JSS 1" },
  { value: "jss-2", label: "JSS 2" },
  { value: "jss-3", label: "JSS 3" },
  { value: "ss-1", label: "SS 1" },
  { value: "ss-2", label: "SS 2" },
  { value: "ss-3", label: "SS 3" },
];

const academicTermOptions = [
  { value: "first-term", label: "First Term" },
  { value: "second-term", label: "Second Term" },
  { value: "third-term", label: "Third Term" },
];

const schoolDaysOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

export default function CreateTimetablePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("scope");
  const [formData, setFormData] = useState<TimetableForm>(initialData);
  const [breakModalOpen, setBreakModalOpen] = useState(false);

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId as StepId);
  };

  const handleNext = () => {
    if (activeStep === "scope") {
      setActiveStep("time-slot");
    }
  };

  const handleBack = () => {
    if (activeStep === "time-slot") {
      setActiveStep("scope");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle final submission
    console.log("Create timetable submitted", {
      ...formData,
    });
    // In a real app, this would submit to an API
    router.push("/admin/academic");
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const updatedDays = prev.schoolDays.includes(day)
        ? prev.schoolDays.filter((d) => d !== day)
        : [...prev.schoolDays, day];
      return { ...prev, schoolDays: updatedDays };
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "scope":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Define Timetable Scope
            </h3>

            <InputField
              label="Timetable Name"
              placeholder='E.g., "2026/2027 Primary School Schedule"'
              value={formData.timetableName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timetableName: e.target.value,
                }))
              }
            />

            <SelectField
              label="Applicable School Grade"
              value={formData.applicableSchoolGrade}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  applicableSchoolGrade: value,
                }))
              }
              placeholder="E.g., JSS1, JSS2, JSS3, etc."
            >
              {schoolGradeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <SelectField
              label="Academic Term"
              value={formData.academicTerm}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  academicTerm: value,
                }))
              }
              placeholder="E.g., First Term, Second Term"
            >
              {academicTermOptions.map((option) => (
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

      case "time-slot":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Define Time Slots and Structure
            </h3>

            {/* School Days */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">School Days</Label>
              <div className="flex flex-wrap gap-4">
                {schoolDaysOptions.map((day) => (
                  <div key={day.value} className="flex items-center gap-2">
                    <Checkbox
                      id={day.value}
                      checked={formData.schoolDays.includes(day.value)}
                      onCheckedChange={() => handleDayToggle(day.value)}
                    />
                    <Label
                      htmlFor={day.value}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <InputField
              label="Number of Periods Per Day"
              placeholder="placeholder"
              type="number"
              value={formData.numberOfPeriodsPerDay}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  numberOfPeriodsPerDay: e.target.value,
                }))
              }
            />

            <InputField
              label="Default Period Duration"
              placeholder="placeholder"
              type="text"
              value={formData.defaultPeriodDuration}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  defaultPeriodDuration: e.target.value,
                }))
              }
            />

            {/* Applicable School Grade with Add Break/Period Button */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Applicable School Grade
              </Label>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <InputField
                    label=""
                    placeholder="placeholder"
                    value={formData.applicableSchoolGradeStep2}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        applicableSchoolGradeStep2: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 h-9"
                  onClick={() => setBreakModalOpen(true)}
                >
                  <Icon icon={AddCircleIcon} size={16} />
                  Add Break/Period
                </Button>
              </div>
            </div>

            <SelectField
              label="Academic Term"
              value={formData.academicTermStep2}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  academicTermStep2: value,
                }))
              }
              placeholder="E.g., First Term, Second Term"
            >
              {academicTermOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectField>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Review & Save Template</Button>
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
          Create New Timetable
        </h2>
        <p className="text-gray-600 mt-1">
          Manage the creation of a schedule template.
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

      {/* Breaks & Special Periods Modal */}
      <BreaksSpecialPeriodsModal
        open={breakModalOpen}
        onOpenChange={setBreakModalOpen}
        onSubmit={(data) => {
          console.log("Break/Period added", data);
          // Handle break/period addition
        }}
      />
    </div>
  );
}
