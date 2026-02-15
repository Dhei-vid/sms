"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export interface UpcomingQuizData {
  id: string;
  title: string;
  subject?: string;
  schedule_date?: string | null;
  schedule_time?: string | null;
  duration?: number | null;
}

interface UpcomingQuizCardProps {
  quiz?: UpcomingQuizData | null;
  onAction?: () => void;
}

export function UpcomingQuizCard({ quiz, onAction }: UpcomingQuizCardProps) {
  const timeStr = quiz?.schedule_time
    ? (() => {
        const t = String(quiz.schedule_time);
        const parts = t.split(":");
        const h = parseInt(parts[0] ?? "0", 10);
        const m = parseInt(parts[1] ?? "0", 10);
        if (Number.isNaN(h) && Number.isNaN(m)) return null;
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return format(d, "h:mm a");
      })()
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Upcoming Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quiz ? (
          <>
            <div>
              <p className="text-sm text-gray-700 mb-1 font-medium">
                {quiz.title}
              </p>
              {quiz.subject && (
                <p className="text-xs text-gray-500">{quiz.subject}</p>
              )}
              {timeStr && (
                <p className="text-xs text-gray-500 mt-1">Time: {timeStr}</p>
              )}
              {quiz.duration && (
                <p className="text-xs text-gray-500">
                  Duration: {quiz.duration} min
                </p>
              )}
            </div>
            <Button onClick={onAction} variant="outline" className="w-full">
              Begin Assessment Now
            </Button>
          </>
        ) : (
          <p className="text-sm text-gray-500">No upcoming quiz</p>
        )}
      </CardContent>
    </Card>
  );
}
