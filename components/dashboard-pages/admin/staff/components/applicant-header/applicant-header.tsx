"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ApplicantHeaderProps {
  name: string;
  role: string;
  status: string;
  interviewDate: string;
  profilePicture?: string;
}

export function ApplicantHeader({
  name,
  role,
  status,
  interviewDate,
  profilePicture,
}: ApplicantHeaderProps) {
  return (
    <div className="bg-background rounded-md p-4 mb-4">
      <div className="flex items-start gap-4">
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

        {/* Applicant Info */}
        <div className="flex-1">
          <h1 className="text-2xl 2xl:text-4xl font-bold text-gray-800 mb-6">
            {name}
          </h1>
          <div className="flex flex-row gap-1.5 text-sm text-gray-600">
            <div className="border rounded-md px-3 py-2">
              <span className="font-medium">Role:</span> {role}
            </div>
            <div className="border rounded-md px-3 py-2">
              <span className="font-medium">Current Status:</span> {status}
            </div>
            <div className="border rounded-md px-3 py-2">
              <span className="font-medium">Date of Interview:</span>{" "}
              {interviewDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
