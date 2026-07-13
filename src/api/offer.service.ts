import api from "./axios";
import axios from "axios";

export interface Offer {
  _id: string;
  offer: string;
  isActive: boolean;
  createdAt?: string;
}

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

export const getAllOffersAPI = async () => {
  try {
    const res = await api.get("/admin/getAllOffer");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
