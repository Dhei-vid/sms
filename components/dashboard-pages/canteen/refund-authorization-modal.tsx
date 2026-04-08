import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalContainer } from "@/components/ui/modal-container";

interface RefundAuthProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RefundAuthorizationModal({
  onOpenChange,
  open,
}: RefundAuthProps) {
  return (
    <ModalContainer
      open={open}
      title={"Refund Authorization"}
      onOpenChange={onOpenChange}
      size="3xl"
    >
      <form className="mt-3 flex flex-col gap-y-7 items-center">
        <div className="flex flex-col gap-y-3 w-full">
          <Label htmlFor="studentId">Student&apos;s ID</Label>
          <Input placeholder="Enter ID" className="lg:h-12 lg:px-5" />
        </div>
        <div className="flex flex-col gap-y-3 w-full">
          <Label htmlFor="studentId">Amount</Label>
          <div className="relative">
            <Input className="lg:h-12 pl-8 lg:pr-5" />
            <p className="absolute left-3 top-1 lg:top-2.5">₦</p>
          </div>
        </div>
        <Button className="h-12 w-1/2 lg:w-[394px]">Initiate Refund</Button>
      </form>
    </ModalContainer>
  );
}
