"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StepNavigation } from "@/components/ui/step-navigation";
import { Calendar03Icon, GraduateMaleIcon } from "@hugeicons/core-free-icons";
import {
  AcademicCalendarForm,
  type AcademicCalendarFormRef,
} from "@/components/dashboard-pages/admin/settings/application-config/academic-calendar-form";
import { GradingScalesForm } from "@/components/dashboard-pages/admin/settings/application-config/grading-scales-form";
import type {
  SchoolApplicationConfig,
  Term,
} from "@/services/schools/schools-type";

type StepId = "academic-calendar" | "grading-scales";

const steps = [
  {
    id: "academic-calendar" as const,
    label: "Academic Calendar Config.",
    icon: Calendar03Icon,
  },
  {
    id: "grading-scales" as const,
    label: "Grading Scales Config.",
    icon: GraduateMaleIcon,
  },
];

const STATIC_CONFIG: SchoolApplicationConfig = {
  term: {
    name: "2024/2025",
    session: "3",
    start_date: "2024-09-01",
    end_date: "2025-07-31",
  },
  score: { ca: 40, exam: 60, total: 100 },
  timetable_name: "Standard",
  applicable_school_grade: null,
  academic_term: null,
  school_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  no_of_periods_per_day: 8,
  default_period_duration: 45,
  break_periods: [],
};

function termToInitialValues(term: Term | undefined) {
  if (!term) return undefined;
  return {
    academicYearName: term.name ?? "",
    startDate: term.start_date,
    endDate: term.end_date,
    numberOfTerms:
      typeof term.session === "string"
        ? term.session
        : String(term.session ?? ""),
  };
}

export default function ApplicationConfigPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("academic-calendar");
  const academicFormRef = useRef<AcademicCalendarFormRef>(null);

  const handleBack = () => router.push("/admin/settings");

  const handleSaveAcademicCalendar = async () => {
    const values = academicFormRef.current?.getValues();
    if (!values) return;
    router.push("/admin/settings");
  };

  const handleAddGradeLevel = () => {};

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Application Configuration (Customization)
        </h2>
        <p className="text-gray-600 mt-1">
          Customize the system to match the school&apos;s specific rules and
          academic calendar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
          <Card>
            <CardContent className="px-6">
              {activeStep === "academic-calendar" && (
                <div className="space-y-6">
                  <AcademicCalendarForm
                    ref={academicFormRef}
                    initialValues={termToInitialValues(STATIC_CONFIG.term)}
                  />
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
