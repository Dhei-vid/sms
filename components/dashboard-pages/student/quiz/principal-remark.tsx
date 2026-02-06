"use client";

interface PrincipalRemarkProps {
  remark?: string;
}

export function PrincipalRemark({
  remark = "Any information or instruction the teacher wishes to pass under the given topic.",
}: PrincipalRemarkProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Principal Remark</h3>
      <p className="text-sm text-gray-600">{remark}</p>
    </div>
  );
}
