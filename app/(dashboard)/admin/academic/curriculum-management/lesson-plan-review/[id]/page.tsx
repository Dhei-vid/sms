"use client";

import { useRouter, useParams } from "next/navigation";
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
import { useGetNoteByIdQuery, useUpdateNoteMutation } from "@/services/notes/notes";
import type { Notes } from "@/services/notes/note-types";
import { toast } from "sonner";

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

function noteToLessonPlanDetail(n: Notes): LessonPlanDetail {
  const creator = n.creator as { first_name?: string; last_name?: string } | undefined;
  const submittedBy = creator
    ? `${creator.first_name ?? ""} ${creator.last_name ?? ""}`.trim() || "—"
    : "—";
  return {
    id: n.id,
    subject: n.title,
    week: "",
    unit: n.description ?? n.title,
    submittedBy,
    curriculumCheck: "—",
    topic: n.title,
    duration: n.duration ?? "—",
    learningObjectives: n.learning_objectives ?? "—",
    instructionalMaterials: n.instructional_materials ?? "—",
    teachingActivities: n.teaching_activities ?? "—",
    assessment: n.assessment ?? "—",
    emergencyContact: "",
  };
}

const planFields = [
  { key: "topic", label: "Topic" },
  { key: "duration", label: "Duration" },
  { key: "learningObjectives", label: "Learning Objectives" },
  { key: "instructionalMaterials", label: "Instructional Materials" },
  { key: "teachingActivities", label: "Teaching Activities (Procedure)" },
  { key: "assessment", label: "Assessment" },
  { key: "emergencyContact", label: "Emergency Contact" },
];

export default function LessonPlanReviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: noteResponse, isLoading } = useGetNoteByIdQuery(id, {
    skip: !id,
  });
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const note = noteResponse?.data as Notes | undefined;
  const lessonPlan = note ? noteToLessonPlanDetail(note) : null;

  const handleSendBack = async () => {
    if (!id) return;
    try {
      await updateNote({ id, data: { status: "sent-back" } }).unwrap();
      toast.success("Plan sent back for revision.");
      router.push("/admin/academic/curriculum-management/lesson-plan-review");
    } catch {
      toast.error("Failed to send back.");
    }
  };

  const handleApprove = async () => {
    if (!id) return;
    try {
      await updateNote({ id, data: { status: "approved" } }).unwrap();
      toast.success("Plan approved.");
      router.push("/admin/academic/curriculum-management/lesson-plan-review");
    } catch {
      toast.error("Failed to approve.");
    }
  };

  const getFieldValue = (key: string): string => {
    return lessonPlan?.[key as keyof LessonPlanDetail] ?? "";
  };

  if (!id) {
    return (
      <div className="p-6 text-gray-600">Invalid plan ID.</div>
    );
  }

  if (isLoading || !lessonPlan) {
    return (
      <div className="p-6 text-gray-600">
        {isLoading ? "Loading..." : "Plan not found."}
      </div>
    );
  }

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
              disabled={isUpdating}
              className="hover:bg-gray-200"
            >
              Send Back for Revision
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isUpdating}
              className="bg-main-blue text-white hover:bg-main-blue/90"
            >
              {isUpdating ? "Saving…" : "Approve Plan"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
