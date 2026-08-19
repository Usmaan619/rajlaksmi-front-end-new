import React, { useState } from "react";
import api from "@/api/axios";
import { toast } from "sonner";
import { Tag, X, CheckCircle } from "lucide-react";

interface CouponBoxProps {
  cartTotal: number;
  onApply: (discount: number, finalPrice: number, couponCode: string) => void;
  onRemove: () => void;
  liveDiscount?: number;
}

const CouponBox: React.FC<CouponBoxProps> = ({ cartTotal, onApply, onRemove, liveDiscount }) => {
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);

  const handleApply = async () => {
    if (!couponCode.trim()) {
      toast.warning("Please enter a coupon code.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/users/checkout/apply-coupon`, {
        code: couponCode.toUpperCase(),
        cartTotal: cartTotal,
      });

      if (response.data.success) {
        const { discount, finalPrice } = response.data;
        setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
        onApply(discount, finalPrice, couponCode.toUpperCase());
        toast.success(response.data.message || "Coupon applied!");
      } else {
        toast.error(response.data.message || "Invalid coupon.");
      }
    } catch (error: any) {
      console.error("Coupon apply error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to apply coupon.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    onRemove();
    toast.info("Coupon removed.");
  };

  return (
    <div className="my-4 py-3 border-y border-dashed border-gray-300">
      {!appliedCoupon ? (
        <div className="flex bg-white border-2 border-gray-200 rounded-lg overflow-hidden transition-all duration-300 focus-within:border-[#4b3109]">
          <div className="relative flex-1 flex items-center">
            <Tag size={18} className="absolute left-3 text-[#4b3109]" />
            <input
              type="text"
              placeholder="ENTER COUPON CODE"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="w-full py-3 pr-3 pl-10 border-none outline-none text-sm font-semibold tracking-wide text-gray-800 placeholder-gray-400"
            />
          </div>
          <button
            onClick={handleApply}
            disabled={loading}
            className="px-6 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] text-black border-none cursor-pointer font-bold text-[13px] transition-all duration-300 border-l border-gray-200 hover:not(:disabled):from-[#ffed4e] hover:not(:disabled):to-[#ffd700] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "APPLYING..." : "APPLY"}
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center p-3 bg-[#f7d48622] border-2 border-[#f7d486] rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} color="#4b3109" />
            <span className="text-[#4b3109] text-sm font-medium">
              <strong>{appliedCoupon.code}</strong> Applied (-₹{liveDiscount ?? appliedCoupon.discount})
            </span>
          </div>
          <button 
            onClick={handleRemove} 
            className="bg-transparent border-none text-[#4b3109] cursor-pointer flex items-center p-1 rounded-full transition-colors duration-200 hover:bg-black/5 hover:text-red-500"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponBox;
