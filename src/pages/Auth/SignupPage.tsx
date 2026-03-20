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
  facebookLoginAPI,
  signupAPI,
} from "@/api/auth.service";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const FacebookLogin = React.lazy(() =>
  import("@greatsumini/react-facebook-login"),
);
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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

  const handleFacebookSuccess = async (response: {
    accessToken: string;
    id?: string;
    userID?: string;
    name?: string;
    email?: string;
    picture?: { data: { url: string } };
  }) => {
    if (response.accessToken) {
      try {
        const res = await facebookLoginAPI(response.accessToken);
        if (res.success && res.user && res.token) {
          login(res.user, res.token);
          toast.success("Login Successful");
          navigate("/");
        } else if (res.success) {
          const userObj = res.user || {
            id: response.id || response.userID || "",
            full_name: response.name || "User",
            email: response.email || "",
            profile_image: response.picture?.data?.url || "",
          };
          login(userObj, res.token);
          toast.success("Login Successful");
          navigate("/");
        } else {
          toast.error(res.message || "Facebook Login failed");
        }
      } catch (err) {
        console.error("Facebook Login API error", err);
        toast.error("An error occurred during Facebook login.");
      }
    }
  };

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
              <FcGoogle className="w-6 h-6" />
            </Button>

            <React.Suspense fallback={null}>
              <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_APP_ID || "733633632296577"}
                autoLoad={false}
                fields="name,email,picture"
                onSuccess={handleFacebookSuccess}
                onFail={(error: any) => {
                  console.log("Login Failed!", error);
                }}
                onProfileSuccess={React.useCallback(
                  (response: {
                    name?: string;
                    email?: string;
                    picture?: { data: { url: string } };
                  }) => {
                    console.log("Get Profile Success!", response);
                  },
                  [],
                )}
                render={({ onClick }) => (
                  <Button
                    aria-label="Sign Up with Facebook"
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={onClick}
                    className="w-12 h-12 rounded-full border-gray-200 hover:bg-gray-50 text-[#1877F2] flex items-center justify-center transition-all"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </Button>
                )}
              />
            </React.Suspense>
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
      "725826907762-oqshpfbtciv5n0coch74f91qurujp8r5.apps.googleusercontent.com"
    }
  >
    <SignupPage />
  </GoogleOAuthProvider>
);

export default SignupPageWrapper;
