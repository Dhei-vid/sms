"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnswerOption {
  label: string;
  value: string;
}

interface AnswerOptionsProps {
  options: AnswerOption[];
  selectedAnswer?: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export function AnswerOptions({
  options,
  selectedAnswer,
  onSelect,
  disabled = false,
}: AnswerOptionsProps) {
  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => !disabled && onSelect(option.value)}
            disabled={disabled}
            className={cn(
              "border-2 rounded-md p-4 text-left transition-all",
              disabled && "opacity-60 cursor-not-allowed",
              !disabled && "hover:border-main-blue hover:bg-main-blue/5",
              selectedAnswer === option.value
                ? "border-main-blue bg-main-blue/10"
                : "border-gray-200",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">
                {option.label}:
              </span>
              <span className="text-gray-800">{option.value}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
