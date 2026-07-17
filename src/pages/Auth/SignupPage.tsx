import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
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

import {
  googleLoginAPI,
  signupAPI,
} from "@/api/auth.service";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";


const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;
import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setSubmitting(true);
    try {
      const response = await signupAPI({
        name: values.fullName,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });

      if (response.success) {
        if (response.user && response.token) {
          login(response.user, response.token);
          toast.success("Signup Successful");
          navigate("/");
        } else {
          toast.success("Signup Successful");
          navigate("/login");
        }
      } else {
        toast.error(response.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup API error", err);
      toast.error("An error occurred during signup.");
    } finally {
      setSubmitting(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await googleLoginAPI(tokenResponse.access_token);
        if (response.success && response.user && response.token) {
          login(response.user, response.token);
          toast.success("Login Successful");
          navigate("/");
        } else if (response.success) {
          // Fallback user object
          const userObj = {
            id: response.id || "",
            full_name: response.full_name || "User",
            email: "",
          };
          login(userObj, response.token);
          toast.success("Login Successful");
          navigate("/");
        } else {
          toast.error(response.message || "Google Login failed");
        }
      } catch (err) {
        console.error("Google Login API error", err);
        toast.error("An error occurred during Google login.");
      }
    },
    onError: () => console.log("Google Login Failed"),
  });



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 py-12">
      <Card className="w-full max-w-lg shadow-2xl border-none">
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
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create Account
          </CardTitle>
          <CardDescription>
            Join the Rajlakshmi Javiks family today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            {...field}
                            placeholder="John Doe"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            {...field}
                            placeholder="+91 9876543210"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                          />
                          <button
                            aria-label="Toggle password visibility"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start space-x-2 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-gray-300 data-[state=checked]:bg-[#116931]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-emerald-600 underline font-bold"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-emerald-600 underline font-bold"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                aria-label="Sign Up"
                type="submit"
                disabled={submitting}
                className="w-full bg-[#116931] hover:bg-[#015a23] text-white transition-all transform hover:scale-[1.01]"
              >
                {submitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className=" px-2 text-gray-500 font-medium">
                Or sign up with
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              aria-label="Sign Up with Google"
              type="button"
              variant="outline"
              size="icon"
              onClick={() => googleLogin()}
              className="w-12 h-12 rounded-full border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </Button>

          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-center text-sm ">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-emerald-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

const SignupPageWrapper = () => (
  <GoogleOAuthProvider
    clientId={
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      "491514149599-2ibhndmia5bo2aubbv1qonavc8ckpu08.apps.googleusercontent.com"
    }
  >
    <SignupPage />
  </GoogleOAuthProvider>
);

export default SignupPageWrapper;
