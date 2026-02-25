import api from "./axios";
import { setToken, clearToken } from "@/utils/token";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  otp: string;
  newPassword: string;
}

/* SIGNUP */
export const signupAPI = async (payload: SignupPayload) => {
  const res = await api.post("/auth/signup", payload);
  if (res.data.success && res.data.token) {
    setToken(res.data.token);
  }
  return res.data;
};

/* LOGIN */
export const loginAPI = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  if (res.data.success && res.data.token) {
    setToken(res.data.token);
  }
  return res.data;
};

/* LOGOUT */
export const logout = () => clearToken();

/* GOOGLE LOGIN */
export const googleLoginAPI = async (token: string) => {
  const res = await api.post("/auth/google-login", { token });
  if (res.data.success && res.data.token) {
    setToken(res.data.token);
  }
  return res.data;
};

/* FORGOT PASSWORD */
export const forgotPasswordAPI = async (payload: ForgotPasswordPayload) => {
  const res = await api.post("/auth/forgot-password", payload);
  return res.data;
};

/* RESET PASSWORD */
export const resetPasswordAPI = async (payload: ResetPasswordPayload) => {
  const res = await api.post("/auth/reset-password", payload);
  return res.data;
};
