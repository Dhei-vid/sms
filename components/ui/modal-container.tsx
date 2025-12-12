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

const maxHeightClasses = {
  sm: "max-h-sm",
  md: "max-h-md",
  lg: "max-h-lg",
  xl: "max-h-xl",
  "90vh": "max-h-[90vh]",
  full: "max-h-full",
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
          maxHeight === "90vh" && "overflow-y-auto",
          contentClassName,
          "overflow-hidden"
        )}
        showCloseButton={showCloseButton}
      >
        {showHeader && title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className={cn("space-y-4", className)}>{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
