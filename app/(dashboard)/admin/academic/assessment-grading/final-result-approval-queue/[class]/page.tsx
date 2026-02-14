"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentValidationIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/general/huge-icon";
import { StudentNavigation } from "@/components/dashboard-pages/admin/academic/assessment-grading/final-result-approval-queue/student-navigation";
import { ResultsTable } from "@/components/dashboard-pages/admin/academic/assessment-grading/final-result-approval-queue/results-table";
import { PrincipalsRemarkModal } from "@/components/dashboard-pages/admin/academic/assessment-grading/final-result-approval-queue/principals-remark-modal";
import {
  useGetAllExamResultsQuery,
  useUpdateExamResultMutation,
} from "@/services/results/results";
import type { ExamResult, SubjectResult } from "@/services/results/result-types";

interface SubjectResultRow {
  subject: string;
  finalTermScore: number;
  teacherRemarks: string;
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  examResult: ExamResult;
  results: SubjectResultRow[];
}

function subjectResultToRow(sr: SubjectResult): SubjectResultRow {
  const total = sr.total_score ?? (sr.class_score + sr.exam_score);
  return {
    subject: sr.subject,
    finalTermScore: typeof total === "number" ? Math.round(total * 10) / 10 : 0,
    teacherRemarks: sr.remarks ?? "—",
  };
}

function examResultToStudentData(er: ExamResult): StudentData {
  const student = er.student as { user?: { first_name?: string; last_name?: string }; school_email?: string } | undefined;
  const f = student?.user?.first_name ?? "";
  const l = student?.user?.last_name ?? "";
  const name = `${l}${l && f ? ", " : ""}${f}`.trim() || "—";
  const email = student?.school_email ?? "";
  const results = (er.subject_results ?? []).map(subjectResultToRow);
  return {
    id: er.id,
    name,
    email,
    examResult: er,
    results,
  };
}

export default function ReviewResultsPage() {
  const params = useParams();
  const classParam = params?.class as string | undefined;
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [displayedResults, setDisplayedResults] = useState(8);
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);

  const { class_name, term, session } = useMemo(() => {
    if (!classParam) return { class_name: "", term: "", session: "" };
    try {
      const decoded = decodeURIComponent(classParam);
      const parts = decoded.split("||");
      return {
        class_name: parts[0] ?? "",
        term: parts[1] ?? "",
        session: parts[2] ?? "",
      };
    } catch {
      return { class_name: "", term: "", session: "" };
    }
  }, [classParam]);

  const queryParams = useMemo(
    () =>
      class_name && term && session
        ? {
            _all: true as const,
            "class_name[eq]": class_name,
            "term[eq]": term,
            "session[eq]": session,
          }
        : undefined,
    [class_name, term, session]
  );

  const { data, isLoading } = useGetAllExamResultsQuery(queryParams ?? undefined);
  const [updateResult] = useUpdateExamResultMutation();

  const raw = (data as { data?: ExamResult[] })?.data ?? [];
  const students = useMemo(
    () => raw.map(examResultToStudentData),
    [raw]
  );

  const currentStudent = students[currentStudentIndex];
  const previousStudent =
    currentStudentIndex > 0
      ? {
          id: students[currentStudentIndex - 1]!.id,
          name: students[currentStudentIndex - 1]!.name,
        }
      : undefined;
  const nextStudent =
    currentStudentIndex < students.length - 1
      ? {
          id: students[currentStudentIndex + 1]!.id,
          name: students[currentStudentIndex + 1]!.name,
        }
      : undefined;

  const handlePrevious = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
      setDisplayedResults(8);
    }
  };

  const handleNext = () => {
    if (currentStudentIndex < students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
      setDisplayedResults(8);
    }
  };

  const hasMore = currentStudent
    ? currentStudent.results.length > displayedResults
  : false;
  const handleLoadMore = () => {
    if (!currentStudent) return;
    const remaining = currentStudent.results.length - displayedResults;
    if (remaining > 0) {
      setDisplayedResults(
        Math.min(displayedResults + 8, currentStudent.results.length)
      );
    }
  };

  const handleRemarkAndPublish = () => {
    setRemarkModalOpen(true);
  };

  const handleSaveAndPublish = async (remark: string) => {
    if (!currentStudent) return;
    try {
      await updateResult({
        id: currentStudent.id,
        data: { principal_remarks: remark },
      }).unwrap();
    } catch (e) {
      console.error("Failed to save principal remark:", e);
    }
  };

  const classDetailsName = class_name && term && session
    ? `${class_name} ${term} ${session}`
    : "Results";
  const classDetailsDescription =
    "This provides the necessary data for the final decision.";

  if (isLoading || !classParam) {
    return (
      <div className="space-y-4">
        <div className="bg-background rounded-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Review {classDetailsName} Results
          </h2>
          <p className="text-gray-600 mt-1">Loading...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-background rounded-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Review {classDetailsName} Results
          </h2>
          <p className="text-gray-600 mt-1">No results found for this batch.</p>
        </div>
      </div>
    );
  }

  const visibleResults = currentStudent!.results.slice(0, displayedResults);
  const shouldShowLoadMore = hasMore && currentStudent!.results.length > displayedResults;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Review {classDetailsName} Results
        </h2>
        <p className="text-gray-600 mt-1">{classDetailsDescription}</p>
      </div>

      {/* Button */}
      <Button
        variant={"outline"}
        onClick={handleRemarkAndPublish}
        className="w-full h-11"
      >
        <Icon icon={DocumentValidationIcon} size={16} className="mr-2" />
        Remark and Publish result
      </Button>

      {/* Student Navigation */}
      <Card>
        <CardContent className="p-6">
          <StudentNavigation
            previousStudent={previousStudent}
            currentStudent={{
              id: currentStudent!.id,
              name: currentStudent!.name,
              email: currentStudent!.email,
            }}
            nextStudent={nextStudent}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardContent className="p-6">
          <ResultsTable
            results={visibleResults}
            onLoadMore={shouldShowLoadMore ? handleLoadMore : undefined}
            hasMore={!!shouldShowLoadMore}
          />
        </CardContent>
      </Card>

      {/* Principal's Remark Modal */}
      <PrincipalsRemarkModal
        open={remarkModalOpen}
        onOpenChange={setRemarkModalOpen}
        onSaveAndPublish={handleSaveAndPublish}
        studentName={currentStudent!.name}
      />
    </div>
  );
}
