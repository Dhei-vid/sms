"use client";

import { useMemo, useState } from "react";
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
import { useGetExamSchedulesQuery } from "@/services/schedules/schedules";
import type { ScheduleEvent } from "@/services/schedules/schedule-types";
import { format } from "date-fns";
import { AssignInvigilatorModal } from "@/components/dashboard-pages/admin/academic/components/assign-invigilator-modal";

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

function getDateRange(filter: string): { dateFrom: string; dateTo: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let dateTo = new Date(today);
  if (filter === "today") {
    dateTo.setDate(dateTo.getDate() + 1);
  } else if (filter === "this-week") {
    dateTo.setDate(dateTo.getDate() + 7);
  } else if (filter === "this-month") {
    dateTo.setMonth(dateTo.getMonth() + 1);
  } else {
    dateTo.setFullYear(dateTo.getFullYear() + 2);
  }
  return {
    dateFrom: format(today, "yyyy-MM-dd"),
    dateTo: format(dateTo, "yyyy-MM-dd"),
  };
}

export default function CurrentExamSchedulePage() {
  const [dateFilter, setDateFilter] = useState("today");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleEvent | null>(null);

  const { dateFrom, dateTo } = getDateRange(dateFilter);
  const { data: schedulesResponse, isLoading } = useGetExamSchedulesQuery({
    dateFrom,
    dateTo,
  });

  const rawSchedules = schedulesResponse?.data ?? [];
  const examSchedules = useMemo(() => {
    const list = rawSchedules;
    return list
      .filter((s: ScheduleEvent) => {
        if (sectionFilter === "all") return true;
        const title = (s.title || "").toLowerCase();
        if (sectionFilter === "primary") return title.includes("primary") || /p[1-6]/i.test(title);
        if (sectionFilter === "jss") return /js[s]?|jss/i.test(title);
        if (sectionFilter === "sss") return /ss[s]?|sss/i.test(title);
        return true;
      })
      .map((s: ScheduleEvent) => {
        const inv = s.invigilator as { user?: { first_name?: string; last_name?: string } } | null | undefined;
        const invName = inv?.user ? `${inv.user.first_name ?? ""} ${inv.user.last_name ?? ""}`.trim() || "Unassigned" : "Unassigned";
        return {
          id: s.id,
          dateTime: s.date
            ? format(new Date(s.date), "MMM dd, yyyy") +
              (s.start_time ? ` (${String(s.start_time).slice(0, 5)} - ${s.end_time ? String(s.end_time).slice(0, 5) : "—"})` : "")
            : "—",
          examName: s.title || s.description || "Exam",
          location: s.location || "—",
          invigilatorsAssigned: invName,
        schedule: s,
      };
      });
  }, [rawSchedules, sectionFilter]);

  const openAssignModal = (schedule: ScheduleEvent) => {
    setSelectedSchedule(schedule);
    setAssignModalOpen(true);
  };

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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : examSchedules.length === 0 ? (
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
                          onClick={() => openAssignModal(exam.schedule)}
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

      <AssignInvigilatorModal
        open={assignModalOpen}
        onOpenChange={setAssignModalOpen}
        schedule={selectedSchedule}
      />
    </div>
  );
}
