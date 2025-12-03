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
import { StatusBadge } from "./status-badge";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Icon } from "@/components/general/huge-icon";
import { cn } from "@/lib/utils";

import {
  ElearningExchangeIcon,
  ViewIcon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";

interface Application {
  id: string;
  name: string;
  classApplyingFor: string;
  dateSubmitted: string;
  timeSubmitted: string;
  status: "new" | "pending" | "accepted" | "rejected";
  statusLabel: string;
}

const applications: Application[] = [
  {
    id: "1",
    name: "Chinedu Nwokodi",
    classApplyingFor: "JS 2",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "new",
    statusLabel: "New Applicant",
  },
  {
    id: "2",
    name: "Adebisi Deborah",
    classApplyingFor: "JS 1",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "pending",
    statusLabel: "Pending Interview",
  },
  {
    id: "3",
    name: "Dauda Ahfiz",
    classApplyingFor: "SS 1",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "accepted",
    statusLabel: "Application Accepted",
  },
  {
    id: "4",
    name: "Sarah Collins",
    classApplyingFor: "SS 1",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "accepted",
    statusLabel: "Application Accepted",
  },
  {
    id: "5",
    name: "John Terjiri",
    classApplyingFor: "JS 3",
    dateSubmitted: "Oct. 10, 2025",
    timeSubmitted: "08:15 AM",
    status: "rejected",
    statusLabel: "Application Rejected",
  },
];

export function ApplicationTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedRows.length === applications.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(applications.map((app) => app.id));
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative w0full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by applicant name, Application ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter by:
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRows.length === applications.length &&
                    applications.length > 0
                  }
                  onCheckedChange={toggleAllSelection}
                />
              </TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Class Applying For:</TableHead>
              <TableHead>Date/Time Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(application.id)}
                    onCheckedChange={() => toggleRowSelection(application.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {application.name}
                </TableCell>
                <TableCell>{application.classApplyingFor}</TableCell>
                <TableCell>
                  {application.dateSubmitted}, {application.timeSubmitted}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={application.status}
                    label={application.statusLabel}
                  />
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
                        <p>Edit Application</p>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-row gap-3 items-center">
                        <Icon icon={PrinterIcon} size={16} />
                        <p>Print Document</p>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem> */}
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
