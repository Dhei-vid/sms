"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/services/auth/auth";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Enhanced client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      const loginResponse = result.data;

      // Validate response structure
      if (!result?.data) {
        throw new Error("Invalid response from server");
      }

      if (!result.data.access_token) {
        throw new Error("No access token received");
      }

      if (!result.data.user) {
        throw new Error("No user data received");
      }

      dispatch(
        setCredentials({
          token: result.data.access_token,
          user: result.data.user,
        }),
      );

      // Small delay to ensure state is updated before navigation
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check if user is Super Admin
      if (loginResponse.user.role === 'admin' && loginResponse.user.permissions.length > 0) {
        const isSuperAdmin = loginResponse.user.permissions.includes("admin");
        if (isSuperAdmin) router.push("/superadmin/main")
      }

      // Check if user is canteen staff and redirect to store
      if (loginResponse.user.role === 'canteen') {
        router.push("/admin/store");
      }

      if (loginResponse.user.role === 'staff') {
        const isTeacher = loginResponse.user.permissions.includes("write");
        if (isTeacher) router.push("/admin/teacher");
      }

      if (loginResponse.user.role === 'student') {
        router.push("/admin/student");
      }

      if (loginResponse.user.role === 'parent') {
        router.push("/admin/parent");
      }
    } catch (err: any) {
      let errorMessage = "Invalid email or password. Please try again.";

      if (err?.data) {
        // API error response
        errorMessage = err.data.message || err.data.error || errorMessage;
      } else if (err?.message) {
        // JavaScript error
        errorMessage = err.message;
      } else if (err?.status) {
        // HTTP status error
        if (err.status === 401) {
          errorMessage = "Invalid email or password.";
        } else if (err.status === 403) {
          errorMessage = "Access forbidden. Please contact support.";
        } else if (err.status === 404) {
          errorMessage = "Authentication service not found.";
        } else if (err.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Enter Your Login Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email address
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isLoginLoading}
                className={cn(
                  "pl-10 h-11 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500",
                )}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isLoginLoading}
                className={cn(
                  "pl-10 pr-10 h-11 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500",
                )}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || isLoginLoading}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={isLoading || isLoginLoading}
            className="w-full h-11 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading || isLoginLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
