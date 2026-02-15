"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { QuizHeader } from "@/components/dashboard-pages/student/quiz/quiz-header";
import { QuizControls } from "@/components/dashboard-pages/student/quiz/quiz-controls";
import { QuestionDisplay } from "@/components/dashboard-pages/student/quiz/question-display";
import { AnswerOptions } from "@/components/dashboard-pages/student/quiz/answer-options";
import { Pagination } from "@/components/dashboard-pages/student/quiz/pagination";
import { PrincipalRemark } from "@/components/dashboard-pages/student/quiz/principal-remark";
import { QuizStartModal } from "@/components/dashboard-pages/student/quiz/quiz-start-modal";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCbtExamByIdQuery } from "@/services/cbt-exams/cbt-exams";
import {
  useCreateCbtResultMutation,
  useGetCbtResultsQuery,
} from "@/services/cbt-results/cbt-results";
import type { CbtQuestion } from "@/services/cbt-questions/cbt-question-types";
import { toast } from "sonner";

interface QuestionForDisplay {
  id: string;
  topic: string;
  topicInfo?: string;
  instruction: string;
  question: string;
  options: { label: string; value: string }[];
}

function mapCbtQuestionToDisplay(q: CbtQuestion): QuestionForDisplay {
  const labels = ["A", "B", "C", "D", "E"];
  const opts = (q.answer_options ?? []).map((text, i) => ({
    label: labels[i] ?? String(i + 1),
    value: text,
  }));
  return {
    id: q.id,
    topic: q.subject ?? "General",
    topicInfo: q.instruction ?? undefined,
    instruction: q.instruction ?? "",
    question: q.question ?? "",
    options: opts,
  };
}

function formatTimeRemaining(secondsLeft: number): string {
  if (secondsLeft <= 0) return "00:00";
  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  if (h > 0) {
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const examId = params.examId as string;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasAutoSubmitted = useRef(false);

  const { data: examResponse, isLoading: examLoading } = useGetCbtExamByIdQuery(
    examId ?? "",
    { skip: !examId }
  );
  const { data: resultsResponse } = useGetCbtResultsQuery(
    examId ? { exam_id: examId, _all: true } : undefined,
    { skip: !examId }
  );
  const [createResult] = useCreateCbtResultMutation();

  const exam = examResponse?.data;
  const questionsDetails = (exam as { questions_details?: CbtQuestion[] })?.questions_details ?? [];
  const questions = useMemo(
    () => questionsDetails.map(mapCbtQuestionToDisplay),
    [questionsDetails]
  );
  const durationMinutes = (exam?.duration ?? 40) as number;
  const totalSeconds = durationMinutes * 60;

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (optionIndex: number) => {
    if (isLocked || !currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handlePageChange = (page: number) => {
    const idx = page - 1;
    if (idx >= 0 && idx < totalQuestions) setCurrentQuestionIndex(idx);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1)
      setCurrentQuestionIndex((i) => i + 1);
  };

  const computeScore = useCallback(() => {
    let correct = 0;
    const answersForApi: { question_id: string; selected_option: number; is_correct: boolean; time_spent: number }[] = [];
    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected == null) return;
      const cbtQ = questionsDetails.find((cq) => cq.id === q.id);
      const correctIdx = (cbtQ?.correct_answer ?? 0) as number;
      const isCorrect = selected === correctIdx;
      if (isCorrect) correct++;
      answersForApi.push({
        question_id: q.id,
        selected_option: selected,
        is_correct: isCorrect,
        time_spent: 0,
      });
    });
    const total = totalQuestions || 1;
    const percentage = Math.round((correct / total) * 100);
    return { correct, total, percentage, answers: answersForApi };
  }, [questions, selectedAnswers, questionsDetails, totalQuestions]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isLocked) return;
    setIsSubmitting(true);
    const { percentage, answers } = computeScore();
    try {
      await createResult({
        exam_id: examId,
        user_id: user?.id,
        percentage,
        score: percentage,
        total_time_spent: totalSeconds - secondsRemaining,
        answers,
      }).unwrap();
      toast.success("Quiz submitted successfully");
      router.push("/student/assignments");
    } catch (err) {
      toast.error("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    isLocked,
    computeScore,
    createResult,
    examId,
    user?.id,
    totalSeconds,
    secondsRemaining,
    router,
  ]);

  const handleBeginAssessment = useCallback(() => {
    setIsModalOpen(false);
    setCountdownStarted(true);
    setSecondsRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!countdownStarted) return;
    if (secondsRemaining <= 0) {
      setIsLocked(true);
      if (!hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        handleSubmit();
      }
      return;
    }
    const t = setInterval(() => {
      setSecondsRemaining((s) => {
        const next = s - 1;
        if (next <= 0) return 0;
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [countdownStarted, secondsRemaining, handleSubmit]);

  if (!examId) {
    return (
      <div className="p-8 text-center text-gray-600">No exam ID provided.</div>
    );
  }

  if (examLoading) {
    return (
      <div className="p-8 text-center text-gray-600">Loading exam…</div>
    );
  }

  if (!exam) {
    return (
      <div className="p-8 text-center text-gray-600">Exam not found.</div>
    );
  }

  const rawData = (resultsResponse as { data?: unknown[] })?.data;
  const existingResults = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as { data?: unknown[] })?.data)
      ? (rawData as { data: unknown[] }).data
      : [];
  const userResult = existingResults.find(
    (r: { user_id?: string }) => r.user_id === user?.id
  );

  if (userResult) {
    return (
      <div className="p-8 text-center text-gray-600">
        You have already completed this exam.
      </div>
    );
  }

  const timeLimitStr =
    durationMinutes >= 60
      ? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`
      : `${durationMinutes} Minutes`;

  const selectedValue =
    currentQuestion && selectedAnswers[currentQuestion.id] != null
      ? currentQuestion.options[selectedAnswers[currentQuestion.id]]?.value
      : undefined;

  return (
    <>
      <QuizStartModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        quizTitle={exam.title ?? "Quiz"}
        timeLimit={timeLimitStr}
        attemptsRemaining={1}
        instructions="Answer all questions before time runs out. The quiz will auto-submit when time expires."
        onBegin={handleBeginAssessment}
      />
      <div className="space-y-4">
        <QuizControls
          timeRemaining={formatTimeRemaining(secondsRemaining)}
          onSubmit={handleSubmit}
          isLocked={isLocked}
          isSubmitting={isSubmitting}
        />
        <Card>
          <CardContent className="flex flex-col gap-4">
            <QuestionDisplay
              topic={currentQuestion?.topic ?? ""}
              topicInfo={currentQuestion?.topicInfo}
              questionNumber={currentQuestionIndex + 1}
              instruction={currentQuestion?.instruction ?? ""}
              question={currentQuestion?.question ?? ""}
            />
            <AnswerOptions
              options={currentQuestion?.options ?? []}
              selectedAnswer={selectedValue}
              onSelect={(val) => {
                const idx = currentQuestion?.options.findIndex(
                  (o) => o.value === val
                );
                if (idx !== undefined && idx >= 0)
                  handleAnswerSelect(idx);
              }}
              disabled={isLocked}
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
