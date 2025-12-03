"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/general/huge-icon";

interface AttendanceFiltersProps {
  month: string;
  week: string;
  class: string;
  onMonthChange: (value: string) => void;
  onWeekChange: (value: string) => void;
  onClassChange: (value: string) => void;
}

export function AttendanceFilters({
  month,
  week,
  class: className,
  onMonthChange,
  onWeekChange,
  onClassChange,
}: AttendanceFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select value={month} onValueChange={onMonthChange}>
        <SelectTrigger className="w-[180px]">
          <Icon icon={Calendar03Icon} size={16} className="shrink-0" />
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="october-2025">October 2025</SelectItem>
          <SelectItem value="november-2025">November 2025</SelectItem>
          <SelectItem value="december-2025">December 2025</SelectItem>
        </SelectContent>
      </Select>

      <Select value={week} onValueChange={onWeekChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select week" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week-7-8">Academic Week 7-8</SelectItem>
          <SelectItem value="week-9-10">Academic Week 9-10</SelectItem>
          <SelectItem value="week-11-12">Academic Week 11-12</SelectItem>
        </SelectContent>
      </Select>

      <Select value={className} onValueChange={onClassChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="js1">JS 1</SelectItem>
          <SelectItem value="js2">JS 2</SelectItem>
          <SelectItem value="js3">JS 3</SelectItem>
          <SelectItem value="ss1">SS 1</SelectItem>
          <SelectItem value="ss2">SS 2</SelectItem>
          <SelectItem value="ss3">SS 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
