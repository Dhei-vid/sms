"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplicantHeaderProps {
  name: string;
  status: "new" | "pending" | "accepted" | "rejected" | "enrolled";
  statusLabel: string;
  applicationId: string;
  classApplyingFor: string;
  dateSubmitted: string;
}

export function ApplicantHeader({
  name,
  status,
  statusLabel,
  applicationId,
  classApplyingFor,
  dateSubmitted,
}: ApplicantHeaderProps) {
  return (
    <div className="bg-background rounded-md p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <Button
          className={cn(
            "bg-main-blue/5 border border-main-blue text-main-blue hover:bg-blue-200 font-medium"
          )}
        >
          {statusLabel}
        </Button>
      </div>
      <div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="border rounded-md px-3 py-1 bg-accent/50">
            <span className="font-medium">Application ID:</span> {applicationId}
          </div>
          <div className="border rounded-md px-3 py-1 bg-accent/50">
            <span className="font-medium">Class applying for:</span>{" "}
            {classApplyingFor}
          </div>
          <div className="border rounded-md px-3 py-1 bg-accent/50">
            <span className="font-medium">Date submitted:</span> {dateSubmitted}
          </div>
        </div>
      </div>
    </div>
  );
}
