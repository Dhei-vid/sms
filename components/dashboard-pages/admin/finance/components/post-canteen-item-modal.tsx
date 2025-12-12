"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PostCanteenItemForm } from "./post-canteen-form/post-canteen-item-form";
import { EditCanteenItemForm } from "./post-canteen-form/edit-canteen-item-form";

interface PostCanteenItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostCanteenItemModal({
  open,
  onOpenChange,
}: PostCanteenItemModalProps) {
  const [activeTab, setActiveTab] = useState<"new" | "edit">("new");

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when modal closes
      //   setFormData(initialData);
      setActiveTab("new");
    }
    onOpenChange(open);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Post Canteen Item"
      size="2xl"
    >
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 border rounded-md p-1">
        <button
          type="button"
          onClick={() => setActiveTab("new")}
          className={cn(
            "cursor-pointer px-4 py-2 text-xs font-medium transition-colors rounded-md",
            activeTab === "new"
              ? "bg-main-blue/5 text-main-blue"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          Post New Canteen Item
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("edit")}
          className={cn(
            "cursor-pointer px-4 py-2 text-xs font-medium rounded-md transition-colors",
            activeTab === "edit"
              ? "bg-main-blue/5 text-main-blue"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          Edit Canteen Item
        </button>
      </div>

      <div>
        {activeTab === "new" && (
          <PostCanteenItemForm onClose={() => handleClose(false)} />
        )}
        {activeTab === "edit" && (
          <EditCanteenItemForm onClose={() => handleClose(false)} />
        )}
      </div>
    </ModalContainer>
  );
}
