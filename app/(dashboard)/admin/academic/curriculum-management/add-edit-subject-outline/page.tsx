"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import {
  AssignmentsIcon,
  ResourcesAddIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { SubjectIdentityScopeForm } from "../../../../../../components/dashboard-pages/admin/academic/curriculum-management/components/subject-identity-scope-form";
import { GradingWeightingForm } from "../../../../../../components/dashboard-pages/admin/academic/curriculum-management/components/grading-weighting-form";
import { CurriculumStructurePacingForm } from "../../../../../../components/dashboard-pages/admin/academic/curriculum-management/components/curriculum-structure-pacing-form";
import { FinalizationApprovalForm } from "../../../../../../components/dashboard-pages/admin/academic/curriculum-management/components/finalization-approval-form";

type StepId = "identity" | "grading" | "curriculum" | "finalization";

const steps: Step[] = [
  {
    id: "identity",
    label: "Subject Identity & Scope",
    icon: AssignmentsIcon,
  },
  {
    id: "grading",
    label: "Grading & Weighting",
    icon: ResourcesAddIcon,
  },
  {
    id: "curriculum",
    label: "Curriculum Structure, Pacing",
    icon: ResourcesAddIcon,
  },
  {
    id: "finalization",
    label: "Finalization and Approval",
    icon: Settings01Icon,
  },
];

const initialData = {
  // Step 1: Subject Identity & Scope
  mode: "create" as "create" | "edit",
  selectedSubject: "",
  subjectName: "",
  subjectCode: "",
  applicableGrade: "",
  headOfDepartment: "",

  // Step 2: Grading & Weighting
  creditUnits: "",
  continuousAssessment: "",
  finalExam: "",

  // Step 3: Curriculum Structure & Pacing
  curriculumStandard: "",
  contentOutline: [{ unit: "", topic: "", plannedPeriods: "" }] as Array<{
    unit: string;
    topic: string;
    plannedPeriods: string;
  }>,
  plannedPacing: "",

  // Step 4: Finalization and Approval
  modifier: "Admin",
  dateOfModification: new Date() as Date | undefined,
  requiresHODApproval: false,
};

interface SubjectOutlineForm {
  mode: "create" | "edit";
  selectedSubject: string;
  subjectName: string;
  subjectCode: string;
  applicableGrade: string;
  headOfDepartment: string;
  creditUnits: string;
  continuousAssessment: string;
  finalExam: string;
  curriculumStandard: string;
  contentOutline: Array<{
    unit: string;
    topic: string;
    plannedPeriods: string;
  }>;
  plannedPacing: string;
  modifier: string;
  dateOfModification: Date | undefined;
  requiresHODApproval: boolean;
}

const gradeOptions = [
  { value: "jss-1", label: "JSS 1" },
  { value: "jss-2", label: "JSS 2" },
  { value: "jss-3", label: "JSS 3" },
  { value: "ss-1", label: "SS 1" },
  { value: "ss-2", label: "SS 2" },
  { value: "ss-3", label: "SS 3" },
  { value: "primary-1", label: "Primary 1" },
  { value: "primary-2", label: "Primary 2" },
  { value: "primary-3", label: "Primary 3" },
  { value: "primary-4", label: "Primary 4" },
  { value: "primary-5", label: "Primary 5" },
  { value: "primary-6", label: "Primary 6" },
];

const hodOptions = [
  { value: "hod-1", label: "Mr. Uche E." },
  { value: "hod-2", label: "Dr. Femi I." },
  { value: "hod-3", label: "Mrs. Kemi O." },
];

const curriculumStandardOptions = [
  { value: "nerdc", label: "National (NERDC)" },
  { value: "igcse", label: "International (IGCSE)" },
  { value: "custom", label: "School Custom" },
];

const pacingOptions = [
  { value: "1-week", label: "1 Week" },
  { value: "2-weeks", label: "2 Weeks" },
  { value: "3-weeks", label: "3 Weeks" },
  { value: "4-weeks", label: "4 Weeks" },
];

export default function AddEditSubjectOutlinePage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepId>("identity");
  const [formData, setFormData] = useState<SubjectOutlineForm>(initialData);

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId as StepId);
  };

  const handleBack = () => {
    if (activeStep === "grading") {
      setActiveStep("identity");
    } else if (activeStep === "curriculum") {
      setActiveStep("grading");
    } else if (activeStep === "finalization") {
      setActiveStep("curriculum");
    }
  };

  const handleSaveDraft = () => {
    console.log("Save as draft", { ...formData });
    // Handle save as draft
  };

  const handleSaveContinue = () => {
    if (activeStep === "identity") {
      setActiveStep("grading");
    } else if (activeStep === "grading") {
      setActiveStep("curriculum");
    } else if (activeStep === "curriculum") {
      setActiveStep("finalization");
    }
  };

  const handleActivate = () => {
    console.log("Subject outline activated", { ...formData });
    router.push("/admin/academic/curriculum-management");
  };

  // Get subject name for display
  const getSubjectName = () => {
    if (formData.mode === "edit") {
      const selected = [
        { value: "integrated-science", label: "Integrated Science" },
        { value: "mathematics", label: "Mathematics" },
        { value: "english", label: "English" },
        { value: "physics", label: "Physics" },
        { value: "chemistry", label: "Chemistry" },
      ].find((opt) => opt.value === formData.selectedSubject);
      return selected?.label || "Integrated Science";
    }
    return formData.subjectName || "Integrated Science";
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "identity":
        return (
          <SubjectIdentityScopeForm
            formData={{
              mode: formData.mode,
              selectedSubject: formData.selectedSubject,
              subjectName: formData.subjectName,
              subjectCode: formData.subjectCode,
              applicableGrade: formData.applicableGrade,
              headOfDepartment: formData.headOfDepartment,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onSaveDraft={handleSaveDraft}
            onSaveContinue={handleSaveContinue}
            gradeOptions={gradeOptions}
            hodOptions={hodOptions}
          />
        );

      case "grading":
        return (
          <GradingWeightingForm
            formData={{
              creditUnits: formData.creditUnits,
              continuousAssessment: formData.continuousAssessment,
              finalExam: formData.finalExam,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
            onSaveContinue={handleSaveContinue}
          />
        );

      case "curriculum":
        return (
          <CurriculumStructurePacingForm
            formData={{
              curriculumStandard: formData.curriculumStandard,
              contentOutline: formData.contentOutline,
              plannedPacing: formData.plannedPacing,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
            onSaveContinue={handleSaveContinue}
            curriculumStandardOptions={curriculumStandardOptions}
            pacingOptions={pacingOptions}
            subjectName={getSubjectName()}
          />
        );

      case "finalization":
        return (
          <FinalizationApprovalForm
            formData={{
              modifier: formData.modifier,
              dateOfModification: formData.dateOfModification,
              requiresHODApproval: formData.requiresHODApproval,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
            onActivate={handleActivate}
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
          Add/Edit Subject Outline
        </h2>
        <p className="text-gray-600 mt-1">
          This screen allows for set up or modification of the core structure
          and requirements for an individual subject
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
