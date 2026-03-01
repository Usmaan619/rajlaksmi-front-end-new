import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, Category } from "@/api/category.service";
import { getProducts } from "@/api/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star, ChevronDown, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

// Reuse the ProductCard style from BestSellersSection
const ProductCard = ({ product }: { product: any }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-category-${product.id}`);
  const [selectedUnit, setSelectedUnit] = useState(
    Array.isArray(product.product_weight)
      ? product.product_weight[0]
      : product.product_weight,
  );
  const [showUnits, setShowUnits] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-cat-${product.id}`,
      name: product.product_name,
      price: product.product_price,
      image: product.product_images[0],
      quantity: 1,
      weight: selectedUnit,
    });
    toast.success(`${product.product_name} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-cat-${product.id}`,
      name: product.product_name,
      price: product.product_price,
      image: product.product_images[0],
      quantity: 1,
      weight: selectedUnit,
    });
    navigate("/cart");
  };

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full lg:w-[280px] h-auto lg:h-[448px] p-3 sm:p-4 rounded-2xl border bg-popover flex flex-col gap-2 overflow-visible cursor-pointer group hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={product.product_images[0]}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `product-category-${product.id}`,
              name: product.product_name,
              price: product.product_price,
              image: product.product_images[0],
              originalPrice: product.product_del_price,
              discount: product.discount,
              weightOptions: Array.isArray(product.product_weight)
                ? product.product_weight
                : [product.product_weight],
            });
            toast.success(
              isFavorite ? `Removed from Wishlist` : `Added to Wishlist`,
            );
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[40px]">
          {product.product_name}
        </h3>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-base sm:text-lg font-bold text-primary">
            ₹{product.product_price}
          </span>
          {product.product_del_price && (
            <span className="text-xs sm:text-sm line-through text-gray-400">
              ₹{product.product_del_price}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-green-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUnits(!showUnits);
              }}
              className="flex items-center gap-1 border rounded px-2 py-1 text-[11px] sm:text-xs"
            >
              {selectedUnit}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showUnits && Array.isArray(product.product_weight) && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow z-30 min-w-[80px]">
                {product.product_weight.map((unit: string) => (
                  <button
                    key={unit}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUnit(unit);
                      setShowUnits(false);
                    }}
                    className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                  >
                    {unit}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium">4.5</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          className="flex-1 border border-primary text-primary text-xs py-2 rounded-md hover:bg-primary hover:text-white transition-colors font-semibold"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-primary text-white text-xs py-2 rounded-md hover:bg-primary/90 transition-colors font-semibold shadow-sm"
        >
          Buy Now
        </button>
      </div>
    </Card>
  );
};

import grainsImg from "@/assets/category-grains.jpg";
import floursImg from "@/assets/category-flours.jpg";
import oilsImg from "@/assets/category-oils.jpg";
import seedsImg from "@/assets/category-seeds.jpg";
import dryfruitsImg from "@/assets/category-dryfruits.jpg";
import spicesImg from "@/assets/category-spices.jpg";
import gheeImg from "@/assets/category-ghee.jpg";
import superfoodsImg from "@/assets/category-superfoods.jpg";

const categoryDecorations: Record<string, string> = {
  "Organic Grains": grainsImg,
  "Organic Flours": floursImg,
  "Organic Oils": oilsImg,
  "Organic Seeds": seedsImg,
  "Organic Dry Fruits": dryfruitsImg,
  "Organic Spices": spicesImg,
  "Organic Ghee": gheeImg,
  "Organic Superfoods": superfoodsImg,
};

const CategoryRow = ({
  category,
  index,
}: {
  category: Category;
  index: number;
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await getProducts({
          category: category.category_name,
          limit: 4,
        });
        if (res.success) {
          setProducts(res.data || res.products || []);
        }
      } catch (err) {
        console.error(
          `Failed to fetch products for ${category.category_name}:`,
          err,
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category.category_name]);

  if (!isLoading && (!products || products.length === 0)) return null;

  const isReversed = index % 2 !== 0;

  return (
    <div className="mb-20 last:mb-0">
      <div
        className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-stretch`}
      >
        {/* Category Info Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="relative h-full min-h-[250px] sm:min-h-[300px] lg:min-h-full group overflow-hidden rounded-[32px] sm:rounded-[40px] border border-gray-100 bg-[#F9FBF9] p-6 sm:p-8 flex flex-col justify-end shadow-sm hover:shadow-md transition-all duration-500">
            {/* Background Image / Icon */}
            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-20 group-hover:opacity-30 transition-opacity">
              <img
                src={categoryDecorations[category.category_name] || grainsImg}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-700 rotate-12 group-hover:rotate-0"
                alt=""
              />
            </div>

            <div className="relative z-10">
              <div className="w-10 sm:w-12 h-1 bg-[#01722C] mb-4 sm:mb-6 rounded-full" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#01722C] tracking-tight mb-3 sm:mb-4 leading-tight">
                {category.category_name}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-3">
                Experience the pure essence of{" "}
                {category.category_name.toLowerCase()}, harvested with
                traditional care for your modern wellness.
              </p>

              <Link
                to={`/categories?category=${encodeURIComponent(category.category_name)}`}
                className="group/btn inline-flex items-center gap-2 sm:gap-3 text-[#01722C] font-bold text-xs sm:text-sm tracking-wide"
              >
                EXPLORE ALL
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#01722C] text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4">
          <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible pb-4 sm:pb-6 scrollbar-custom snap-x snap-mandatory">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[240px] sm:min-w-[280px] lg:min-w-0 animate-pulse bg-gray-50 h-[380px] sm:h-[448px] rounded-2xl border border-gray-100"
                  />
                ))
              : products.map((product) => (
                  <div
                    key={product.id}
                    className="snap-start min-w-[260px] sm:min-w-[280px] lg:min-w-0"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryProductsSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getCategories();
        if (res.success) {
          setCategories(res.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24 relative">
      {/* Decorative floral elements could be added here if needed */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-full mx-auto">
        {isLoading && categories.length === 0 ? (
          <div className="space-y-24">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-10">
                <Skeleton className="w-full lg:w-1/4 h-[450px] rounded-[40px]" />
                <div className="w-full lg:w-3/4 grid grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-[450px] rounded-2xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          categories.map((category, index) => (
            <CategoryRow key={category.id} category={category} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default CategoryProductsSection;
