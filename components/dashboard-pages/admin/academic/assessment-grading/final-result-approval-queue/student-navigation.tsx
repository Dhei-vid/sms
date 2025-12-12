"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentNavigationProps {
  previousStudent?: {
    id: string;
    name: string;
  };
  currentStudent: {
    id: string;
    name: string;
    email: string;
  };
  nextStudent?: {
    id: string;
    name: string;
  };
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
}

export function StudentNavigation({
  previousStudent,
  currentStudent,
  nextStudent,
  onPrevious,
  onNext,
  className,
}: StudentNavigationProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {/* Previous Student */}

      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!previousStudent}
        className="flex items-center gap-2"
      >
        <ChevronLeft size={15} />
        {previousStudent && <p className="text-xs">{previousStudent.name}</p>}
      </Button>

      {/* Current Student */}
      <div className="flex-1 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {currentStudent.name}
        </h3>
        <p className="text-sm text-gray-600">{currentStudent.email}</p>
      </div>

      {/* Next Student */}
      <Button
        variant="outline"
        onClick={onNext}
        disabled={!nextStudent}
        className="flex items-center gap-2"
      >
        {nextStudent && (
          <span onClick={onNext} className="text-xs">
            {nextStudent.name}
          </span>
        )}
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
