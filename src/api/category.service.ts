import api from "./axios";

export interface Category {
  id: number;
  category_name: string;
  category_slug: string;
  category_description?: string;
}

export const getCategories = async (): Promise<{
  success: boolean;
  data: Category[];
}> => {
  const response = await api.get("/category/get-category");
  return response.data;
};
