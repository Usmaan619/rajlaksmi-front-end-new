import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Rajendar Rajpurohit",
    title: "Organic Food Enthusiast",
    quote:
      "Finally, a brand I can trust for 100% organic essentials. The Ghee is exceptionally pure and reminds me of home-made tradition. Healthy, wholesome, and absolutely worth it!",
    rating: 5,
    avatar: "RR",
  },
  {
    id: 2,
    name: "Suresh Sharma",
    title: "Fitness Coach",
    quote: "I've been using their products for my clients and they love it. The purity of the A2 Ghee is unmatched in the market. Highly recommended for any healthy lifestyle.",
    rating: 5,
    avatar: "SS",
  },
  {
    id: 3,
    name: "Priyanka Singh",
    title: "Home Maker",
    quote: "Healthy, wholesome, and absolutely worth it! My kids love the flavor and I feel good knowing it's 100% natural without any chemicals. Thank you Rajlakshmi!",
    rating: 5,
    avatar: "PS",
  },
  {
    id: 4,
    name: "Vikram Mehta",
    title: "Chef",
    quote: "Great quality products. As a chef, I always look for authentic ingredients and this brand delivers exactly that. The aroma of the ghee is incredible.",
    rating: 5,
    avatar: "VM",
  },
  {
    id: 5,
    name: "Anjali Gupta",
    title: "Nutritionist",
    quote: "Highly recommended organic brand for anyone looking to switch to a cleaner diet. Their commitment to quality is evident in every bite.",
    rating: 5,
    avatar: "AG",
  },
];

const TestimonialSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);

  // Track active slide and total count
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setActiveIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-scroll logic
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-green-50/30 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-100/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-14 text-center">
          <p className="text-[#01722C] font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3">
            Pure Love
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#01722C] tracking-tight">
            Testimonial
          </h2>
          <div className="h-1 w-24 bg-[#01722C]/20 mx-auto mt-6 rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-[80%] md:basis-1/2 lg:basis-1/3 py-8"
                >
                  <div
                    className={`h-full min-h-[260px] rounded-3xl p-6 border transition-all duration-700 bg-white relative flex flex-col justify-between ${
                      activeIndex === index
                        ? "scale-100 shadow-xl border-[#01722C]/20 z-20"
                        : "scale-[0.85] opacity-30 blur-[0.5px] grayscale-[0.8]"
                    }`}
                  >
                    <div className="absolute -top-3 -left-1 w-8 h-8 bg-[#01722C] rounded-full flex items-center justify-center text-white shadow-lg">
                      <Quote className="w-4 h-4" />
                    </div>

                    <div className="mb-6">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic leading-relaxed text-sm md:text-base">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-auto border-t border-gray-100 pt-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#01722C]/20 to-[#01722C]/5 flex items-center justify-center text-[#01722C] font-bold text-xs border-2 border-white shadow-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 leading-tight text-sm">{testimonial.name}</p>
                        <p className="text-[10px] text-[#01722C] font-medium uppercase tracking-wider mt-0.5">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation - hidden on small mobile, visible on sm and up */}
          <div className="hidden sm:flex absolute top-1/2 -left-12 -translate-y-1/2 z-30">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#01722C] hover:bg-[#01722C] hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden sm:flex absolute top-1/2 -right-12 -translate-y-1/2 z-30">
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#01722C] hover:bg-[#01722C] hover:text-white transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-500 rounded-full ${
                i === activeIndex 
                  ? "w-8 h-2.5 bg-[#01722C]" 
                  : "w-2.5 h-2.5 bg-[#01722C]/20 hover:bg-[#01722C]/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
