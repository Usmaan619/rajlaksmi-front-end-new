import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { formatWeight } from "@/lib/utils";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-emerald-50 p-6 rounded-full mb-6">
          <ShoppingBag className="h-16 w-16 text-[#01722c]" />
        </div>
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-[#01722c] mb-8 max-w-md">
          Looks like you haven't added any of our fresh organic products to your
          cart yet.
        </p>
        <Link to="/products">
          <Button className="bg-[#01722c] hover:bg-[#0c9c43] text-white px-8 py-6 text-lg rounded-md shadow-lg transition-transform hover:scale-105">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-12 max-w-7xl bg-white mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
          Your Shopping Cart ({cartCount})
        </h1>
        <Link
          to="/products"
          className="text-emerald-700 hover:text-emerald-800 flex items-center font-medium group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-emerald-100 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-emerald-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/400x400?text=Rajlakshmi")
                      }
                    />
                  </div>
                  <div className="flex flex-col flex-grow text-left space-y-1 justify-center">
                    <h3 className="font-bold text-sm sm:text-lg text-emerald-900 line-clamp-2">
                      {item.name}
                    </h3>
                    {item.weight && (
                      <p className="text-xs sm:text-sm text-emerald-600">
                        Weight: {formatWeight(item.weight)}
                      </p>
                    )}
                    <p className="font-semibold text-sm sm:text-base text-emerald-700">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 sm:gap-3 min-w-[70px] sm:min-w-[120px] justify-between">
                    <div className="flex items-center border border-emerald-200 rounded-lg sm:rounded-full overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 sm:p-2 hover:bg-emerald-50 text-emerald-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <span className="px-2 sm:px-4 font-bold text-emerald-900 w-6 sm:w-10 text-center text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 sm:p-2 hover:bg-emerald-50 text-emerald-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 flex items-center text-xs sm:text-sm font-medium transition-colors"
                    >
                      <Trash2 size={14} className="mr-1" />{" "}
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-emerald-200 shadow-xl bg-gradient-to-br from-green-50 to-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600" />
            <CardHeader>
              <CardTitle className="text-xl text-[#01722c]">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-[#01722c]">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-[#01722c] font-mono">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Shipping</span>
                <span className="text-emerald-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Estimated Tax</span>
                <span className="text-emerald-600">₹0.00</span>
              </div>
              <Separator className="bg-emerald-200" />
              <div className="flex justify-between text-lg font-bold text-emerald-950">
                <span>Total Amount</span>
                <span className="font-mono">₹{cartTotal.toFixed(2)}</span>
              </div>

              <div className="pt-4 space-y-3">
                <div className="bg-emerald-100/50 rounded-lg p-3 text-xs text-emerald-800 border border-emerald-200">
                  <p className="font-bold mb-1">🌿 Leafy Perks</p>
                  <p>
                    You've saved enough for free eco-packaging on this order!
                  </p>
                </div>
                <Link to="/checkout" className="block w-full">
                  <Button className="w-full bg-[#01722c] hover:bg-emerald-800 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all transform hover:translate-y-[-2px]">
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
            <CardFooter className="bg-emerald-50 flex justify-center py-4">
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Cash on Delivery{" "}
                <span className="font-bold">Not Available</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
