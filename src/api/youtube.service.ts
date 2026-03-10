import api from "./axios";

export const getYoutubeShorts = async () => {
  const response = await api.get("/admin/shorts/all");
  return response.data;
};
