import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const forgotForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", newPassword: "" },
  });

  const onForgotSubmit = async (values: ForgotPasswordValues) => {
    setSubmitting(true);
    try {
      const resp = await forgotPasswordAPI({ email: values.email });
      if (resp.success) {
        setUserEmail(values.email);
        setIsSubmitted(true);
      } else {
        toast.error(resp.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const onResetSubmit = async (values: ResetPasswordValues) => {
    setSubmitting(true);
    try {
      const resp = await resetPasswordAPI({
        otp: values.otp,
        newPassword: values.newPassword,
      });
      if (resp.success) {
        setIsResetDone(true);
      } else {
        toast.error(resp.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error resetting password");
    } finally {
      setSubmitting(false);
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
                ? `We've sent an OTP to ${userEmail}`
                : "Enter your email address and we'll send you an OTP to reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <Form {...forgotForm}>
              <form
                onSubmit={forgotForm.handleSubmit(onForgotSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={forgotForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            {...field}
                            placeholder="name@example.com"
                            type="email"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#01722c] hover:bg-[#015a23] text-white shadow-lg transition-transform hover:scale-[1.01]"
                >
                  {submitting ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            </Form>
          ) : !isResetDone ? (
            <Form {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(onResetSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={resetForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP received on email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            {...field}
                            placeholder="Enter 6-digit OTP"
                            type="text"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={resetForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            {...field}
                            placeholder="Enter new password"
                            type="password"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#01722c] hover:bg-[#015a23] text-white shadow-lg transition-transform hover:scale-[1.01]"
                >
                  {submitting ? "Resetting..." : "Reset Password"}
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
            </Form>
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
