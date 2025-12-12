"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

interface Task {
  taskName: string;
  taskType: string;
  deadline: string;
  status: "Pending" | "Completed";
}

interface PersonalTaskListProps {
  tasks?: Task[];
}

const defaultTasks: Task[] = [
  {
    taskName: "Review Biology Notes (Unit 3)",
    taskType: "Study",
    deadline: "Nov. 13, 2025",
    status: "Pending",
  },
  {
    taskName: "Write up Chemistry Lab Report",
    taskType: "Study",
    deadline: "Nov. 13, 2025",
    status: "Pending",
  },
  {
    taskName: "Finish Reading Novel",
    taskType: "Personal",
    deadline: "Nov. 13, 2025",
    status: "Completed",
  },
];

export function PersonalTaskList({
  tasks = defaultTasks,
}: PersonalTaskListProps) {
  const columns: TableColumn<Task>[] = [
    {
      key: "taskName",
      title: "Task Name",
      render: (value) => <span className="font-medium">{value as string}</span>,
    },
    {
      key: "taskType",
      title: "Task Type",
    },
    {
      key: "deadline",
      title: "Deadline",
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as "Pending" | "Completed";
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
      render: (value, row) => {
        if (row.status === "Pending") {
          return (
            <Button
              variant="link"
              className="h-auto p-0 text-main-blue"
              onClick={() => {
                // Handle mark completed action
                console.log("Mark completed for:", row.taskName);
              }}
            >
              Mark Completed
            </Button>
          );
        }
        return <span className="text-gray-400">---</span>;
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          My Personal Task List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <DataTable columns={columns} data={tasks} showActionsColumn={false} />
        </div>
      </CardContent>
    </Card>
  );
}
