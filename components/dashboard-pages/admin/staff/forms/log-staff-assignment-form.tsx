"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";
import { useCreateUserRequestMutation } from "@/services/user-requests/user-requests";
import { useGetAllStaffQuery } from "@/services/stakeholders/stakeholders";
import { useGetSchoolsQuery } from "@/services/schools/schools";
import { toast } from "sonner";
import type { CreateUserRequestRequest } from "@/services/user-requests/user-request-types";

export function LogStaffAssignmentForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [formData, setFormData] = useState({
    schoolId: "",
    staffMember: "",
    assignmentType: "",
    dutyRoleName: "",
    description: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    supervisor: "",
  });

  const [createUserRequest, { isLoading: isSubmitting }] =
    useCreateUserRequestMutation();
  const { data: staffData, isLoading: isLoadingStaff } = useGetAllStaffQuery();
  const { data: schoolsData, isLoading: isLoadingSchools } =
    useGetSchoolsQuery();

  const assignmentTypeOptions = [
    "Teaching Assignment",
    "Administrative Duty",
    "Supervisory Role",
    "Committee Membership",
    "Event Coordination",
    "Other",
  ];

  const staffMembers = staffData?.data || [];
  const schools = schoolsData?.data || [];

  const handleSubmit = async () => {
    // Validation
    if (!formData.schoolId) {
      toast.error("Please select a school");
      return;
    }
    if (!formData.staffMember) {
      toast.error("Please select a staff member");
      return;
    }
    if (!formData.assignmentType) {
      toast.error("Please select an assignment type");
      return;
    }
    if (!formData.dutyRoleName.trim()) {
      toast.error("Please enter a duty/role name");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!formData.startDate) {
      toast.error("Please select a start date");
      return;
    }
    if (!formData.supervisor) {
      toast.error("Please select a supervisor");
      return;
    }

    try {
      const payload: CreateUserRequestRequest = {
        type: "assignment",
        school_id: formData.schoolId,
        title: formData.dutyRoleName,
        staff_member_id: formData.staffMember,
        supervisor_id: formData.supervisor,
        assignment_type: formData.assignmentType,
        duty_role_name: formData.dutyRoleName,
        description: formData.description,
        start_date: format(formData.startDate, "yyyy-MM-dd"),
        end_date: formData.endDate
          ? format(formData.endDate, "yyyy-MM-dd")
          : undefined,
        status: "pending",
      };

      await createUserRequest(payload).unwrap();
      toast.success("Staff assignment logged successfully");

      // Reset form
      setFormData({
        schoolId: "",
        staffMember: "",
        assignmentType: "",
        dutyRoleName: "",
        description: "",
        startDate: undefined,
        endDate: undefined,
        supervisor: "",
      });

      if (onSubmit) {
        onSubmit();
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to log staff assignment. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Log Staff Assignment
      </h2>

      <div className="space-y-6">
        <SelectField
          label="School"
          placeholder={
            isLoadingSchools ? "Loading schools..." : "Select a school"
          }
          value={formData.schoolId}
          onValueChange={(value) =>
            setFormData({ ...formData, schoolId: value })
          }
          required
        >
          {schools.map((school) => (
            <SelectItem key={school.id} value={school.id}>
              {school.name}
            </SelectItem>
          ))}
        </SelectField>

        <SelectField
          label="Staff Member"
          placeholder={
            isLoadingStaff ? "Loading staff..." : "Select staff member"
          }
          value={formData.staffMember}
          onValueChange={(value) =>
            setFormData({ ...formData, staffMember: value })
          }
        >
          {staffMembers.map((staff) => {
            const fullName = staff.user
              ? `${staff.user.first_name || ""} ${staff.user.last_name || ""}`.trim()
              : "Unknown Staff";
            const displayName = staff.position
              ? `${fullName} (${staff.position})`
              : fullName;
            return (
              <SelectItem key={staff.id} value={staff.id}>
                {displayName}
              </SelectItem>
            );
          })}
        </SelectField>

        <SelectField
          label="Assignment Type"
          placeholder="Select assignment type"
          value={formData.assignmentType}
          onValueChange={(value) =>
            setFormData({ ...formData, assignmentType: value })
          }
        >
          {assignmentTypeOptions.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectField>

        <InputField
          id="dutyRoleName"
          label="Duty/Role Name"
          placeholder="placeholder"
          value={formData.dutyRoleName}
          onChange={(e) =>
            setFormData({ ...formData, dutyRoleName: e.target.value })
          }
        />

        <TextareaField
          id="description"
          label="Description/Context"
          placeholder="placeholder"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
        />

        <div className="grid grid-cols-2 gap-4">
          <DatePickerIcon
            label="Start Date"
            date={formData.startDate}
            setDate={(date) =>
              setFormData({
                ...formData,
                startDate:
                  typeof date === "function" ? date(formData.startDate) : date,
              })
            }
            open={openStartDate}
            setOpen={setOpenStartDate}
          />

          <DatePickerIcon
            label="End Date"
            date={formData.endDate}
            setDate={(date) =>
              setFormData({
                ...formData,
                endDate:
                  typeof date === "function" ? date(formData.endDate) : date,
              })
            }
            open={openEndDate}
            setOpen={setOpenEndDate}
          />
        </div>

        <SelectField
          label="Supervisor"
          placeholder={
            isLoadingStaff
              ? "Loading supervisors..."
              : "Select the manager responsible for overseeing this duty."
          }
          value={formData.supervisor}
          onValueChange={(value) =>
            setFormData({ ...formData, supervisor: value })
          }
        >
          {staffMembers.map((staff) => {
            const fullName = staff.user
              ? `${staff.user.first_name || ""} ${staff.user.last_name || ""}`.trim()
              : "Unknown Staff";
            const displayName = staff.position
              ? `${fullName} (${staff.position})`
              : fullName;
            return (
              <SelectItem key={staff.id} value={staff.id}>
                {displayName}
              </SelectItem>
            );
          })}
        </SelectField>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || isLoadingStaff || isLoadingSchools}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          {isSubmitting ? "Logging..." : "Log Assignment"}
        </Button>
      </div>
    </div>
  );
}
