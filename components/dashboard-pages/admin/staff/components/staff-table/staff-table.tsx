"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, TableColumn, TableAction } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";
import {
  ElearningExchangeIcon,
  Edit01Icon,
  Csv02Icon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";

interface Staff {
  id: string;
  name: string;
  staffId: string;
  role: string;
  department: string;
  contractStatus: string;
  contractExpiry?: string;
  status: "active" | "on-leave" | "inactive";
  statusLabel: string;
  leaveDaysLeft: number;
}

export function StaffTable() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const staff: Staff[] = [
    {
      id: "1",
      name: "Mr. Chinedu Okafor",
      staffId: "okafox.T178023",
      role: "HOD Science",
      department: "JSS Science",
      contractStatus: "Active",
      contractExpiry: "12/2026",
      status: "active",
      statusLabel: "Active",
      leaveDaysLeft: 8,
    },
    {
      id: "2",
      name: "Mrs. Helen Davies",
      staffId: "Davies.T178024",
      role: "P5 Teacher",
      department: "Primary",
      contractStatus: "Active",
      contractExpiry: "12/2026",
      status: "active",
      statusLabel: "Active",
      leaveDaysLeft: 8,
    },
    {
      id: "3",
      name: "Ms. Tolu Adebayo",
      staffId: "adebayo.T178025",
      role: "Bursar",
      department: "Admin",
      contractStatus: "Active",
      contractExpiry: "12/2026",
      status: "on-leave",
      statusLabel: "On Leave",
      leaveDaysLeft: 8,
    },
    {
      id: "4",
      name: "Mr. Biodun Eke",
      staffId: "eke.T178026",
      role: "Security Guard",
      department: "NAS",
      contractStatus: "Active",
      contractExpiry: "12/2026",
      status: "active",
      statusLabel: "Active",
      leaveDaysLeft: 8,
    },
    {
      id: "5",
      name: "Mrs. Uche Nwachukwu",
      staffId: "nwachukwu.T178027",
      role: "JS 3 Teacher",
      department: "JSS Art",
      contractStatus: "Active",
      contractExpiry: "12/2026",
      status: "active",
      statusLabel: "Active",
      leaveDaysLeft: 8,
    },
    {
      id: "6",
      name: "Mr. Sola Adeniyi",
      staffId: "adeniyi.m.T178023",
      role: "HR Admin",
      department: "Admin",
      contractStatus: "Active",
      contractExpiry: "1/2026",
      status: "active",
      statusLabel: "Active",
      leaveDaysLeft: 8,
    },
    {
      id: "7",
      name: "Mrs. Rukky Yakubu",
      staffId: "yakubu.T178024",
      role: "Academic Admin",
      department: "Admin",
      contractStatus: "Active",
      contractExpiry: "12/2026",
      status: "active",
      statusLabel: "Active",
      leaveDaysLeft: 8,
    },
    {
      id: "8",
      name: "Ms. Funmilayo Bola",
      staffId: "bola.T178025",
      role: "SS 3 History Teacher",
      department: "SS Art Class",
      contractStatus: "Active",
      contractExpiry: "12/2026",
      status: "active",
      statusLabel: "Active",
      leaveDaysLeft: 8,
    },
  ];

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.staffId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getContractStatusColor = (expiry?: string) => {
    if (!expiry) return "text-gray-700";
    // Check if expiry is within 90 days (simplified check)
    return expiry.includes("1/2026") ? "text-red-600" : "text-gray-700";
  };

  const columns: TableColumn<Staff>[] = [
    {
      key: "name",
      title: "Full Name + Staff ID",
      render: (_, row) => (
        <span className="font-medium">
          {row.name} ({row.staffId})
        </span>
      ),
    },
    {
      key: "role",
      title: "Role/Position",
    },
    {
      key: "department",
      title: "Department",
    },
    {
      key: "contractStatus",
      title: "Contract Status",
      render: (_, row) => (
        <div>
          <span className="text-sm">{row.contractStatus}</span>
          {row.contractExpiry && (
            <span
              className={cn(
                "text-sm ml-2",
                getContractStatusColor(row.contractExpiry)
              )}
            >
              (Expires {row.contractExpiry})
            </span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (_, row) => (
        <p
          className={cn(
            row.status === "active" && "text-main-blue",
            row.status === "on-leave" && "text-amber-600",
            row.status === "inactive" && "text-red-600"
          )}
        >
          {row.statusLabel}
        </p>
      ),
    },
    {
      key: "leaveDaysLeft",
      title: "Leave Days Left",
      render: (value) => `${value} Days`,
    },
  ];

  const actions: TableAction<Staff>[] = [
    {
      type: "dropdown",
      config: {
        items: [
          {
            label: "View Details",
            onClick: (row) => router.push(`/admin/staff-management/${row.id}`),
            icon: <Icon icon={ElearningExchangeIcon} size={16} />,
          },
          {
            label: "Edit Staff",
            onClick: (row) => router.push(`/admin/staff-management/${row.id}/edit`),
            icon: <Icon icon={Edit01Icon} size={16} />,
          },
          {
            separator: true,
            label: "Print Profile",
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
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter by:
        </Button>
        <Button variant={"outline"} className="gap-2">
          <Icon icon={Csv02Icon} size={16} />
          Export Data
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredStaff}
          actions={actions}
          headerClassName="bg-main-blue/5"
          onRowClick={(row) => router.push(`/admin/staff-management/${row.id}`)}
        />
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
