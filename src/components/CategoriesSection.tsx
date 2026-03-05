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

type CategoryItem = {
  name: string;
  href: string;
  image: string;
  bgColor: string;
};

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
          const mapped: CategoryItem[] = res.data.map(
            (cat: Category, index: number) => ({
              name: cat.category_name,
              href: `/categories?category=${encodeURIComponent(
                cat.category_name,
              )}`,
              image: categoryImages[cat.category_name] || grainsImg,
              bgColor: pastelColors[index % pastelColors.length],
            }),
          );
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
    <section className="bg-white py-10 sm:py-14 relative overflow-hidden">
      <div className="px-4 sm:px-6 md:px-10 max-w-[1850px] mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-[#01722C] font-semibold text-xs uppercase tracking-[0.3em] mb-4">
            Pure & Authentic
          </p>
          <p className="text-[#01722C]/60 text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase text-center">
            Purity & Integrity in Every Pack
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
                  className="flex flex-col items-center gap-3 flex-shrink-0 w-24 sm:w-28 md:w-32"
                >
                  <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))
            : categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="group flex flex-col items-center text-center gap-2 transition-transform duration-200 active:scale-95 flex-shrink-0 w-24 sm:w-28 md:w-32 snap-start"
                >
                  {/* Image Card */}
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto ${category.bgColor} rounded-2xl flex items-center justify-center p-2 sm:p-3 overflow-hidden border border-transparent transition-all duration-300 group-hover:bg-white group-hover:border-gray-100 group-hover:shadow-lg`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Name */}
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-800 leading-tight line-clamp-2 min-h-[32px] px-1">
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
