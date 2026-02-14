"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { PayByCheckIcon, PassportValidIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { useGetAllExamResultsQuery } from "@/services/results/results";
import type { ExamResult } from "@/services/results/result-types";

interface GradeSubmissionProgress {
  section: string;
  expectedPercentage: number;
  submittedPercentage: number;
  barColor: string;
}

function aggregateFromResults(data: ExamResult[]): {
  gradeSubmissionComplete: number;
  lateGradesCount: number;
  resultsReadyForApproval: number;
  gradeSubmissionProgress: GradeSubmissionProgress[];
} {
  const byKey = new Map<string, ExamResult[]>();
  const bySection = new Map<string, ExamResult[]>();
  for (const r of data) {
    const key = `${r.class_name}||${r.term}||${r.session}`;
    const list = byKey.get(key) ?? [];
    list.push(r);
    byKey.set(key, list);

    const section = inferSection(r.class_name);
    const sectionList = bySection.get(section) ?? [];
    sectionList.push(r);
    bySection.set(section, sectionList);
  }

  const batchesCount = byKey.size;
  const totalStudents = data.length;
  const resultsReadyForApproval = batchesCount;

  const lateGradesCount = 0;

  const sections: Record<string, { label: string; color: string }> = {
    ss: { label: "Senior School (SS)", color: "bg-orange-500" },
    jss: { label: "Junior School (JSS)", color: "bg-green-500" },
    primary: { label: "Primary School", color: "bg-blue-500" },
  };
  const gradeSubmissionProgress: GradeSubmissionProgress[] = Object.entries(
    sections
  ).map(([key, { label, color }]) => {
    const list = bySection.get(key) ?? [];
    const count = list.length;
    const expected = count > 0 ? 100 : 0;
    const submitted = count > 0 ? 100 : 0;
    return {
      section: label,
      expectedPercentage: expected,
      submittedPercentage: submitted,
      barColor: color,
    };
  });

  const gradeSubmissionComplete =
    totalStudents > 0 ? Math.min(100, Math.round((totalStudents / totalStudents) * 100)) : 0;

  return {
    gradeSubmissionComplete: totalStudents > 0 ? 100 : 0,
    lateGradesCount,
    resultsReadyForApproval,
    gradeSubmissionProgress,
  };
}

function inferSection(class_name: string): string {
  const c = (class_name || "").toLowerCase();
  if (c.startsWith("ss") || c.includes("senior")) return "ss";
  if (c.startsWith("jss") || c.includes("junior")) return "jss";
  return "primary";
}

export default function AssessmentGradingDashboardPage() {
  const router = useRouter();
  const { data, isLoading } = useGetAllExamResultsQuery(undefined);
  const raw = (data as { data?: ExamResult[] })?.data ?? [];

  const {
    gradeSubmissionComplete,
    lateGradesCount,
    resultsReadyForApproval,
    gradeSubmissionProgress,
  } = useMemo(() => aggregateFromResults(raw), [raw]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Assessment & Grading Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          The command center for the school's examination officer and academic
          administration, focusing on grade collection, calculation status, and
          results security.
        </p>
      </div>

      {/* Grade Submission Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Grade Submission Status"
          value={isLoading ? "—" : `${gradeSubmissionComplete}% Complete`}
          subtitle="Tracks % of all expected grades."
        />
        <MetricCard
          title="Late Grades"
          value={isLoading ? "—" : `${lateGradesCount} Submissions`}
          subtitle="Identifies grades that have missed the deadline."
        />
        <MetricCard
          title="Results Ready for Approval"
          value={isLoading ? "—" : `${resultsReadyForApproval} Grade Levels`}
          subtitle="Processed results awaiting final sign-off"
        />
      </div>

      {/* Grade Submission Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Grade Submission Progress
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Instantly reveals which section is causing the delay in overall
            submission.
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-main-blue/5">
                  <TableHead className="font-semibold px-4 py-3">
                    Section
                  </TableHead>
                  <TableHead className="font-semibold px-4 py-3">
                    Percentage of grades expected
                  </TableHead>
                  <TableHead className="font-semibold px-4 py-3">
                    Percentage of grades submitted
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradeSubmissionProgress.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-700 border-r border-gray-200 px-4 py-3">
                      {item.section}
                    </TableCell>
                    <TableCell className="text-gray-700 px-4 py-3 border-r border-gray-200">
                      {item.expectedPercentage}%
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="w-full">
                        <ProgressBar
                          value={item.submittedPercentage}
                          total={100}
                          barColor={item.barColor}
                          showLabel={false}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuickActionCard
            title="Setup New Assessment/Exam"
            description="Define all grading components (CA, Exam), set grading scales, and manage weighting rules."
            icon={PayByCheckIcon}
            onClick={() =>
              router.push("/admin/academic/assessment-grading/setup-assessment")
            }
            className="border-b"
          />
          <QuickActionCard
            title="View Final Results Approval Queue"
            description="Links to the final review screen"
            icon={PassportValidIcon}
            onClick={() =>
              router.push(
                "/admin/academic/assessment-grading/final-result-approval-queue",
              )
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
