import { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WriteReviewModal = ({ isOpen, onClose }: WriteReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (!name.trim() || !review.trim()) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
    setRating(0);
    setName("");
    setTitle("");
    setReview("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 md:p-8 border border-border animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
        >
          <X className="h-4 w-4 text-foreground" />
        </button>

        <h2 className="font-heading text-xl font-bold text-foreground mb-1">
          Write a Review
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Share your experience with this product
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Your Rating <span className="text-destructive">*</span>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-golden text-golden"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-foreground">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </span>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Your Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 100))}
              placeholder="Enter your name"
              className="bg-background border-border"
            />
          </div>

          {/* Review Title */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Review Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 150))}
              placeholder="Summarize your experience"
              className="bg-background border-border"
            />
          </div>

          {/* Review Body */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Your Review <span className="text-destructive">*</span>
            </label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value.slice(0, 1000))}
              placeholder="Tell us what you liked or didn't like about the product..."
              rows={4}
              className="bg-background border-border resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {review.length}/1000
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 border-border text-foreground hover:bg-muted rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;
