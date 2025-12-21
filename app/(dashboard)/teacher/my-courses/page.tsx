"use client";

import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { QuickActionCard } from "@/components/dashboard-pages/admin/admissions/components/quick-action-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { useAppSelector } from "@/store/hooks";
import {
  TeacherCourse,
  useGetTeacherCoursesQuery,
} from "@/services/teacherCourses";
import {
  Upload02Icon,
  Edit01Icon,
  Folder02Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

const mockCourses: TeacherCourse[] = [
  {
    id: "1",
    subject: "Integrated Science",
    class: "JS 3",
    studentsEnrolled: 45,
    contentStatus: "8/10 Units Published",
  },
  {
    id: "2",
    subject: "Chemistry",
    class: "SS 2",
    studentsEnrolled: 45,
    contentStatus: "8/10 Units Published",
  },
  {
    id: "3",
    subject: "Arts & Crafts",
    class: "SS 1",
    studentsEnrolled: 45,
    contentStatus: "8/10 Units Published",
  },
  {
    id: "4",
    subject: "History",
    class: "JS 3",
    studentsEnrolled: 45,
    contentStatus: "8/10 Units Published",
  },
];

export default function MyCoursesPage() {
  const { data, isLoading, isError } = useGetTeacherCoursesQuery();
  const appError = useAppSelector((state) => state.error.lastError);

  const tableData = data ?? mockCourses;

  const columns: TableColumn<TeacherCourse>[] = [
    {
      key: "subject",
      title: "Subject",
      render: (value) => (
        <span className="font-medium text-gray-800">{value as string}</span>
      ),
    },
    {
      key: "class",
      title: "Class",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "studentsEnrolled",
      title: "Students Enrolled",
      render: (value) => (
        <span className="text-gray-700">{value as number}</span>
      ),
    },
    {
      key: "contentStatus",
      title: "Content Status",
      render: (value) => (
        <span className="text-gray-700">{value as string}</span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (value, row) => {
        return (
          <div className="flex items-center gap-3">
            <Link
              href={`/teacher/my-class?course=${row.id}`}
              className="text-main-blue hover:underline text-sm font-medium"
            >
              View Class Roster
            </Link>
            <Link
              href={`/teacher/my-courses/${row.id}`}
              className="text-main-blue hover:underline text-sm font-medium"
            >
              View Course
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {appError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {appError.message}
        </div>
      )}
      {/* Page Header */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          LMS: My Courses Dashboard
        </h1>
        <p className="text-gray-600">
          The teacher&apos;s central homepage for managing all their digital
          courses.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="My Active Courses"
          value="5 Courses"
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Pending Content Approval"
          value="3 Resources"
          trend="up"
          trendColor="text-main-blue"
        />
        <MetricCard
          title="Assessment Submissions"
          value="12"
          trend="up"
          trendColor="text-main-blue"
        />
      </div>

      {/* Quick Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuickActionCard
            title="Upload New Resource"
            description="A modal to upload a file (PDF, Video, PPT) and tag it to a specific course and unit."
            icon={Upload02Icon}
            onClick={() => console.log("Upload New Resource")}
            className="border-b"
          />
          <QuickActionCard
            title="Create New Assignment/Quiz"
            description="Create a new digital task and assign it."
            icon={Edit01Icon}
            onClick={() => console.log("Create New Assignment/Quiz")}
            className="border-b"
          />
          <QuickActionCard
            title="View My Content Library"
            description="Links to a personal repository of all files the teacher has uploaded, allowing reuse across different courses."
            icon={Folder02Icon}
            onClick={() => console.log("View My Content Library")}
            className="border-b"
          />
          <QuickActionCard
            title="View Assignment Submissions"
            description="This screen lists all student assignments and quizzes that require the teacher's attention."
            icon={Folder02Icon}
            onClick={() => console.log("View Assignment Submissions")}
          />
        </CardContent>
      </Card>

      {/* My Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            My Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={tableData}
              showActionsColumn={false}
              loading={isLoading}
              showEmptyMessage={!isLoading && (isError || tableData.length === 0)}
              emptyMessage={
                isError
                  ? "Unable to load courses at the moment."
                  : "No courses found."
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
