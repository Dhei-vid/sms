"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { BasicExamDefinitionForm } from "@/components/dashboard-pages/admin/cbt-management/forms/basic-exam-definition-form";
import { QuestionSelectionForm } from "@/components/dashboard-pages/admin/cbt-management/forms/question-selection-form";
import { AccessRulesForm } from "@/components/dashboard-pages/admin/cbt-management/forms/access-rules-form";

type StepId = "basic" | "question" | "access";

const steps: Step[] = [
  {
    id: "basic",
    label: "Basic Exam Definition",
    icon: AssignmentsIcon,
  },
  {
    id: "question",
    label: "Question Selection",
    icon: ResourcesAddIcon,
  },
  {
    id: "access",
    label: "Access Rules",
    icon: ResourcesAddIcon,
  },
];

const initialData = {
  // Step 1: Basic Exam Definition
  examName: "",
  applicableSubject: "",
  applicableGrade: "",
  totalMarks: "",
  totalQuestions: "",
  timeAllowed: "",
  examMode: "",

  // Step 2: Question Selection
  questionShuffle: false,
  answerShuffle: false,
  partialCredit: false,

  // Step 3: Access Rules
  date: undefined as Date | undefined,
  time: "",
  maxAttempts: "",
  displayResults: "",
};

interface CBTExamFormData {
  examName: string;
  applicableSubject: string;
  applicableGrade: string;
  totalMarks: string;
  totalQuestions: string;
  timeAllowed: string;
  examMode: string;
  questionShuffle: boolean;
  answerShuffle: boolean;
  partialCredit: boolean;
  date: Date | undefined;
  time: string;
  maxAttempts: string;
  displayResults: string;
}

const subjectOptions = [
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
  { value: "mathematics", label: "Mathematics" },
  { value: "english", label: "English Language" },
];

const gradeOptions = [
  { value: "jss-1", label: "JSS 1" },
  { value: "jss-2", label: "JSS 2" },
  { value: "jss-3", label: "JSS 3" },
  { value: "ss-1", label: "SS 1" },
  { value: "ss-2", label: "SS 2" },
  { value: "ss-3", label: "SS 3" },
];

const examModeOptions = [
  { value: "practice", label: "Practice" },
  { value: "test", label: "Test" },
  { value: "final-exam", label: "Final Exam" },
];

const displayResultsOptions = [
  { value: "never", label: "Never" },
  { value: "immediately", label: "Immediately" },
  { value: "after-window", label: "After Exam Window Closes" },
];

export default function NewCBTExamPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("basic");
  const [formData, setFormData] = useState<CBTExamFormData>(initialData);

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId as StepId);
  };

  const handleBack = () => {
    if (activeStep === "question") {
      setActiveStep("basic");
    } else if (activeStep === "access") {
      setActiveStep("question");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSaveAndSelectQuestions = () => {
    console.log("Save and select questions", { ...formData });
    // Handle save and select questions
    router.push("/admin/cbt-management");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "basic":
        return (
          <BasicExamDefinitionForm
            formData={{
              examName: formData.examName,
              applicableSubject: formData.applicableSubject,
              applicableGrade: formData.applicableGrade,
              totalMarks: formData.totalMarks,
              totalQuestions: formData.totalQuestions,
              timeAllowed: formData.timeAllowed,
              examMode: formData.examMode,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onCancel={handleCancel}
            onNext={() => setActiveStep("question")}
            subjectOptions={subjectOptions}
            gradeOptions={gradeOptions}
            examModeOptions={examModeOptions}
          />
        );

      case "question":
        return (
          <QuestionSelectionForm
            formData={{
              questionShuffle: formData.questionShuffle,
              answerShuffle: formData.answerShuffle,
              partialCredit: formData.partialCredit,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onCancel={handleCancel}
            onNext={() => setActiveStep("access")}
          />
        );

      case "access":
        return (
          <AccessRulesForm
            formData={{
              date: formData.date,
              time: formData.time,
              maxAttempts: formData.maxAttempts,
              displayResults: formData.displayResults,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onCancel={handleCancel}
            onSaveAndSelectQuestions={handleSaveAndSelectQuestions}
            displayResultsOptions={displayResultsOptions}
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
          CBT Management Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          This dashboard is the central control panel for administering,
          monitoring, and analyzing computer-based tests.
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
