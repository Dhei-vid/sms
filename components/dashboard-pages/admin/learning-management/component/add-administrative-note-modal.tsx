"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface AddAdministrativeNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendNote?: (note: string) => void;
  staffName?: string;
}

export function AddAdministrativeNoteModal({
  open,
  onOpenChange,
  onSendNote,
  staffName,
}: AddAdministrativeNoteModalProps) {
  const [note, setNote] = useState("");

  const handleSendNote = () => {
    if (note.trim()) {
      if (onSendNote) {
        onSendNote(note);
      }
      setNote("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setNote("");
    onOpenChange(false);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Administrative Note"
      size="lg"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="bg-main-blue text-white hover:bg-main-blue/90"
            onClick={handleSendNote}
            disabled={!note.trim()}
          >
            Send Note
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="placeholder"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={6}
            className="pr-10 min-h-[120px]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
