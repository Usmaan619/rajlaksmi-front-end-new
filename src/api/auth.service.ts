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
}

/* SIGNUP */
export const signupAPI = async (payload: SignupPayload) => {
  const res = await api.post("/auth/signup", payload);
  setToken(res.data.token);
  return res.data;
};

/* LOGIN */
export const loginAPI = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  setToken(res.data.token);
  return res.data;
};

/* LOGOUT */
export const logout = () => clearToken();

