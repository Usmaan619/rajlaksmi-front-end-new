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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleLoginAPI, loginAPI } from "@/api/auth.service";
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        const response = await googleLoginAPI(credentialResponse.credential);
        if (response.success && response.user && response.token) {
          login(response.user, response.token);
          toast.success("Login Successful");
          navigate("/");
        } else if (response.success) {
          // Decode JWT for user info if backend doesn't return it
          const decoded: any = jwtDecode(credentialResponse.credential);
          const userObj = {
            id: decoded.sub,
            full_name: decoded.name,
            email: decoded.email,
            profile_image: decoded.picture,
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
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={
        import.meta.env.VITE_GOOGLE_CLIENT_ID ||
        "725826907762-oqshpfbtciv5n0coch74f91qurujp8r5.apps.googleusercontent.com"
      }
    >
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
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Login Failed")}
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
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
