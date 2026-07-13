export interface Product {
  id: number;
  product_name: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  product_images: string | string[];
  product_thumbnail?: string;
  weight_options: string | string[];
  product_weight?: string | string[];
  product_price?: number;
  product_del_price?: number;
  product_purchase_price?: number;
  category_id: number;
  category_name?: string;
  short_description?: string;
  full_description?: string;
  health_benefits?: string;
  ingredients?: string;
  product_subtitle?: string;
  is_featured?: number;
  is_active?: number;
  product_stock?: number;
  gst_percent?: number;
  STATUS?: string;
  created_at?: string;
}

export interface GetAllProductsResponse {
  success: boolean;
  data?: Product[];
  products?: Product[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  weight?: string;
}
