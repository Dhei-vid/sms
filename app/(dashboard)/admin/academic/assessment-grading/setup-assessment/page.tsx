"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { GeneralAssessmentDetailsForm } from "../../../../../../components/dashboard-pages/admin/academic/assessment-grading/setup-assessment/components/general-assessment-details-form";
import { TimingVenueForm } from "../../../../../../components/dashboard-pages/admin/academic/assessment-grading/setup-assessment/components/timing-venue-form";
import { GradingScoreEntryForm } from "../../../../../../components/dashboard-pages/admin/academic/assessment-grading/setup-assessment/components/grading-score-entry-form";

type StepId = "general" | "timing" | "grading";

const steps: Step[] = [
  {
    id: "general",
    label: "General Assessment Details",
    icon: ResourcesAddIcon,
  },
  {
    id: "timing",
    label: "Timing & Venue",
    icon: AssignmentsIcon,
  },
  {
    id: "grading",
    label: "Grading, Score Entry Rules",
    icon: AssignmentsIcon,
  },
];

const initialData = {
  // Step 1: General Assessment Details
  assessmentName: "",
  assessmentType: "",
  applicableGrades: "",
  applicableSubjects: "",
  totalMarksAvailable: "",

  // Step 2: Timing & Venue
  startDate: undefined as Date | undefined,
  startTime: "",
  duration: "",
  locationVenue: "",
  assignInvigilators: "",
  questionPaperDeadlineDate: undefined as Date | undefined,
  questionPaperDeadlineTime: "",

  // Step 3: Grading, Score Entry Rules
  scoreSubmissionDeadlineDate: undefined as Date | undefined,
  scoreSubmissionDeadlineTime: "",
  finalGradeWeight: "",
  scaleType: "",
};

interface AssessmentFormData {
  assessmentName: string;
  assessmentType: string;
  applicableGrades: string;
  applicableSubjects: string;
  totalMarksAvailable: string;
  startDate: Date | undefined;
  startTime: string;
  duration: string;
  locationVenue: string;
  assignInvigilators: string;
  questionPaperDeadlineDate: Date | undefined;
  questionPaperDeadlineTime: string;
  scoreSubmissionDeadlineDate: Date | undefined;
  scoreSubmissionDeadlineTime: string;
  finalGradeWeight: string;
  scaleType: string;
}

const assessmentTypeOptions = [
  { value: "exam-summative", label: "Exam (Summative)" },
  { value: "continuous-assessment", label: "Continuous Assessment (CA)" },
  { value: "project", label: "Project" },
  { value: "lab-practical", label: "Lab Practical" },
];

const gradeOptions = [
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

const invigilatorOptions = [
  { value: "staff-1", label: "Mr. Uche E." },
  { value: "staff-2", label: "Dr. Femi I." },
  { value: "staff-3", label: "Mrs. Kemi O." },
  { value: "staff-4", label: "Ms. Zara A." },
];

const scaleTypeOptions = [
  { value: "numerical", label: "Numerical (0-100)" },
  { value: "letter-grade", label: "Letter Grade (A-F)" },
];

export default function SetupAssessmentPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("general");
  const [formData, setFormData] = useState<AssessmentFormData>(initialData);

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId as StepId);
  };

  const handleBack = () => {
    if (activeStep === "timing") {
      setActiveStep("general");
    } else if (activeStep === "grading") {
      setActiveStep("timing");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSaveSetup = () => {
    console.log("Save assessment setup", { ...formData });
    // Handle save setup
    router.push("/admin/academic/assessment-grading/dashboard");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "general":
        return (
          <GeneralAssessmentDetailsForm
            formData={{
              assessmentName: formData.assessmentName,
              assessmentType: formData.assessmentType,
              applicableGrades: formData.applicableGrades,
              applicableSubjects: formData.applicableSubjects,
              totalMarksAvailable: formData.totalMarksAvailable,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onCancel={handleCancel}
            onSaveSetup={() => {
              setActiveStep("timing");
            }}
            assessmentTypeOptions={assessmentTypeOptions}
            gradeOptions={gradeOptions}
          />
        );

      case "timing":
        return (
          <TimingVenueForm
            formData={{
              startDate: formData.startDate,
              startTime: formData.startTime,
              duration: formData.duration,
              locationVenue: formData.locationVenue,
              assignInvigilators: formData.assignInvigilators,
              questionPaperDeadlineDate: formData.questionPaperDeadlineDate,
              questionPaperDeadlineTime: formData.questionPaperDeadlineTime,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onCancel={handleCancel}
            onSaveSetup={() => {
              setActiveStep("grading");
            }}
            invigilatorOptions={invigilatorOptions}
          />
        );

      case "grading":
        return (
          <GradingScoreEntryForm
            formData={{
              scoreSubmissionDeadlineDate: formData.scoreSubmissionDeadlineDate,
              scoreSubmissionDeadlineTime: formData.scoreSubmissionDeadlineTime,
              finalGradeWeight: formData.finalGradeWeight,
              scaleType: formData.scaleType,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onCancel={handleCancel}
            onSaveSetup={handleSaveSetup}
            scaleTypeOptions={scaleTypeOptions}
          />
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
          Setup New Assessment/Exam Configuration
        </h2>
        <p className="text-gray-600 mt-1">
          To define the logistics, grading rules, and security for a single
          assessment component.
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
