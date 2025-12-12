"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Label } from "./label";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

interface TimeInputProps {
  label?: string;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  id?: string;
  className?: string;
}

const periods = ["AM", "PM"] as const;

// Parse time string to extract hour, minute, and period
const parseTime = (
  time: string
): { hour: string; minute: string; period: "AM" | "PM" } => {
  const match = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (match) {
    return {
      hour: match[1].padStart(2, "0"),
      minute: match[2],
      period: match[3].toUpperCase() as "AM" | "PM",
    };
  }
  return { hour: "", minute: "", period: "AM" };
};

// Format time string
const formatTime = (
  hour: string,
  minute: string,
  period: "AM" | "PM"
): string => {
  if (hour && minute && period) {
    // Ensure hour is 2 digits and minute is 2 digits
    const formattedHour = hour.padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");
    return `${formattedHour}:${formattedMinute} ${period}`;
  }
  return "";
};

export function TimeInput({
  label,
  time,
  setTime,
  id = "time",
  className,
}: TimeInputProps) {
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

  // Parse time when it changes externally
  useEffect(() => {
    if (time) {
      const parsed = parseTime(time);
      setHour(parsed.hour);
      setMinute(parsed.minute);
      setSelectedPeriod(parsed.period);
    } else {
      setHour("");
      setMinute("");
      setSelectedPeriod("AM");
    }
  }, [time]);

  // Update parent time when selections change
  useEffect(() => {
    if (hour && minute && selectedPeriod) {
      const formatted = formatTime(hour, minute, selectedPeriod);
      if (formatted !== time) {
        setTime(formatted);
      }
    }
  }, [hour, minute, selectedPeriod, setTime, time]);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 2 digits, max 12
    if (value === "" || (/^\d{1,2}$/.test(value) && parseInt(value) <= 12 && parseInt(value) >= 1)) {
      setHour(value);
    }
  };

  const handleHourBlur = () => {
    // Pad with zero when user leaves the field
    if (hour && hour.length === 1) {
      setHour(hour.padStart(2, "0"));
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 2 digits, max 59
    if (value === "" || (/^\d{1,2}$/.test(value) && parseInt(value) <= 59)) {
      setMinute(value);
    }
  };

  const handleMinuteBlur = () => {
    // Pad with zero when user leaves the field
    if (minute && minute.length === 1) {
      setMinute(minute.padStart(2, "0"));
    } else if (minute === "") {
      setMinute("00");
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex items-center gap-1 w-full">
        {/* Hour Input */}
        <Input
          type="text"
          inputMode="numeric"
          value={hour ? hour.padStart(2, "0") : ""}
          onChange={handleHourChange}
          onBlur={handleHourBlur}
          placeholder="01"
          className="h-10 flex-1 text-center"
          maxLength={2}
        />

        {/* Separator */}
        <span className="text-gray-600 text-lg font-medium">:</span>

        {/* Minute Input */}
        <Input
          type="text"
          inputMode="numeric"
          value={minute ? minute.padStart(2, "0") : ""}
          onChange={handleMinuteChange}
          onBlur={handleMinuteBlur}
          placeholder="00"
          className="h-10 flex-1 text-center"
          maxLength={2}
        />

        {/* AM/PM Select */}
        <Select
          value={selectedPeriod}
          onValueChange={(value) => setSelectedPeriod(value as "AM" | "PM")}
        >
          <SelectTrigger className="h-10 flex-1">
            <SelectValue>{selectedPeriod}</SelectValue>
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
  );
}

