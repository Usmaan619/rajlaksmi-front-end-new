import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ChevronRight,
  Search,
  ExternalLink,
  ShoppingBag,
  Loader2,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { getMyOrdersAPI, Order } from "@/api/order.service";
import { format } from "date-fns";

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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
    } finally {
      setLoading(false);
    }
  };

  const statusIcons: Record<string, any> = {
    Pending: <Clock size={16} />,
    Processing: <Loader2 size={16} className="animate-spin" />,
    Shipped: <Truck size={16} />,
    Delivered: <CheckCircle2 size={16} />,
    Cancelled: <XCircle size={16} />,
  };

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Processing: "bg-blue-100 text-blue-700 border-blue-200",
    Shipped: "bg-purple-100 text-purple-700 border-purple-200",
    Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter.toLowerCase());

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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
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
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="h-9 px-4 rounded-md font-medium"
            >
              All
            </Button>
            <Button
              variant={filter === "delivered" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("delivered")}
              className="h-9 px-4 rounded-md font-medium"
            >
              Delivered
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("pending")}
              className="h-9 px-4 rounded-md font-medium"
            >
              In Progress
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
                        className={`h-9 px-4 gap-2 font-bold rounded-full ${statusColors[order.status]}`}
                      >
                        {statusIcons[order.status]}
                        {order.status}
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
                        <div className="h-16 w-16 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Qty: {item.quantity}{" "}
                            {item.weight && `| ${item.weight}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-5 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <AlertCircle size={14} />
                      Payments via Cash on Delivery
                    </p>
                    <Button
                      variant="ghost"
                      className="text-primary font-bold gap-2 hover:bg-primary/5"
                    >
                      Order Details
                      <ChevronRight size={18} />
                    </Button>
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
              className="mt-8 bg-primary hover:bg-forest  h-auto text-base font-medium rounded-md shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              onClick={() => navigate("/products")}
            >
              Shop Our Products
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          <Card className="border-none shadow-md rounded-2xl bg-primary text-white overflow-hidden p-6 relative">
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
                variant="secondary"
                size="sm"
                className="font-medium gap-2 rounded-md transition-all hover:bg-white text-primary"
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
                variant="outline"
                size="sm"
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
