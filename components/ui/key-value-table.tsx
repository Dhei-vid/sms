"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface KeyValueRow {
  label: string;
  value: React.ReactNode;
}

interface KeyValueTableProps {
  rows: KeyValueRow[];
  headerClassName?: string;
  tableClassName?: string;
}

export function KeyValueTable({
  rows,
  headerClassName,
  tableClassName,
}: KeyValueTableProps) {
  return (
    <Table className={cn("border-collapse", tableClassName)}>
      <TableHeader>
        <TableRow className={cn("bg-main-blue/10", headerClassName)}>
          <TableHead className="font-medium text-gray-800 w-[30%] py-3 px-4">
            Form Field
          </TableHead>
          <TableHead className="font-medium text-gray-800 py-3 px-4">
            Content
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i} className="border-b border-border">
            <TableCell className="py-3 px-4 text-gray-800">
              {row.label}
            </TableCell>
            <TableCell className="py-3 px-4 text-gray-800">
              {row.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
