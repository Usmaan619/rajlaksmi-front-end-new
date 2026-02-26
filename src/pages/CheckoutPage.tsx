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
  CreditCard,
  Truck,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  getAddressesAPI,
  saveAddressAPI,
  deleteAddressAPI,
  Address,
} from "@/api/user.service";
import { placeOrderAPI } from "@/api/order.service";

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

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

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

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    try {
      const data = await saveAddressAPI({
        ...newAddress,
        user_id: user.id,
        is_default: addresses.length === 0,
      });
      if (data.success) {
        toast.success("Address saved!");
        setIsAddingAddress(false);
        fetchAddresses();
        setNewAddress({
          full_name: "",
          phone: "",
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          pincode: "",
        });
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

    setIsLoading(true);
    try {
      const orderData = {
        user_id: user.id,
        total_amount: cartTotal + 50, // Including shipping
        shipping_address_id: selectedAddressId,
        items: cart,
        payment_method: paymentMethod,
      };

      const data = await placeOrderAPI(orderData);
      if (data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/orders");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShoppingBag className="h-20 w-20 text-emerald-100 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some products to continue checkout
        </p>
        <Button
          onClick={() => navigate("/products")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
          <CheckCircle2 className="text-emerald-500 h-6 w-6 sm:h-8 sm:w-8" />
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Section */}
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-white border-b border-emerald-50">
                <CardTitle className="flex items-center gap-2 text-emerald-800">
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
                              {addr.city}, {addr.state} - {addr.pincode}
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
                  <form onSubmit={handleSaveAddress} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Full Name</Label>
                        <Input
                          required
                          value={newAddress.full_name}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              full_name: e.target.value,
                            })
                          }
                          placeholder="Ex: John Doe"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Phone Number</Label>
                        <Input
                          required
                          value={newAddress.phone}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              phone: e.target.value,
                            })
                          }
                          placeholder="10 digit mobile number"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Address Line 1</Label>
                      <Input
                        required
                        value={newAddress.address_line1}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            address_line1: e.target.value,
                          })
                        }
                        placeholder="House No, Building Name, Street"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Address Line 2 (Optional)</Label>
                      <Input
                        value={newAddress.address_line2}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            address_line2: e.target.value,
                          })
                        }
                        placeholder="Landmark, Area, etc."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label>City</Label>
                        <Input
                          required
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>State</Label>
                        <Input
                          required
                          value={newAddress.state}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              state: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Pincode</Label>
                        <Input
                          required
                          value={newAddress.pincode}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              pincode: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      >
                        Save Address
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsAddingAddress(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Payment Method Section */}
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
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <Card className="border-none shadow-md sticky top-10">
              <CardHeader className="bg-emerald-900 rounded-t-xl py-6">
                <CardTitle className="text-white flex justify-between items-center">
                  Order Summary
                  <span className="text-emerald-400 text-sm font-normal">
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
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-emerald-50 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Qty: {item.quantity}{" "}
                            {item.weight && `| ${item.weight}`}
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
                  className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98]"
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
