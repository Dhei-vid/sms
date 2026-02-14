"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Search01Icon, FilterIcon } from "@hugeicons/core-free-icons";
import { useGetAssignmentsQuery } from "@/services/shared";
import { useGetGradesQuery } from "@/services/shared";
import { format, isPast, parseISO } from "date-fns";
import type { Assignment } from "@/services/assignments/assignments-type";

export default function AdminStudentAssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all assignments (no studentId = all, or backend may require filter)
  const { data: assignmentsData, isLoading: assignmentsLoading } =
    useGetAssignmentsQuery(undefined, {
      skip: false,
    });

  // Grades are per-student; we don't have a single student here. Omit or fetch per assignment later.
  const assignments = useMemo(() => {
    const list = assignmentsData?.data ?? [];
    return list
      .map((assignment) => {
        const isDueDatePassed = assignment.dueDate
          ? isPast(parseISO(assignment.dueDate))
          : false;
        const status = isDueDatePassed ? "Overdue" : "Pending";
        return {
          ...assignment,
          assignmentName: assignment.title ?? "Untitled",
          subject: assignment.courseName ?? "N/A",
          totalMarks: assignment.maxScore
            ? `${assignment.maxScore} Marks`
            : "N/A",
          dueDateTime: assignment.dueDate
            ? format(parseISO(assignment.dueDate), "MMM d, yyyy; h:mm a")
            : "N/A",
          status,
        };
      })
      .filter((assignment) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          (assignment.title ?? "").toLowerCase().includes(q)
        );
      });
  }, [assignmentsData, searchQuery]);

  const dueTodayCount = useMemo(
    () =>
      assignments.filter((a) => {
        if (!a.dueDate) return false;
        const due = parseISO(a.dueDate);
        const today = new Date();
        return (
          due.getDate() === today.getDate() &&
          due.getMonth() === today.getMonth() &&
          due.getFullYear() === today.getFullYear()
        );
      }).length,
    [assignments],
  );

  const dueTomorrowCount = useMemo(
    () =>
      assignments.filter((a) => {
        if (!a.dueDate) return false;
        const due = parseISO(a.dueDate);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return (
          due.getDate() === tomorrow.getDate() &&
          due.getMonth() === tomorrow.getMonth() &&
          due.getFullYear() === tomorrow.getFullYear()
        );
      }).length,
    [assignments],
  );

  const columns: TableColumn<
    Assignment & {
      assignmentName: string;
      subject: string;
      totalMarks: string;
      dueDateTime: string;
      status: string;
    }
  >[] = [
    {
      key: "assignmentName",
      title: "Assignment Name",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "subject",
      title: "Subject",
    },
    {
      key: "totalMarks",
      title: "Total Marks",
    },
    {
      key: "dueDateTime",
      title: "Due Date/Time",
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as string;
        const isOverdue = status === "Overdue";
        return (
          <span
            className={`text-sm ${isOverdue ? "text-red-600" : "text-orange-600"}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Student Assignments & Quizzes
        </h2>
        <p className="text-gray-600 mt-1">
          View and monitor assignments and quizzes across students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Due Today"
          value={dueTodayCount.toString()}
          trend="up"
        />
        <MetricCard
          title="Due Tomorrow"
          value={dueTomorrowCount.toString()}
          trend="up"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Assignments & Quizzes
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Icon
                  icon={Search01Icon}
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="search"
                  placeholder="Search (e.g., Physics, Essay)"
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2" type="button">
                <Icon icon={FilterIcon} size={18} />
                Filter: All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            {assignmentsLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading assignments...
              </div>
            ) : assignments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No assignments found
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={[]
                }
                showActionsColumn={false}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
