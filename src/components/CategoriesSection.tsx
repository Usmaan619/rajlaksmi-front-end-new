import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories, Category } from "@/api/category.service";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import grainsImg from "@/assets/category-grains.jpg";
import floursImg from "@/assets/category-flours.jpg";
import oilsImg from "@/assets/category-oils.jpg";
import seedsImg from "@/assets/category-seeds.jpg";
import dryfruitsImg from "@/assets/category-dryfruits.jpg";
import spicesImg from "@/assets/category-spices.jpg";
import gheeImg from "@/assets/category-ghee.jpg";
import superfoodsImg from "@/assets/category-superfoods.jpg";
import allCategoriesImg from "@/assets/category-grains.jpg"; // Using grains as default for all

type CategoryItem = {
  name: string;
  href: string;
  image: string;
  bgColor: string;
};

const categoryOrder = [
  "PULSES",
  "MILLET",
  "RICE  WHEAT",
  "MASALA",
  "SWEETS",
  "HONEY",
  "DRY FRUITS",
  "SEEDS",
  "OTHER ITEMS",
  "OILS  GHEE",
  "RLJ PRODUCTS",
  "HOME MADE AACHAR",
  "KHAKHRA",
  "KHAPLI WHEAT KHAKHRA (EMMER WHEAT)",
  "MILLETS KHAKHRA",
  "FASTING / UPVAS SPECIAL - GLUTEN FREE KHAKHRA",
  "ROASTED MILLET DRY BHAKRI",
];

const categoryImages: Record<string, string> = {
  PULSES: grainsImg,
  MILLET: superfoodsImg,
  "RICE  WHEAT": grainsImg,
  MASALA: spicesImg,
  SWEETS: superfoodsImg,
  HONEY: superfoodsImg,
  "DRY FRUITS": dryfruitsImg,
  SEEDS: seedsImg,
  "OTHER ITEMS": superfoodsImg,
  "OILS  GHEE": gheeImg,
  "RLJ PRODUCTS": superfoodsImg,
  "HOME MADE AACHAR": spicesImg,
  KHAKHRA: floursImg,
  "KHAPLI WHEAT KHAKHRA (EMMER WHEAT)": floursImg,
  "MILLETS KHAKHRA": floursImg,
  "FASTING / UPVAS SPECIAL - GLUTEN FREE KHAKHRA": floursImg,
  "ROASTED MILLET DRY BHAKRI": floursImg,
};

const pastelColors = [
  "bg-[#fdfcfa]",
  "bg-[#f9fcf9]",
  "bg-[#fafbfc]",
  "bg-[#fcfafc]",
  "bg-[#fcfcf9]",
  "bg-[#fdf9fa]",
  "bg-[#f9fdfc]",
  "bg-[#fafaf8]",
];

const CategoriesSection = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useScrollAnimation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.success && res.data?.length) {
          // 1. Map all categories from API
          const mapped: CategoryItem[] = res.data.map((cat: Category) => ({
            name: cat.category_name,
            href: `/categories?category=${encodeURIComponent(cat.category_name)}`,
            image: categoryImages[cat.category_name] || grainsImg,
            bgColor: "", // will assign after sorting
          }));

          // 2. Sort based on categoryOrder
          const sorted = mapped.sort((a, b) => {
            const indexA = categoryOrder.indexOf(a.name);
            const indexB = categoryOrder.indexOf(b.name);

            // If not found, put at the end
            const finalIndexA = indexA === -1 ? 999 : indexA;
            const finalIndexB = indexB === -1 ? 999 : indexB;

            return finalIndexA - finalIndexB;
          });

          // 3. Assign background colors after sorting
          const colored = sorted.map((cat, index) => ({
            ...cat,
            bgColor: pastelColors[index % pastelColors.length],
          }));

          // 4. Add "All Categories" at the beginning
          const allCategories: CategoryItem = {
            name: "All Categories",
            href: "/categories",
            image: allCategoriesImg,
            bgColor: "bg-muted/50",
          };

          setCategories([allCategories, ...colored]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section ref={scrollRef as any} className="bg-background py-16 sm:py-24 relative overflow-hidden animate-on-scroll">
      <div className="px-4 sm:px-6 md:px-10 max-w-[1850px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-primary font-semibold text-[11px] uppercase tracking-[0.4em] mb-4 opacity-80">
            Pure & Authentic
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
            Shop by Category
          </h2>
          <div className="h-1.5 w-24 bg-secondary mx-auto mt-8 rounded-full" />
        </div>

        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-6 sm:gap-8 md:gap-10 pb-8 scrollbar-custom snap-x scroll-smooth">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 flex-shrink-0 w-36 sm:w-44 md:w-56"
                >
                  <Skeleton className="w-full aspect-square rounded-[2.5rem]" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              ))
            : categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="group flex-shrink-0 w-36 sm:w-44 md:w-56 snap-start py-4"
                >
                  <div
                    className={`relative flex flex-col items-center justify-between h-full ${category.bgColor || "bg-card"} rounded-[2.5rem] p-6 text-center shadow-soft transition-all duration-700 hover:shadow-card hover:-translate-y-3 overflow-hidden border border-border/50`}
                  >
                    {/* Decorative subtle shine */}
                    <div className="absolute -left-10 -top-10 h-40 w-40 bg-white/60 rounded-full blur-3xl transition-transform duration-1000 group-hover:translate-x-full group-hover:translate-y-full" />

                    {/* Image Wrapper with White Border */}
                    <div className="relative w-full aspect-square bg-white rounded-[2rem] overflow-hidden mb-6 shadow-sm border-[6px] border-white ring-1 ring-black/5 transition-transform duration-700 group-hover:scale-105">
                      <img
                        src={category.image}
                        alt={category.name}
                        width="200"
                        height="200"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Text Area */}
                    <div className="flex-1 flex flex-col justify-center mb-2">
                      <p className="text-primary font-bold text-xs sm:text-sm tracking-[0.05em] uppercase leading-tight line-clamp-2 px-2">
                        {category.name}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-auto h-1 w-10 bg-secondary/20 rounded-full transition-all duration-700 group-hover:bg-secondary group-hover:w-16" />
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
