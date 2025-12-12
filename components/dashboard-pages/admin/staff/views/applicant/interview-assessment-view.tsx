"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/components/general/huge-icon";
import { FileNotFoundIcon } from "@hugeicons/core-free-icons";

interface Assessment {
  assessment: string;
  interviewer: string;
  date: string;
  rating: string;
  note: string;
}

interface InterviewAssessmentViewProps {
  assessments: Assessment[];
  onRecordAssessment?: () => void;
}

export function InterviewAssessmentView({
  assessments,
  onRecordAssessment,
}: InterviewAssessmentViewProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">
        Interview & Assessment History
      </h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead>Assessment</TableHead>
              <TableHead>Interviewer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48">
                  <div className="flex flex-col items-center justify-center text-center py-8">
                    <Icon
                      icon={FileNotFoundIcon}
                      size={48}
                      className="text-gray-300 mb-3"
                    />
                    <p className="text-gray-500 text-sm">
                      Record candidates assessment
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              assessments.map((assessment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-gray-700">
                    {assessment.assessment}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {assessment.interviewer}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {assessment.date}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {assessment.rating}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {assessment.note}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
