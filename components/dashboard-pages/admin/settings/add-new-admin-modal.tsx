"use client";

import { useState } from "react";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AddNewAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data: { staffMember: string; adminRole: string }) => void;
}

const staffMemberOptions = [
  { value: "principal-okoro", label: "Principal A. Okoro" },
  { value: "mr-femi-t", label: "Mr. Femi T." },
  { value: "ms-zara-a", label: "Ms. Zara A." },
  { value: "mr-peter-e", label: "Mr. Peter E." },
  { value: "mrs-b-kalu", label: "Mrs. B. Kalu" },
];

const adminRoleOptions = [
  { value: "super-admin", label: "Super Admin" },
  { value: "academic-dean", label: "Academic Dean" },
  { value: "it-system-admin", label: "IT/System Admin" },
  { value: "finance-admin", label: "Finance Admin" },
  { value: "hod-admin", label: "HOD (Admin)" },
];

export function AddNewAdminModal({
  open,
  onOpenChange,
  onConfirm,
}: AddNewAdminModalProps) {
  const [selectedStaffMember, setSelectedStaffMember] = useState("");
  const [selectedAdminRole, setSelectedAdminRole] = useState("");

  const handleConfirm = () => {
    if (selectedStaffMember && selectedAdminRole && onConfirm) {
      onConfirm({
        staffMember: selectedStaffMember,
        adminRole: selectedAdminRole,
      });
    }
    // Reset form
    setSelectedStaffMember("");
    setSelectedAdminRole("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setSelectedStaffMember("");
    setSelectedAdminRole("");
    onOpenChange(false);
  };

  const isFormValid = selectedStaffMember && selectedAdminRole;

  return (
    <ModalContainer
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Admin"
      size="xl"
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="bg-main-blue text-white hover:bg-main-blue/90"
            onClick={handleConfirm}
            disabled={!isFormValid}
          >
            Confirm & Activate Admin Access
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <SelectField
          label="Search Staff Member"
          value={selectedStaffMember}
          onValueChange={setSelectedStaffMember}
          placeholder="Links to Staff Directory"
        >
          {staffMemberOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>

        <SelectField
          label="Select Base Admin Role"
          value={selectedAdminRole}
          onValueChange={setSelectedAdminRole}
          placeholder="Dropdown Select roles"
        >
          {adminRoleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>
      </div>
    </ModalContainer>
  );
}
