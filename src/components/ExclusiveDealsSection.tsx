import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import dealGhee from "@/assets/deal-ghee.jpg";
import dealOil from "@/assets/deal-oil.jpg";
import dealGhee2 from "@/assets/deal-ghee2.jpg";


import img1 from "@/assets/explore-our-premium-organic-collection/1-slide.jpeg";
import img2 from "@/assets/explore-our-premium-organic-collection/2-slide.jpeg";
import img3 from "@/assets/explore-our-premium-organic-collection/3-slide.jpeg";
import img4 from "@/assets/explore-our-premium-organic-collection/4-slide.jpeg";



const deals = [
  {
    id: 1,
    category: "SIGNATURE COLLECTION",
    name: "A2 Gir Cow Ghee",
    image: img1,
    discount: 40,
  },
  {
    id: 2,
    category: "NATURAL ESSENTIALS",
    name: "Cold Pressed Oil",
    image: img2,
    discount: 40,
  },
  {
    id: 3,
    category: "HOMEMADE SUPERFOODS",
    name: "Achaar",
    image: img3,
    discount: 40,
  },

  {
    id: 4,
    category: "Pulses",
    name: "Dals & Pulses",
    image: img4,
    discount: 40,
  },

];

const DealCard = ({ deal }: { deal: (typeof deals)[0] }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-56 sm:h-64 lg:h-80">
      <img
        src={deal.image}
        alt={deal.name}
        width="400"
        height="320"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* <div className="absolute top-0 right-0">
        <div className="w-[74px] h-[55px] bg-[#01722C] text-white text-sm font-semibold flex items-center justify-center rounded-bl-[10px] rounded-br-[0px]">
          -{deal.discount}%
        </div>
      </div> */}

      <div className="absolute bottom-4 left-4 text-white">
        <span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-80">
          {deal.category}
        </span>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-1">
          {deal.name}
        </h3>
      </div>
    </div>
  );
};

const ExclusiveDealsSection = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 3000, // 3 seconds
      stopOnInteraction: true,
    }),
  );

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-[#EBF4EE] to-white relative overflow-hidden">
      {/* Farmer Illustration */}

      <div className="mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-[#01722C] font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3">
            Pure & Natural Organic Foods

          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#01722C] tracking-tight">
            Explore Our Premium Organic Collection

          </h2>
          <div className="h-1 w-24 bg-[#01722C]/20 mx-auto mt-6 rounded-full" />
          <p className="mt-5 text-gray-600 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Discover our carefully selected range of pure A2 Gir Cow Bilona Ghee, cold-pressed oils, and natural food products made with quality and authenticity in mind.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          plugins={[autoplay.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent className="-ml-4">
            {deals.map((deal) => (
              <CarouselItem
                key={deal.id}
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <DealCard deal={deal} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop arrows */}
          <CarouselPrevious className="hidden lg:flex -left-4 bg-white border hover:bg-muted" />
          <CarouselNext className="hidden lg:flex -right-4 bg-white border hover:bg-muted" />
        </Carousel>
      </div>
    </section>
  );
};

export default ExclusiveDealsSection;
