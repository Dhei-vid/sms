"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TimeRange {
  startHour: string;
  startMinute: string;
  startPeriod: "AM" | "PM";
  endHour: string;
  endMinute: string;
  endPeriod: "AM" | "PM";
}

interface BreaksSpecialPeriodsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: { title: string; timeRange: TimeRange }) => void;
}

// Generate hours (1-12)
const hours = Array.from({ length: 12 }, (_, i) => i + 1);
// Generate minutes (00-59)
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const periods = ["AM", "PM"] as const;

export function BreaksSpecialPeriodsModal({
  open,
  onOpenChange,
  onSubmit,
}: BreaksSpecialPeriodsModalProps) {
  const [title, setTitle] = useState("");
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startHour: "1",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "2",
    endMinute: "00",
    endPeriod: "AM",
  });

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when modal closes
      setTitle("");
      setTimeRange({
        startHour: "1",
        startMinute: "00",
        startPeriod: "AM",
        endHour: "2",
        endMinute: "00",
        endPeriod: "AM",
      });
    }
    onOpenChange(open);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, timeRange });
    }
    handleClose(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Breaks & Special Periods"
      size="2xl"
    >
      <div className="space-y-6 py-4">
          {/* Title Input */}
          <InputField
            label="Title"
            placeholder="E.g., Morning Assembly, Lunch Break"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Time Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Time Input</Label>
            <div className="flex items-center gap-2">
              {/* Start Time */}
              <div className="flex items-center gap-1">
                {/* Start Hour */}
                <Select
                  value={timeRange.startHour}
                  onValueChange={(value) =>
                    setTimeRange((prev) => ({ ...prev, startHour: value }))
                  }
                >
                  <SelectTrigger className="w-16 h-10">
                    <SelectValue>
                      {timeRange.startHour.padStart(2, "0")}
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

                <span className="text-gray-600">:</span>

                {/* Start Minute */}
                <Select
                  value={timeRange.startMinute}
                  onValueChange={(value) =>
                    setTimeRange((prev) => ({ ...prev, startMinute: value }))
                  }
                >
                  <SelectTrigger className="w-16 h-10">
                    <SelectValue>{timeRange.startMinute}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Start AM/PM */}
                <Select
                  value={timeRange.startPeriod}
                  onValueChange={(value) =>
                    setTimeRange((prev) => ({
                      ...prev,
                      startPeriod: value as "AM" | "PM",
                    }))
                  }
                >
                  <SelectTrigger className="w-16 h-10">
                    <SelectValue>{timeRange.startPeriod}</SelectValue>
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

              {/* Separator */}
              <span className="text-gray-600 mx-2">-</span>

              {/* End Time */}
              <div className="flex items-center gap-1">
                {/* End Hour */}
                <Select
                  value={timeRange.endHour}
                  onValueChange={(value) =>
                    setTimeRange((prev) => ({ ...prev, endHour: value }))
                  }
                >
                  <SelectTrigger className="w-16 h-10">
                    <SelectValue>
                      {timeRange.endHour.padStart(2, "0")}
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

                <span className="text-gray-600">:</span>

                {/* End Minute */}
                <Select
                  value={timeRange.endMinute}
                  onValueChange={(value) =>
                    setTimeRange((prev) => ({ ...prev, endMinute: value }))
                  }
                >
                  <SelectTrigger className="w-16 h-10">
                    <SelectValue>{timeRange.endMinute}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* End AM/PM */}
                <Select
                  value={timeRange.endPeriod}
                  onValueChange={(value) =>
                    setTimeRange((prev) => ({
                      ...prev,
                      endPeriod: value as "AM" | "PM",
                    }))
                  }
                >
                  <SelectTrigger className="w-16 h-10">
                    <SelectValue>{timeRange.endPeriod}</SelectValue>
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

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Break/Period</Button>
          </div>
        </div>
    </ModalContainer>
  );
}

