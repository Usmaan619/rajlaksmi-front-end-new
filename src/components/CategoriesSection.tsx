import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories, Category } from "@/api/category.service";

import grainsImg from "@/assets/category-grains.jpg";
import floursImg from "@/assets/category-flours.jpg";
import oilsImg from "@/assets/category-oils.jpg";
import seedsImg from "@/assets/category-seeds.jpg";
import dryfruitsImg from "@/assets/category-dryfruits.jpg";
import spicesImg from "@/assets/category-spices.jpg";
import gheeImg from "@/assets/category-ghee.jpg";
import superfoodsImg from "@/assets/category-superfoods.jpg";

const categoryImages: Record<string, string> = {
  "Organic Grains": grainsImg,
  "Organic Flours": floursImg,
  "Organic Oils": oilsImg,
  "Organic Seeds": seedsImg,
  "Organic Dry Fruits": dryfruitsImg,
  "Organic Spices": spicesImg,
  "Organic Ghee": gheeImg,
  "Organic Superfoods": superfoodsImg,
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.success) {
          const mapped = res.data.map((cat: Category) => ({
            name: cat.category_name,
            href: `/categories?category=${encodeURIComponent(cat.category_name)}`,
            image: categoryImages[cat.category_name] || grainsImg,
            active: false,
          }));
          setCategories(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Autoplay Logic
  useEffect(() => {
    if (isLoading || categories.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // If we've reached the end (or close to it), reset to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
      }
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isLoading, categories]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#EBF4EE] to-white py-12 lg:py-20 overflow-hidden relative">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header with Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
            Our Categories
          </h2>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!showLeftArrow}
              className={`p-2 rounded-full border border-[#01722C]/20 bg-white shadow-sm transition-all duration-300 ${
                showLeftArrow
                  ? "opacity-100 hover:bg-[#01722C] hover:text-white"
                  : "opacity-0 invisible"
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!showRightArrow}
              className={`p-2 rounded-full border border-[#01722C]/20 bg-white shadow-sm transition-all duration-300 ${
                showRightArrow
                  ? "opacity-100 hover:bg-[#01722C] hover:text-white"
                  : "opacity-0 invisible"
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Container with Fade Indicators */}
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="
              flex
              gap-6
              sm:gap-8
              overflow-x-auto
              scroll-smooth
              pb-6
              pt-2
              scrollbar-custom
            "
          >
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]"
                  >
                    <Skeleton className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mb-3" />
                    <Skeleton className="h-4 w-14 sm:w-18" />
                  </div>
                ))
              : categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.href}
                    className="group flex flex-col items-center text-center min-w-[80px] sm:min-w-[100px] transition-transform duration-300 active:scale-95"
                  >
                    {/* Category Circle */}
                    <div
                      className={`relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 transition-all duration-500 group-hover:scale-110 shadow-sm group-hover:shadow-xl ${
                        category.active
                          ? "ring-4 ring-[#01722C] ring-offset-2"
                          : "group-hover:ring-2 group-hover:ring-[#01722C]/40"
                      }`}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-[#01722C]/0 group-hover:bg-[#01722C]/10 transition duration-300" />
                    </div>

                    {/* Category Name */}
                    <span
                      className={`text-xs sm:text-sm font-semibold transition-all duration-300 tracking-tight ${
                        category.active
                          ? "text-[#01722C] border-b-2 border-[#01722C] pb-1"
                          : "text-gray-700 group-hover:text-[#01722C]"
                      }`}
                    >
                      {category.name}
                    </span>
                  </Link>
                ))}
          </div>

          {/* Right side fade indicator for mobile */}
          {showRightArrow && (
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white/60 to-transparent pointer-events-none sm:hidden" />
          )}
        </div>
      </div>

      {/* Visual background element */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#01722C]/5 rounded-full blur-3xl" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#01722C]/5 rounded-full blur-3xl" />
    </section>
  );
};

export default CategoriesSection;
