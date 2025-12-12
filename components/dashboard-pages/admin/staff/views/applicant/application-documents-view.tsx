"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Document {
  type: string;
  fileName: string;
}

interface ApplicationDocumentsViewProps {
  documents: Document[];
  onViewDocument?: (fileName: string) => void;
}

export function ApplicationDocumentsView({
  documents,
  onViewDocument,
}: ApplicationDocumentsViewProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Application Documents</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-main-blue/5">
              <TableHead className="w-[200px]">Form Field</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="w-[150px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {doc.type}
                </TableCell>
                <TableCell className="text-gray-600">{doc.fileName}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDocument?.(doc.fileName)}
                    className="w-full"
                  >
                    View PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

