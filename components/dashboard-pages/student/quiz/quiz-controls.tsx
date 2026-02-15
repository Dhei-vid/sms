"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Clock01Icon } from "@hugeicons/core-free-icons";

import { Card, CardContent } from "@/components/ui/card";

interface QuizControlsProps {
  timeRemaining: string;
  onSubmit: () => void;
  isLocked?: boolean;
  isSubmitting?: boolean;
}

export function QuizControls({
  timeRemaining = "00:39:49",
  onSubmit,
  isLocked = false,
  isSubmitting = false,
}: QuizControlsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardContent className="">
          <div className="flex items-start gap-2 text-gray-700">
            <Icon icon={Clock01Icon} size={20} className="text-gray-600" />
            <span className="text-sm font-medium">
              Time remaining: {timeRemaining}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onSubmit}
        className="h-full"
        disabled={isLocked || isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit Answers"}
      </Button>
    </div>
  );
}
