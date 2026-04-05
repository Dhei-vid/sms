import { SelectItem } from "@/components/ui/select";
import { InputField, SelectField } from "@/components/ui/input-field";
import DatePickerIcon from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

export default function AssignmentConfiguration() {
  const courseOptions = [
    {
      value: "Unit 3: Algebra",
      label: "Unit 3: Algebra",
    },
    {
      value: "Unit 3: Economics",
      label: "Unit 3: Economics",
    },
    {
      value: "Unit 3: English",
      label: "Unit 3: English",
    },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Assignment Configuration
      </h2>
      <div className="space-y-6 w-full mt-5">
        {/* title */}
        <InputField
          label="Title"
          required
          placeholder="e.g. Algebra Unit Review Quiz"
        />
        {/* assign to course */}
        <SelectField
          label="Assign to Course"
          //   value={newResource.courseAssigned}
          //   onValueChange={(e) => {
          //     setNewResource((prevState) => {
          //       return {
          //         ...prevState,
          //         courseAssigned: e,
          //       };
          //     });
          //   }}
          onValueChange={() => {}}
          placeholder="Select Course"
        >
          {courseOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectField>
        {/* target student */}
        <InputField
          label="Target Student"
          required
          className="cursor-not-allowed"
          value={"JS 2 Students (based on the course selected above)"}
          readOnly
        />
        {/* total marks */}
        <InputField
          label="Total Marks"
          required
          placeholder="Number Input (e.g., 25)"
        />
        {/* Due Date & Time */}
        <DatePickerIcon
          label="Due Date & Time"
          //   date={formData.date}
          date={new Date()}
          // //   setDate={(date) => {
          // //     onFormDataChange({
          // //       date: typeof date === "function" ? date(formData.date) : date,
          // //     });
          //   }}
          setDate={() => {}}
          //   open={dateOpen}
          //   setOpen={setDateOpen}
          placeholder="mm/dd/yy"
        />
        {/* action btns */}
        <div className="flex justify-end gap-3 pt-4">
          {/* <Button variant="outline">Back</Button> */}
          <Button
            className="w-60"
            // onClick={onSaveAndSelectQuestions}
            // disabled={isLoading}
          >
            {/* {isLoading ? "Creating…" : "Save & Select Questions"} */}
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
