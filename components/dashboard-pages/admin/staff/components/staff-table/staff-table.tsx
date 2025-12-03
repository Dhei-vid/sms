"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Icon } from "@/components/general/huge-icon";
// import { StatusBadge } from "@/components/dashboard-pages/admin/admissions/components/status-badge";
import { cn } from "@/lib/utils";
import {
  ElearningExchangeIcon,
  Edit01Icon,
  Csv02Icon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

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

  const toggleAllSelection = () => {
    if (selectedRows.length === staff.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(staff.map((s) => s.id));
    }
  };

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.staffId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeType = (status: Staff["status"]) => {
    switch (status) {
      case "active":
        return "accepted";
      case "on-leave":
        return "pending";
      case "inactive":
        return "rejected";
      default:
        return "pending";
    }
  };

  const getContractStatusColor = (expiry?: string) => {
    if (!expiry) return "text-gray-700";
    // Check if expiry is within 90 days (simplified check)
    return expiry.includes("1/2026") ? "text-red-600" : "text-gray-700";
  };

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
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRows.length === staff.length && staff.length > 0
                  }
                  onCheckedChange={toggleAllSelection}
                />
              </TableHead>
              <TableHead>Full Name + Staff ID</TableHead>
              <TableHead>Role/Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Contract Status</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Leave Days Left</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(member.id)}
                    onCheckedChange={() => toggleRowSelection(member.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {member.name} ({member.staffId})
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>
                  <div>
                    <span className="text-sm">{member.contractStatus}</span>
                    {member.contractExpiry && (
                      <span
                        className={cn(
                          "text-sm ml-2",
                          getContractStatusColor(member.contractExpiry)
                        )}
                      >
                        (Expires {member.contractExpiry})
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <p
                    className={cn(
                      member.status === "active" && "text-main-blue",
                      member.status === "on-leave" && "text-amber-600",
                      member.status === "inactive" && "text-red-600"
                    )}
                  >
                    {member.statusLabel}
                  </p>
                  {/* <StatusBadge
                    status={getStatusBadgeType(member.status)}
                    label={member.statusLabel}
                  /> */}
                </TableCell>
                <TableCell>{member.leaveDaysLeft} Days</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/staff-management/${member.id}`}>
                        <DropdownMenuItem className="flex flex-row gap-3 items-center">
                          <Icon icon={ElearningExchangeIcon} size={16} />
                          <p>View Details</p>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="flex flex-row gap-3 items-center">
                        <Icon icon={Edit01Icon} size={16} />
                        <p>Edit Staff</p>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-row gap-3 items-center">
                        <Icon icon={PrinterIcon} size={16} />
                        <p>Print Profile</p>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
