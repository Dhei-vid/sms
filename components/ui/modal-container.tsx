"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  maxHeight?: "sm" | "md" | "lg" | "xl" | "90vh" | "full";
  showCloseButton?: boolean;
  showHeader?: boolean;
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  "6xl": "sm:max-w-6xl",
  full: "sm:max-w-full",
};

// Map semantic maxHeight values to real Tailwind classes
// We use custom values instead of the (non-existent) max-h-sm/md/lg utilities.
const maxHeightClasses = {
  sm: "!max-h-[60vh]",
  md: "!max-h-[70vh]",
  lg: "!max-h-[80vh]",
  xl: "!max-h-[85vh]",
  "90vh": "!max-h-[90vh]",
  full: "!max-h-screen",
};

export function ModalContainer({
  open,
  onOpenChange,
  title,
  children,
  footer,
  className,
  contentClassName,
  size = "md",
  maxHeight,
  showCloseButton = true,
  showHeader = true,
}: ModalContainerProps) {
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const maxHeightClass = maxHeight ? maxHeightClasses[maxHeight] : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          sizeClass,
          maxHeightClass,
          contentClassName,
          "flex flex-col overflow-hidden scrollbar-width"
        )}
        showCloseButton={showCloseButton}
      >
        {showHeader && title && (
          <DialogHeader className="shrink-0">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <div
          className={cn(
            "space-y-4 flex-1 overflow-y-auto",
            maxHeight && "min-h-0",
            className
          )}
        >
          {children}
        </div>

        {footer && (
          <DialogFooter className="shrink-0">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
