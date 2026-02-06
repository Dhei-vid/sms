"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Label } from "./label";
import { Button } from "./button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Icon } from "../general/huge-icon";
import { Time04Icon } from "@hugeicons/core-free-icons";

interface ITimePicker {
  label: string;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  id?: string;
}

// Generate hours (1-12)
const hours = Array.from({ length: 12 }, (_, i) => i + 1);
// Generate minutes (00-59)
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0"),
);
const periods = ["AM", "PM"] as const;

// Parse time string to extract hour, minute, and period
const parseTime = (
  time: string,
): { hour: string; minute: string; period: "AM" | "PM" } => {
  const match = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (match) {
    // Remove leading zero from hour for matching with select values (1-12)
    const hourValue = parseInt(match[1], 10).toString();
    return {
      hour: hourValue,
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
  period: "AM" | "PM",
): string => {
  if (hour && minute && period) {
    return `${hour.padStart(2, "0")}:${minute} ${period}`;
  }
  return "";
};

export default function TimePicker({
  label,
  time,
  setTime,
  id = "time",
}: ITimePicker) {
  const [open, setOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

  // Parse time when it changes externally
  useEffect(() => {
    if (time) {
      const parsed = parseTime(time);
      setSelectedHour(parsed.hour);
      setSelectedMinute(parsed.minute);
      setSelectedPeriod(parsed.period);
    } else {
      setSelectedHour("");
      setSelectedMinute("");
      setSelectedPeriod("AM");
    }
  }, [time]);

  // Update parent time when selections change
  useEffect(() => {
    if (selectedHour && selectedMinute && selectedPeriod) {
      const formatted = formatTime(
        selectedHour,
        selectedMinute,
        selectedPeriod,
      );
      if (formatted !== time) {
        setTime(formatted);
      }
      // Auto-close when all values are selected
      setOpen(false);
    }
  }, [selectedHour, selectedMinute, selectedPeriod, setTime, time]);

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedHour("");
    setSelectedMinute("");
    setSelectedPeriod("AM");
    setTime("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayValue = time || "--:--";

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal",
              !time && "text-muted-foreground",
            )}
          >
            <span>{displayValue}</span>
            <Icon
              icon={Time04Icon}
              size={16}
              className={"text-muted-foreground"}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-4"
          align="start"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Select Time</span>
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-row flex-wrap gap-2">
            {/* Hours Dropdown */}
            <div className={"w-full flex flex-col gap-1"}>
              <label className={"text-xs text-gray-500 mb-1"}>Hour</label>
              <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="--">
                    {selectedHour ? selectedHour.padStart(2, "0") : "--"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Minutes Dropdown */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-gray-500 mb-1">Minute</label>
              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* AM/PM Dropdown */}
            <div className="w-full flex flex-col gap-1">
              <label className="text-xs text-gray-500 mb-1">Period</label>
              <Select
                value={selectedPeriod}
                onValueChange={(value) =>
                  setSelectedPeriod(value as "AM" | "PM")
                }
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue />
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

          {/* Clear Button */}
          {time && (
            <div className="mt-3 pt-3 border-t">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
