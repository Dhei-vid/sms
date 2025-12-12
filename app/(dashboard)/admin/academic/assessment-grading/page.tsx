"use client";

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

interface GradeSubmissionProgress {
  section: string;
  expectedPercentage: number;
  submittedPercentage: number;
  barColor: string;
}

const gradeSubmissionProgress: GradeSubmissionProgress[] = [
  {
    section: "Senior School (SS)",
    expectedPercentage: 100,
    submittedPercentage: 75,
    barColor: "bg-orange-500",
  },
  {
    section: "Junior School (JSS)",
    expectedPercentage: 100,
    submittedPercentage: 85,
    barColor: "bg-green-500",
  },
  {
    section: "Primary School",
    expectedPercentage: 100,
    submittedPercentage: 70,
    barColor: "bg-blue-500",
  },
];

export default function AssessmentGradingDashboardPage() {
  const router = useRouter();

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
          value="85% Complete"
          subtitle="Tracks % of all expected grades."
        />
        <MetricCard
          title="Late Grades"
          value="12 Submissions"
          subtitle="Identifies grades that have missed the deadline."
        />
        <MetricCard
          title="Results Ready for Approval"
          value="2 Grade Levels"
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
              router.push(
                "/admin/academic/assessment-grading/setup-assessment"
              )
            }
            className="border-b"
          />
          <QuickActionCard
            title="View Final Results Approval Queue"
            description="Links to the final review screen"
            icon={PassportValidIcon}
            onClick={() =>
              router.push(
                "/admin/academic/assessment-grading/final-result-approval-queue"
              )
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
