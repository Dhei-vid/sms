"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { Calendar03Icon, GraduateMaleIcon } from "@hugeicons/core-free-icons";
import { AcademicCalendarForm } from "@/components/dashboard-pages/admin/settings/application-config/academic-calendar-form";
import { GradingScalesForm } from "@/components/dashboard-pages/admin/settings/application-config/grading-scales-form";

type StepId = "academic-calendar" | "grading-scales";

const steps: Step[] = [
  {
    id: "academic-calendar",
    label: "Academic Calendar Config.",
    icon: Calendar03Icon,
  },
  {
    id: "grading-scales",
    label: "Grading Scales Config.",
    icon: GraduateMaleIcon,
  },
];

export default function ApplicationConfigPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("academic-calendar");

  const handleBack = () => {
    router.push("/admin/settings");
  };

  const handleSaveAcademicCalendar = () => {
    console.log("Save academic calendar");
    // Handle save logic
    router.push("/admin/settings");
  };

  const handleAddGradeLevel = () => {
    console.log("Add new grade level");
    // Handle add grade level logic
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Application Configuration (Customization)
        </h2>
        <p className="text-gray-600 mt-1">
          Customize the system to match the school&apos;s specific rules and
          academic calendar.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Step Navigation - Tabs */}
        <div className="lg:col-span-1">
          <Card className="bg-background p-0">
            <CardContent className="px-2 py-4">
              <StepNavigation
                steps={steps}
                activeStep={activeStep}
                onStepChange={(stepId) => setActiveStep(stepId as StepId)}
                orientation="vertical"
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {/* Step Content */}
          <Card>
            <CardContent className="px-6">
              {activeStep === "academic-calendar" && (
                <div className="space-y-6">
                  <AcademicCalendarForm />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleBack}>
                      Cancel
                    </Button>
                    <Button
                      className="w-60"
                      onClick={handleSaveAcademicCalendar}
                    >
                      Save & Publish Calendar
                    </Button>
                  </div>
                </div>
              )}

              {activeStep === "grading-scales" && (
                <div className="space-y-6">
                  <GradingScalesForm onAddGradeLevel={handleAddGradeLevel} />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleBack}>
                      Cancel
                    </Button>
                    <Button className="w-60" onClick={handleAddGradeLevel}>
                      Add New Grade Level
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
