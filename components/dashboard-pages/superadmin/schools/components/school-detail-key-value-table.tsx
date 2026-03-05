"use client";

import { DataTable, type TableColumn } from "@/components/ui/data-table";
import type { KeyValueRow } from "../school-detail-types";

const COLUMNS: TableColumn<KeyValueRow>[] = [
  { key: "label", title: "Form Field" },
  { key: "value", title: "Content" },
];

interface SchoolDetailKeyValueTableProps {
  rows: KeyValueRow[];
}

export function SchoolDetailKeyValueTable({
  rows,
}: SchoolDetailKeyValueTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <DataTable<KeyValueRow>
        columns={COLUMNS}
        data={rows}
        showActionsColumn={false}
        headerClassName="bg-main-blue/10"
        getRowId={(_, i) => String(i)}
        emptyMessage="—"
      />
    </div>
  );
}
