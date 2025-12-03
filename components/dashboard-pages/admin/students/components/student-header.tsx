"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface StudentHeaderProps {
  name: string;
  studentId: string;
  currentClass: string;
  status: "active" | "inactive" | "suspended" | "graduated" | "withdrawn";
  statusLabel: string;
  profilePicture?: string;
}

export function StudentHeader({
  name,
  studentId,
  currentClass,
  status,
  statusLabel,
  profilePicture,
}: StudentHeaderProps) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border border-green-600";
      case "inactive":
        return "bg-red-100 text-red-700 border border-red-600";
      case "suspended":
        return "bg-red-100 text-red-700 border border-red-600";
      case "graduated":
        return "bg-green-100 text-green-700 border border-green-600";
      case "withdrawn":
        return "bg-gray-100 text-gray-700 border border-gray-600";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-600";
    }
  };

  return (
    <div className="bg-background rounded-md p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Profile Picture */}
        <div className="shrink-0">
          {profilePicture ? (
            <Image
              src={profilePicture}
              alt={name}
              width={120}
              height={120}
              className="rounded-md object-cover object-top w-30 h-30"
            />
          ) : (
            <div className="w-30 h-30 rounded-md bg-gray-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Student Info */}
        <div className="flex-1 h-full">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl 2xl:text-4xl font-bold text-gray-800 mb-6">
                {name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="border rounded-md px-3 py-2">
                  <span className="font-medium">Student ID:</span> {studentId}
                </div>
                <div className="border rounded-md px-3 py-2">
                  <span className="font-medium">Current class:</span>{" "}
                  {currentClass}
                </div>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center text-white font-medium text-xs rounded-md h-9 px-4 py-2",
                getStatusColor()
              )}
            >
              {statusLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
