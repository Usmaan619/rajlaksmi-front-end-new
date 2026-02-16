import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Rajendar rajpurohit",
    title: "CEO Founder",
    quote:
      "Finally, a brand I can trust for 100% organic essentials. Healthy, wholesome, and absolutely worth it!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajendar rajpurohit",
    title: "CEO Founder",
    quote: "Finally, a brand I can trust for 100% organic essentials.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rajendar rajpurohit",
    title: "CEO Founder",
    quote: "Healthy, wholesome, and absolutely worth it!",
    rating: 5,
  },
  {
    id: 4,
    name: "Rajendar rajpurohit",
    title: "CEO Founder",
    quote: "Great quality products.",
    rating: 5,
  },
  {
    id: 5,
    name: "Rajendar rajpurohit",
    title: "CEO Founder",
    quote: "Highly recommended organic brand.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl lg:text-4xl text-primary font-bold text-center mb-12">
          Testimonial
        </h2>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 py-10 basis-[85%] md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className={`rounded-xl p-6 border transition-all duration-500 bg-white ${
                    activeIndex === index
                      ? "scale-105 shadow-xl"
                      : "scale-95 opacity-70"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-muted" />
                    <div className="flex gap-0.5 ml-auto">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-golden text-golden"
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {testimonial.quote}
                  </p>

                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
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
      </div>
    </section>
  );
};

export default TestimonialSection;
