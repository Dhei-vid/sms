"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QuizStartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizTitle: string;
  timeLimit?: string;
  attemptsRemaining?: number;
  instructions?: string;
  onBegin: () => void;
}

export function QuizStartModal({
  open,
  onOpenChange,
  quizTitle,
  timeLimit = "40 Minutes",
  attemptsRemaining = 1,
  instructions = "Teachers Instruction to the student on the particular quiz",
  onBegin,
}: QuizStartModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md" 
        onInteractOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-left">{quizTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Time Limit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="timeLimit" className="text-sm font-medium text-gray-700">
                Time Limit:
              </Label>
              <span className="text-xs text-gray-500">Read-Only</span>
            </div>
            <Input
              id="timeLimit"
              value={timeLimit}
              readOnly
              className="bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* Attempts Remaining */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="attemptsRemaining"
                className="text-sm font-medium text-gray-700"
              >
                Attempts Remaining:
              </Label>
              <span className="text-xs text-gray-500">Read-Only</span>
            </div>
            <Input
              id="attemptsRemaining"
              value={attemptsRemaining.toString()}
              readOnly
              className="bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="instructions"
                className="text-sm font-medium text-gray-700"
              >
                Instructions:
              </Label>
              <span className="text-xs text-gray-500">Read-Only</span>
            </div>
            <Textarea
              id="instructions"
              value={instructions}
              readOnly
              className="bg-gray-50 cursor-not-allowed min-h-[100px] resize-none"
            />
          </div>
        </div>

        <Button onClick={onBegin} className="w-full bg-main-blue text-white">
          Begin Assessment Now
        </Button>
      </DialogContent>
    </Dialog>
  );
}

