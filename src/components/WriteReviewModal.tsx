import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { submitReview } from "@/api/feedback.service";
import { Rating } from "react-simple-star-rating";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const WriteReviewModal = ({
  isOpen,
  onClose,
  onSuccess,
}: WriteReviewModalProps) => {
  const { user } = useAuth();

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Prefill user data if logged in
  useEffect(() => {
    if (user && isOpen) {
      setName(user.full_name || "");
      setEmail(user.email || "");
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!name.trim() || !email.trim() || !review.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitReview({
        name,
        title,
        email,
        rating,
        feedback: review,
      });

      if (res.success) {
        toast.success(res.message || "Review submitted successfully!");
        setRating(0);
        setTitle("");
        setReview("");
        if (!user) {
          setName("");
          setEmail("");
        }
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Write a Review</h2>
            <p className="text-sm text-gray-500">
              Share your experience with this product
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Rating */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              <Rating
                onClick={handleRating}
                initialValue={rating}
                size={32}
                allowFraction
                transition
                fillColor="orange"
                emptyColor="gray"
                className="flex"
                SVGclassName="inline-block"
              />
              {rating > 0 && (
                <span className="ml-3 text-sm font-bold text-orange-500">
                  {rating}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Your Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="rounded-lg h-11 border-gray-200 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            {/* Title */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Review Title (e.g. CEO Founder)
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="CEO, Founder, Home Chef..."
                className="rounded-lg h-11 border-gray-200 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="rounded-lg h-11 border-gray-200 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {/* Review Body */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Your Review <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you like or dislike? How was the quality?"
              rows={4}
              className="rounded-xl border-gray-200 focus:ring-primary focus:border-primary resize-none p-3"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 rounded-lg border-gray-200 hover:bg-gray-50 text-gray-700 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 h-11 bg-primary text-white hover:bg-primary/90 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;
