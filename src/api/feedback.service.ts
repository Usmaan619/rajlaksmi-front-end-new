import api from "./axios";

export interface ReviewData {
  product_id: string;
  name: string;
  title: string;
  email: string;
  rating: number;
  feedback: string;
}

export const submitReview = async (data: ReviewData) => {
  const response = await api.post("/users/feedback", data);
  return response.data;
};

export const getAllReviews = async () => {
  const response = await api.get("/users/allfeedback");
  return response.data;
};

export const getProductReviews = async (productId: string) => {
  const response = await api.get(`/users/productfeedback/${productId}`);
  return response.data;
};
