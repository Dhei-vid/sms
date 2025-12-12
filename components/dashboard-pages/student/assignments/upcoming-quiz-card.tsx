"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UpcomingQuizCardProps {
  quizName?: string;
  time?: string;
  onAction?: () => void;
}

export function UpcomingQuizCard({
  quizName = "Algebra Review Quiz",
  time = "Time: 2:00 PM",
  onAction,
}: UpcomingQuizCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Upcoming Quiz Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-700 mb-1">{quizName}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <Button onClick={onAction} variant="outline" className="w-full">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
