import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, Category } from "@/api/category.service";
import { getProducts } from "@/api/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star, ChevronDown, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getWeightMultiplier, parseProductWeights, getDisplayWeight } from "@/lib/utils";
import seeds from "@/assets/category/seeds.webp";

// Reuse the ProductCard style from BestSellersSection
const ProductCard = ({ product }: { product: any }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-category-${product.id}`);
  const weights = parseProductWeights(product.product_weight);
  const [selectedUnitIdx, setSelectedUnitIdx] = useState(0);
  const selectedUnit = weights[selectedUnitIdx];
  const selectedUnitWeight =
    typeof selectedUnit === "object" ? selectedUnit.weight : selectedUnit;
  const weightMultiplier = getWeightMultiplier(selectedUnitWeight);
  const currentPrice =
    (typeof selectedUnit === "object" && selectedUnit.price
      ? Number(selectedUnit.price)
      : Number(product.product_price)) * weightMultiplier;

  const currentDelPrice =
    (typeof selectedUnit === "object" && selectedUnit.del_price
      ? Number(selectedUnit.del_price)
      : Number(product.product_del_price)) * weightMultiplier;

  let currentDiscount = product.discount || 0;
  if (currentDelPrice > currentPrice) {
    currentDiscount = Math.round(
      ((currentDelPrice - currentPrice) / currentDelPrice) * 100,
    );
  } else if (currentPrice >= product.product_del_price) {
    currentDiscount = 0;
  }

  const [showUnits, setShowUnits] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-${product.id}`,
      name: product.product_name,
      price: currentPrice,
      image: product.product_thumbnail || product.product_images?.[0],
      quantity: 1,
      weight: selectedUnitWeight,
    });
    toast.success(`${product.product_name} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-${product.id}`,
      name: product.product_name,
      price: currentPrice,
      image: product.product_thumbnail || product.product_images?.[0],
      quantity: 1,
      weight: selectedUnitWeight,
    });
    navigate("/cart");
  };

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full h-auto p-3 sm:p-4 rounded-2xl border bg-popover flex flex-col gap-2 overflow-visible cursor-pointer group hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={product.product_thumbnail || product.product_images?.[0]}
            alt={product.product_name}
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          aria-label="wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `${product.id}`,
              name: product.product_name,
              price: currentPrice,
              image: product.product_thumbnail || product.product_images?.[0],
              originalPrice: currentDelPrice,
              discount: currentDiscount,
              weightOptions: weights.map((w: any) => w.weight),
            });
            toast.success(
              isFavorite ? `Removed from Wishlist` : `Added to Wishlist`,
            );
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
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
            ₹{currentPrice}
          </span>
          {currentDelPrice > currentPrice && (
            <span className="text-xs sm:text-sm line-through text-gray-400">
              ₹{currentDelPrice}
            </span>
          )}
          {currentDiscount > 0 && (
            <span className="bg-green-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded">
              {currentDiscount}% OFF
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1 mt-2">
          <div className="relative">
            <button
              aria-label="Select unit"
              onClick={(e) => {
                e.stopPropagation();
                if (weights.length > 1) setShowUnits(!showUnits);
              }}
              className="flex items-center gap-1 border rounded px-2 py-1 text-[11px] sm:text-xs"
            >
              {getDisplayWeight(selectedUnitWeight)}
              {weights.length > 1 && <ChevronDown className="h-3 w-3" />}
            </button>
            {showUnits && weights.length > 1 && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow z-30 min-w-[80px]">
                {weights.map((unit: any, idx: number) => (
                  <button
                    aria-label="Select unit"
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUnitIdx(idx);
                      setShowUnits(false);
                    }}
                    className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                  >
                    {getDisplayWeight(typeof unit === "object" ? unit.weight : unit)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] text-primary/70 font-semibold block break-words whitespace-normal leading-tight">4.5</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-2 mt-auto">
        <button
          aria-label="Add to cart"
          onClick={handleAddToCart}
          className="flex-1 border border-primary text-primary text-[10px] sm:text-[11px] md:text-xs h-8 sm:h-9 rounded-md hover:bg-primary hover:text-white transition-colors font-bold"
        >
          ADD TO CART
        </button>
        <button
          aria-label="Buy Now"
          onClick={handleBuyNow}
          className="flex-1 bg-primary text-white text-[10px] sm:text-[11px] md:text-xs h-8 sm:h-9 rounded-md hover:bg-primary/90 transition-colors font-bold shadow-sm animate-glow"
        >
          BUY NOW
        </button>
      </div>
    </Card>
  );
};

import pulsesImg from "@/assets/category/pulses.jpg";
import milletsImg from "@/assets/category/millets.jpg";
import ricewheatImg from "@/assets/category/ricewheat.jpg";
import masalaImg from "@/assets/category/masala.jpg";
import sweetsImg from "@/assets/category/sweet.jpg";
import honeyImg from "@/assets/category/honey.jpg";
import dryfruitsImg from "@/assets/category/dryfruits.jpg";
import seedsImg from "@/assets/category/seeds.jpg";
import homemadaacarImg from "@/assets/category/homemadaacar.jpg";
import fruitsdrinksImg from "@/assets/category/fruitsdrinks.jpg";
import gheeOilsImg from "@/assets/category/gheeoils.jpeg";
import allCategoriesImg from "@/assets/category-grains.jpg";

const categoryDecorations: Record<string, string> = {
  "RICE & WHEAT": ricewheatImg,
  "MILLET": milletsImg,
  "OILS & GHEE": gheeOilsImg,
  "SEEDS": seedsImg,
  "DRY FRUITS": dryfruitsImg,
  "MASALA": masalaImg,
  "PULSES": pulsesImg,
  "SWEETS": sweetsImg,
  "HONEY": honeyImg,
  "HOME MADE AACHAR": homemadaacarImg,
  "FRUITS DRINKS / CHUTNEY": fruitsdrinksImg,
  "KHAKHRA": allCategoriesImg,
};

const categoryDescriptions: Record<string, string> = {
  "RICE & WHEAT": "Experience the pure essence of organic rice and wheat, harvested with traditional care and ancient farming wisdom. Our grains are completely chemical-free, nutrient-dense, and provide the perfect foundation for a wholesome, balanced diet. By choosing our grains, you are supporting sustainable agriculture and bringing the true taste of nature to your dinner table. They are easy to digest, rich in natural fiber, and nourish your modern wellness with the authentic, traditional goodness of the soil. From daily meals to special occasions, our grains ensure that every bite is a step towards a healthier, more vibrant life for you and your family.",
  "PULSES": "Our pure and nutritious pulses and lentils are crafted with absolute care. We source our organic dal directly from trusted farms to preserve natural fibers, essential vitamins, and the authentic taste. Packed with plant-based proteins and low in glycemic index, our pulses support better digestion and provide sustained energy throughout your busy day. Experience the difference of unpolished, traditionally harvested legumes that make your home-cooked meals truly nourishing and heart-healthy.",
  "OILS & GHEE": "Our cold-pressed oils and pure Bilona Ghee are extracted using traditional methods like Kacchi Ghani and ancient Ayurvedic hand-churning. This meticulous process ensures that we retain all essential fatty acids, vitamins, and the pure, rich aroma that nature intended for optimal health. Free from harmful chemicals and trans-fats, our oils and A2 ghee are the perfect heart-healthy choice for daily cooking, naturally boosting your metabolism, skin health, and overall physical well-being.",
  "SEEDS": "Discover a premium selection of high-quality seeds that are as versatile as they are nutritious. Packed with life-essential omega-3, plant-based protein, and vital minerals, these nutrient powerhouses are perfect for boosting your breakfast bowls or enhancing your afternoon snacks. They are carefully cleaned to maintain their raw enzymatic power, providing a natural energy lift and supporting heart health for a stronger, more resilient body.",
  "DRY FRUITS": "Savor the richness of premium dry fruits, naturally dried and hand-selected from the finest organic harvests. Free from sulfur and artificial colors, our dry fruits offer a concentrated source of natural energy, brain-boosting nutrients, and essential minerals in every bite. They are the perfect healthy alternative to processed snacks, helping to improve memory, strengthen bones, and provide a natural glow to your skin with the authentic taste of sun-ripened goodness.",
  "MASALA": "Our authentic organic spices are hand-picked for their purity, high curcumin content, and natural potency. These sun-dried masalas bring not just authentic Indian flavors and deep colors to your kitchen, but also powerful anti-inflammatory and medicinal benefits for your holistic health. With no fillers or artificial colors, incorporating our spices into your daily diet helps in detoxifying the body, improving digestion, and building a stronger internal defense system.",
  "MILLET": "Elevate your health to new heights with our nutrient-dense ancient millets. These powerhouse grains are nature's most potent sources of vitamins, antioxidants, and gluten-free fiber, specifically curated to naturally enhance your body's immunity and daily performance. Perfect for health-conscious families, our millets provide a concentrated burst of nutrition that helps in sustained energy, strength, and longevity while keeping your roots grounded in traditional Indian dietary wisdom.",
  "FRUITS DRINKS / CHUTNEY": "Refresh and revitalize your body with our purely crafted fruit drinks and authentic chutneys, made entirely from fresh, farm-picked ingredients. Free from artificial preservatives, synthetic colors, or refined sugars, these natural delights perfectly balance traditional, tangy flavors with modern health benefits. Each serving provides a rich burst of natural antioxidants, vitamins, and digestive enzymes that actively support your gut health and immunity. Whether you're cooling down on a warm day or adding a zesty kick to your daily meals, our fruit-based creations ensure a guilt-free, incredibly flavorful experience for your entire family.",
  "HOME MADE AACHAR": "Relish the authentic, lip-smacking taste of traditional home-made aachar, prepared using generation-old recipes and cold-pressed mustard oil. Our pickles are carefully sun-dried and naturally fermented without any artificial preservatives, ensuring they retain potent probiotics that are incredibly beneficial for your gut health and digestion. Every jar brings the perfect blend of organic spices and fresh ingredients, instantly elevating your everyday meals with a nostalgic, tangy flavor.",
  "SWEETS": "Indulge your sweet cravings completely guilt-free with our collection of traditional organic sweets. Crafted using natural sweeteners like jaggery and pure organic ingredients, these treats offer a rich, authentic taste without the harmful effects of refined sugars. Perfect for festive celebrations or daily desserts, our sweets are rich in essential minerals, delivering a wholesome, nourishing experience that delights your palate while protecting your health.",
  "HONEY": "Experience the liquid gold of our 100% pure, raw, and unfiltered honey, sustainably sourced straight from wild forests and organic apiaries. Packed with natural antioxidants, enzymes, and antibacterial properties, our honey acts as a powerful immunity booster and a soothing remedy for your respiratory health. Use it as a perfect natural sweetener for your morning teas, breakfasts, or simply enjoy it by the spoonful for an instant burst of natural vitality.",
  "KHAKHRA": "Enjoy the ultimate healthy crunch with our roasted organic Khakhra, the perfect guilt-free snack for your busy days. Made from premium whole wheat, millets, and pure organic spices, these thin, crispy delights are slow-roasted to perfection without any deep frying. Rich in dietary fiber and naturally low in calories, our Khakhras provide a sustained energy release, making them an ideal, heart-healthy companion for your morning or evening tea."
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isLoading && products.length > 0) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            // Scroll back to start
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Scroll right by about half the container width (matches 1 card on mobile)
            scrollRef.current.scrollBy({
              left: clientWidth / 2,
              behavior: "smooth",
            });
          }
        }
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, products.length]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await getProducts({
          category: category.category_name,
          limit: 5,
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
    <div className="mb-12 last:mb-0">
      <div
        className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 lg:gap-16 items-stretch`}
      >
        {/* Category Info Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="relative h-auto md:h-full group overflow-hidden rounded-[24px] sm:rounded-[32px] border border-gray-100 bg-[#F9FBF9] flex flex-col shadow-sm hover:shadow-md transition-all duration-500">
            {/* Background Image / Icon */}
            <div className="relative w-full h-32 sm:h-40 md:h-48 transition-opacity overflow-hidden">
              <img
                src={categoryDecorations[category.category_name] || seeds}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t " />
            </div>

            <div className="relative z-10 p-3 sm:p-5 -mt-4 sm:-mt-6 transition-all duration-500 group-hover:mt-0">
              <div className="w-8 sm:w-10 h-1 bg-[#116931] mb-3 sm:mb-4 rounded-full" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#116931] tracking-tight mb-2 sm:mb-3 leading-tight">
                {category.category_name}
              </h2>
              <p className="text-gray-500 text-[11px] sm:text-xs mb-4 sm:mb-6 leading-relaxed line-clamp-4 sm:line-clamp-6">
                {categoryDescriptions[category.category_name] ||
                  `Experience the pure essence of ${category.category_name.toLowerCase()}, harvested with traditional care for your modern wellness.`}
              </p>

              <Link
                to={`/categories?category=${encodeURIComponent(category.category_name)}`}
                className="group/btn inline-flex items-center gap-2 text-[#116931] font-bold text-[10px] sm:text-xs tracking-wide"
              >
                EXPLORE ALL
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#116931] text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div
            ref={scrollRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 overflow-x-auto md:overflow-visible pb-4 sm:pb-6 scrollbar-custom snap-x snap-mandatory"
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="snap-start min-w-[calc(50%-2px)] sm:min-w-[calc(33.33%-4px)] lg:min-w-0 animate-pulse bg-gray-50 h-[380px] sm:h-[448px] rounded-2xl border border-gray-100"
                />
              ))
              : products.map((product) => (
                <div
                  key={product.id}
                  className="snap-start min-w-[calc(60%-2px)] sm:min-w-[calc(50%-4px)] md:min-w-0 w-full"
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
    <section className="bg-white py-10 sm:py-14 relative">
      {/* Decorative floral elements could be added here if needed */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-full mx-auto">
        {isLoading && categories.length === 0 ? (
          <div className="space-y-24">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-10">
                <Skeleton className="w-full lg:w-1/4 h-[450px] rounded-[40px]" />
                <div className="w-full lg:w-3/4 grid grid-cols-5 gap-6">
                  {Array.from({ length: 5 }).map((_, j) => (
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
