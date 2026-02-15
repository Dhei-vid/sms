"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  useGetPersonalTasksQuery,
  useUpdatePersonalTaskMutation,
} from "@/services/personal-tasks/personal-tasks";
import type { PersonalTask } from "@/services/personal-tasks/personal-tasks-type";
import { toast } from "sonner";

interface PersonalTaskListProps {
  studentId?: string;
}

export function PersonalTaskList({ studentId }: PersonalTaskListProps) {
  const { data, isLoading, isError } = useGetPersonalTasksQuery(
    studentId ? { user_id: studentId } : undefined
  );

  const [updateTask] = useUpdatePersonalTaskMutation();

  const tasks = useMemo(() => {
    const list = data?.data ?? [];
    return list.map((t: PersonalTask) => ({
      id: t.id,
      taskName: t.task_name,
      taskType: t.task_type.charAt(0).toUpperCase() + t.task_type.slice(1),
      deadline: t.deadline ? format(new Date(t.deadline), "LLL. d, yyyy") : "—",
      status: t.status === "completed" ? "Completed" : "Pending",
      _raw: t,
    }));
  }, [data?.data]);

  const handleMarkCompleted = async (row: { _raw: PersonalTask }) => {
    try {
      await updateTask({
        id: row._raw.id,
        data: { status: "completed" },
      }).unwrap();
      toast.success("Task marked as completed");
    } catch {
      toast.error("Failed to update task");
    }
  };

  const columns: TableColumn<{ id: string; taskName: string; taskType: string; deadline: string; status: string; _raw: PersonalTask }>[] = [
    {
      key: "taskName",
      title: "Task Name",
      render: (value) => <span className="font-medium">{value as string}</span>,
    },
    { key: "taskType", title: "Task Type" },
    { key: "deadline", title: "Deadline" },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as string;
        return (
          <span
            className={
              status === "Pending" ? "text-orange-600" : "text-green-600"
            }
          >
            {status}
          </span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (_value, row) => {
        if (row.status === "Pending") {
          return (
            <Button
              variant="link"
              className="h-auto p-0 text-main-blue"
              onClick={() => handleMarkCompleted(row)}
            >
              Mark Completed
            </Button>
          );
        }
        return <span className="text-gray-400">—</span>;
      },
    },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            My Personal Task List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground text-sm">
            Loading tasks…
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            My Personal Task List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-destructive text-sm">
            Failed to load tasks. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          My Personal Task List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <DataTable
            columns={columns}
            data={tasks}
            showActionsColumn={false}
            emptyMessage="No personal tasks yet. Create one to get started."
          />
        </div>
      </CardContent>
    </Card>
  );
}
