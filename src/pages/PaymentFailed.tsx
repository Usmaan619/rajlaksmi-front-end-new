import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50/50">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
          <p className="text-gray-500 text-sm">
            Unfortunately, we were unable to process your payment. Your account
            has not been charged for this order.
          </p>
        </div>

        <div className="pt-6 space-y-3">
          {/* <Button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[#116931] hover:bg-[#0c9c43] text-white"
          >
            <RefreshCw className="mr-2 w-4 h-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/cart")}
            className="w-full bg-white border border-gray-100"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Cart
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
