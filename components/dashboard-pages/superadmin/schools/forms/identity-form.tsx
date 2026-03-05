"use client";

import { format } from "date-fns";
import { InputField, SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import type { IdentityState } from "./add-school-form-state";

const COUNTRY_CODES = [
  { value: "+234", label: "+234" },
  { value: "+233", label: "+233" },
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
  { value: "+91", label: "+91" },
  { value: "+81", label: "+81" },
];

const SCHOOL_TYPES = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "tertiary", label: "Tertiary" },
];

const TERM_OPTIONS = [
  { value: "2", label: "2 Terms" },
  { value: "3", label: "3 Terms" },
  { value: "4", label: "4 Terms" },
];

interface IdentityFormProps {
  value: IdentityState;
  onChange: (next: IdentityState) => void;
  onNext: () => void;
  onCancel: () => void;
}

export function IdentityForm({
  value,
  onChange,
  onNext,
  onCancel,
}: IdentityFormProps) {
  const establishedDate = value.establishedDate
    ? new Date(value.establishedDate)
    : undefined;
  const setEstablishedDate = (d: React.SetStateAction<Date | undefined>) => {
    const next = typeof d === "function" ? d(establishedDate) : d;
    onChange({
      ...value,
      establishedDate: next ? format(next, "yyyy-MM-dd") : "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Identity & Technical Infrastructure
      </h2>

      <div className="space-y-4">
        <div>
          <InputField
            label="School Full Name"
            placeholder="placeholder"
            value={value.schoolName}
            onChange={(e) => onChange({ ...value, schoolName: e.target.value })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            The official name used on certificates and reports.
          </p>
        </div>

        <InputField
          label="School Address"
          placeholder="placeholder"
          value={value.address}
          onChange={(e) => onChange({ ...value, address: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Primary School Email"
            type="email"
            placeholder="example@school.edu"
            value={value.primaryEmail}
            onChange={(e) =>
              onChange({ ...value, primaryEmail: e.target.value })
            }
          />
          <div className="flex flex-col gap-2">
            <Label className="text-sm">Contact Phone</Label>
            <div className="flex rounded-md border border-input shadow-xs overflow-hidden focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring">
              <Select
                value={value.countryCode}
                onValueChange={(v) => onChange({ ...value, countryCode: v })}
              >
                <SelectTrigger className="h-9 w-[7rem] rounded-none border-0 border-r border-input bg-muted/30 shadow-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className="h-9 flex-1 rounded-none border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Phone number"
                value={value.contactPhone}
                onChange={(e) =>
                  onChange({ ...value, contactPhone: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="School Type"
            placeholder="placeholder"
            value={value.schoolType}
            onValueChange={(v) => onChange({ ...value, schoolType: v })}
          >
            {SCHOOL_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectField>
          <div>
            <DatePicker
              label="Established Date"
              date={establishedDate}
              setDate={setEstablishedDate}
              placeholder="mm/dd/yy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Accreditation Number"
            placeholder="placeholder"
            value={value.accreditationNumber}
            onChange={(e) =>
              onChange({ ...value, accreditationNumber: e.target.value })
            }
          />
          <InputField
            label="License Number"
            placeholder="placeholder"
            value={value.licenseNumber}
            onChange={(e) =>
              onChange({ ...value, licenseNumber: e.target.value })
            }
          />
        </div>

        <InputField
          label="School Website Domain"
          placeholder="example.school.edu"
          value={value.websiteDomain}
          onChange={(e) =>
            onChange({ ...value, websiteDomain: e.target.value })
          }
        />
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-800 mb-3">
          Academic Structure
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Default Terms"
            value={value.defaultTerms}
            onValueChange={(v) => onChange({ ...value, defaultTerms: v })}
          >
            {TERM_OPTIONS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectField>
          <InputField
            label="Start Academic Session"
            placeholder="e.g. 2026/2027"
            value={value.academicSession}
            onChange={(e) =>
              onChange({ ...value, academicSession: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onNext}>
          Confirm & Update
        </Button>
      </div>
    </div>
  );
}
