"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface ExcludedStudent {
  id: string;
  name: string;
  studentId: string;
  gradeClass: string;
  exclusionReason: string;
}

interface ExclusionLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  totalCount: number;
  excludedStudents: ExcludedStudent[];
}

export function ExclusionLogModal({
  open,
  onOpenChange,
  title,
  totalCount,
  excludedStudents,
}: ExclusionLogModalProps) {
  const [displayCount, setDisplayCount] = useState(8);

  const displayedStudents = excludedStudents.slice(0, displayCount);
  const hasMore = excludedStudents.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 8, excludedStudents.length));
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      size="5xl"
      contentClassName="flex flex-col"
    >
      <div className="text-sm text-gray-600 border px-3 py-1 rounded-md w-fit mb-4">
        Total number of Students:{" "}
        <span className="font-semibold">{totalCount} Students</span>
      </div>

      <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
        {/* Table */}
        <div className="border rounded-lg overflow-hidden flex-1 overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="bg-main-blue/5">
                <TableHead className="px-4 py-3">
                  Full Name + School ID
                </TableHead>
                <TableHead className="px-4 py-3">Grade/Class</TableHead>
                <TableHead className="px-4 py-3">
                  Scholarship Status
                  {/* {title.includes("Scholarship")
                    ? ""
                    : "Exclusion Reason"} */}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedStudents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-32 text-center text-gray-500"
                  >
                    No excluded students found
                  </TableCell>
                </TableRow>
              ) : (
                displayedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm">
                          {student.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({student.studentId})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {student.gradeClass}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {student.exclusionReason}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="w-32"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
