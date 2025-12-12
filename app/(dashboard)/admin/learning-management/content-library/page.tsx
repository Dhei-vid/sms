"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  resourceName: string;
  fileType: string;
  courseLocation: string;
  submittedBy: string;
  status: "pending-approval" | "approved" | "sent-back";
}

const resources: Resource[] = [
  {
    id: "1",
    resourceName: "Energy_Equations_Video.mp4",
    fileType: "Video",
    courseLocation: "SS2 Physics / Unit 4",
    submittedBy: "Mr. Femi T.",
    status: "pending-approval",
  },
  {
    id: "2",
    resourceName: "Nigeria-Textiles-Lecture.pdf",
    fileType: "PDF",
    courseLocation: "JSS 3 Arts & Crafts",
    submittedBy: "Ms. Zara A.",
    status: "approved",
  },
  {
    id: "3",
    resourceName: "Old_Curriculum_PPT.ppt",
    fileType: "PPT",
    courseLocation: "Archived Files",
    submittedBy: "Admin",
    status: "approved",
  },
  {
    id: "4",
    resourceName: "Chemical-Bonds-Quiz.quiz",
    fileType: "Quiz",
    courseLocation: "SS3 Chemistry",
    submittedBy: "Ms. Zara A.",
    status: "sent-back",
  },
  {
    id: "5",
    resourceName: "Energy_Equations_Video.mp4",
    fileType: "Video",
    courseLocation: "SS2 Physics / Unit 4",
    submittedBy: "Mr. Femi T.",
    status: "pending-approval",
  },
  {
    id: "6",
    resourceName: "Nigeria-Textiles-Lecture.pdf",
    fileType: "PDF",
    courseLocation: "JSS 3 Arts & Crafts",
    submittedBy: "Ms. Zara A.",
    status: "approved",
  },
  {
    id: "7",
    resourceName: "Chemical-Bonds-Quiz.quiz",
    fileType: "Quiz",
    courseLocation: "SS3 Chemistry",
    submittedBy: "Ms. Zara A.",
    status: "sent-back",
  },
];

const getStatusColor = (status: Resource["status"]) => {
  switch (status) {
    case "pending-approval":
      return "text-orange-600";
    case "approved":
      return "text-green-600";
    case "sent-back":
      return "text-main-blue";
    default:
      return "text-gray-600";
  }
};

const getStatusLabel = (status: Resource["status"]) => {
  switch (status) {
    case "pending-approval":
      return "Pending Approval";
    case "approved":
      return "Approved";
    case "sent-back":
      return "Sent Back for Revision";
    default:
      return status;
  }
};

export default function ContentLibraryPage() {
  const columns: TableColumn<Resource>[] = [
    {
      key: "resourceName",
      title: "Resource Name",
      className: "font-medium",
    },
    {
      key: "fileType",
      title: "File Type",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "courseLocation",
      title: "Course Location",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "submittedBy",
      title: "Submitted By",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => (
        <span className={cn("text-sm font-medium", getStatusColor(row.status))}>
          {getStatusLabel(row.status)}
        </span>
      ),
    },
  ];

  const actions: TableAction<Resource>[] = [
    {
      type: "button",
      config: {
        label: "Review Content",
        onClick: (row) => {
          console.log("Review content for", row.resourceName);
          // Handle review content action
        },
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Content Library & Repository
        </h2>
        <p className="text-gray-600 mt-1">
          This screen serves as the single administrative hub for viewing all
          digital resources and managing their quality.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Files Stored"
          value="8,540 Resources"
          subtitle="Total digital resources in the library"
          trend="up"
        />
        <MetricCard
          title="Total Storage Used"
          value="1.2 TB / 5 TB"
          subtitle="Storage capacity utilization"
          trend="up"
        />
        <MetricCard
          title="Files Pending Review"
          value="35 Resources"
          subtitle="Resources awaiting administrative review"
          trend="up"
        />
      </div>

      {/* Resource Management Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Resource Management Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={resources}
              actions={actions}
              emptyMessage="No resources found."
              tableClassName="border-collapse"
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
