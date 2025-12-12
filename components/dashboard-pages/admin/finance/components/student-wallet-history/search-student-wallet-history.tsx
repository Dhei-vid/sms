"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface StudentWalletHistorySearchProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  isStudent: boolean;
  setIsStudent: Dispatch<SetStateAction<boolean>>;
}
export function StudentWalletHistorySearch({
  searchQuery,
  setSearchQuery,
  onClose,
  setIsStudent,
}: StudentWalletHistorySearchProps) {
  const handleSearch = () => {
    // Handle search
    console.log("Search student wallet history", searchQuery);
    setIsStudent(true);
  };

  return (
    <div className="space-y-6 py-4">
      {/* Search Student Account */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Search Student Account</Label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by Student Name, Student ID, or Invoice Number."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSearch}>Search Account</Button>
      </div>
    </div>
  );
}
