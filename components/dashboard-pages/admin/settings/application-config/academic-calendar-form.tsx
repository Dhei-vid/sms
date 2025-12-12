"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import DatePickerIcon from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

export function AcademicCalendarForm() {
  const [academicYearName, setAcademicYearName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [numberOfTerms, setNumberOfTerms] = useState("");
  const [holidayDate, setHolidayDate] = useState<Date | undefined>(undefined);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [holidayDateOpen, setHolidayDateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Academic Calendar Configuration
        </h3>
      </div>

      <div className="space-y-6">
        <InputField
          label="Academic Year Name"
          value={academicYearName}
          onChange={(e) => setAcademicYearName(e.target.value)}
          placeholder="placeholder"
        />

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-800">
            School Year Date
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePickerIcon
              label="Start Date"
              date={startDate}
              setDate={(date) => {
                setStartDate(
                  typeof date === "function" ? date(startDate) : date
                );
              }}
              open={startDateOpen}
              setOpen={setStartDateOpen}
              placeholder="mm/dd/yy"
            />
            <DatePickerIcon
              label="End Date"
              date={endDate}
              setDate={(date) => {
                setEndDate(typeof date === "function" ? date(endDate) : date);
              }}
              open={endDateOpen}
              setOpen={setEndDateOpen}
              placeholder="mm/dd/yy"
            />
          </div>
        </div>

        <InputField
          label="Number of Terms/Semesters"
          type="number"
          value={numberOfTerms}
          onChange={(e) => setNumberOfTerms(e.target.value)}
          placeholder="Placeholder"
        />

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-800">
            Define Holidays
          </h4>
          <div className="flex gap-4">
            <div className="flex-1">
              <DatePickerIcon
                label=""
                date={holidayDate}
                setDate={(date) => {
                  setHolidayDate(
                    typeof date === "function" ? date(holidayDate) : date
                  );
                }}
                open={holidayDateOpen}
                setOpen={setHolidayDateOpen}
                placeholder="mm/dd/yy"
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline">Add Holiday/Break</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

