"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface DocumentField {
  id: string;
  label: string;
  format: string;
  fileType: "pdf" | "jpg";
}

const documentFields: DocumentField[] = [
  {
    id: "birthCertificate",
    label: "Birth Certificate",
    format: "First Name_Surname_Doc. Type.pdf",
    fileType: "pdf",
  },
  {
    id: "reportCard",
    label: "Previous Grade Final Report",
    format: "First Name_Surname_Doc. Type.pdf",
    fileType: "pdf",
  },
  {
    id: "degreeCertificate",
    label:
      "Degree Certificate (Junior Secondary W.A.E.C, Primary Common Entrance)",
    format: "First Name_Surname_Doc. Type.pdf",
    fileType: "pdf",
  },
  {
    id: "medicalReport",
    label: "Medical Report",
    format: "First Name_Surname_Doc. Type.pdf",
    fileType: "pdf",
  },
  {
    id: "passportPhoto",
    label: "Passport Photo",
    format: "First Name_Surname_Doc. Type.jpg",
    fileType: "jpg",
  },
];

export function DocumentUploadForm({
  onNext,
  onBack,
  onCancel,
}: {
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}) {
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const handleFileChange = (id: string, file: File | null) => {
    setFiles({ ...files, [id]: file });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Upload Documents</h2>

      <div className="space-y-6">
        {documentFields.map((field) => {
          const fileInputRef = useRef<HTMLInputElement>(null);

          return (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  id={field.id}
                  accept={field.fileType === "pdf" ? ".pdf" : ".jpg,.jpeg"}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleFileChange(field.id, file);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start h-auto min-h-[60px] py-4 px-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1 text-left">
                      {files[field.id] ? (
                        <span className="text-sm text-gray-600">
                          {files[field.id]?.name}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Upload {field.fileType.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <Upload className="h-4 w-4 text-gray-400 ml-2" />
                  </div>
                </Button>
              </div>
              <p className="text-xs text-red-600">(format: {field.format})</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onNext}
          className="w-60 bg-main-blue hover:bg-main-blue/90"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
