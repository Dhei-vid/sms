"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard-pages/admin/admissions/components/metric-card";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ActivityLogModal } from "@/components/dashboard-pages/admin/learning-management/component/activity-log-modal";

interface StaffActivity {
  id: string;
  fullName: string;
  staffId: string;
  department: string;
  lmsLogin: number;
  complianceRate: string;
  complianceStatus: string;
}

const staffActivities: StaffActivity[] = [
  {
    id: "1",
    fullName: "Mr. Chinedu Okafor",
    staffId: "okafor.T178023",
    department: "Arts & Crafts",
    lmsLogin: 5,
    complianceRate: "100%",
    complianceStatus: "On Time",
  },
  {
    id: "2",
    fullName: "Mrs. Helen Davies",
    staffId: "Davies.T178024",
    department: "Science",
    lmsLogin: 1,
    complianceRate: "50%",
    complianceStatus: "1 Week Late",
  },
  {
    id: "3",
    fullName: "Ms. Tolu Adebayo",
    staffId: "adebayo.T178025",
    department: "Mathematics",
    lmsLogin: 0,
    complianceRate: "100%",
    complianceStatus: "On Time",
  },
  {
    id: "4",
    fullName: "Mr. Biodun Eke",
    staffId: "eke.T178026",
    department: "Humanities",
    lmsLogin: 4,
    complianceRate: "100%",
    complianceStatus: "On Time",
  },
  {
    id: "5",
    fullName: "Mrs. Uche Nwachukwu",
    staffId: "nwachukwu.T178027",
    department: "Arts & Crafts",
    lmsLogin: 5,
    complianceRate: "100%",
    complianceStatus: "On Time",
  },
  {
    id: "6",
    fullName: "Mr. Sola Adeniyi",
    staffId: "adeniyi.m178023",
    department: "Science",
    lmsLogin: 1,
    complianceRate: "100%",
    complianceStatus: "On Time",
  },
  {
    id: "7",
    fullName: "Mrs. Rukky Yakubu",
    staffId: "yakubu.T178024",
    department: "Mathematics",
    lmsLogin: 0,
    complianceRate: "50%",
    complianceStatus: "1 Week Late",
  },
  {
    id: "8",
    fullName: "Ms. Funmilayo Bola",
    staffId: "bola.T178025",
    department: "Humanities",
    lmsLogin: 4,
    complianceRate: "100%",
    complianceStatus: "On Time",
  },
];

// const getComplianceColor = (status: string) => {
//   if (status === "On Time") {
//     return "text-green-600";
//   }
//   return "text-orange-600";
// };

export default function TeacherActivityPage() {
  const [activityLogModalOpen, setActivityLogModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffActivity | null>(
    null
  );

  const columns: TableColumn<StaffActivity>[] = [
    {
      key: "fullName",
      title: "Full Name + Staff ID",
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium">{value}</p>
          <p className="text-xs text-gray-500">({row.staffId})</p>
        </div>
      ),
    },
    {
      key: "department",
      title: "Department",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "lmsLogin",
      title: "LMS Login (Last 7 Days)",
      render: (value) => (
        <span className="text-sm">
          {value} {value === 1 ? "time" : "times"}
        </span>
      ),
    },
    {
      key: "complianceStatus",
      title: "Pending Content Submissions",
      render: (value, row) => (
        <span className={cn("text-sm font-medium")}>
          {value} ({row.complianceRate})
        </span>
      ),
    },
  ];

  const actions: TableAction<StaffActivity>[] = [
    {
      type: "button",
      config: {
        label: "View Activity Log",
        onClick: (row) => {
          setSelectedStaff(row);
          setActivityLogModalOpen(true);
        },
        variant: "link",
        className: "text-main-blue underline underline-offset-3 h-auto",
      },
    },
  ];

  const handleAddAdministrativeNote = (note: string) => {
    console.log("Add administrative note for", selectedStaff?.fullName, ":", note);
    // Handle add administrative note action - the modal already adds it to the table
  };

  const handleLoadMore = () => {
    console.log("Load more activities");
    // Handle load more activities
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-background rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Teacher Activity Audit & Compliance
        </h2>
        <p className="text-gray-600 mt-1">
          This screen allows to monitor the LMS usage, content submission, and
          engagement compliance of the entire teaching staff.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Lesson Plan Submission Rate"
          value="95%"
          subtitle="Percentage of teachers submitting on time"
          trend="up"
        />
        <MetricCard
          title="Average Content Uploads (Last 30 Days)"
          value="4.2 per Teacher"
          subtitle="Average uploads per teacher"
          trend="up"
        />
        <MetricCard
          title="Pending Content Review"
          value="5 Submissions"
          subtitle="Content awaiting review"
          trend="up"
        />
      </div>

      {/* Staff Audit Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Staff Audit Table
          </CardTitle>
          <p className="text-sm text-gray-600">
            The core tool for individual performance monitoring, sortable by
            compliance rate, department, or activity level.
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={staffActivities}
              actions={actions}
              emptyMessage="No staff activity data found."
              tableClassName="border-collapse"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log Modal */}
      <ActivityLogModal
        open={activityLogModalOpen}
        onOpenChange={setActivityLogModalOpen}
        staffName={selectedStaff?.fullName}
        onAddAdministrativeNote={handleAddAdministrativeNote}
        onLoadMore={handleLoadMore}
        hasMore={true}
      />
    </div>
  );
}
