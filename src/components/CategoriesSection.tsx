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

  const pastelColors = [
    "bg-[#E8F5E9]", // Light Green
    "bg-[#FFF3E0]", // Light Orange
    "bg-[#E3F2FD]", // Light Blue
    "bg-[#F3E5F5]", // Light Purple
    "bg-[#FFFDE7]", // Light Yellow
    "bg-[#FCE4EC]", // Light Pink
    "bg-[#E0F2F1]", // Light Teal
    "bg-[#EFEBE9]", // Light Brown
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.success) {
          const mapped = res.data.map((cat: Category, index: number) => ({
            name: cat.category_name,
            href: `/categories?category=${encodeURIComponent(cat.category_name)}`,
            image: categoryImages[cat.category_name] || grainsImg,
            bgColor: pastelColors[index % pastelColors.length],
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

  return (
    <section className="bg-white py-8 sm:py-12 relative overflow-hidden">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[#01722C] font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
            Pure & Authentic
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#01722C] tracking-tight">
            Shop by Category
          </h2>
          <div className="h-1 w-24 bg-[#01722C]/20 mx-auto mt-6 rounded-full" />
        </div>

        {/* Responsive Grid - Blinkit Style */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4 md:gap-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="w-full aspect-square rounded-2xl" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))
            : categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="group flex flex-col items-center text-center gap-2 transition-transform duration-200 active:scale-95"
                >
                  {/* Category Container */}
                  <div
                    className={`w-full aspect-square ${category.bgColor} rounded-2xl sm:rounded-[24px] flex items-center justify-center p-2 sm:p-3 overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:bg-white border border-transparent group-hover:border-gray-100`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Category Name */}
                  <span className="text-[10px] sm:text-xs font-bold text-[#333] leading-tight line-clamp-2 h-8 sm:h-9 pt-1">
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
