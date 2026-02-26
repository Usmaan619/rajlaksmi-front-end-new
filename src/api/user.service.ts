import api from "./axios";

export interface Address {
  id: number;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  mobile_number?: string;
  profile_image?: string;
}

/* GET USER PROFILE */
export const getProfileAPI = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};

/* UPDATE USER PROFILE */
export const updateProfileAPI = async (payload: Partial<UserProfile>) => {
  const res = await api.put("/auth/update-profile", payload);
  return res.data;
};

/* GET USER ADDRESSES */
export const getAddressesAPI = async (userId: string | number) => {
  const res = await api.get(`/checkout/address/${userId}`);
  return res.data;
};

/* SAVE ADDRESS */
export const saveAddressAPI = async (payload: any) => {
  const res = await api.post("/checkout/address/save", payload);
  return res.data;
};

/* DELETE ADDRESS */
export const deleteAddressAPI = async (addressId: number) => {
  const res = await api.delete(`/checkout/address/${addressId}`);
  return res.data;
};
