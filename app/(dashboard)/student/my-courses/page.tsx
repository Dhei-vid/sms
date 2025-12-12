"use client";

import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import { CourseCard } from "@/components/dashboard-pages/student/my-courses/course-card";

interface Course {
  courseCode: string;
  courseName: string;
  teacher: string;
  currentUnit: string;
  latestActivity: string;
}

const courses: Course[] = [
  {
    courseCode: "CD-JS-01",
    courseName: "Mathematics",
    teacher: "Mr. Femi T.",
    currentUnit: "Unit 4: Algebra",
    latestActivity: "Algebra Unit Review Video",
  },
  {
    courseCode: "CD-JS-02",
    courseName: "English Language",
    teacher: "Ms. Sarah D.",
    currentUnit: "Unit 4: Words & Synonyms",
    latestActivity: "Word Mapping Study",
  },
  {
    courseCode: "CD-JS-03",
    courseName: "Arts & Culture",
    teacher: "Ms. Zara",
    currentUnit: "Unit 6: Atire",
    latestActivity: "Algebra Unit Review Video",
  },
  {
    courseCode: "CD-JS-01",
    courseName: "Integrated Science",
    teacher: "Mr. Femi T.",
    currentUnit: "Unit 4: Algebra",
    latestActivity: "Algebra Unit Review Video",
  },
  {
    courseCode: "CD-JS-02",
    courseName: "Information Computer Technology",
    teacher: "Ms. Sarah D.",
    currentUnit: "Unit 4: Words & Synonyms",
    latestActivity: "Word Mapping Study",
  },
  {
    courseCode: "CD-JS-04",
    courseName: "History",
    teacher: "Mr. Femi T.",
    currentUnit: "Unit 4: Algebra (4/10 Units)",
    latestActivity: "Algebra Unit Review Video",
  },
];

export default function MyCoursesPage() {
  return (
    <div className="space-y-4">
      {/* Page Title and Description */}
      <div className="bg-background rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Courses</h1>
        <p className="text-gray-600">
          This screen displays all courses the student is currently enrolled in,
          providing direct access to lesson content, resources, and progress
          tracking.
        </p>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Enrolled Courses"
          value="9 Subjects"
          trend="up"
        />
        <MetricCard
          title="Average Course Progress"
          value="65% Complete"
          trend="up"
        />
        <MetricCard
          title="Total New Resources"
          value="12 New Resources"
          trend="up"
        />
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <CourseCard
            key={`${course.courseCode}-${index}`}
            courseCode={course.courseCode}
            courseName={course.courseName}
            teacher={course.teacher}
            currentUnit={course.currentUnit}
            latestActivity={course.latestActivity}
            courseId={String(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}
