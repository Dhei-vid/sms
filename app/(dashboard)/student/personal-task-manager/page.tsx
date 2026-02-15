"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { PersonalTaskList } from "@/components/dashboard-pages/student/dashboard/personal-task-list";
import { TaskCreationModal } from "@/components/dashboard-pages/student/dashboard/task-creation-modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Add01Icon } from "@hugeicons/core-free-icons";
import {
  useGetPersonalTasksQuery,
  useCreatePersonalTaskMutation,
} from "@/services/personal-tasks/personal-tasks";
import type { PersonalTaskType } from "@/services/personal-tasks/personal-tasks-type";
import { toast } from "sonner";
import { useMemo } from "react";

export default function PersonalTaskManagerPage() {
  const user = useAppSelector(selectUser);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: tasksData } = useGetPersonalTasksQuery(undefined);
  const [createTask, { isLoading: isCreating }] = useCreatePersonalTaskMutation();

  const tasks = tasksData?.data ?? [];

  const metrics = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const dueToday = tasks.filter(
      (t) => t.deadline && t.deadline.split("T")[0] === today
    ).length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const total = tasks.length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { dueToday, rate };
  }, [tasks]);

  const handleCreateTask = async (data: {
    task_name: string;
    task_type: PersonalTaskType;
    deadline: string | null;
  }) => {
    if (!user?.id) {
      toast.error("You must be logged in to create tasks");
      return;
    }
    try {
      await createTask({
        user_id: user.id,
        task_name: data.task_name,
        task_type: data.task_type,
        deadline: data.deadline,
      }).unwrap();
      toast.success("Task created successfully");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : "Failed to create task";
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Personal Task Manager
        </h1>
        <p className="text-gray-600">
          This feature allows students to create and track non-academic or
          self-assigned study tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Tasks Due Today"
          value={`${metrics.dueToday} ${metrics.dueToday === 1 ? "Task" : "Tasks"}`}
          trend="up"
        />
        <MetricCard
          title="Completion Rate (Last 7 Days)"
          value={`${metrics.rate}% Success`}
          trend="up"
        />
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="w-full h-11 gap-2"
          onClick={() => setModalOpen(true)}
        >
          <Icon icon={Add01Icon} size={20} />
          Create New Personal Task
        </Button>
      </div>

      <PersonalTaskList />

      <TaskCreationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleCreateTask}
        isLoading={isCreating}
      />
    </div>
  );
}
