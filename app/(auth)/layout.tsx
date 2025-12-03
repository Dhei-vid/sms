import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Royal blue background */}
      <div className="hidden lg:flex lg:w-1/2 bg-main-blue" />

      {/* Right side - White background with form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Title and Subtitle */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">PH-SMS</h1>
            <p className="text-lg text-gray-500">
              Penetralia Hub School Management System
            </p>
          </div>

          {/* Form content passed as children */}
          {children}
        </div>
      </div>
    </div>
  );
}
