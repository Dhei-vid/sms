"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Generate hours (1-12)
const hours = Array.from({ length: 12 }, (_, i) => i + 1);
// Generate minutes (00-59)
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0"),
);
const periods = ["AM", "PM"] as const;

export interface TimeValue {
  hour: string;
  minute: string;
  period: "AM" | "PM";
}

interface TimeRangeInputProps {
  label: string;
  startTime: TimeValue;
  endTime: TimeValue;
  onStartTimeChange: (time: TimeValue) => void;
  onEndTimeChange: (time: TimeValue) => void;
}

export function TimeRangeInput({
  label,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeRangeInputProps) {
  const updateStartTime = (
    field: "hour" | "minute" | "period",
    value: string,
  ) => {
    onStartTimeChange({
      ...startTime,
      [field]: value,
    });
  };

  const updateEndTime = (
    field: "hour" | "minute" | "period",
    value: string,
  ) => {
    onEndTimeChange({
      ...endTime,
      [field]: value,
    });
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2 w-full">
        {/* Start Time */}
        <div className="flex-1 flex items-center gap-1">
          <Select
            value={startTime.hour}
            onValueChange={(value) => updateStartTime("hour", value)}
          >
            <SelectTrigger className="flex-1 h-10">
              <SelectValue>{startTime.hour.padStart(2, "0")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-gray-600">:</span>

          <Select
            value={startTime.minute}
            onValueChange={(value) => updateStartTime("minute", value)}
          >
            <SelectTrigger className="flex-1 h-10">
              <SelectValue>{startTime.minute}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={startTime.period}
            onValueChange={(value) =>
              updateStartTime("period", value as "AM" | "PM")
            }
          >
            <SelectTrigger className="flex-1 h-10">
              <SelectValue>{startTime.period}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <span className="text-gray-600 mx-2">-</span>

        {/* End Time */}
        <div className="flex-1 flex items-center gap-1">
          <Select
            value={endTime.hour}
            onValueChange={(value) => updateEndTime("hour", value)}
          >
            <SelectTrigger className="flex-1 h-10">
              <SelectValue>{endTime.hour.padStart(2, "0")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-gray-600">:</span>

          <Select
            value={endTime.minute}
            onValueChange={(value) => updateEndTime("minute", value)}
          >
            <SelectTrigger className="flex-1 h-10">
              <SelectValue>{endTime.minute}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={endTime.period}
            onValueChange={(value) =>
              updateEndTime("period", value as "AM" | "PM")
            }
          >
            <SelectTrigger className="flex-1 h-10">
              <SelectValue>{endTime.period}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
