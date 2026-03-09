import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ChevronLeft,
  ShoppingBag,
  Loader2,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { formatWeight } from "@/lib/utils";
import { getOrderDetailsAPI, Order } from "@/api/order.service";
import { format } from "date-fns";
import { toast } from "sonner";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const res = await getOrderDetailsAPI(id as string);
      if (res.success) {
        // Backend returns `{ success: true, order: {...}, items: [...] }`
        setOrder({ ...res.order, items: res.items });
      } else {
        toast.error("Order not found");
        navigate("/orders");
      }
    } catch (err) {
      console.error("Error fetching order details", err);
      toast.error("Failed to load order details");
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  const statusIcons: Record<string, any> = {
    pending: <Clock size={16} />,
    processing: <Loader2 size={16} className="animate-spin" />,
    shipped: <Truck size={16} />,
    delivered: <CheckCircle2 size={16} />,
    cancelled: <XCircle size={16} />,
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const getStatusKey = (status: string) => status?.toLowerCase() || "pending";

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading order details...
        </p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/orders")}
          className="gap-2 text-slate-600 hover:text-slate-900 -ml-4"
        >
          <ChevronLeft size={20} />
          Back to Orders
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Order #{order.order_number || order.id}
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Placed on {format(new Date(order.created_at), "MMMM dd, yyyy 'at' hh:mm a")}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`h-10 px-5 gap-2 text-sm font-bold rounded-full capitalize ${statusColors[getStatusKey(order.status || (order as any).STATUS)]}`}
          >
            {statusIcons[getStatusKey(order.status || (order as any).STATUS)]}
            {order.status || (order as any).STATUS || "Pending"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <div className="bg-white border-b border-slate-50 p-5 sm:p-6 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Items Ordered</h3>
              </div>
              <CardContent className="p-0 bg-slate-50/30">
                <div className="p-5 sm:p-6 space-y-4">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
                    >
                      <div className="h-20 w-20 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ShoppingBag className="text-slate-300" size={32} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-lg truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                          Qty: {item.quantity}{" "}
                          {item.weight && `| ${formatWeight(item.weight)}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">
                          ₹{item.price * item.quantity}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Package size={20} className="text-primary" /> Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                      <span>Subtotal</span>
                      <span>₹{order.total_amount}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                      <span>Shipping</span>
                      <span className="text-emerald-600">Free</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 -mx-6 px-6 py-4 mt-6">
                      <span className="text-base font-bold text-slate-900">Total</span>
                      <span className="text-xl font-extrabold text-primary">
                        ₹{order.total_amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 ">
                    Payment Details
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <AlertCircle size={16} className="text-primary" />
                      Method: {(order as any).payment_method || "ONLINE"}
                    </p>
                    <Badge className={`border-none capitalize ${(order as any).payment_status === "completed" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}`}>
                      {(order as any).payment_status || "pending"}
                    </Badge>
                  </div>
                </div>

                {order.shipping_address && (
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 ">
                      Shipping Information
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="font-bold text-slate-800">
                        {order.shipping_address.full_name}
                      </p>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {order.shipping_address.address_line1}
                        <br />
                        {order.shipping_address.address_line2 && (
                          <>{order.shipping_address.address_line2}<br/></>
                        )}
                        {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
                        <br />
                        {order.shipping_address.country}
                      </p>
                      <p className="text-sm font-medium text-slate-700 mt-3 pt-3 border-t border-slate-200/60">
                        Phone: {order.shipping_address.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
