"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  studentId: string;
  daysOverdue: number;
  overdueAmount: number;
  primaryContactName: string;
  primaryContactNumber: string;
  latestPayment: string;
}

interface ViewStudentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  period: string;
  students: Student[];
}

export function ViewStudentsModal({
  open,
  onOpenChange,
  period,
  students,
}: ViewStudentsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.primaryContactName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      student.primaryContactNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title={`View Students: ${period}`}
      size="5xl"
      contentClassName="flex flex-col"
    >
      <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Summary */}
          <div className="flex items-center gap-5 text-sm text-gray-600">
            <div className="border px-4 py-2 rounded-md">
              <span>
                Total number of students:{" "}
                <span className="font-semibold">
                  {students.length} student{students.length > 1 ? "s" : ""}{" "}
                </span>
              </span>
            </div>
            <div className="border px-4 py-2 rounded-md">
              <span>
                Total amount:{" "}
                <span className="font-semibold text-gray-800">
                  {formatCurrency(
                    filteredStudents.reduce(
                      (sum, s) => sum + s.overdueAmount,
                      0
                    )
                  )}
                </span>
              </span>
            </div>
          </div>
          {/* Search */}
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by student name, ID, or parent name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div> */}

          {/* Table */}
          <div className="border rounded-lg overflow-hidden flex-1 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="bg-main-blue/5">
                  <TableHead>Full Name + School ID</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Overdue Amount</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Latest Payment</TableHead>
                  <TableHead className="w-12">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center text-gray-500"
                    >
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="flex flex-col gap-1 font-medium text-xs">
                        <span>{student.name}</span>
                        <span className="text-muted-foreground">
                          ({student.studentId})
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        {student.daysOverdue} Days
                      </TableCell>
                      <TableCell className="font-semibold text-gray-800 text-xs">
                        {formatCurrency(student.overdueAmount)}
                      </TableCell>
                      <TableCell className="flex flex-col gap-1 text-xs">
                        <span>{student.primaryContactName}</span>
                        <span className="text-muted-foreground">
                          {student.primaryContactNumber}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        {student.latestPayment}
                      </TableCell>
                      <TableCell>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle send reminder action
                            console.log("Send reminder for", student.id);
                          }}
                          className="text-main-blue hover:underline text-sm"
                        >
                          Send Reminder
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
    </ModalContainer>
  );
}
