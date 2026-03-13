import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  User as UserIcon,
  Trash2,
  Plus,
  CheckCircle2,
  ShoppingBag,
  Truck,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const addressSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address_line1: z.string().min(5, "Address must be at least 5 characters"),
  address_line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Pincode must be at least 6 digits"),
  country: z.string().min(2, "Country is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAddressesAPI,
  saveAddressAPI,
  deleteAddressAPI,
  Address,
} from "@/api/user.service";
import api from "@/api/axios";
import { formatWeight } from "@/lib/utils";
import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";

declare global {
  interface Window {
    Razorpay: any;
    fbq: any;
  }
}

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    } else {
      setIsFetching(false);
    }
  }, [user?.id]);

  const fetchAddresses = async () => {
    if (!user?.id) return;
    setIsFetching(true);
    try {
      const data = await getAddressesAPI(user.id);
      if (data.success) {
        setAddresses(data.addresses);
        const defaultAddr = data.addresses.find((a: Address) => a.is_default);
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
        else if (data.addresses.length > 0)
          setSelectedAddressId(data.addresses[0].id);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const onAddressSubmit = async (values: AddressFormValues) => {
    if (!user?.id) return;
    try {
      const data = await saveAddressAPI({
        ...values,
        address_line2: values.address_line2 || "",
        user_id: user.id,
        is_default: addresses.length === 0,
      });
      if (data.success) {
        toast.success("Address saved!");
        setIsAddingAddress(false);
        fetchAddresses();
        addressForm.reset();
      }
    } catch (error) {
      toast.error("Failed to save address");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      const data = await deleteAddressAPI(id);
      if (data.success) {
        toast.success("Address removed");
        fetchAddresses();
        if (selectedAddressId === id) setSelectedAddressId(null);
      }
    } catch (error) {
      toast.error("Error deleting address");
    }
  };

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      setIsLoading(true);

      const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      const selectedAddress = addresses.find(
        (addr) => addr.id === selectedAddressId,
      );

      if (!selectedAddress) {
        toast.error("Invalid shipping address selected");
        setIsLoading(false);
        return;
      }

      const payload = {
        user_total_amount: subtotal + 50, // total + shipping
        purchase_price: cart[0]?.price || 0,
        product_quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
        cart: cart.map(({ image, ...item }) => item),
        user_id: user.id,
        user_name: selectedAddress.full_name,
        user_email: user.email,
        user_mobile_num: selectedAddress.phone,
        shipping_address_id: selectedAddressId,
        payment_method: "ONLINE",
        user_state: selectedAddress.state,
        user_city: selectedAddress.city,
        user_pincode: selectedAddress.pincode,
        user_country: selectedAddress.country,
        user_house_number: selectedAddress.address_line1,
        user_landmark: selectedAddress.address_line2,
      };

      console.log("Payment Payload:", payload);

      const res = await api.post("/users/create-order", payload);

      if (!res.data.success) {
        toast.error(res.data.message || "Order creation failed");
        setIsLoading(false);
        return;
      }

      const order = res.data.razorpay_order;

      if (!order) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/payment-success");
        setIsLoading(false);
        return;
      }

      console.log("User:--------------------------->", user);
      const options = {
        // key: "rzp_live_woFUpWK35AZbcn",
        key: "rzp_test_qcl3EzwXvpMnwS",
        amount: order.amount,
        currency: order.currency,
        name: "Rajlakshmi Javiks International",
        description: "Order Payment",
        image: RLJLOGOJAVIK,
        order_id: order.id,
        prefill: {
          name: user.full_name || order.notes?.user_name,
          email: user.email || order.notes?.user_email,
          contact:
            (user as any).phone ||
            (user as any).mobile_number ||
            order.notes?.user_mobile_num,
        },
        handler: async function (rzpResponse: any) {
          try {
            setIsLoading(true);

            const validateRes = await api.post("/users/status", {
              rzpResponse,
              ...order,
            });

            const result = validateRes.data;
            console.log("Payment Validation Response:", result);

            if (result.success) {
              // ===== META PURCHASE EVENT =====
              try {
                if (window.fbq && cart.length > 0) {
                  const contentIds = cart.map((item) => item.id);
                  const totalValue = subtotal;

                  window.fbq("track", "Purchase", {
                    content_ids: contentIds,
                    content_type: "product",
                    value: totalValue,
                    currency: "INR",
                  });
                }
              } catch (err) {
                console.error("Purchase pixel error:", err);
              }
              // ===== END META EVENT =====

              clearCart();
              sessionStorage.removeItem("cart");

              setIsLoading(false);
              navigate("/payment-success");
            } else {
              setIsLoading(false);
              navigate("/payment-failed");
            }
          } catch (e) {
            setIsLoading(false);
            toast.error("Payment validation failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setIsLoading(false);
    } catch (err: any) {
      console.error("Payment Error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4">
        <ShoppingBag className="h-20 w-20 text-emerald-100 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some products to continue checkout
        </p>
        <Button
          onClick={() => navigate("/products")}
          className="bg-[#01722c] hover:bg-[#0c9c43] text-white"
        >
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#01722c] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
          <CheckCircle2 className="text-[#01722c] h-6 w-6 sm:h-8 sm:w-8" />
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Section */}
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-white border-b border-emerald-50">
                <CardTitle className="flex items-center gap-2 text-[#01722c]">
                  <Truck className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isFetching ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-primary h-8 w-8" />
                  </div>
                ) : !isAddingAddress ? (
                  <div className="space-y-4">
                    {addresses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              selectedAddressId === addr.id
                                ? "border-emerald-500 bg-emerald-50/30"
                                : "border-slate-100 hover:border-emerald-200"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-emerald-900 inline-flex items-center gap-2 text-sm md:text-base">
                                <UserIcon className="h-4 w-4" />{" "}
                                {addr.full_name}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(addr.id);
                                }}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mb-1 line-clamp-2">
                              {addr.address_line1}, {addr.address_line2}
                            </p>
                            <p className="text-sm text-slate-600 mb-2">
                              {addr.city}, {addr.state}, {addr.country} -{" "}
                              {addr.pincode}
                            </p>
                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                              <Phone className="h-3 w-3" /> {addr.phone}
                            </div>
                            {addr.is_default && (
                              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg rounded-tr-sm font-bold">
                                DEFAULT
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-500">No addresses saved yet</p>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => setIsAddingAddress(true)}
                      className="w-full h-12 border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 gap-2 font-semibold"
                    >
                      <Plus className="h-5 w-5" /> Add New Address
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center gap-3">
                      <div className="bg-amber-100 p-1.5 rounded-full">
                        <Truck className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium text-amber-800">
                        Please fill in correct details for a smooth delivery.
                      </p>
                    </div>

                    <Form {...addressForm}>
                      <form
                        onSubmit={addressForm.handleSubmit(onAddressSubmit)}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Ex: John Doe" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        <FormField
                          control={addressForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="10 digit mobile number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={addressForm.control}
                        name="address_line1"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 1</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="House No, Building Name, Street"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                      />
                      <FormField
                        control={addressForm.control}
                        name="address_line2"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 2 (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Landmark, Area, etc."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ex: India" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="submit"
                          className="flex-1 bg-[#01722c] hover:bg-[#01722c]"
                        >
                          Save Address
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddingAddress(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                    </Form>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method Section
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-white border-b border-emerald-50">
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === "COD" ? "border-emerald-500 bg-emerald-50/30" : "border-slate-100"}`}
                    onClick={() => setPaymentMethod("COD")}
                  >
                    <RadioGroupItem value="COD" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex-1 cursor-pointer font-bold text-slate-700"
                    >
                      Cash on Delivery (COD)
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 opacity-60 cursor-not-allowed border-slate-100`}
                  >
                    <RadioGroupItem value="ONLINE" id="online" disabled />
                    <Label
                      htmlFor="online"
                      className="flex-1 font-bold text-slate-400"
                    >
                      Online Payment (Coming Soon)
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card> */}
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <Card className="border-none shadow-md  sticky top-10">
              <CardHeader className="bg-[#01722c] rounded-t-xl py-6">
                <CardTitle className="text-white flex justify-between items-center">
                  Order Summary
                  <span className="text-[#01722c] text-sm font-normal">
                    {cart.length} items
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4 last:mb-0"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Qty: {item.quantity}{" "}
                            {item.weight && `| ${formatWeight(item.weight)}`}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-emerald-700">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Shipping Fee</span>
                    <span>₹50</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold text-emerald-900 border-t border-slate-100 pt-3 mt-3">
                    <span>Total</span>
                    <span>₹{cartTotal + 50}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isLoading || !selectedAddressId}
                  className="w-full h-14 bg-[#01722c]   hover:bg-[#0c9c43] text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      Processing...
                    </span>
                  ) : (
                    "Place Order Now"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <p className="text-[10px] text-center text-slate-400 px-4">
              By placing your order, you agree to Rajlakshmi Javik's privacy
              notice and conditions of use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

// Today task:-
//  Add product and category API services and types, refactor product listing and detail pages, and update application typography to Nunito.
//  Implement product filtering and pagination for product listings, and add detailed description fields to products.
