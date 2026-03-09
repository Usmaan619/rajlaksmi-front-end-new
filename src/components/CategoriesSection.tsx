import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  "bg-[#E8F5E9]",
  "bg-[#FFF3E0]",
  "bg-[#E3F2FD]",
  "bg-[#F3E5F5]",
  "bg-[#FFFDE7]",
  "bg-[#FCE4EC]",
  "bg-[#E0F2F1]",
  "bg-[#EFEBE9]",
];

const CategoriesSection = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
            bgColor: "bg-gray-100",
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
    <section className="bg-white py-10 sm:py-14 relative overflow-hidden">
      <div className="px-4 sm:px-6 md:px-10 max-w-[1850px] mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-[#01722C] font-semibold text-xs uppercase tracking-[0.3em] mb-4">
            Pure & Authentic
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01722C] tracking-tight">
            Shop by Category
          </h2>
          <div className="h-1 w-24 bg-[#01722C]/20 mx-auto mt-6 rounded-full" />
        </div>

        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 pb-6 scrollbar-custom snap-x scroll-smooth">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 flex-shrink-0 w-32 sm:w-36 md:w-44"
                >
                  <Skeleton className="w-full aspect-square rounded-2xl" />
                  <Skeleton className="h-4 w-20 rounded-full" />
                </div>
              ))
            : categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="group flex-shrink-0 w-32 sm:w-36 md:w-44 snap-start py-4"
                >
                  <div
                    className={`relative flex flex-col items-center justify-between h-full ${category.bgColor || "bg-gray-100"} rounded-2xl p-5 text-center shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden border border-white/50`}
                  >
                    {/* Decorative subtle shine */}
                    <div className="absolute -left-10 -top-10 h-32 w-32 bg-white/40 rounded-full blur-3xl transition-transform duration-700 group-hover:translate-x-full group-hover:translate-y-full" />

                    {/* Image Wrapper with White Border */}
                    <div className="relative w-full aspect-square bg-white rounded-[2rem] overflow-hidden mb-4 shadow-sm border-[4px] border-white ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Text Area */}
                    <div className="flex-1 flex flex-col justify-center mb-1">
                      <p className="text-[#01722C] font-black text-[11px] md:text-xs tracking-[0.05em] uppercase leading-tight line-clamp-2 px-1">
                        {category.name}
                      </p>
                    </div>

                    {/* Bottom accent (same as text color) */}
                    <div className="mt-auto h-1 w-8 bg-[#01722C]/20 rounded-full transition-all duration-500 group-hover:bg-[#01722C]/40 group-hover:w-14" />
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
