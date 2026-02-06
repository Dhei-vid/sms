"use client";

import { useState } from "react";
import * as React from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerOption {
  label: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  questionType: string;
  question: string;
  answerOptions: AnswerOption[];
  explanation: string;
  topicTag: string;
}

interface QuestionReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examTitle: string;
  totalQuestions: number;
  submittedBy: string;
  questions: Question[];
  currentQuestionIndex?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onSendBack?: (questionId: string) => void;
  onApprove?: (questionId: string) => void;
}

export function QuestionReviewModal({
  open,
  onOpenChange,
  examTitle,
  totalQuestions,
  submittedBy,
  questions,
  currentQuestionIndex = 0,
  onPrevious,
  onNext,
  onSendBack,
  onApprove,
}: QuestionReviewModalProps) {
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

  const handleSendBack = () => {
    if (onSendBack && currentQuestion) {
      onSendBack(currentQuestion.id);
    }
  };

  const handleApprove = () => {
    if (onApprove && currentQuestion) {
      onApprove(currentQuestion.id);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title={examTitle}
      size="4xl"
      maxHeight="90vh"
      className="space-y-6"
    >
      {/* Summary Tags */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-gray-100 rounded-md px-4 py-2">
          <span className="text-sm text-gray-600">
            Total questions:{" "}
            <span className="font-semibold text-gray-800">
              {totalQuestions} Questions
            </span>
          </span>
        </div>
        <div className="bg-gray-100 rounded-md px-4 py-2">
          <span className="text-sm text-gray-600">
            Submitted by:{" "}
            <span className="font-semibold text-gray-800">{submittedBy}</span>
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2">
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

            {/* Answer Options */}
            <TableRow>
              <TableCell className="font-medium">Answer Options</TableCell>
              <TableCell>
                <div className="space-y-2">
                  {currentQuestion.answerOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="font-medium w-6">{option.label}:</span>
                      <span className="flex-1">{option.text}</span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          option.isCorrect ? "text-green-600" : "text-gray-600",
                        )}
                      >
                        {option.isCorrect ? "Yes" : "No"}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>

            {/* Explanation */}
            <TableRow>
              <TableCell className="font-medium">Explanation</TableCell>
              <TableCell className="text-sm text-gray-700">
                {currentQuestion.explanation}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={handleSendBack}>
          Send back for Review
        </Button>
        <Button
          className="bg-main-blue text-white hover:bg-main-blue/90"
          onClick={handleApprove}
        >
          Approve Question
        </Button>
      </div>
    </ModalContainer>
  );
}
