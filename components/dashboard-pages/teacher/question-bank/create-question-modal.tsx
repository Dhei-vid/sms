"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CreateQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateQuestionModal({
  open,
  onOpenChange,
}: CreateQuestionModalProps) {
  const [assignedCourse, setAssignedCourse] = useState("");
  const [targetStudent, setTargetStudent] = useState("");
  const [questionModel, setQuestionModel] = useState("");
  const [questionInstruction, setQuestionInstruction] = useState("");
  const [question, setQuestion] = useState("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [scoreMarks, setScoreMarks] = useState("");

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when modal closes
      setAssignedCourse("");
      setTargetStudent("");
      setQuestionModel("");
      setQuestionInstruction("");
      setQuestion("");
      setAnswerOptions([""]);
      setCorrectAnswer("");
      setScoreMarks("");
    }
    onOpenChange(isOpen);
  };

  const handleAddOption = () => {
    setAnswerOptions([...answerOptions, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...answerOptions];
    newOptions[index] = value;
    setAnswerOptions(newOptions);
  };

  const handleSaveDraft = () => {
    // Handle save as draft
    console.log("Save as draft:", {
      assignedCourse,
      targetStudent,
      questionModel,
      questionInstruction,
      question,
      answerOptions,
      correctAnswer,
      scoreMarks,
    });
    handleClose(false);
  };

  const handleSaveAndSubmit = () => {
    // Handle save and submit
    console.log("Save and submit:", {
      assignedCourse,
      targetStudent,
      questionModel,
      questionInstruction,
      question,
      answerOptions,
      correctAnswer,
      scoreMarks,
    });
    handleClose(false);
  };

  // Update target student when course changes
  const handleCourseChange = (value: string) => {
    setAssignedCourse(value);
    // Auto-populate target student based on course
    if (value) {
      setTargetStudent("JS 2 Students (based on the course selected)");
    } else {
      setTargetStudent("");
    }
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Create New Question"
      size="3xl"
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex-1"
          >
            Save as Draft
          </Button>
          <Button onClick={handleSaveAndSubmit} className="flex-1">
            Save & Submit
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Assign to Course */}
        <div className="space-y-2">
          <Label
            htmlFor="assignedCourse"
            className="text-sm font-medium text-gray-700"
          >
            Assign to Course
          </Label>
          <Select value={assignedCourse} onValueChange={handleCourseChange}>
            <SelectTrigger id="assignedCourse" className="w-full">
              <SelectValue placeholder="Dropdown Select: (e.g., JSS 2 Mathematics)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jss2-math">JSS 2 Mathematics</SelectItem>
              <SelectItem value="jss2-english">JSS 2 English</SelectItem>
              <SelectItem value="jss2-science">JSS 2 Science</SelectItem>
              <SelectItem value="ss2-physics">SS 2 Physics</SelectItem>
              <SelectItem value="ss2-chemistry">SS 2 Chemistry</SelectItem>
              <SelectItem value="ss2-biology">SS 2 Biology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Target Student */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="targetStudent"
              className="text-sm font-medium text-gray-700"
            >
              Target Student
            </Label>
            <span className="text-xs text-gray-500">Read-only</span>
          </div>
          <Input
            id="targetStudent"
            type="text"
            placeholder="JS 2 Students (based on the course selected)"
            value={targetStudent}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* Select Question Model */}
        <div className="space-y-2">
          <Label
            htmlFor="questionModel"
            className="text-sm font-medium text-gray-700"
          >
            Select Question Model
          </Label>
          <Select value={questionModel} onValueChange={setQuestionModel}>
            <SelectTrigger id="questionModel" className="w-full">
              <SelectValue placeholder="Dropdown Select: Multiple choice questions / True/False / Fill in the Blank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">
                Multiple Choice Questions
              </SelectItem>
              <SelectItem value="true-false">True/False</SelectItem>
              <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
              <SelectItem value="essay">Essay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question Instruction */}
        <div className="space-y-2">
          <Label
            htmlFor="questionInstruction"
            className="text-sm font-medium text-gray-700"
          >
            Question Instruction
          </Label>
          <Textarea
            id="questionInstruction"
            placeholder="placeholder"
            value={questionInstruction}
            onChange={(e) => setQuestionInstruction(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Question */}
        <div className="space-y-2">
          <Label
            htmlFor="question"
            className="text-sm font-medium text-gray-700"
          >
            Question
          </Label>
          <Textarea
            id="question"
            placeholder="placeholder"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Answer Options */}
        <div className="space-y-2">
          <Label
            htmlFor="answerOptions"
            className="text-sm font-medium text-gray-700"
          >
            Answer Options
          </Label>
          <div className="space-y-2">
            {answerOptions.map((option, index) => (
              <Textarea
                key={index}
                id={`answerOption-${index}`}
                placeholder="placeholder"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="min-h-20"
              />
            ))}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOption}
                className="mt-2"
              >
                Add Another Option
              </Button>
            </div>
          </div>
        </div>

        {/* Correct Answer and Score Marks - Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          {/* Correct Answer */}
          <div className="space-y-2">
            <Label
              htmlFor="correctAnswer"
              className="text-sm font-medium text-gray-700"
            >
              Correct Answer
            </Label>
            <Input
              id="correctAnswer"
              type="number"
              placeholder="Number Input"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              min="1"
            />
          </div>

          {/* Score Marks */}
          <div className="space-y-2">
            <Label
              htmlFor="scoreMarks"
              className="text-sm font-medium text-gray-700"
            >
              Score Marks
            </Label>
            <Input
              id="scoreMarks"
              type="number"
              placeholder="Number Input (e.g., 2)"
              value={scoreMarks}
              onChange={(e) => setScoreMarks(e.target.value)}
              min="1"
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
