"use client";

import * as React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

// Types
export interface TableColumn<T = any> {
  key: string;
  title: string;
  className?: string;
  headerClassName?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
}

export interface ActionButton<T = any> {
  label: string;
  onClick: (row: T, index: number) => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  icon?: React.ReactNode;
  disabled?: (row: T) => boolean;
}

export interface ActionLink<T = any> {
  label: string;
  href: string | ((row: T) => string);
  className?: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export interface ActionDropdownItem<T = any> {
  label: string;
  onClick: (row: T, index: number) => void;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  disabled?: (row: T) => boolean;
  separator?: boolean;
}

export interface ActionDropdown<T = any> {
  items: ActionDropdownItem<T>[];
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
}

export type TableAction<T = any> =
  | { type: "button"; config: ActionButton<T> }
  | { type: "link"; config: ActionLink<T> }
  | { type: "dropdown"; config: ActionDropdown<T> };

export interface DataTableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  emptyMessage?: string | React.ReactNode;
  emptyMessageClassName?: string;
  className?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  headerClassName?: string;
  tableClassName?: string;
  onRowClick?: (row: T, index: number) => void;
  itemsPerPage?: number;
  showActionsColumn?: boolean;
  actionsColumnTitle?: string;
  actionsColumnClassName?: string;
}

// Utility function to format dates
const formatDate = (value: Date | string): React.ReactNode => {
  try {
    const date = typeof value === "string" ? new Date(value) : value;
    if (isNaN(date.getTime())) return value?.toString() ?? "--";

    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm">{format(date, "LLL. d, yyyy")}</p>
        <p className="text-xs text-muted-foreground font-light">
          {format(date, "hh:mm:ss a")}
        </p>
      </div>
    );
  } catch {
    return value?.toString() ?? "--";
  }
};

// Default cell renderer
const defaultCellRenderer = (
  value: any,
  column: TableColumn,
  row: any,
  index: number
): React.ReactNode => {
  // If value is null or undefined
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">--</span>;
  }

  // If value is already a ReactNode
  if (React.isValidElement(value)) {
    return value;
  }

  // If value is a Date
  if (value instanceof Date) {
    return formatDate(value);
  }

  // If value is a string that looks like a date
  if (
    typeof value === "string" &&
    !isNaN(Date.parse(value)) &&
    value.includes("-")
  ) {
    return formatDate(value);
  }

  // If value is boolean
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  // Default: convert to string
  return value?.toString() ?? "--";
};

export function DataTable<T extends Record<string, any> = Record<string, any>>({
  columns,
  data,
  actions = [],
  emptyMessage = "No data available",
  emptyMessageClassName,
  className,
  rowClassName,
  headerClassName,
  tableClassName,
  onRowClick,
  itemsPerPage,
  showActionsColumn = true,
  actionsColumnTitle = "Action",
  actionsColumnClassName,
}: DataTableProps<T>) {
  const displayData = itemsPerPage ? data.slice(0, itemsPerPage) : data;

  const getRowClassName = (row: T, index: number): string => {
    const baseClass = "cursor-pointer";
    const customClass =
      typeof rowClassName === "function"
        ? rowClassName(row, index)
        : rowClassName;
    return cn(onRowClick && baseClass, customClass);
  };

  const renderCell = (
    value: any,
    column: TableColumn<T>,
    row: T,
    index: number
  ): React.ReactNode => {
    if (column.render) {
      return column.render(value, row, index);
    }
    return defaultCellRenderer(value, column, row, index);
  };

  const renderAction = (
    action: TableAction<T>,
    row: T,
    index: number
  ): React.ReactNode => {
    switch (action.type) {
      case "button": {
        const { config } = action;
        const isDisabled = config.disabled?.(row) ?? false;
        return (
          <Button
            variant={config.variant || "default"}
            size="sm"
            onClick={() => config.onClick(row, index)}
            disabled={isDisabled}
            className={config.className}
          >
            {config.icon}
            {config.label}
          </Button>
        );
      }

      case "link": {
        const { config } = action;
        const href =
          typeof config.href === "function" ? config.href(row) : config.href;
        const linkContent = (
          <>
            {config.icon}
            {config.label}
          </>
        );

        if (config.external) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "underline underline-offset-3 inline-flex items-center gap-1",
                config.className
              )}
            >
              {linkContent}
            </a>
          );
        }

        return (
          <Link
            href={href}
            className={cn(
              "underline underline-offset-3 inline-flex items-center gap-1",
              config.className
            )}
          >
            {linkContent}
          </Link>
        );
      }

      case "dropdown": {
        const { config } = action;
        const trigger = config.trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        );

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent align={config.align || "end"}>
              {config.items.map((item, itemIndex) => {
                const isDisabled = item.disabled?.(row) ?? false;
                const itemElement = (
                  <DropdownMenuItem
                    key={itemIndex}
                    onClick={() => !isDisabled && item.onClick(row, index)}
                    disabled={isDisabled}
                    variant={item.variant}
                    className="cursor-pointer"
                  >
                    {item.icon}
                    {item.label}
                  </DropdownMenuItem>
                );

                return item.separator ? (
                  <React.Fragment key={itemIndex}>
                    {itemIndex > 0 && <DropdownMenuSeparator />}
                    {itemElement}
                  </React.Fragment>
                ) : (
                  itemElement
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Table className={tableClassName}>
        <TableHeader className="bg-main-blue/5">
          <TableRow className={headerClassName}>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  "font-semibold",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  column.headerClassName
                )}
              >
                {column.title}
              </TableHead>
            ))}
            {showActionsColumn && actions.length > 0 && (
              <TableHead className={cn("text-center", actionsColumnClassName)}>
                {actionsColumnTitle}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length +
                  (showActionsColumn && actions.length > 0 ? 1 : 0)
                }
                className={cn(
                  "text-center py-8 text-muted-foreground",
                  emptyMessageClassName
                )}
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            displayData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={getRowClassName(row, rowIndex)}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column, colIndex) => {
                  const value = row[column.key];
                  const isLastColumn =
                    colIndex === columns.length - 1 &&
                    (!showActionsColumn || actions.length === 0);
                  return (
                    <TableCell
                      key={column.key}
                      className={cn(
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        !isLastColumn && "border-r border-gray-200",
                        column.className
                      )}
                    >
                      {renderCell(value, column, row, rowIndex)}
                    </TableCell>
                  );
                })}
                {showActionsColumn && actions.length > 0 && (
                  <TableCell
                    className={cn("text-center", actionsColumnClassName)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {actions.map((action, actionIndex) => (
                        <React.Fragment key={actionIndex}>
                          {renderAction(action, row, rowIndex)}
                        </React.Fragment>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
