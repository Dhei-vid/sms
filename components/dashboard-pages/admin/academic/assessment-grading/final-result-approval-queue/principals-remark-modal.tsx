"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrincipalsRemarkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveAndPublish?: (remark: string) => void;
  studentName?: string;
}

export function PrincipalsRemarkModal({
  open,
  onOpenChange,
  onSaveAndPublish,
  studentName,
}: PrincipalsRemarkModalProps) {
  const [remark, setRemark] = useState("");

  const handleSaveAndPublish = () => {
    if (onSaveAndPublish) {
      onSaveAndPublish(remark);
    }
    setRemark("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setRemark("");
    onOpenChange(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Principal's Remark"
      size="lg"
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveAndPublish}
            className="bg-main-blue text-white hover:bg-main-blue/90"
          >
            Save and Publish Result
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Enter principal's remark here..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows={6}
            className={cn("pr-10 min-h-[150px]")}
          />
          <div className="absolute right-3 top-3 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
