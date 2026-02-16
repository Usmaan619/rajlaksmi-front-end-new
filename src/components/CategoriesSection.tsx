import { Link } from "react-router-dom";
import { useRef } from "react";

import farmerImg from "@/assets/category/farmer.png";

import grainsImg from "@/assets/category-grains.jpg";
import floursImg from "@/assets/category-flours.jpg";
import oilsImg from "@/assets/category-oils.jpg";
import seedsImg from "@/assets/category-seeds.jpg";
import dryfruitsImg from "@/assets/category-dryfruits.jpg";
import spicesImg from "@/assets/category-spices.jpg";
import gheeImg from "@/assets/category-ghee.jpg";
import superfoodsImg from "@/assets/category-superfoods.jpg";

const categories = [
  {
    name: "Organic Grains",
    href: "/categories/grains",
    image: grainsImg,
    active: true,
  },
  { name: "Organic Flours", href: "/categories/flours", image: floursImg },
  { name: "Organic Oils", href: "/categories/oils", image: oilsImg },
  { name: "Organic Seeds", href: "/categories/seeds", image: seedsImg },
  {
    name: "Organic Dry Fruits",
    href: "/categories/dry-fruits",
    image: dryfruitsImg,
  },
  { name: "Organic Spices", href: "/categories/spices", image: spicesImg },
  { name: "Organic Ghee", href: "/categories/ghee", image: gheeImg },
  {
    name: "Organic Superfoods",
    href: "/categories/superfoods",
    image: superfoodsImg,
  },

  {
    name: "Organic Grains",
    href: "/categories/grains",
    image: grainsImg,
    active: true,
  },
  { name: "Organic Flours", href: "/categories/flours", image: floursImg },
  { name: "Organic Oils", href: "/categories/oils", image: oilsImg },
  { name: "Organic Seeds", href: "/categories/seeds", image: seedsImg },
  {
    name: "Organic Dry Fruits",
    href: "/categories/dry-fruits",
    image: dryfruitsImg,
  },
  { name: "Organic Spices", href: "/categories/spices", image: spicesImg },
  { name: "Organic Ghee", href: "/categories/ghee", image: gheeImg },
  {
    name: "Organic Superfoods",
    href: "/categories/superfoods",
    image: superfoodsImg,
  },
];

const CategoriesSection = () => {
  /* =========================
     SCROLL REF
  ========================= */
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();

      scrollRef.current.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#EBF4EE] to-white py-12 lg:py-20 overflow-hidden">
      <div className="px-5 sm:px-6 md:px-8 lg:px-12 relative z-10 overflow-hidden">
        {/* Header */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
            Categories
          </h2>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="
            flex
            gap-10
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-4
            pt-4
            scrollbar-hide
          "
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.href}
              className="group flex flex-col items-center text-center min-w-[110px] snap-start"
            >
              {/* Category Circle */}
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 transition-all duration-300 group-hover:scale-105 ${
                  category.active
                    ? "ring-4 ring-[#01722C] ring-offset-2"
                    : "shadow-md group-hover:ring-2 group-hover:ring-[#01722C]/40"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-[#01722C]/0 group-hover:bg-[#01722C]/10 transition duration-300" />
              </div>

              {/* Category Name */}
              <span
                className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                  category.active
                    ? "text-[#01722C] border-b-2 border-[#01722C] pb-1"
                    : "text-gray-800 group-hover:text-[#01722C]"
                }`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
