"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import type { BrandingState } from "./add-school-form-state";

const IMAGE_ACCEPT = "image/png,image/svg+xml,image/jpeg,image/webp";

function ImageUploadField({
  label,
  description,
  file,
  onChange,
  inputRef,
  id,
}: {
  label: string;
  description: string;
  file: File | null;
  onChange: (file: File | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  id: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="file"
        id={id}
        accept={IMAGE_ACCEPT}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full justify-start h-24 min-h-[80px] py-4 px-4"
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-1 w-full text-center">
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {file ? file.name : "Image Upload"}
          </span>
        </div>
      </Button>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

interface BrandingFormProps {
  value: BrandingState;
  onChange: (next: BrandingState) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function BrandingForm({
  value,
  onChange,
  onNext,
  onBack,
  onCancel,
}: BrandingFormProps) {
  const primaryRef = useRef<HTMLInputElement | null>(null);
  const secondaryRef = useRef<HTMLInputElement | null>(null);
  const loginBgRef = useRef<HTMLInputElement | null>(null);
  const signatureRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Branding & White-Labeling
      </h2>

      <div className="space-y-6">
        <ImageUploadField
          id="primary-logo"
          label="Primary School Logo"
          description="Transparent PNG/SVG (Recommended for dark headers)."
          file={value.primaryLogoFile}
          onChange={(file) => onChange({ ...value, primaryLogoFile: file })}
          inputRef={primaryRef}
        />

        <ImageUploadField
          id="secondary-logo"
          label="Secondary School Logo"
          description="For light backgrounds and report card footers."
          file={value.secondaryLogoFile}
          onChange={(file) => onChange({ ...value, secondaryLogoFile: file })}
          inputRef={secondaryRef}
        />

        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            School Brand Colors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <div className="space-y-2">
              <Label className="text-sm">Primary Color</Label>
              <div className="flex gap-2 items-center h-9">
                <input
                  type="color"
                  className="h-9 w-12 shrink-0 rounded border border-input cursor-pointer p-0.5 bg-transparent"
                  value={value.primaryColor}
                  onChange={(e) =>
                    onChange({ ...value, primaryColor: e.target.value })
                  }
                />
                <Input
                  className="h-9 flex-1 min-w-0"
                  placeholder="Hex Code"
                  value={value.primaryColor}
                  onChange={(e) =>
                    onChange({ ...value, primaryColor: e.target.value })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground">Buttons/Links.</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Secondary Color</Label>
              <div className="flex gap-2 items-center h-9">
                <input
                  type="color"
                  className="h-9 w-12 shrink-0 rounded border border-input cursor-pointer p-0.5 bg-transparent"
                  value={value.secondaryColor}
                  onChange={(e) =>
                    onChange({ ...value, secondaryColor: e.target.value })
                  }
                />
                <Input
                  className="h-9 flex-1 min-w-0"
                  placeholder="Hex Code"
                  value={value.secondaryColor}
                  onChange={(e) =>
                    onChange({ ...value, secondaryColor: e.target.value })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground">Sidebars/Accents.</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Tertiary Color</Label>
              <div className="flex gap-2 items-center h-9">
                <input
                  type="color"
                  className="h-9 w-12 shrink-0 rounded border border-input cursor-pointer p-0.5 bg-transparent"
                  value={value.tertiaryColor}
                  onChange={(e) =>
                    onChange({ ...value, tertiaryColor: e.target.value })
                  }
                />
                <Input
                  className="h-9 flex-1 min-w-0"
                  placeholder="Hex Code"
                  value={value.tertiaryColor}
                  onChange={(e) =>
                    onChange({ ...value, tertiaryColor: e.target.value })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground">Buttons/Links.</p>
            </div>
          </div>
        </div>

        <ImageUploadField
          id="login-bg"
          label="Login Background"
          description="A high-res photo of the school gate or campus for the portal entry."
          file={value.loginBackgroundFile}
          onChange={(file) => onChange({ ...value, loginBackgroundFile: file })}
          inputRef={loginBgRef}
        />

        <ImageUploadField
          id="e-signature"
          label="Official E-Signature"
          description="Digital signature of the Principal/Registrar for report cards."
          file={value.eSignatureFile}
          onChange={(file) => onChange({ ...value, eSignatureFile: file })}
          inputRef={signatureRef}
        />
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
