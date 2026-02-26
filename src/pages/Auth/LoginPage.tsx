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
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginAPI, facebookLoginAPI, loginAPI } from "@/api/auth.service";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";

import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginAPI({ email, password });
      if (response.success && response.user && response.token) {
        login(response.user, response.token);
        toast.success("Login Successful");
        navigate("/");
      } else if (response.success) {
        // Fallback if user object is not structured exactly as expected
        const userObj = response.user || {
          id: response.id || "",
          full_name: response.full_name || "User",
          email: email,
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
          const userObj = response.user || {
            id: response.id || "",
            full_name: response.full_name || "User",
            email: email,
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
          toast.success("Facebook Login Successful");
          navigate("/");
        } else if (res.success) {
          const userObj = res.user || {
            id: response.id || response.userID || "",
            full_name: response.name || "User",
            email: response.email || "",
            profile_image: response.picture?.data?.url || "",
          };
          login(userObj, res.token);
          toast.success("Facebook Login Successful");
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
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-gray-300 data-[state=checked]:bg-[#01722c]"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-emerald-700"
              >
                Remember me
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#01722c] hover:bg-[#015a23] text-white transition-all transform hover:scale-[1.01]"
            >
              Sign In
            </Button>
          </form>
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
              type="button"
              variant="outline"
              size="icon"
              onClick={() => googleLogin()}
              className="w-12 h-12 rounded-full border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-all"
            >
              <FcGoogle className="w-6 h-6" />
            </Button>

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

export default LoginPage;
