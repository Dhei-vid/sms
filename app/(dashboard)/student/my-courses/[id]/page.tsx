"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/general/huge-icon";
import {
  Search01Icon,
  ViewIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons";

interface Resource {
  name: string;
  type: "pdf" | "mp4";
}

interface CourseContent {
  unitTopic: string;
  topicLessonName: string;
  resources: Resource[];
  status: "In progress" | "Not Started" | "Nil";
}

const courseData: Record<
  string,
  { title: string; teacher: string; currentUnit: string; lastActivity: string }
> = {
  "1": {
    title: "JSS 2 Mathematics",
    teacher: "Mr. Femi T.",
    currentUnit: "Unit 10: Introduction to Geometry",
    lastActivity: "Viewed Video: Algebra Review (5 min ago)",
  },
};

const courseContents: CourseContent[] = [
  {
    unitTopic: "Unit 1: Algebra Fundamentals",
    topicLessonName:
      "Topic 1.1: Linear Equations\nTopic 1.2: Simultaneous Equations",
    resources: [
      { name: "Algebra Fundamental.pdf", type: "pdf" },
      { name: "Algebra Fundamental.pt 1.mp4", type: "mp4" },
      { name: "Algebra Fundamental.pt 2.mp4", type: "mp4" },
    ],
    status: "In progress",
  },
  {
    unitTopic: "Unit 2: Introduction to Geometry",
    topicLessonName:
      "Topic 2.1: Types of Shapes\nTopic 2.2: Perimeter and Area",
    resources: [
      { name: "Geometry Fundamental.pdf", type: "pdf" },
      { name: "Geometry Fundamental.mp4", type: "mp4" },
    ],
    status: "Not Started",
  },
  {
    unitTopic: "Unit 3: Statistics",
    topicLessonName: "Topic 3.1: Data Collection",
    resources: [],
    status: "Nil",
  },
  {
    unitTopic: "Unit 4: Financial Mathematics",
    topicLessonName: "Topic 4.1: Simple Interest",
    resources: [],
    status: "Nil",
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const course = courseData[id] || courseData["1"];

  const columns: TableColumn<CourseContent>[] = [
    {
      key: "unitTopic",
      title: "Unit Topics",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "topicLessonName",
      title: "Topic / Lesson Name",
      render: (value) => (
        <div className="text-sm text-gray-700 whitespace-pre-line">
          {value as string}
        </div>
      ),
    },
    {
      key: "resources",
      title: "Resources Available",
      render: (value, row) => {
        const resources = row.resources;
        if (resources.length === 0) {
          return (
            <span className="text-sm text-gray-400">No Resources Yet</span>
          );
        }
        return (
          <div className="space-y-2">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 text-sm text-gray-700"
              >
                <span>{resource.name}</span>
                <div className="flex items-center gap-1">
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="View"
                  >
                    <Icon icon={ViewIcon} size={16} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Download"
                  >
                    <Icon icon={Download01Icon} size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const status = value as string;
        const colorClass =
          status === "In progress"
            ? "text-blue-600"
            : status === "Not Started"
              ? "text-gray-600"
              : "text-gray-400";
        return <span className={`text-sm ${colorClass}`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Course Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {course.title}
        </h1>
        <div className="flex flex-wrap gap-3">
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-700">
              Assigned Teacher: {course.teacher}
            </span>
          </div>
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-700">
              Currently Teaching: {course.currentUnit}
            </span>
          </div>
          <div className="bg-gray-100 rounded-md px-4 py-2">
            <span className="text-sm text-gray-700">
              My last activity: {course.lastActivity}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard title="New Resources" value="3 New Resources" trend="up" />
        <MetricCard title="Latest Grade" value="92%" trend="up" />
      </div>

      {/* Course Outline and Resource Access */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Course Outline and Resource Access
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
                  placeholder="Text Input (e.g., Kinetic Energy Video)"
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Icon icon={Search01Icon} size={18} />
                Filter: All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={courseContents}
              showActionsColumn={false}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
