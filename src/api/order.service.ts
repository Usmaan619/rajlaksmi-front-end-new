import api from "./axios";

export interface OrderItem {
  id: number;
  product_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight?: string;
}

export interface Order {
  id: string | number;
  order_number: string;
  total_amount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  created_at: string;
  items: OrderItem[];
  shipping_address?: any;
}

/* GET ALL ORDERS FOR USER */
export const getMyOrdersAPI = async (userId: string | number) => {
  const res = await api.get(`/orders/user/${userId}`);
  return res.data;
};

/* GET ORDER DETAILS */
export const getOrderDetailsAPI = async (orderId: string | number) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
};

/* PLACE ORDER */
export const placeOrderAPI = async (payload: any) => {
  const res = await api.post("/checkout/order/place", payload);
  return res.data;
};
