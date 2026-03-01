import api from "./axios";

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  sort?: "new" | "old";
  search?: string;
  category?: string;
}

export const getAllBlogs = async (params: BlogQueryParams) => {
  const response = await api.get("/blogs/get-all-blogs", { params });
  return response.data;
};

export const getBlogCategories = async () => {
  const response = await api.get("/blogs/get-categories");
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await api.get(`/blogs/get-blog/${slug}`);
  return response.data;
};

export const getBlogById = async (id: string) => {
  const response = await api.get(`/blogs/get-blog-by-id/${id}`);
  return response.data;
};
