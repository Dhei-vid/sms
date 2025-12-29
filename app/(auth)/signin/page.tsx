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
import { getRolePath } from "@/utils/menu-utils";

/**
 * Sign In Page Component
 * Handles user authentication and login flow
 * Connects to Redux store for state management and API for authentication
 */
export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Local state for form inputs
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // RTK Query mutation hook for login API call
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  /**
   * Handle form submission
   * Validates inputs, calls login API, and manages authentication state
   * 
   * @param e - Form submission event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Call login API endpoint
      const result = await login({ email, password }).unwrap();

      // Dispatch credentials to Redux store
      // This updates the auth state and persists to localStorage
      dispatch(
        setCredentials({
          token: result.token,
          user: result.user,
        })
      );

      // Navigate to appropriate dashboard based on user role
      const dashboardPath = getRolePath(result.user.role, "dashboard");
      router.push(dashboardPath);
    } catch (err: any) {
      // Handle login errors
      setError(
        err?.data?.message ||
          err?.message ||
          "Invalid email or password. Please try again."
      );
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
                  "pl-10 h-11 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
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
                  "pl-10 pr-10 h-11 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
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
