import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  Loader2,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { formatWeight } from "@/lib/utils";
import {
  getMyOrdersAPI,
  getTrackingStatusAPI,
  Order,
} from "@/api/order.service";
import { format } from "date-fns";
import { toast } from "sonner";

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [trackingInfo, setTrackingInfo] = useState<
    Record<number | string, any>
  >({});
  const [trackingLoading, setTrackingLoading] = useState<
    Record<number | string, boolean>
  >({});

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyOrdersAPI(user!.id);
      if (res.success) {
        setOrders(res.orders || []);
      }
    } catch (err) {
      console.error("Error fetching orders", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (orderId: string | number) => {
    if (trackingInfo[orderId]) {
      // Toggle view if already fetched (or refetch if you prefer)
      setTrackingInfo((prev) => {
        const next = { ...prev };
        delete next[orderId];
        return next;
      });
      return;
    }

    setTrackingLoading((prev) => ({ ...prev, [orderId]: true }));
    try {
      const res = await getTrackingStatusAPI(orderId);
      if (res.success) {
        setTrackingInfo((prev) => ({ ...prev, [orderId]: res.tracking }));
      } else {
        toast.error(res.message || "Could not fetch tracking info");
      }
    } catch (err) {
      toast.error("Error connecting to tracking service");
    } finally {
      setTrackingLoading((prev) => ({ ...prev, [orderId]: false }));
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

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(
          (o) =>
            getStatusKey(o.status || (o as any).STATUS) ===
            filter.toLowerCase(),
        );

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Order History
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and track your recent purchases
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md shadow-sm border border-slate-100">
            <Button
              aria-label="Filter orders"
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="h-9 px-4 rounded-md font-medium"
            >
              All
            </Button>
            <Button
              aria-label="Filter orders"
              variant={filter === "delivered" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("delivered")}
              className="h-9 px-4 rounded-md font-medium"
            >
              Delivered
            </Button>
            <Button
              aria-label="Filter orders"
              variant={filter === "processing" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("processing")}
              className="h-9 px-4 rounded-md font-medium"
            >
              Processing
            </Button>
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-white border-b border-slate-50 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Order #{order.order_number || order.id}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {format(new Date(order.created_at), "MMMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Total Amount
                        </p>
                        <p className="text-lg font-extrabold text-primary">
                          ₹{order.total_amount}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`h-9 px-4 gap-2 font-bold rounded-full capitalize ${statusColors[getStatusKey(order.status || (order as any).STATUS)]}`}
                      >
                        {
                          statusIcons[
                            getStatusKey(order.status || (order as any).STATUS)
                          ]
                        }
                        {order.status || (order as any).STATUS || "Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-0 bg-slate-50/30">
                  <div className="p-5 sm:p-6 space-y-4">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100"
                      >
                        <div className="h-16 w-16 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ShoppingBag className="text-slate-300" size={24} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Qty: {item.quantity}{" "}
                            {item.weight && `| ${formatWeight(item.weight)}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Tracking Info Section */}
                    {trackingInfo[order.id] && (
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl mt-4 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold">
                          <Truck size={18} />
                          Tracking Update
                        </div>
                        <p className="text-sm font-bold text-emerald-900">
                          Status: {trackingInfo[order.id].current_status}
                        </p>
                        {trackingInfo[order.id].awb_number && (
                          <p className="text-xs text-emerald-700 mt-1 font-medium">
                            AWB: {trackingInfo[order.id].awb_number} | Courier:{" "}
                            {trackingInfo[order.id].courier || "Assigned"}
                          </p>
                        )}
                        {trackingInfo[order.id].expected_delivery_date && (
                          <p className="text-xs text-emerald-700 mt-1">
                            Expected Delivery:{" "}
                            {trackingInfo[order.id].expected_delivery_date}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-5 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <AlertCircle size={14} />
                      Paid via {(order as any).payment_method || "ONLINE"}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        aria-label="Track order"
                        variant="outline"
                        size="sm"
                        onClick={() => handleTrackOrder(order.id)}
                        disabled={trackingLoading[order.id]}
                        className="font-bold gap-2 border-primary text-primary hover:bg-primary/5 rounded-lg"
                      >
                        {trackingLoading[order.id] ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Truck size={16} />
                        )}
                        {trackingInfo[order.id]
                          ? "Hide Tracking"
                          : "Track Order"}
                      </Button>
                      <Button
                        aria-label="View order details"
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="text-slate-600 font-bold gap-1 hover:bg-slate-50 rounded-lg"
                      >
                        Details
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white py-20 rounded-3xl border border-dashed border-slate-200 shadow-sm flex flex-col items-center justify-center text-center px-4">
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-slate-200" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              No orders found
            </h2>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              Looks like you haven't placed any orders yet. Start shopping to
              fill your history!
            </p>
            <Button
              aria-label="Shop products"
              className="mt-8 bg-primary hover:bg-forest  h-auto text-base font-medium rounded-md shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              onClick={() => navigate("/products")}
            >
              Shop Our Products
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 ">
          <Card className="border-none shadow-md rounded-2xl bg-[#116931] text-white overflow-hidden p-6 relative">
            <div className="space-y-4 relative z-10">
              <h3 className="text-xl font-bold uppercase tracking-wide">
                Refund Policy
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Customer satisfaction is our priority. If you receive a
                defective or damaged product, we offer a hassle-free refund
                within 7 days.
              </p>
              <Button
                aria-label="View refund policy"
                variant="secondary"
                size="sm"
                onClick={() => navigate("/returns")}
                className="font-medium gap-2 rounded-md transition-all hover:bg-white text-[#116931]"
              >
                View Policy <ExternalLink size={16} />
              </Button>
            </div>
            <Package
              size={100}
              className="absolute -bottom-6 -right-6 text-white/10 rotate-12"
            />
          </Card>

          <Card className="border-none shadow-md rounded-2xl bg-white overflow-hidden p-6 relative border border-slate-100">
            <div className="space-y-4 relative z-10">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Shipping Policy
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We ensure safe and timely delivery of your organic dairy
                products. Orders are delivered within 2-4 business days.
              </p>
              <Button
                aria-label="View shipping policy"
                variant="outline"
                size="sm"
                onClick={() => navigate("/shipping")}
                className="font-medium gap-2 rounded-md border-primary bg-white text-primary hover:bg-primary/5"
              >
                Shipping Details <ExternalLink size={16} />
              </Button>
            </div>
            <Truck
              size={100}
              className="absolute -bottom-6 -right-6 text-slate-100 rotate-0"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
