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
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLoginAPI, loginAPI } from "@/api/auth.service";
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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    try {
      const response = await loginAPI({
        email: values.email,
        password: values.password,
      });
      if (response.success && response.user && response.token) {
        login(response.user, response.token);
        toast.success("Login Successful");
        navigate("/");
      } else if (response.success) {
        // Fallback if user object is not structured exactly as expected
        const userObj = response.user || {
          id: response.id || "",
          full_name: response.full_name || "User",
          email: values.email,
        };
        login(userObj, response.token);
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err) {
      console.error("Login API error", err);
      toast.error("An error occurred during login.");
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
          // If backend doesn't return user, we might need to fetch it from google with the access_token
          // For now, let's assume backend handles it.
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
          <CardTitle className="text-3xl font-bold tracking-tight ">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
                      >
                        Forgot password?
                      </Link>
                    </div>
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
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
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
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-gray-300 data-[state=checked]:bg-[#116931]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-emerald-700">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                aria-label="Sign In"
                disabled={submitting}
                className="w-full bg-[#116931] hover:bg-[#015a23] text-white transition-all transform hover:scale-[1.01]"
              >
                {submitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              aria-label="Sign In with Google"
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
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-emerald-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

const LoginPageWrapper = () => (
  <GoogleOAuthProvider
    clientId={
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      "491514149599-2ibhndmia5bo2aubbv1qonavc8ckpu08.apps.googleusercontent.com"
    }
  >
    <LoginPage />
  </GoogleOAuthProvider>
);

export default LoginPageWrapper;
