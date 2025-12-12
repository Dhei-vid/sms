"use client";

interface QuestionDisplayProps {
  topic: string;
  topicInfo?: string;
  questionNumber: number;
  instruction: string;
  question: string;
}

export function QuestionDisplay({
  topic,
  topicInfo = "Any information or instruction the teacher wishes to pass under the given topic.",
  questionNumber,
  instruction,
  question,
}: QuestionDisplayProps) {
  return (
    <div className="bg-white space-y-6 p-4">
      {/* Topic Section */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Topic: {topic}</h2>
        <p className="text-sm text-gray-600">{topicInfo}</p>
      </div>

      {/* Question Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Question {questionNumber}
        </h3>
        <p className="text-gray-700">{instruction}</p>
        <p className="text-2xl font-bold text-gray-800">{question}</p>
      </div>
    </div>
  );
}
