"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Assignment {
  assignmentName: string;
  subject: string;
  totalMarks: string;
  dueDateTime: string;
  status: string;
  actionLabel: string;
}

interface NewGradeCardProps {
  assignmentName?: string;
  grade?: string;
  assignment?: Assignment;
  onAction?: (assignment?: Assignment) => void;
}

export function NewGradeCard({
  assignmentName = "Art & Culture Project Scored",
  grade = "Grade: 88%",
  assignment,
  onAction,
}: NewGradeCardProps) {
  const handleClick = () => {
    if (onAction) {
      onAction(assignment);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          New Grade Scored
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-700 mb-1">{assignmentName}</p>
          <p className="text-xs text-gray-500">{grade}</p>
        </div>
        <Button onClick={handleClick} variant="outline" className="w-full">
          View Feedback
        </Button>
      </CardContent>
    </Card>
  );
}
