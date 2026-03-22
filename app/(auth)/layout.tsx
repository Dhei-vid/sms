import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Blue background */}
      <div className="hidden lg:flex lg:w-1/2 bg-main-blue" />

      {/* Right side - White background with form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <Image src={"/logo/daraEd_icon.png"} width={200} height={200} alt="icon"/>
            <p className="text-lg text-gray-500">School Management System </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
