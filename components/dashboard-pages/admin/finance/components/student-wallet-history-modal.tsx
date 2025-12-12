"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { StudentWalletHistorySearch } from "./student-wallet-history/search-student-wallet-history";
import { StudentWalletHistoryForm } from "./student-wallet-history/student-wallet-history-form";

interface StudentWalletHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentWalletHistoryModal({
  open,
  onOpenChange,
}: StudentWalletHistoryModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isStudent, setIsStudent] = useState<boolean>(false);

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset search when modal closes
      setSearchQuery("");
      setIsStudent(false);
    }
    onOpenChange(open);
  };

  return (
    <ModalContainer
      open={open}
      onOpenChange={handleClose}
      title="Student Wallet History"
      size="4xl"
      maxHeight="90vh"
    >
      {isStudent ? (
        <StudentWalletHistoryForm />
      ) : (
        <StudentWalletHistorySearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => handleClose(false)}
          isStudent={isStudent}
          setIsStudent={setIsStudent}
        />
      )}
    </ModalContainer>
  );
}
