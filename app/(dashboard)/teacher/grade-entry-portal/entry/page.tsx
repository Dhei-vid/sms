"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { StepNavigation, Step } from "@/components/ui/step-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AssignmentsIcon, ResourcesAddIcon } from "@hugeicons/core-free-icons";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  studentId: string;
  computeScore: number;
  scoreEntry: string;
  teacherRemarks: string;
}

// Sample data - in production, this would come from an API
const allStudents: Student[] = [
  {
    id: "1",
    name: "Sola Adebayo",
    studentId: "adebayo.m178031",
    computeScore: 20,
    scoreEntry: "",
    teacherRemarks: "",
  },
  {
    id: "2",
    name: "Helen Davies",
    studentId: "davies.m178032",
    computeScore: 14,
    scoreEntry: "",
    teacherRemarks: "",
  },
  {
    id: "3",
    name: "Tolu Adebayo",
    studentId: "adebayo.m170833",
    computeScore: 17,
    scoreEntry: "",
    teacherRemarks: "",
  },
  {
    id: "4",
    name: "Biodun Eke",
    studentId: "eke.m178033",
    computeScore: 19,
    scoreEntry: "",
    teacherRemarks: "",
  },
  {
    id: "5",
    name: "Uche Nwachukwu",
    studentId: "nwachukwu.m170844",
    computeScore: 22,
    scoreEntry: "",
    teacherRemarks: "",
  },
  {
    id: "6",
    name: "Adebisi Femi",
    studentId: "femi.m170844",
    computeScore: 18,
    scoreEntry: "",
    teacherRemarks: "",
  },
  {
    id: "7",
    name: "Oluwole Tunde",
    studentId: "oluwole.m170844",
    computeScore: 21,
    scoreEntry: "",
    teacherRemarks: "",
  },
  {
    id: "8",
    name: "Zara Amani",
    studentId: "amani.m170844",
    computeScore: 19,
    scoreEntry: "",
    teacherRemarks: "",
  },
];

type StepId = "assessment-selection" | "score-input-grid";

const steps: Step[] = [
  {
    id: "assessment-selection",
    label: "Assessment Selection",
    icon: AssignmentsIcon,
  },
  {
    id: "score-input-grid",
    label: "Score Input Grid",
    icon: ResourcesAddIcon,
  },
];

export default function GradeEntryPortalEntryPage() {
  const [currentStep, setCurrentStep] = useState<StepId>(
    "assessment-selection"
  );
  const [assessmentSelector, setAssessmentSelector] = useState("");
  
  // Pagination for student data
  const { displayedData: studentData, hasMore, loadMore } = usePagination({
    data: allStudents,
    initialItemsPerPage: 5,
    itemsPerPage: 5,
  });

  // Create a state that tracks all students' scores and remarks
  const [allStudentScores, setAllStudentScores] = useState<Record<string, { scoreEntry: string; teacherRemarks: string }>>({});

  const handleStepChange = (stepId: string) => {
    setCurrentStep(stepId as StepId);
  };

  const handleScoreChange = (studentId: string, value: string) => {
    setAllStudentScores((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], scoreEntry: value },
    }));
  };

  const handleRemarksChange = (studentId: string, value: string) => {
    setAllStudentScores((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], teacherRemarks: value },
    }));
  };

  // Merge paginated student data with scores/remarks
  const studentDataWithScores = studentData.map((student) => ({
    ...student,
    scoreEntry: allStudentScores[student.id]?.scoreEntry || "",
    teacherRemarks: allStudentScores[student.id]?.teacherRemarks || "",
  }));

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Grade Entry Portal
        </h1>
        <p className="text-gray-600">
          The primary interface for teachers to input and submit raw student
          scores for a single assessment (Quiz, CA, Exam).
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Step Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="px-2">
              <StepNavigation
                steps={steps}
                activeStep={currentStep}
                onStepChange={handleStepChange}
                orientation="vertical"
              />
            </CardContent>
          </Card>
        </div>

        {/* Step Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="px-6">
              {currentStep === "assessment-selection" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Assessment Selection
                  </h2>

                  {/* Assessment Selector */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="assessmentSelector"
                      className="text-sm font-medium text-gray-700"
                    >
                      Assessment Selector
                    </Label>
                    <Select
                      value={assessmentSelector}
                      onValueChange={setAssessmentSelector}
                    >
                      <SelectTrigger id="assessmentSelector" className="w-full">
                        <SelectValue placeholder="Filter by Assessment Name (e.g., JSS2 Maths, Mid-Term Exam)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jss2-math-midterm">
                          JSS2 Maths - Mid-Term Exam
                        </SelectItem>
                        <SelectItem value="jss2-english-ca1">
                          JSS2 English - CA 1
                        </SelectItem>
                        <SelectItem value="jss3-science-quiz">
                          JSS3 Science - Unit 2 Quiz
                        </SelectItem>
                        <SelectItem value="ss1-physics-final">
                          SS1 Physics - Final Exam
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Total Marks Available */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="totalMarks"
                        className="text-sm font-medium text-gray-700"
                      >
                        Total Marks Available
                      </Label>
                      <span className="text-xs text-gray-500">Read-only</span>
                    </div>
                    <Input
                      id="totalMarks"
                      type="text"
                      placeholder="Based off from assessment selector"
                      value={assessmentSelector ? "100" : ""}
                      readOnly
                      className="bg-gray-50 cursor-not-allowed"
                    />
                  </div>

                  {/* Submission Deadline */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="submissionDeadline"
                        className="text-sm font-medium text-gray-700"
                      >
                        Submission Deadline
                      </Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Read-only</span>
                      </div>
                    </div>
                    <Input
                      id="submissionDeadline"
                      type="text"
                      value="Nov. 15, 2025"
                      readOnly
                      className="bg-gray-50 cursor-not-allowed"
                    />
                  </div>

                  {/* Submission Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="submissionStatus"
                        className="text-sm font-medium text-gray-700"
                      >
                        Submission Status
                      </Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Read-only</span>
                      </div>
                    </div>
                    <Input
                      id="submissionStatus"
                      type="text"
                      value="Nov. 13, 2025; 10:45AM"
                      readOnly
                      className="bg-gray-50 cursor-not-allowed"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/teacher/grade-entry-portal">
                      <Button variant="outline">Back</Button>
                    </Link>
                    <Button
                      onClick={() => setCurrentStep("score-input-grid")}
                      className="w-60"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === "score-input-grid" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Score Input Grid
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      (Based on the Assessment Selected)
                    </p>
                  </div>

                  {/* Score Input Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <DataTable
                      columns={[
                        {
                          key: "name",
                          title: "Name & Student ID",
                          render: (value, row) => (
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">
                                {row.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {row.studentId}
                              </span>
                            </div>
                          ),
                        },
                        {
                          key: "computeScore",
                          title: "Compute Score",
                          render: (value) => (
                            <span className="text-gray-800">
                              {value as number}
                            </span>
                          ),
                        },
                        {
                          key: "scoreEntry",
                          title: "Score Entry",
                          render: (value, row) => (
                            <Input
                              type="number"
                              placeholder="placeholder"
                              value={row.scoreEntry}
                              onChange={(e) =>
                                handleScoreChange(row.id, e.target.value)
                              }
                              className="w-full"
                            />
                          ),
                        },
                        {
                          key: "teacherRemarks",
                          title: "Teacher Remarks",
                          render: (value, row) => (
                            <Input
                              type="text"
                              placeholder="placeholder"
                              value={row.teacherRemarks}
                              onChange={(e) =>
                                handleRemarksChange(row.id, e.target.value)
                              }
                              className="w-full"
                            />
                          ),
                        },
                      ]}
                      data={studentDataWithScores}
                      showActionsColumn={false}
                    />
                  </div>

                   {/* Load More Button */}
                   {hasMore && (
                     <div className="flex justify-center">
                       <Button variant="outline" onClick={loadMore}>
                         Load More
                       </Button>
                     </div>
                   )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/teacher/grade-entry-portal">
                      <Button variant="outline">Save as Draft</Button>
                    </Link>
                    <Button
                      onClick={() => setCurrentStep("score-input-grid")}
                      className="w-60"
                    >
                      Submit Scores
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
