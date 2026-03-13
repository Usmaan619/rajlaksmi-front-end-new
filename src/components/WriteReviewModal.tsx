import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { submitReview } from "@/api/feedback.service";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface WriteReviewModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  title: z.string().optional(),
  rating: z.number().min(0.5, "Please select at least 0.5 stars"),
  review: z.string().min(10, "Review must be at least 10 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const WriteReviewModal = ({
  productId,
  isOpen,
  onClose,
  onSuccess,
}: WriteReviewModalProps) => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: user?.full_name || "",
      email: user?.email || "",
      title: "",
      rating: 0,
      review: "",
    },
  });

  const { reset, setValue, watch } = form;
  const rating = watch("rating");

  // Prefill user data if logged in
  useEffect(() => {
    if (user && isOpen) {
      reset({
        name: user.full_name || "",
        email: user.email || "",
        title: "",
        rating: 0,
        review: "",
      });
    } else if (isOpen) {
      reset({
        name: "",
        email: "",
        title: "",
        rating: 0,
        review: "",
      });
    }
  }, [user, isOpen, reset]);

  const onSubmit = async (values: ReviewFormValues) => {
    setSubmitting(true);
    try {
      const res = await submitReview({
        product_id: productId,
        name: values.name,
        title: values.title || "",
        email: values.email,
        rating: values.rating,
        feedback: values.review,
      });

      if (res.success) {
        toast.success(res.message || "Review submitted successfully!");
        reset();
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
    setValue("rating", rate, { shouldValidate: true });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Write a Review
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 md:p-6 space-y-4 md:space-y-5 overflow-y-auto"
          >
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 mb-2 block">
                    Your Rating <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      <Rating
                        onClick={handleRating}
                        initialValue={field.value}
                        size={window.innerWidth < 640 ? 28 : 32}
                        allowFraction
                        transition
                        fillColor="orange"
                        emptyColor="#E5E7EB"
                        className="flex"
                        SVGclassName="inline-block"
                      />
                      {field.value > 0 && (
                        <span className="ml-3 text-sm font-bold text-orange-500">
                          {field.value}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700 mb-2 block">
                      Your Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
                        className="rounded-lg h-11 border-gray-200 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700 mb-2 block">
                      Review Title (e.g. CEO Founder)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="CEO, Founder, Home Chef..."
                        className="rounded-lg h-11 border-gray-200 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email address"
                      className="rounded-lg h-11 border-gray-200 focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Body */}
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 mb-2 block">
                    Your Review <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What did you like or dislike? How was the quality?"
                      rows={4}
                      className="rounded-xl border-gray-200 focus:ring-primary focus:border-primary resize-none p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-11 rounded-lg border-gray-200 hover:bg-gray-50 text-gray-700 font-medium order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 h-11 bg-primary text-white hover:bg-primary/90 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] order-1 sm:order-2"
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WriteReviewModal;
