import api from "./axios";

export interface ReviewData {
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
