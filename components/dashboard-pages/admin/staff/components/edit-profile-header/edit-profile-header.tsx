"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { Camera01Icon } from "@hugeicons/core-free-icons";

interface EditProfileHeaderProps {
  name: string;
  profilePicture?: string;
  onPhotoChange?: (file: File | null) => void;
}

export function EditProfileHeader({
  name,
  profilePicture,
  onPhotoChange,
}: EditProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (onPhotoChange) {
      onPhotoChange(file);
    }
  };

  return (
    <div className="bg-background rounded-md p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Profile Picture */}
        <div className="shrink-0 flex flex-col items-center gap-3">
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
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handlePhotoClick}
            className="text-sm text-main-blue hover:text-main-blue/80"
          >
            Change photo
          </Button>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h1 className="text-2xl 2xl:text-4xl font-bold text-gray-800">
            Editing Profile: {name}
          </h1>
        </div>
      </div>
    </div>
  );
}

