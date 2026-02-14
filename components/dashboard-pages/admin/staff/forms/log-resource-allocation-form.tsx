"use client";

import { useState } from "react";
import { format } from "date-fns";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";
import { useCreateUserRequestMutation } from "@/services/user-requests/user-requests";
import { useGetAllStaffQuery } from "@/services/stakeholders/stakeholders";
import { useGetSchoolsQuery } from "@/services/schools/schools";
import { toast } from "sonner";
import type { CreateUserRequestRequest } from "@/services/user-requests/user-request-types";

export function LogResourceAllocationForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const [openIssuedDate, setOpenIssuedDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);
  const [formData, setFormData] = useState({
    schoolId: "",
    staffMember: "",
    resourceCategory: "",
    itemName: "",
    assetTag: "",
    location: "",
    issuedDate: undefined as Date | undefined,
    expectedReturnDate: undefined as Date | undefined,
    condition: "",
  });

  const [createUserRequest, { isLoading: isSubmitting }] =
    useCreateUserRequestMutation();
  const { data: staffData, isLoading: isLoadingStaff } = useGetAllStaffQuery();
  const { data: schoolsData, isLoading: isLoadingSchools } =
    useGetSchoolsQuery();

  const resourceCategoryOptions = [
    "IT Equipment",
    "Physical Equipment",
    "Vehicle",
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
    if (!formData.resourceCategory) {
      toast.error("Please select a resource category");
      return;
    }
    if (!formData.itemName.trim()) {
      toast.error("Please enter an item name/model");
      return;
    }
    if (!formData.assetTag.trim()) {
      toast.error("Please enter an asset tag/serial number");
      return;
    }
    if (!formData.issuedDate) {
      toast.error("Please select an issued date");
      return;
    }
    if (!formData.condition.trim()) {
      toast.error("Please enter the condition upon issue");
      return;
    }

    try {
      const payload: CreateUserRequestRequest = {
        type: "allocation",
        school_id: formData.schoolId,
        title: `${formData.itemName} - ${formData.resourceCategory}`,
        staff_member_id: formData.staffMember,
        resource_category: formData.resourceCategory,
        item_name_model: formData.itemName,
        asset_tag_serial_no: formData.assetTag,
        issued_date: format(formData.issuedDate, "yyyy-MM-dd"),
        returned_date: formData.expectedReturnDate
          ? format(formData.expectedReturnDate, "yyyy-MM-dd")
          : undefined,
        condition_upon_issue: formData.condition,
        description: `Resource allocation: ${formData.itemName}${formData.location ? ` at ${formData.location}` : ""}`,
        status: "pending",
      };

      await createUserRequest(payload).unwrap();
      toast.success("Resource allocation logged successfully");

      // Reset form
      setFormData({
        schoolId: "",
        staffMember: "",
        resourceCategory: "",
        itemName: "",
        assetTag: "",
        location: "",
        issuedDate: undefined,
        expectedReturnDate: undefined,
        condition: "",
      });

      if (onSubmit) {
        onSubmit();
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to log resource allocation. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Asset Tracking Form
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
          label="Resource Category"
          placeholder="Select between IT equipment, physicals equipment, vehicle"
          value={formData.resourceCategory}
          onValueChange={(value) =>
            setFormData({ ...formData, resourceCategory: value })
          }
        >
          {resourceCategoryOptions.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectField>

        <InputField
          id="location"
          label="Location"
          placeholder="E.g., Room 405, Office Building A"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <InputField
          id="itemName"
          label="Item Name/Model"
          placeholder='E.g., "HP Laptop," "Room 405 Key," "Office Desk."'
          value={formData.itemName}
          onChange={(e) =>
            setFormData({ ...formData, itemName: e.target.value })
          }
        />

        <InputField
          id="assetTag"
          label="Asset Tag/Serial No."
          placeholder="placeholder"
          value={formData.assetTag}
          onChange={(e) =>
            setFormData({ ...formData, assetTag: e.target.value })
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <DatePickerIcon
            label="Issued Date"
            date={formData.issuedDate}
            setDate={(date) =>
              setFormData({
                ...formData,
                issuedDate:
                  typeof date === "function" ? date(formData.issuedDate) : date,
              })
            }
            open={openIssuedDate}
            setOpen={setOpenIssuedDate}
          />

          <DatePickerIcon
            label="Expected Return Date"
            date={formData.expectedReturnDate}
            setDate={(date) =>
              setFormData({
                ...formData,
                expectedReturnDate:
                  typeof date === "function"
                    ? date(formData.expectedReturnDate)
                    : date,
              })
            }
            open={openReturnDate}
            setOpen={setOpenReturnDate}
          />
        </div>

        <InputField
          id="condition"
          label="Condition upon Issue"
          placeholder="placeholder"
          value={formData.condition}
          onChange={(e) =>
            setFormData({ ...formData, condition: e.target.value })
          }
        />
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
          {isSubmitting ? "Allocating..." : "Allocate Resource"}
        </Button>
      </div>
    </div>
  );
}
