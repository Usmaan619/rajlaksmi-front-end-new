import axios, { AxiosError } from "axios";
import { ENV } from "@/config/env";
import { getToken, clearToken } from "@/utils/token";

const api = axios.create({
  baseURL: "https://api.rajlakshmijaviks.com",
  // baseURL: "http://localhost:5001",

  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

/* ===============================
   REQUEST INTERCEPTOR → TOKEN
================================ */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ===============================
   RESPONSE INTERCEPTOR → ERROR
================================ */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    // ❌ No response → Network / CORS / Server down
    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your internet connection."),
      );
    }

    const { status, data } = error.response;

    const message =
      data?.message || data?.error || "Something went wrong. Please try again.";

    // 🔐 Unauthorized or Invalid Token → Auto logout
    if (
      status === 401 ||
      message.toLowerCase().includes("invalid token") ||
      message.toLowerCase().includes("token expire")
    ) {
      clearToken();
      localStorage.removeItem("user_data");
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    // ⚠️ Other backend errors
    return Promise.reject(new Error(message));
  },
);

export default api;

// import axios from "axios";
// import { ENV } from "@/config/env";
// import { getToken, clearToken } from "@/utils/token";

// const api = axios.create({
//   baseURL: ENV.API_BASE_URL,
//   // timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* REQUEST INTERCEPTOR → TOKEN */
// api.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// /* RESPONSE INTERCEPTOR → AUTO LOGOUT */
// api.interceptors.response.use(
//   (res: any) => res,
//   (err: any) => {
//     if (err.response?.status === 401) {
//       clearToken();
//       window.location.href = "/admin";
//     }
//     return Promise.reject(err);
//   },
// );

// export default api;
