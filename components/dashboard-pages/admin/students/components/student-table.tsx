"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DataTable,
  TableColumn,
  TableAction,
} from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";
import {
  ElearningExchangeIcon,
  PencilEdit02Icon,
  UserStatusIcon,
  LockPasswordIcon,
  ViewIcon,
  Csv02Icon,
  PrinterIcon,
  FilterIcon,
} from "@hugeicons/core-free-icons";

interface Student {
  id: string;
  name: string;
  schoolId: string;
  grade: string;
  attendance: string;
  academicAvg: string;
  outstandingFees: string | number;
  status: "active" | "on-leave" | "suspended" | "graduated" | "withdrawn";
  latestActivity: string;
}

const students: Student[] = [
  {
    id: "1",
    name: "Chinedu Nwokodi",
    schoolId: "nwokodi.m178023",
    grade: "JS 2",
    attendance: "92%",
    academicAvg: "B+",
    outstandingFees: "₦45,000",
    status: "active",
    latestActivity: "Appointed class captain",
  },
  {
    id: "2",
    name: "Adebisi Deborah",
    schoolId: "adebisi.m178024",
    grade: "JS 1",
    attendance: "100%",
    academicAvg: "B-",
    outstandingFees: "Nil",
    status: "active",
    latestActivity: "Became a member of the debate team",
  },
  {
    id: "3",
    name: "Dauda Ahfiz",
    schoolId: "ahfiz.m178025",
    grade: "SS 1",
    attendance: "98%",
    academicAvg: "A+",
    outstandingFees: "Nil",
    status: "on-leave",
    latestActivity: "Editor-in-Chief of the Yearbook",
  },
  {
    id: "4",
    name: "Sarah Collins",
    schoolId: "collins.m178026",
    grade: "SS 1",
    attendance: "100%",
    academicAvg: "A",
    outstandingFees: "Nil",
    status: "suspended",
    latestActivity: "A member of the Basketball team",
  },
  {
    id: "5",
    name: "John Terjiri",
    schoolId: "terjiri.m178027",
    grade: "JS 3",
    attendance: "100%",
    academicAvg: "C+",
    outstandingFees: "₦12,500",
    status: "graduated",
    latestActivity: "Lead role in the school play",
  },
  {
    id: "6",
    name: "Chinedu Nwokodi",
    schoolId: "nwokodi.m178023",
    grade: "SS 2",
    attendance: "92%",
    academicAvg: "B+",
    outstandingFees: "Nil",
    status: "withdrawn",
    latestActivity: "Appointed class captain",
  },
  {
    id: "7",
    name: "Adebisi Deborah",
    schoolId: "adebisi.m178024",
    grade: "JS 3",
    attendance: "100%",
    academicAvg: "B-",
    outstandingFees: "Nil",
    status: "active",
    latestActivity: "Became a member of the debate team",
  },
  {
    id: "8",
    name: "Dauda Ahfiz",
    schoolId: "ahfiz.m178025",
    grade: "SS 3",
    attendance: "98%",
    academicAvg: "A+",
    outstandingFees: "Nil",
    status: "active",
    latestActivity: "Editor-in-Chief of the Yearbook",
  },
];

interface StudentTableProps {
  studentsData?: { data: any[]; total?: number };
  isLoading?: boolean;
}

export function StudentTable({
  studentsData,
  isLoading,
}: StudentTableProps = {}) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading students...</div>
    );
  }
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => id !== rowId) : [...prev, id],
    );
  };

  // Transform API students data to component format
  const apiStudents =
    studentsData?.data?.map((student) => ({
      id: student.id,
      name:
        student.name ||
        `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
        "N/A",
      schoolId: student.studentId || student.id,
      grade: student.className || student.class?.name || "N/A",
      attendance: "N/A",
      academicAvg: "N/A",
      outstandingFees: "N/A",
      status: (student.status || "active") as Student["status"],
      latestActivity: "N/A",
    })) || [];

  const allStudents = apiStudents.length > 0 ? apiStudents : students;

  const filteredStudents = allStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.schoolId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStatusChange = (
    applicationId: string,
    newStatus: "active" | "on-leave" | "suspended" | "graduated" | "withdrawn",
    statusLabel: string,
  ) => {
    // Status changes would typically trigger an API mutation
    // For now, this is handled locally or will be integrated with updateStudent mutation
    const updatedStudents = allStudents.map((app) =>
      app.id === applicationId ? { ...app, status: newStatus } : app,
    );
  };

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "on-leave":
        return "text-blue-600";
      case "suspended":
        return "text-orange-600";
      case "graduated":
        return "text-gray-600";
      case "withdrawn":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusLabel = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "Active";
      case "on-leave":
        return "On Leave";
      case "suspended":
        return "Suspended";
      case "graduated":
        return "Graduated";
      case "withdrawn":
        return "Withdrawn";
      default:
        return status;
    }
  };

  const columns: TableColumn<Student>[] = [
    {
      key: "name",
      title: "Full Name + School ID",
      render: (_, row) => (
        <span className="font-medium">
          {row.name} ({row.schoolId})
        </span>
      ),
    },
    {
      key: "grade",
      title: "Grade/Class",
    },
    {
      key: "attendance",
      title: "Attendance per month.",
    },
    {
      key: "academicAvg",
      title: "Academic Avg.",
    },
    {
      key: "outstandingFees",
      title: "Outstanding Fees",
    },
    {
      key: "status",
      title: "Status",
      render: (value) => (
        <span
          className={cn(
            "text-sm font-medium",
            getStatusColor(value as Student["status"]),
          )}
        >
          {getStatusLabel(value as Student["status"])}
        </span>
      ),
    },
    {
      key: "latestActivity",
      title: "Latest major activity",
      className: "text-sm text-gray-600",
    },
  ];

  const actions: TableAction<Student>[] = [
    {
      type: "dropdown",
      config: {
        items: [
          {
            label: "View student profile",
            onClick: (row) => router.push(`/admin/students/${row.id}`),
            icon: <Icon icon={ViewIcon} size={16} />,
          },
          {
            separator: true,
            label: "Edit student file",
            onClick: (row) => router.push(`/admin/students/${row.id}/edit`),
            icon: <Icon icon={PencilEdit02Icon} size={16} />,
          },
          {
            separator: true,
            label: "Log majority activity",
            onClick: (row) => console.log("Print", row),
            icon: <Icon icon={ElearningExchangeIcon} size={16} />,
          },
          {
            separator: true,
            label: "Update status",
            onClick: (row) => console.log("Print", row),
            icon: <Icon icon={UserStatusIcon} size={16} />,
            subItems: [
              {
                label: "Active",
                onClick: (row) =>
                  handleStatusChange(row.id, "active", "Active"),
              },
              {
                label: "On Leave",
                onClick: (row) =>
                  handleStatusChange(row.id, "on-leave", "On Leave"),
              },
              {
                label: "Suspended",
                onClick: (row) =>
                  handleStatusChange(row.id, "suspended", "Suspended"),
              },
              {
                label: "Graduated",
                onClick: (row) =>
                  handleStatusChange(row.id, "graduated", "Graduated"),
              },
              {
                label: "Withdrawn",
                onClick: (row) =>
                  handleStatusChange(row.id, "withdrawn", "Withdrawn"),
              },
            ],
          },
          {
            separator: true,
            label: "Reset Password",
            onClick: (row) => console.log("Print", row),
            icon: <Icon icon={LockPasswordIcon} size={16} />,
          },
          {
            separator: true,
            label: "Print school ID",
            onClick: (row) => console.log("Print", row),
            icon: <Icon icon={PrinterIcon} size={16} />,
          },
        ],
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name, student ID, or parent phone number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="text-muted-foreground gap-2">
          <Icon icon={FilterIcon} size={20} />
          Filter by:
        </Button>
        <Button variant="outline" className="text-muted-foreground gap-2">
          <Icon icon={Csv02Icon} size={20} />
          Export Data
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredStudents}
          actions={actions}
          headerClassName="bg-main-blue/5"
          onRowClick={(row) => router.push(`/admin/students/${row.id}`)}
        />
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
