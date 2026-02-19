import { ContactFormData } from "@/validations/contact.validation";
import api from "./axios";
import axios from "axios";

/* TYPES */
export interface ContactFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  queryType: string;
  message: string;
}

/* BACKEND TYPE */
export interface ContactPayload {
  user_name: string;
  user_email: string;
  user_mobile: string;
  user_message: string;
  select_query_type: string;
}

/* COMMON ERROR HANDLER */
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Server error occurred";
    throw new Error(message);
  }

  throw new Error("Something went wrong. Please try again.");
};

export const createContactAPI = async (data: ContactFormData) => {
  try {
    const payload = {
      user_name: `${data.firstName} ${data.lastName}`,
      user_email: data.email,
      user_mobile: data.mobile,
      user_message: data.message,
      select_query_type: data.queryType,
      user_subject: data.queryType, // optional (same store kar diya)
    };

    const res = await api.post("/users/contact", payload);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

/* GET ALL CONTACTS (ADMIN PANEL) */
export const getAllContactsAPI = async () => {
  try {
    const res = await api.get("/contact/get-all-contact");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

/* DELETE CONTACT (ADMIN) */
export const deleteContactAPI = async (id: string) => {
  try {
    const res = await api.delete(`/contact/delete/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
