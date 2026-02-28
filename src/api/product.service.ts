import api from "./axios";
import { GetAllProductsResponse, GetProductsParams } from "@/types/product";

export const getProducts = async (
  params: GetProductsParams,
): Promise<GetAllProductsResponse> => {
  const response = await api.get<GetAllProductsResponse>(
    "/products/get_all_products",
    {
      params,
    },
  );
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
