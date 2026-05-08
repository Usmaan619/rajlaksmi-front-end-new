import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ShieldCheck,
  Tag,
  Package,
  ChevronRight,
  Minus,
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  getAddressesAPI,
  saveAddressAPI,
  deleteAddressAPI,
  Address,
} from "@/api/user.service";
import api from "@/api/axios";
import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";



/* ─── Zod Schema ─────────────────────────────────────────────── */
const addressSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  address_line1: z.string().min(5, "Address must be at least 5 characters"),
  address_line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits"),
  country: z.string().min(2, "Country is required"),
});
type AddressFormValues = z.infer<typeof addressSchema>;

/* ─── Razorpay / fbq global types ────────────────────────────── */
declare global {
  interface Window {
    Razorpay: any;
    fbq: any;
  }
}

/* ═══════════════════════════════════════════════════════════════
   CHECKOUT PAGE
═══════════════════════════════════════════════════════════════ */
const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, removeFromCart, updateQuantity } =
    useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /* ─── State ─────────────────────────────────────────────────── */
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [shippingInfo, setShippingInfo] = useState<{
    charge: number;
    courier: string;
    estimate: string;
    totalWeight: number;
  } | null>(null);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  /* ─── Computed values ───────────────────────────────────────── */
  const gstTotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          acc + ((item.price * (item.gst_percent || 0)) / 100) * item.quantity,
        0,
      ),
    [cart],
  );

  const hasGST = gstTotal > 0;
  const shippingCharge = shippingInfo?.charge || 0;
  const grandTotal = cartTotal + gstTotal + shippingCharge;

  /* ─── Address Form ──────────────────────────────────────────── */
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

  /* ─── Load Razorpay script ──────────────────────────────────── */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  /* ─── Fetch addresses on mount ──────────────────────────────── */
  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    } else {
      setIsFetching(false);
    }
  }, [user?.id]);

  /* ─── Re-fetch shipping when address or cart changes ────────────────── */
  useEffect(() => {
    if (selectedAddressId && cart.length > 0) {
      const addr = addresses.find((a) => a.id === selectedAddressId);
      if (addr) fetchShippingRates(addr.pincode);
    }
  }, [selectedAddressId, cart]);

  /* ─── API Calls ─────────────────────────────────────────────── */
  const fetchAddresses = async () => {
    if (!user?.id) return;
    setIsFetching(true);
    try {
      const data = await getAddressesAPI(user.id);
      if (data.success) {
        setAddresses(data.addresses);
        const defaultAddr = data.addresses.find((a: Address) => a.is_default);
        const firstAddr = data.addresses[0];
        const toSelect = defaultAddr || firstAddr;
        if (toSelect) {
          setSelectedAddressId(toSelect.id);
          fetchShippingRates(toSelect.pincode);
        }
      }
    } catch {
      toast.error("Failed to load your saved addresses");
    } finally {
      setIsFetching(false);
    }
  };

  const fetchShippingRates = async (pincode: string) => {
    if (!pincode || pincode.length < 6) return;
    setIsShippingLoading(true);
    setShippingError(null);

    try {
      const response = await api.post("/checkout/get-shipping", {
        cartItems: cart.map((item) => ({
          name:     item.name,
          weight:   item.weight,
          quantity: item.quantity,
          price:    item.price,
        })),
        pincode,
      });

      if (response.data.success) {
        const { shippingCharge, courierName, estimatedDelivery, totalWeight, slabInfo } = response.data;
        setShippingInfo({
          charge:      shippingCharge,
          courier:     slabInfo?.label || courierName || "Standard Courier",
          estimate:    estimatedDelivery,
          totalWeight: totalWeight,
        });
      } else {
        setShippingError(response.data.message || "Shipping not available for this pincode");
        setShippingInfo(null);
      }
    } catch {
      setShippingError("Could not calculate shipping. Please retry.");
      setShippingInfo(null);
    } finally {
      setIsShippingLoading(false);
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
        toast.success("Address saved successfully!");
        setIsAddingAddress(false);
        addressForm.reset();
        fetchAddresses();
      }
    } catch {
      toast.error("Failed to save address. Please try again.");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      const data = await deleteAddressAPI(id);
      if (data.success) {
        toast.success("Address removed");
        if (selectedAddressId === id) {
          setSelectedAddressId(null);
          setShippingInfo(null);
        }
        fetchAddresses();
      }
    } catch {
      toast.error("Failed to delete address");
    }
  };

  /* ─── Place Order ───────────────────────────────────────────── */
  const handlePlaceOrder = async () => {
    if (!user?.id) {
      toast.error("Please login to place your order");
      navigate("/login");
      return;
    }
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }
    if (isShippingLoading) {
      toast.error("Please wait while shipping is being calculated");
      return;
    }

    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId,
    );
    if (!selectedAddress) {
      toast.error("Invalid address selected");
      return;
    }

    try {
      setIsLoading(true);

      const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      const payload = {
        user_total_amount: grandTotal,
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
        user_landmark: selectedAddress.address_line2 || "",
      };

      const res = await api.post("/users/create-order", payload);

      if (!res.data.success) {
        toast.error(res.data.message || "Order creation failed");
        return;
      }

      const order = res.data.razorpay_order;

      if (!order) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/payment-success");
        return;
      }

      const options = {
        key: "rzp_test_qcl3EzwXvpMnwS",
        amount: order.amount,
        currency: order.currency,
        name: "Rajlakshmi Javiks International",
        description: "Order Payment",
        image: RLJLOGOJAVIK,
        order_id: order.id,
        prefill: {
          name: user.full_name || selectedAddress.full_name,
          email: user.email,
          contact:
            (user as any).phone ||
            (user as any).mobile_number ||
            selectedAddress.phone,
        },
        handler: async function (rzpResponse: any) {
          try {
            setIsLoading(true);
            const validateRes = await api.post("/users/status", {
              rzpResponse,
              ...order,
            });
            const result = validateRes.data;

            if (result.success) {
              // Meta Pixel Purchase Event
              try {
                if (window.fbq && cart.length > 0) {
                  window.fbq("track", "Purchase", {
                    content_ids: cart.map((item) => item.id),
                    content_type: "product",
                    value: subtotal,
                    currency: "INR",
                  });
                }
              } catch (err) {
                console.error("Meta pixel error:", err);
              }

              clearCart();
              sessionStorage.removeItem("cart");
              navigate("/payment-success");
            } else {
              navigate("/payment-failed");
            }
          } catch {
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => setIsLoading(false),
        },
        theme: { color: "#116931" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment Error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Empty Cart ────────────────────────────────────────────── */
  if (cart.length === 0) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-8 bg-white">
        <div className="bg-emerald-50 p-8 rounded-full mb-6">
          <ShoppingBag className="h-20 w-20 text-emerald-200" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-slate-500 mb-8 text-center max-w-sm">
          Add some products to continue to checkout and enjoy our fresh organic
          products.
        </p>
        <Button
          aria-label="Shop Now"
          onClick={() => navigate("/products")}
          className="bg-[#116931] hover:bg-emerald-800 text-white font-bold px-8 h-12 rounded-xl"
        >
          SHOP NOW
        </Button>
      </div>
    );
  }

  /* ─── Not Logged In ─────────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-8 bg-white">
        <div className="bg-emerald-50 p-8 rounded-full mb-6">
          <ShieldCheck className="h-20 w-20 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Login Required
        </h2>
        <p className="text-slate-500 mb-8 text-center max-w-sm">
          Please login or create an account to complete your purchase.
        </p>
        <div className="flex gap-3">
          <Button
            aria-label="Login"
            onClick={() => navigate("/login")}
            className="bg-[#116931] hover:bg-emerald-800 text-white font-bold px-8 h-12 rounded-xl"
          >
            LOGIN
          </Button>
          <Button
            aria-label="Continue Shopping"
            variant="outline"
            onClick={() => navigate("/products")}
            className="h-12 rounded-xl px-6 border-emerald-300 text-emerald-700"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  /* ─── Main Render ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#116931] flex items-center gap-3">
            <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
            Secure Checkout
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
            <Link
              to="/cart"
              className="hover:text-emerald-600 transition-colors"
            >
              Cart
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-emerald-700 font-semibold">Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Address + Cart Items ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Review */}
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center justify-between text-slate-800">
                  <span className="flex items-center gap-2 text-base">
                    <Package className="h-5 w-5 text-emerald-600" />
                    Your Items
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-slate-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://placehold.co/64x64?text=RLJ")
                        }
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.weight && `${item.weight} • `}₹
                        {item.price.toFixed(2)} each
                        {item.gst_percent && item.gst_percent > 0 && (
                          <span className="ml-1 text-emerald-600">
                            +{item.gst_percent}% GST
                          </span>
                        )}
                      </p>
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-md border border-slate-200 bg-white flex items-center justify-center hover:border-emerald-400 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3 text-slate-600" />
                        </button>
                        <span className="text-sm font-bold text-slate-700 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-md border border-slate-200 bg-white flex items-center justify-center hover:border-emerald-400 transition-colors"
                        >
                          <Plus className="h-3 w-3 text-slate-600" />
                        </button>
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <p className="font-bold text-emerald-700 text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-xs text-emerald-600 font-medium hover:text-emerald-800 transition-colors pt-1"
                >
                  <ChevronRight className="h-3 w-3" />
                  Edit cart
                </Link>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-none shadshadow-lg-sm">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-800 text-base">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {isFetching ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="animate-spin text-emerald-500 h-8 w-8" />
                  </div>
                ) : !isAddingAddress ? (
                  <div className="space-y-4">
                    {addresses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {addresses.map((addr) => (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              selectedAddressId === addr.id
                                ? "border-emerald-500 bg-emerald-50/40 shadshadow-lg-sm"
                                : "border-slate-200 hover:border-emerald-300 bg-white"
                            }`}
                          >
                            {/* Selected indicator */}
                            {selectedAddressId === addr.id && (
                              <div className="absolute top-3 right-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              </div>
                            )}

                            <div className="flex justify-between items-start mb-2 pr-6">
                              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                                <UserIcon className="h-3.5 w-3.5 text-emerald-600" />
                                {addr.full_name}
                              </h4>
                              <button
                                aria-label="Delete Address"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(addr.id);
                                }}
                                className="text-slate-300 hover:text-red-400 transition-colors ml-2"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2 mb-1">
                              {addr.address_line1}
                              {addr.address_line2
                                ? `, ${addr.address_line2}`
                                : ""}
                            </p>
                            <p className="text-xs text-slate-600 mb-2">
                              {addr.city}, {addr.state} — {addr.pincode}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Phone className="h-3 w-3" />
                              {addr.phone}
                            </div>
                            {addr.is_default && (
                              <span className="absolute bottom-3 right-3 bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                Default
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <MapPin className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">
                          No saved addresses yet
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          Add an address below to continue
                        </p>
                      </div>
                    )}

                    <Button
                      aria-label="Add New Address"
                      variant="outline"
                      onClick={() => setIsAddingAddress(true)}
                      className="w-full h-11 border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 gap-2 font-semibold rounded-xl"
                    >
                      <Plus className="h-4 w-4" />
                      Add New Address
                    </Button>
                  </div>
                ) : (
                  /* ── Address Form ── */
                  <div className="space-y-5">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-amber-800">
                        Please fill in correct delivery details for a smooth
                        experience.
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
                                <FormLabel className="text-slate-700 font-semibold text-sm">
                                  Full Name *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="e.g. Rahul Sharma"
                                    className="rounded-lg"
                                  />
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
                                <FormLabel className="text-slate-700 font-semibold text-sm">
                                  Mobile Number *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="10-digit mobile number"
                                    type="tel"
                                    maxLength={10}
                                    className="rounded-lg"
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
                              <FormLabel className="text-slate-700 font-semibold text-sm">
                                Address Line 1 *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="House / Flat No., Building, Street"
                                  className="rounded-lg"
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
                              <FormLabel className="text-slate-700 font-semibold text-sm">
                                Address Line 2{" "}
                                <span className="text-slate-400 font-normal">
                                  (Optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Landmark, Colony, Area"
                                  className="rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-semibold text-sm">
                                  City *
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} className="rounded-lg" />
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
                                <FormLabel className="text-slate-700 font-semibold text-sm">
                                  State *
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} className="rounded-lg" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="pincode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-semibold text-sm">
                                  Pincode *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    maxLength={6}
                                    placeholder="6-digit pincode"
                                    className="rounded-lg"
                                    onChange={(e) => {
                                      const val = e.target.value.replace(
                                        /\D/g,
                                        "",
                                      );
                                      field.onChange(val);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={addressForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold text-sm">
                                Country *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="India"
                                  className="rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-3 pt-2">
                          <Button
                            aria-label="Save Address"
                            type="submit"
                            className="flex-1 bg-[#116931] hover:bg-emerald-800 font-bold h-11 rounded-xl"
                          >
                            SAVE ADDRESS
                          </Button>
                          <Button
                            aria-label="Cancel"
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsAddingAddress(false);
                              addressForm.reset();
                            }}
                            className="flex-1 font-bold h-11 rounded-xl"
                          >
                            CANCEL
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-10 ">
              {[
                { icon: ShieldCheck, text: "Secure Payment" },
                { icon: Truck, text: "Fast Delivery" },
                { icon: Tag, text: "Best Prices" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-2 p-4 shadow-lg bg-white rounded-xl border border-slate-100 shadshadow-lg-sm"
                >
                  <Icon className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-600 text-center">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="space-y-4">
            <Card className="border-none shadshadow-lg-sm sticky top-4">
              {/* Header */}
              <CardHeader className="bg-[#116931] rounded-t-xl py-5 px-6">
                <CardTitle className="text-white flex justify-between items-center">
                  <span className="text-lg font-extrabold">Order Summary</span>
                  <Badge className="bg-white/20 text-white border-none text-xs font-semibold hover:bg-white/20">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} items
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                {/* Breakdown rows */}
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₹{cartTotal.toFixed(2)}
                    </span>
                  </div>

                  {hasGST && (
                    <div className="flex justify-between text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-emerald-500" />
                        GST
                      </span>
                      <span className="font-semibold text-emerald-700">
                        +₹{gstTotal.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-1.5">
                    <div className="flex justify-between text-sm font-semibold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-emerald-600" />
                        Shipping
                      </span>
                      {isShippingLoading ? (
                        <span className="flex items-center gap-1 text-slate-400 font-normal">
                          <Loader2 className="animate-spin h-3 w-3" />
                          Calculating...
                        </span>
                      ) : shippingInfo ? (
                        <span className="text-emerald-700 font-bold">
                          {shippingInfo.charge > 0
                            ? `₹${shippingInfo.charge.toFixed(2)}`
                            : "FREE"}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs">
                          Select address
                        </span>
                      )}
                    </div>

                    {shippingInfo && (
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>{shippingInfo.courier || "Courier Partner"}</span>
                        <span>Est. {shippingInfo.estimate || "3-7 days"}</span>
                      </div>
                    )}

                    {shippingError && !isShippingLoading && (
                      <div className="flex items-center justify-between text-xs text-red-500">
                        <span>{shippingError}</span>
                        <button
                          className="text-emerald-600 font-semibold underline ml-2"
                          onClick={() => {
                            const addr = addresses.find(
                              (a) => a.id === selectedAddressId,
                            );
                            if (addr) fetchShippingRates(addr.pincode);
                          }}
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-slate-800 text-base">
                    Total
                  </span>
                  <span className="font-extrabold text-emerald-900 text-xl">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>

                {hasGST && (
                  <p className="text-[11px] text-slate-400 -mt-2">
                    Includes ₹{gstTotal.toFixed(2)} GST
                  </p>
                )}
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                <Button
                  aria-label="Place Order"
                  onClick={handlePlaceOrder}
                  disabled={
                    isLoading ||
                    !selectedAddressId ||
                    isShippingLoading ||
                    isAddingAddress
                  }
                  className="w-full h-13 bg-[#116931] hover:bg-emerald-800 text-white font-extrabold text-base rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 py-4"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5" />
                      PLACE ORDER NOW
                    </span>
                  )}
                </Button>

                <p className="text-[10px] text-center text-slate-400 leading-relaxed">
                  By placing your order, you agree to Rajlakshmi Javik's{" "}
                  <Link
                    to="/privacy-policy"
                    className="underline hover:text-emerald-600"
                  >
                    Privacy Policy
                  </Link>{" "}
                  &{" "}
                  <Link
                    to="/terms-and-conditions"
                    className="underline hover:text-emerald-600"
                  >
                    Terms of Use
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>

            {/* Security note */}
            <div className="flex items-center gap-2 justify-center text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>256-bit SSL secured checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
