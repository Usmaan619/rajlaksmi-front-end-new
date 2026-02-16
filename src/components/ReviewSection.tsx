import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Review = {
  id: number;
  name: string;
  comment: string;
  rating: number;
};

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Amit Sharma",
    comment: "Excellent organic products. Loved the quality.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Verma",
    comment: "Very fresh and pure items. Will order again.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rahul Singh",
    comment: "Good packaging and fast delivery.",
    rating: 5,
  },
];

const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const [form, setForm] = useState({
    name: "",
    comment: "",
    rating: 5,
  });

  // Track active slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Auto-scroll
  useEffect(() => {
    if (!api) return;

    autoplayRef.current = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      name: form.name,
      comment: form.comment,
      rating: form.rating,
    };

    setReviews((prev) => [newReview, ...prev]);
    setForm({ name: "", comment: "", rating: 5 });
  };

  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Customer Reviews
        </h2>

        {/* Review Carousel */}
        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem
                key={review.id}
                className="pl-4 py-10 basis-[85%] md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className={`rounded-xl p-6 border transition-all duration-500 bg-white ${
                    activeIndex === index
                      ? "scale-105 shadow-xl"
                      : "scale-95 opacity-70"
                  }`}
                >
                  <div className="flex justify-between mb-4">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-12 space-y-4"
        >
          <input
            type="text"
            placeholder="Your name"
            className="w-full border p-3 rounded-md"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <textarea
            placeholder="Write your review"
            className="w-full border p-3 rounded-md"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            required
          />

          <select
            className="w-full border p-3 rounded-md"
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReviewSection;
