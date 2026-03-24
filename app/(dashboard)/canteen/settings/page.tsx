"use client";

import RefundAuthorizationModal from "@/components/dashboard-pages/canteen/refund-authorization-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@radix-ui/react-select";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="px-6 py-3">
          <h1 className="text-2xl font-semibold text-[#1B1B1B] mb-2 lg:text-3xl">
            Operations Settings Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            This dashboard ensures the Point of Sale (POS) is configured for a
            smooth, error-free lunch rush.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          {/* card headers */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="px-0">Refund Authorization</CardTitle>
              <CardDescription className="">
                Reconcile Sale Transaction Dispute
              </CardDescription>
            </div>
            <Button onClick={() => setModalOpen(true)} variant={"outline"}>
              Initiate Refund
            </Button>
          </div>
          <Separator className="border-none h-px bg-[#D4D4D4] my-4" />
          {/* low stock threshold */}
          <div className="space-y-2">
            <CardHeader className="px-0">Low Stock Threshold</CardHeader>
            <Input
              className="md:h-12 md:px-5"
              type="text"
              placeholder="e.g. 10"
            />
            <div className="w-full flex justify-end">
              <Button className="w-fit mt-2" variant={"outline"}>
                Save Changes
              </Button>
            </div>
          </div>
          {/* Max Single Transaction */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <CardHeader className="px-0 w-1/2">
                Max Single Transaction
              </CardHeader>
              <CardDescription className="italic">Read-Only</CardDescription>
            </div>
            <div className="relative">
              <Input
                readOnly
                value={"₦10,000"}
                type={showPassword ? "text" : "password"} //or password
                placeholder="Enter value"
                className="md:h-12 md:px-5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                // disabled={isLoading || isLoginLoading}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors disabled:opacity-50"
              >
                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-sm text-[#DC3545] italic">
              A safety cap to prevent accidental &rdquo;fat-finger&rdquo; errors
            </p>
          </div>
          {/* daily reconciliation */}
          <div className="flex items-center justify-between mt-8">
            <div>
              <CardHeader className="px-0">Daily Reconciliation</CardHeader>
              <CardDescription className="">
                Automatically emails the Bursar/Admin a summary of the
                day&apos;s sales at closing
              </CardDescription>
            </div>
            {/* <Button variant={"outline"}>Initiate Refund</Button> */}
            <Switch />
          </div>
        </CardContent>
      </Card>
      {/* refund auth modal */}
      {modalOpen && (
        <RefundAuthorizationModal
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  );
}
