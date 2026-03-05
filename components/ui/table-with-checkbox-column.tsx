"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { TableColumn } from "@/components/ui/data-table";

export interface TableWithCheckboxColumnProps<T = object> {
  columns: TableColumn<T>[];
  data: T[];
  getChecked: (row: T) => boolean;
  onCheckedChange?: (row: T, checked: boolean) => void;
  readOnly?: boolean;
  emptyMessage?: React.ReactNode;
  headerClassName?: string;
  rowClassName?: string;
  tableClassName?: string;
  checkboxColumnHeader?: string;
  checkboxColumnClassName?: string;
}

function defaultCellRenderer<T>(
  value: unknown,
  column: TableColumn<T>,
  row: T,
  index: number,
): React.ReactNode {
  if (column.render) return column.render(value, row, index);
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">—</span>;
  }
  if (React.isValidElement(value)) return value;
  return String(value);
}

export function TableWithCheckboxColumn<T = object>({
  columns,
  data,
  getChecked,
  onCheckedChange,
  readOnly = false,
  emptyMessage = "No data.",
  headerClassName,
  rowClassName,
  tableClassName,
  checkboxColumnHeader = "",
  checkboxColumnClassName,
}: TableWithCheckboxColumnProps<T>) {
  return (
    <div className="w-full">
      <Table className={cn("border-collapse", tableClassName)}>
        <TableHeader>
          <TableRow className={headerClassName}>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  col.headerClassName,
                )}
              >
                {col.title}
              </TableHead>
            ))}
            <TableHead
              className={cn(
                "border-l border-border py-3 pl-4 pr-6 min-w-[4.5rem] w-[4.5rem]",
                checkboxColumnClassName,
              )}
            >
              {checkboxColumnHeader}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className={rowClassName}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={cn(
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right",
                      col.className,
                    )}
                  >
                    {defaultCellRenderer(
                      (row as Record<string, unknown>)[col.key],
                      col,
                      row,
                      rowIndex,
                    )}
                  </TableCell>
                ))}
                <TableCell
                  className={cn(
                    "border-l border-border py-4 pl-4 pr-6 align-middle",
                    checkboxColumnClassName,
                  )}
                >
                  <div className="flex items-center justify-center min-h-[2rem]">
                    <Checkbox
                      checked={getChecked(row)}
                      disabled={readOnly}
                      onCheckedChange={
                        readOnly
                          ? undefined
                          : (checked) => onCheckedChange?.(row, !!checked)
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
