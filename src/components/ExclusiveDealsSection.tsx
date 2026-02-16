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

const deals = [
  {
    id: 1,
    category: "GHEE",
    name: "A2 Ghee",
    image: dealGhee,
    discount: 40,
  },
  {
    id: 2,
    category: "OIL",
    name: "Olive Oil",
    image: dealOil,
    discount: 40,
  },
  {
    id: 3,
    category: "GHEE",
    name: "A2 Ghee",
    image: dealGhee2,
    discount: 40,
  },

  {
    id: 1,
    category: "GHEE",
    name: "A2 Ghee",
    image: dealGhee,
    discount: 40,
  },
  {
    id: 2,
    category: "OIL",
    name: "Olive Oil",
    image: dealOil,
    discount: 40,
  },
  {
    id: 3,
    category: "GHEE",
    name: "A2 Ghee",
    image: dealGhee2,
    discount: 40,
  },
];

const DealCard = ({ deal }: { deal: (typeof deals)[0] }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-56 sm:h-64 lg:h-80">
      <img
        src={deal.image}
        alt={deal.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute top-0 right-0">
        <div className="w-[74px] h-[55px] bg-[#01722C] text-white text-sm font-semibold flex items-center justify-center rounded-bl-[10px] rounded-br-[0px]">
          -{deal.discount}%
        </div>
      </div>

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
        <div className="mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
            Up to -40% exclusive deals
          </h2>
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
