"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";

interface ExamSchedule {
  id: string;
  dateTime: string;
  examName: string;
  location: string;
  invigilatorsAssigned: string;
}

const examSchedules: ExamSchedule[] = [
  {
    id: "1",
    dateTime: "Nov. 15, 2025 (9:00 AM - 11:00 AM)",
    examName: "SS2 Chemistry Exam",
    location: "Hall A",
    invigilatorsAssigned: "Nil",
  },
  {
    id: "2",
    dateTime: "Nov. 15, 2025 (9:00 AM - 11:00 AM)",
    examName: "JS 3 Information Technology Exam",
    location: "Hall B",
    invigilatorsAssigned: "Mr. Uche E.",
  },
  {
    id: "3",
    dateTime: "Nov. 15, 2025 (9:00 AM - 11:00 AM)",
    examName: "JS 1 Information Technology Exam",
    location: "Hall A",
    invigilatorsAssigned: "Ms. Zara A.",
  },
  {
    id: "4",
    dateTime: "Nov. 15, 2025 (9:00 AM - 11:00 AM)",
    examName: "SS 1 Chemistry Exam",
    location: "Hall C",
    invigilatorsAssigned: "Mrs. Kemi O.",
  },
  {
    id: "5",
    dateTime: "Nov. 15, 2025 (9:00 AM - 11:00 AM)",
    examName: "JS 3 Quantitative Reasoning",
    location: "Hall B",
    invigilatorsAssigned: "Dr. Femi I.",
  },
];

const dateFilterOptions = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
  { value: "all", label: "All" },
];

const sectionFilterOptions = [
  { value: "all", label: "All sections" },
  { value: "primary", label: "Primary" },
  { value: "jss", label: "JSS" },
  { value: "sss", label: "SSS" },
];

export default function CurrentExamSchedulePage() {
  const [dateFilter, setDateFilter] = useState("today");
  const [sectionFilter, setSectionFilter] = useState("all");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Current Exam Schedule
        </h2>
        <p className="text-gray-600 mt-1">
          An immediate, consolidated view of all upcoming assessment activities,
          prioritized by date.
        </p>
      </div>

      {/* Current Term Examination Schedule Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Current Term Examination Schedule
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="w-32">
                <SelectField
                  label=""
                  value={dateFilter}
                  onValueChange={setDateFilter}
                  placeholder="Today"
                >
                  {dateFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
              <div className="w-32">
                <SelectField
                  label=""
                  value={sectionFilter}
                  onValueChange={setSectionFilter}
                  placeholder="All sections"
                >
                  {sectionFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectField>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-main-blue/5">
                  <TableHead className="px-4 py-3">Date & Time</TableHead>
                  <TableHead className="px-4 py-3">Exam Name</TableHead>
                  <TableHead className="px-4 py-3">Location</TableHead>
                  <TableHead className="px-4 py-3">
                    Invigilators Assigned
                  </TableHead>
                  <TableHead className="px-4 py-3">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examSchedules.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-gray-500"
                    >
                      No exam schedules found
                    </TableCell>
                  </TableRow>
                ) : (
                  examSchedules.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="px-4 py-3 text-sm text-gray-600">
                        {exam.dateTime}
                      </TableCell>
                      <TableCell className="px-4 py-3 font-medium">
                        {exam.examName}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-600">
                        {exam.location}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-600">
                        {exam.invigilatorsAssigned}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Button
                          variant="link"
                          className="text-main-blue p-0 h-auto"
                          onClick={() => {
                            // Handle assign invigilator
                            console.log("Assign invigilator for", exam.id);
                          }}
                        >
                          Assign Invigilator
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center pt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

