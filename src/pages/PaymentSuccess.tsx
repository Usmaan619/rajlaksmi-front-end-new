import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-white">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-500 text-sm">
            Thank you for your purchase. Your order has been placed successfully
            and we will send you a confirmation email shortly.
          </p>
        </div>

        <div className="pt-6 space-y-3">
          {/* <Button
            onClick={() => navigate("/orders")}
            className="w-full bg-[#01722c] hover:bg-[#0c9c43] text-white"
          >
            Track Order
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button> */}
          <Button
            aria-label="Continue shopping"
            variant="outline"
            onClick={() => navigate("/products")}
            className="w-full bg-white border border-gray-100"
          >
            <ShoppingBag className="mr-2 w-4 h-4" />
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
