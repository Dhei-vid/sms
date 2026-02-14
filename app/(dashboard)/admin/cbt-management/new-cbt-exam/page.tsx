"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { BasicExamDefinitionForm } from "@/components/dashboard-pages/admin/cbt-management/forms/basic-exam-definition-form";
import { QuestionSelectionForm } from "@/components/dashboard-pages/admin/cbt-management/forms/question-selection-form";
import { AccessRulesForm } from "@/components/dashboard-pages/admin/cbt-management/forms/access-rules-form";
import { useCreateCbtExamMutation } from "@/services/cbt-exams/cbt-exams";
import { useGetSubjectsQuery } from "@/services/subjects/subjects";
import { useGetSchoolsQuery } from "@/services/schools/schools";
import type { Subject } from "@/services/subjects/subject-types";
import type { School } from "@/services/schools/schools-type";
import { format } from "date-fns";
import { getApiErrorMessage } from "@/lib/format-api-error";

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

interface CBTExamFormData {
  schoolId: string;
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
  locationVenue: string;
}

const getInitialData = (userSchoolId: string | null): CBTExamFormData => ({
  schoolId: userSchoolId ?? "",
  examName: "",
  applicableSubject: "",
  applicableGrade: "",
  totalMarks: "",
  totalQuestions: "",
  timeAllowed: "",
  examMode: "",
  questionShuffle: false,
  answerShuffle: false,
  partialCredit: false,
  date: undefined,
  time: "",
  maxAttempts: "",
  displayResults: "",
  locationVenue: "",
});

function getSubjectsList(data: unknown): Subject[] {
  if (!data || typeof data !== "object") return [];
  const d = data as { data?: Subject[] | { data?: Subject[] } };
  if (Array.isArray(d.data)) return d.data;
  if (d.data && typeof d.data === "object" && Array.isArray((d.data as { data?: Subject[] }).data)) {
    return (d.data as { data: Subject[] }).data;
  }
  return [];
}

function getSchoolsList(data: unknown): School[] {
  if (!data || typeof data !== "object") return [];
  const d = data as { data?: School[] | { data?: School[] } };
  if (Array.isArray(d.data)) return d.data;
  if (d.data && typeof d.data === "object" && Array.isArray((d.data as { data?: School[] }).data)) {
    return (d.data as { data: School[] }).data;
  }
  return [];
}

/** Convert "HH:mm AM/PM" from TimeInput to Django time format "HH:mm" (24-hour). */
function to24HourTime(timeStr: string): string | undefined {
  if (!timeStr || typeof timeStr !== "string") return undefined;
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return undefined;
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

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
  const user = useAppSelector(selectUser);
  const [createCbtExam, { isLoading: isCreating }] = useCreateCbtExamMutation();
  const { data: subjectsResponse, isLoading: isLoadingSubjects } = useGetSubjectsQuery({ _all: true });
  const { data: schoolsResponse, isLoading: isLoadingSchools } = useGetSchoolsQuery({ _all: true });
  const subjectsList = useMemo(() => getSubjectsList(subjectsResponse), [subjectsResponse]);
  const schoolsList = useMemo(() => getSchoolsList(schoolsResponse), [schoolsResponse]);
  const subjectOptions = useMemo(
    () =>
      subjectsList.map((s) => ({
        value: s.name,
        label: s.name,
      })),
    [subjectsList],
  );
  const schoolOptions = useMemo(
    () =>
      schoolsList.map((s) => ({
        value: s.id,
        label: s.name,
      })),
    [schoolsList],
  );
  const [activeStep, setActiveStep] = useState<StepId>("basic");
  const [formData, setFormData] = useState<CBTExamFormData>(() =>
    getInitialData(user?.school_id ?? null),
  );

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

  const handleSaveAndSelectQuestions = async () => {
    const selectedSchool =
      formData.schoolId != null && String(formData.schoolId).trim() !== ""
        ? String(formData.schoolId).trim()
        : "";
    const schoolId = selectedSchool || (user != null ? user.school_id : null) || null;
    if (!schoolId) {
      toast.error("Please select a school.");
      return;
    }
    if (!formData.examName?.trim()) {
      toast.error("Exam name is required.");
      return;
    }
    if (formData.totalMarks?.trim()) {
      const totalMarks = parseInt(formData.totalMarks.trim(), 10);
      if (isNaN(totalMarks) || totalMarks < 100) {
        toast.error("Total marks must be 100 or greater.");
        return;
      }
    }
    const scheduleTime24 = formData.time ? to24HourTime(formData.time) : undefined;
    const payload = {
      school_id: schoolId,
      title: formData.examName.trim(),
      category: formData.examMode || "others",
      subject: formData.applicableSubject || formData.examName.trim(),
      duration: formData.timeAllowed ? parseInt(formData.timeAllowed, 10) : undefined,
      total_questions: formData.totalQuestions ? parseInt(formData.totalQuestions, 10) : undefined,
      total_marks_available: formData.totalMarks ? parseInt(formData.totalMarks, 10) : undefined,
      applicable_grades: formData.applicableGrade || undefined,
      applicable_subjects: formData.applicableSubject || undefined,
      type: formData.examMode === "final-exam" ? "final" : formData.examMode || "others",
      schedule_date: formData.date ? format(formData.date, "yyyy-MM-dd") : undefined,
      ...(scheduleTime24 ? { schedule_time: scheduleTime24 } : {}),
      max_attempt: formData.maxAttempts ? parseInt(formData.maxAttempts, 10) : undefined,
      display_result: formData.displayResults || undefined,
      question_shuffle: formData.questionShuffle,
      answer_shuffle: formData.answerShuffle,
      partial_credit: formData.partialCredit,
      ...(formData.locationVenue.trim() ? { location_venue: formData.locationVenue.trim() } : {}),
    };
    try {
      await createCbtExam(payload).unwrap();
      toast.success("CBT exam created successfully.");
      router.push("/admin/cbt-management");
    } catch (err) {
      // baseApi already shows a toast with getApiErrorMessage; show again here so form errors are visible if global toast was skipped
      const data = err && typeof err === "object" && "data" in err
        ? (err as { data?: unknown }).data
        : undefined;
      toast.error(getApiErrorMessage(data, "Failed to create CBT exam."));
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "basic":
        return (
          <BasicExamDefinitionForm
            formData={{
              schoolId: formData.schoolId,
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
            schoolOptions={schoolOptions}
            subjectOptions={subjectOptions}
            gradeOptions={gradeOptions}
            examModeOptions={examModeOptions}
            isLoadingSchools={isLoadingSchools}
            isLoadingSubjects={isLoadingSubjects}
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
              locationVenue: formData.locationVenue,
            }}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
            onBack={handleBack}
            onCancel={handleCancel}
            onSaveAndSelectQuestions={handleSaveAndSelectQuestions}
            displayResultsOptions={displayResultsOptions}
            isLoading={isCreating}
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
