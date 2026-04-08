import { Button } from "@/components/ui/button";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/input-field";
import { SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface RefundAuthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FilterStudents({
  onOpenChange,
  open,
}: RefundAuthProps) {
  return (
    <ModalContainer
      open={open}
      title={"Filter"}
      onOpenChange={onOpenChange}
      size="3xl"
    >
      <form className="mt-3 flex flex-col gap-y-7 items-center">
        {/* sort by */}
        <SelectField
          label="Sort by"
          //   value={formData.applicableTerm}
          //   onValueChange={(term) =>
          //     setFormData((prev) => ({ ...prev, applicableTerm: term }))
          //   }
          onValueChange={() => {}}
          placeholder="Student ID (Default)"
        >
          {["ID", "Full name"].map((term, index) => (
            <SelectItem className={"capitalize"} key={index} value={term}>
              {term}
            </SelectItem>
          ))}
        </SelectField>
        {/* grade/class */}
        <SelectField
          label="Grade/Class"
          //   value={formData.applicableTerm}
          //   onValueChange={(term) =>
          //     setFormData((prev) => ({ ...prev, applicableTerm: term }))
          //   }
          onValueChange={() => {}}
          placeholder="All Classes"
        >
          {["JS 1", "JS 2", "JS 3", "SS 1", "SS 2", "SS 3"].map(
            (term, index) => (
              <SelectItem className={"capitalize"} key={index} value={term}>
                {term}
              </SelectItem>
            ),
          )}
        </SelectField>
        {/* status */}
        <SelectField
          label="Status"
          //   value={formData.applicableTerm}
          //   onValueChange={(term) =>
          //     setFormData((prev) => ({ ...prev, applicableTerm: term }))
          //   }
          onValueChange={() => {}}
          placeholder="All Status"
        >
          {["active", "on leave", "suspended", "graduated", "withdrawn"].map(
            (term, index) => (
              <SelectItem className={"capitalize"} key={index} value={term}>
                {term}
              </SelectItem>
            ),
          )}
        </SelectField>
        {/* at risk flag */}
        <div className="w-full justify-between flex items-center">
          <div className="space-y-1">
            <Label>At Risk Flag</Label>
            <CardDescription>Show Academic At-Risk Only</CardDescription>
          </div>
          <Checkbox />
        </div>
        {/* fin. status */}
        <SelectField
          label="Financial Status"
          //   value={formData.applicableTerm}
          //   onValueChange={(term) =>
          //     setFormData((prev) => ({ ...prev, applicableTerm: term }))
          //   }
          onValueChange={() => {}}
          placeholder="All Cases"
        >
          {["poor", "good", "moderate"].map((term, index) => (
            <SelectItem className={"capitalize"} key={index} value={term}>
              {term}
            </SelectItem>
          ))}
        </SelectField>
        <div className="grid grid-cols-2 gap-3 pt-4 w-full">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => console.log("testing")}>Apply Filters</Button>
        </div>
      </form>
    </ModalContainer>
  );
}
