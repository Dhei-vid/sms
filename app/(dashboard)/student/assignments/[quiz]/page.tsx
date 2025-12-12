"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { QuizHeader } from "@/components/dashboard-pages/student/quiz/quiz-header";
import { QuizControls } from "@/components/dashboard-pages/student/quiz/quiz-controls";
import { QuestionDisplay } from "@/components/dashboard-pages/student/quiz/question-display";
import { AnswerOptions } from "@/components/dashboard-pages/student/quiz/answer-options";
import { Pagination } from "@/components/dashboard-pages/student/quiz/pagination";
import { PrincipalRemark } from "@/components/dashboard-pages/student/quiz/principal-remark";
import { QuizStartModal } from "@/components/dashboard-pages/student/quiz/quiz-start-modal";

import { Card, CardContent } from "@/components/ui/card";

interface Question {
  id: number;
  topic: string;
  topicInfo?: string;
  instruction: string;
  question: string;
  options: { label: string; value: string }[];
}

const quizData: Record<string, { title: string; questions: Question[] }> = {
  "1": {
    title: "JS 2 Mathematics Quiz: Algebra Review Quiz",
    questions: [
      {
        id: 1,
        topic: "Linear Equation",
        topicInfo:
          "Any information or instruction the teacher wishes to pass under the given topic.",
        instruction: "Solve for the variable x in the equation:",
        question: "2x + 7 = 19",
        options: [
          { label: "A", value: "x = 13" },
          { label: "B", value: "x = 6" },
          { label: "C", value: "x = 12" },
          { label: "D", value: "x = 38" },
        ],
      },
      {
        id: 2,
        topic: "Linear Equation",
        topicInfo:
          "Any information or instruction the teacher wishes to pass under the given topic.",
        instruction: "Solve for the variable x in the equation:",
        question: "3x - 5 = 10",
        options: [
          { label: "A", value: "x = 5" },
          { label: "B", value: "x = 15" },
          { label: "C", value: "x = 3" },
          { label: "D", value: "x = 10" },
        ],
      },
      // Add more questions to reach 12 total
      ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 3,
        topic: "Linear Equation",
        topicInfo:
          "Any information or instruction the teacher wishes to pass under the given topic.",
        instruction: "Solve for the variable x in the equation:",
        question: `Question ${i + 3} equation`,
        options: [
          { label: "A", value: "Option A" },
          { label: "B", value: "Option B" },
          { label: "C", value: "Option C" },
          { label: "D", value: "Option D" },
        ],
      })),
    ],
  },
};

export default function QuizPage() {
  const params = useParams();
  const quizId = params.quiz as string;
  const quiz = quizData[quizId] || quizData["1"];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [timeRemaining, setTimeRemaining] = useState("00:39:49");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: value,
    });
  };

  const handlePageChange = (page: number) => {
    const questionIndex = page - 1;
    if (questionIndex >= 0 && questionIndex < totalQuestions) {
      setCurrentQuestionIndex(questionIndex);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Handle quiz submission
    console.log("Submitting quiz with answers:", selectedAnswers);
    // Add navigation or submission logic here
  };

  const handleBeginAssessment = () => {
    setIsModalOpen(false);
    // Start the quiz timer or any other initialization logic
  };

  return (
    <>
      <QuizStartModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        quizTitle={quiz.title}
        timeLimit="40 Minutes"
        attemptsRemaining={1}
        instructions="Teachers Instruction to the student on the particular quiz"
        onBegin={handleBeginAssessment}
      />
      <div className="space-y-4">
        <QuizControls timeRemaining={timeRemaining} onSubmit={handleSubmit} />
      <Card>
        <CardContent className="flex flex-col gap-4">
          <QuestionDisplay
            topic={currentQuestion.topic}
            topicInfo={currentQuestion.topicInfo}
            questionNumber={currentQuestionIndex + 1}
            instruction={currentQuestion.instruction}
            question={currentQuestion.question}
          />
          <AnswerOptions
            options={currentQuestion.options}
            selectedAnswer={selectedAnswers[currentQuestion.id]}
            onSelect={handleAnswerSelect}
          />

          <Pagination
            currentPage={currentQuestionIndex + 1}
            totalPages={totalQuestions}
            onPageChange={handlePageChange}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </CardContent>
      </Card>
       <PrincipalRemark />
     </div>
    </>
  );
}
