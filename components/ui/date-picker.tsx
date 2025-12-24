"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Icon } from "../general/huge-icon";
import { Calendar02Icon } from "@hugeicons/core-free-icons";
import { formatDate, isValidDate } from "@/common/helper";

import { Label } from "./label";
import { Input } from "./input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePicker {
  label: string;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  placeholder?: string;
}

export function DatePickerDropDown({ date, setDate, placeholder }: DatePicker) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

/**
 * Extended DatePicker interface with optional open state management
 * Used for date picker components that need controlled open/close state
 */
interface DatePickerIconProps extends DatePicker {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

/**
 * DatePickerIcon Component
 * A date picker input field with calendar icon trigger
 * Supports controlled open state and date selection
 * 
 * @param label - Label text for the date picker field
 * @param date - Selected date value (can be undefined)
 * @param setDate - Callback function to update the selected date
 * @param open - Optional controlled open state for the calendar popover
 * @param setOpen - Optional callback to control the popover open state
 * @param placeholder - Optional placeholder text for the input field
 */
export default function DatePickerIcon({
  label,
  date,
  setDate,
  open,
  setOpen,
  placeholder,
}: DatePickerIconProps) {
  const [value, setValue] = useState(formatDate(date));
  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder={placeholder ? placeholder : "June 01, 2025"}
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className={"absolute top-1/2 right-2 size-6 -translate-y-1/2"}
            >
              <Icon
                icon={Calendar02Icon}
                size={16}
                className={"text-muted-foreground"}
              />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align={"end"}
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date);
                setValue(formatDate(date));
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
