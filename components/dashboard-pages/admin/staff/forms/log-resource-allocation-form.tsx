"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DatePickerIcon from "@/components/ui/date-picker";
import { SelectItem } from "@/components/ui/select";

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
    staffMember: "",
    resourceCategory: "",
    itemName: "",
    assetTag: "",
    issuedDate: undefined as Date | undefined,
    expectedReturnDate: undefined as Date | undefined,
    condition: "",
  });

  const resourceCategoryOptions = [
    "IT Equipment",
    "Physical Equipment",
    "Vehicle",
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log("Resource Allocation:", formData);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Asset Tracking Form
      </h2>

      <div className="space-y-6">
        <SelectField
          label="Staff Member"
          placeholder="Select staff member"
          value={formData.staffMember}
          onValueChange={(value) =>
            setFormData({ ...formData, staffMember: value })
          }
        >
          <SelectItem value="staff1">Mr. Chinedu Okafor</SelectItem>
          <SelectItem value="staff2">Mrs. Ada Okafor</SelectItem>
          <SelectItem value="staff3">Mr. Adekola</SelectItem>
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
                  typeof date === "function"
                    ? date(formData.issuedDate)
                    : date,
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
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Allocate Resource
        </Button>
      </div>
    </div>
  );
}

