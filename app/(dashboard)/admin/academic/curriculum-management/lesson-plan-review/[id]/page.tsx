"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LessonPlanDetail {
  id: string;
  subject: string;
  week: string;
  unit: string;
  submittedBy: string;
  curriculumCheck: string;
  topic: string;
  duration: string;
  learningObjectives: string;
  instructionalMaterials: string;
  teachingActivities: string;
  assessment: string;
  emergencyContact: string;
}

// Mock data - in real app, this would be fetched based on id
const getLessonPlanDetail = (id: string): LessonPlanDetail => {
  return {
    id,
    subject: "Integrated Science",
    week: "Week 4",
    unit: "Unit 4: Photosynthesis",
    submittedBy: "Ms. Zara A.",
    curriculumCheck: "Content matches 95%",
    topic: "The Role of Chlorophyll",
    duration: "2 Periods (80 minutes)",
    learningObjectives:
      "At the end of the lesson, students will be able to: 1. Define chlorophyll. 2. State the key stages of light reaction. 3. Relate chlorophyll function to plant energy conversion.",
    instructionalMaterials:
      "Whiteboard, Markers, Chlorophyll Extraction Kit (requires lab booking), Handout on Photosynthesis.",
    teachingActivities:
      "1. Engage (10 min): Ask students why plants are green.\n2. Explore (40 min): Demonstrate chlorophyll extraction using alcohol bath.\n3. Explain (20 min): Lecture on light absorption, referencing the demonstration.",
    assessment:
      "Formative: Question-and-answer session (Q&A). Summative: Exit Ticket (3 questions on chlorophyll's role).",
    emergencyContact: "",
  };
};

const planFields = [
  { key: "topic", label: "Topic" },
  { key: "duration", label: "Duration" },
  { key: "learningObjectives", label: "Learning Objectives" },
  { key: "instructionalMaterials", label: "Instructional Materials" },
  { key: "teachingActivities", label: "Teaching Activities (Procedure)" },
  { key: "assessment", label: "Assessment" },
  { key: "emergencyContact", label: "Emergency Contact" },
];

export default function LessonPlanReviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const lessonPlan = getLessonPlanDetail(params.id as string);

  const handleSendBack = () => {
    // Handle send back for revision
    console.log("Send back for revision", lessonPlan.id);
    router.push("/admin/academic/curriculum-management/lesson-plan-review");
  };

  const handleApprove = () => {
    // Handle approve plan
    console.log("Approve plan", lessonPlan.id);
    router.push("/admin/academic/curriculum-management/lesson-plan-review");
  };

  const getFieldValue = (key: string): string => {
    return lessonPlan[key as keyof LessonPlanDetail] || "";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {lessonPlan.subject} - {lessonPlan.week}
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {lessonPlan.unit}
          </span>
          <span className="text-gray-600">
            Submitted By: {lessonPlan.submittedBy}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            Curriculum Check: {lessonPlan.curriculumCheck}
          </span>
        </div>
      </div>

      {/* Plan Content Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Plan Content: Teacher Submission
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            This section displays the detailed plan submitted by the teacher,
            organized logically for review.
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-main-blue/5">
                  <TableHead className="font-semibold w-[200px] px-4 py-3">
                    Form Field
                  </TableHead>
                  <TableHead className="font-semibold px-4 py-3">
                    Content
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planFields.map((field) => {
                  const value = getFieldValue(field.key);
                  return (
                    <TableRow key={field.key}>
                      <TableCell className="font-medium text-gray-700 border-r border-gray-200 px-4 py-3">
                        {field.label}
                      </TableCell>
                      <TableCell className="text-gray-700 whitespace-pre-wrap px-4 py-3">
                        {value || <span className="text-gray-400">-</span>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleSendBack}
              className="hover:bg-gray-200"
            >
              Send Back for Revision
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-main-blue text-white hover:bg-main-blue/90"
            >
              Approve Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
