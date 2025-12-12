"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubjectResult {
  subject: string;
  finalTermScore: number;
  teacherRemarks: string;
}

interface ResultsTableProps {
  results: SubjectResult[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export function ResultsTable({
  results,
  onLoadMore,
  hasMore = false,
  className,
}: ResultsTableProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="border rounded-lg overflow-hidden">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="font-semibold px-4 py-3">Subjects</TableHead>
              <TableHead className="font-semibold px-4 py-3 text-center">
                Final Term Score (%)
              </TableHead>
              <TableHead className="font-semibold px-4 py-3">
                Teacher Remarks
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  No results available.
                </TableCell>
              </TableRow>
            ) : (
              results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-gray-700 border-r border-gray-200 px-4 py-3">
                    {result.subject}
                  </TableCell>
                  <TableCell className="text-gray-800 text-center border-r border-gray-200 px-4 py-3">
                    {result.finalTermScore}%
                  </TableCell>
                  <TableCell className="text-gray-800 px-4 py-3">
                    {result.teacherRemarks}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

