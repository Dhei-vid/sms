"use client";

import { useState } from "react";
import * as React from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionResponse {
  id: string;
  questionType: string;
  question: string;
  correctAnswer: string;
  studentResponse: string;
  scoreEarned: string;
  isCorrect: boolean;
  topicTag: string;
}

interface StudentInfo {
  id: string;
  fullName: string;
  schoolId: string;
  currentClass: string;
  rawScore: number;
  totalScore: number;
  avatar?: string;
}

interface ScriptReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examTitle: string;
  student: StudentInfo;
  questions: QuestionResponse[];
  currentQuestionIndex?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function ScriptReviewModal({
  open,
  onOpenChange,
  examTitle,
  student,
  questions,
  currentQuestionIndex = 0,
  onPrevious,
  onNext,
}: ScriptReviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(currentQuestionIndex);

  // Sync internal state with prop when it changes
  React.useEffect(() => {
    setCurrentIndex(currentQuestionIndex);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < questions.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (onPrevious) {
        onPrevious();
      }
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (onNext) {
        onNext();
      }
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const scorePercentage = Math.round(
    (student.rawScore / student.totalScore) * 100,
  );

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title={`${examTitle} Script Review`}
      size="4xl"
      maxHeight="90vh"
      className="space-y-6"
    >
      {/* Student Information Card */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="shrink-0">
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={student.fullName}
                  className="h-20 w-20 rounded-md object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-md bg-main-blue flex items-center justify-center text-white text-2xl font-semibold">
                  {student.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Student Details */}
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {student.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  Student ID: {student.schoolId}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-100 rounded-md px-3 py-1">
                  <span className="text-xs text-gray-600">
                    Current class:{" "}
                    <span className="font-semibold text-gray-800">
                      {student.currentClass}
                    </span>
                  </span>
                </div>
                <div className="bg-gray-100 rounded-md px-3 py-1">
                  <span className="text-xs text-gray-600">
                    Raw Score:{" "}
                    <span className="font-semibold text-gray-800">
                      {student.rawScore} / {student.totalScore} (
                      {scorePercentage}%)
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Tag */}
      <div>
        <p className="text-sm text-gray-600">{currentQuestion.topicTag}</p>
      </div>

      {/* Question Details Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Question Type */}
            <TableRow>
              <TableCell className="font-medium">Question Type</TableCell>
              <TableCell>{currentQuestion.questionType}</TableCell>
            </TableRow>

            {/* Question */}
            <TableRow>
              <TableCell className="font-medium">Questions</TableCell>
              <TableCell>{currentQuestion.question}</TableCell>
            </TableRow>

            {/* Correct Answer */}
            <TableRow>
              <TableCell className="font-medium">Correct Answer</TableCell>
              <TableCell className="font-medium text-green-600">
                {currentQuestion.correctAnswer}
              </TableCell>
            </TableRow>

            {/* Student Response */}
            <TableRow>
              <TableCell className="font-medium">Student Response</TableCell>
              <TableCell>{currentQuestion.studentResponse}</TableCell>
            </TableRow>

            {/* Score Earned */}
            <TableRow>
              <TableCell className="font-medium">Score Earned</TableCell>
              <TableCell className="font-medium">
                {currentQuestion.scoreEarned}
              </TableCell>
            </TableRow>

            {/* Status */}
            <TableRow>
              <TableCell className="font-medium">Status</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {currentQuestion.isCorrect ? (
                    <>
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        Correct
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-5 w-5 rounded-full border-2 border-red-600 flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-red-600"></span>
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        Incorrect
                      </span>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          <span>Prev.</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={!hasNext}
          className="flex items-center gap-1"
        >
          <span>Next.</span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </ModalContainer>
  );
}
