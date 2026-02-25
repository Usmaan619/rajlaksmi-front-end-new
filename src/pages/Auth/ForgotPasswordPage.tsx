import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle2, Lock, KeyRound } from "lucide-react";
import { forgotPasswordAPI, resetPasswordAPI } from "@/api/auth.service";

import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await forgotPasswordAPI({ email });
      if (resp.success) {
        setIsSubmitted(true);
      } else {
        alert(resp.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await resetPasswordAPI({ otp, newPassword });
      if (resp.success) {
        setIsResetDone(true);
      } else {
        alert(resp.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      alert("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={RLJLOGOJAVIK}
              alt="Rajlakshmi"
              className="h-16 w-auto"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/100x100?text=Rajlakshmi")
              }
            />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-emerald-900">
            {isResetDone
              ? "Password Reset Successful"
              : isSubmitted
                ? "Enter OTP"
                : "Forgot Password?"}
          </CardTitle>
          <CardDescription className="text-emerald-600">
            {isResetDone
              ? "You can now login with your new password"
              : isSubmitted
                ? `We've sent an OTP to ${email}`
                : "Enter your email address and we'll send you an OTP to reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#01722c] hover:bg-[#015a23] text-white shadow-lg transition-transform hover:scale-[1.01]"
              >
                Send OTP
              </Button>
            </form>
          ) : !isResetDone ? (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP received on email</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    type="text"
                    className="pl-10"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="newPassword"
                    placeholder="Enter new password"
                    type="password"
                    className="pl-10"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#01722c] hover:bg-[#015a23] text-white shadow-lg transition-transform hover:scale-[1.01]"
              >
                Reset Password
              </Button>
              <div className="mt-4 text-center">
                <p className="text-sm text-emerald-700">
                  Didn't receive the email?
                </p>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Another Email
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
              <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <Button
                variant="outline"
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Link to="/login" className="w-full">
                  Go to Login
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link
            to="/login"
            className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
