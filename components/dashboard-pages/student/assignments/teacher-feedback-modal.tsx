"use client";

import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TeacherFeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignmentName: string;
  finalScore?: string;
  teacherFeedback?: string;
  onAcknowledge: () => void;
}

export function TeacherFeedbackModal({
  open,
  onOpenChange,
  assignmentName,
  finalScore = "85 / 100 Marks",
  teacherFeedback = "Rich Text display of specific comments from the teacher. Rich Text display of specific comments from the teacher. Rich Text display of specific comments from the teacher.Rich Text display of specific comments from the teacher.",
  onAcknowledge,
}: TeacherFeedbackModalProps) {
  const handleClose = () => {
    onAcknowledge();
    onOpenChange(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-start justify-between pr-6">
          <span>Teacher Feedback: {assignmentName}</span>
          <span className="text-xs text-gray-500">Read-Only</span>
        </div>
      }
      size="lg"
      footer={
        <Button
          onClick={handleClose}
          className="w-full bg-main-blue text-white"
        >
          Close & Acknowledge
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Final Score */}
        <div className="space-y-2">
          <Label
            htmlFor="finalScore"
            className="text-sm font-medium text-gray-700"
          >
            Final Score
          </Label>
          <Input
            id="finalScore"
            value={finalScore}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* Teacher Feedback */}
        <div className="space-y-2">
          <Label
            htmlFor="teacherFeedback"
            className="text-sm font-medium text-gray-700"
          >
            Teacher Feedback
          </Label>
          <Textarea
            id="teacherFeedback"
            value={teacherFeedback}
            readOnly
            className="bg-gray-50 cursor-not-allowed min-h-[150px] resize-none"
          />
        </div>
      </div>
    </ModalContainer>
  );
}
