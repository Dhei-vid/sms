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
import { Search, Filter, Download, MoreVertical } from "lucide-react";
import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";
import {
  ElearningExchangeIcon,
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

export function StudentTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => id !== rowId) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedRows.length === students.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(students.map((student) => student.id));
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.schoolId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRows.length === students.length &&
                    students.length > 0
                  }
                  onCheckedChange={toggleAllSelection}
                />
              </TableHead>
              <TableHead>Full Name + School ID</TableHead>
              <TableHead>Grade/Class</TableHead>
              <TableHead>Attendance per month.</TableHead>
              <TableHead>Academic Avg.</TableHead>
              <TableHead>Outstanding Fees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Latest major activity</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(student.id)}
                    onCheckedChange={() => toggleRowSelection(student.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {student.name} ({student.schoolId})
                </TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.attendance}</TableCell>
                <TableCell>{student.academicAvg}</TableCell>
                <TableCell>{student.outstandingFees}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      getStatusColor(student.status)
                    )}
                  >
                    {getStatusLabel(student.status)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {student.latestActivity}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex flex-row gap-3 items-center">
                        <Icon icon={ElearningExchangeIcon} size={16} />
                        <p>View Details</p>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-row gap-3 items-center">
                        <Icon icon={ViewIcon} size={16} />
                        <p>Edit Student</p>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-row gap-3 items-center">
                        <Icon icon={PrinterIcon} size={16} />
                        <p>Print Document</p>
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
