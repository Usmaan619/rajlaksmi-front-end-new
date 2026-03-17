import { useState, useEffect } from "react";
import { Heart, Star, ChevronDown, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getHomeProducts } from "@/api/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProductCard = ({ product }: { product: any }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-best-${product.id}`);
  const weights = Array.isArray(product.product_weight)
    ? product.product_weight
    : product.product_weight
      ? [product.product_weight]
      : [];
  const [selectedUnitIdx, setSelectedUnitIdx] = useState(0);
  const selectedUnit = weights[selectedUnitIdx];
  const selectedUnitWeight =
    typeof selectedUnit === "object" ? selectedUnit.weight : selectedUnit;
  const currentPrice =
    typeof selectedUnit === "object" && selectedUnit.price
      ? Number(selectedUnit.price)
      : product.product_price;

  let currentDiscount = product.discount || 0;
  if (
    typeof selectedUnit === "object" &&
    selectedUnit.price &&
    product.product_del_price > currentPrice
  ) {
    currentDiscount = Math.round(
      ((product.product_del_price - currentPrice) / product.product_del_price) *
        100,
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
      image: product.product_images[0],
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
      image: product.product_images[0],
      quantity: 1,
      weight: selectedUnitWeight,
    });
    navigate("/cart");
  };

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        w-full
        h-auto
        p-4
        rounded-[1.5rem]
        border-none
        bg-card
        flex
        flex-col
        gap-3
        overflow-visible
        cursor-pointer
        group
        shadow-soft
        hover:shadow-card
        hover:-translate-y-1
        transition-all
        duration-500
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-[1.25rem]">
        <div className="aspect-square bg-white">
          <img
            src={product.product_images[0]}
            alt={product.product_name}
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Discount Badge */}
        {currentDiscount > 0 && (
          <div className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {currentDiscount}% OFF
          </div>
        )}

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `${product.id}`,
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
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-bold text-sm sm:text-base line-clamp-2 min-h-[44px] text-primary leading-snug">
          {product.product_name}
        </h3>

        {/* Unit + Rating */}
        <div className="flex items-center justify-between mt-1 mb-3">
          <div className="relative">
            <button
              aria-label="Select unit"
              onClick={(e) => {
                e.stopPropagation();
                if (weights.length > 1) setShowUnits(!showUnits);
              }}
              className="flex items-center gap-1.5 border border-border bg-white rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold text-muted-foreground hover:border-primary/30 transition-colors"
            >
              {selectedUnitWeight}
              {weights.length > 1 && <ChevronDown className="h-3 w-3" />}
            </button>

            {showUnits && weights.length > 1 && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-xl shadow-card z-30 min-w-[100px] overflow-hidden">
                {weights.map((unit: any, idx: number) => (
                  <button
                    aria-label="Select unit"
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUnitIdx(idx);
                      setShowUnits(false);
                    }}
                    className="block w-full px-4 py-2.5 text-xs text-left hover:bg-accent transition-colors border-b border-border last:border-none"
                  >
                    {typeof unit === "object" ? unit.weight : unit}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 bg-accent px-2 py-0.5 rounded-full">
            <Star className="h-3 w-3 fill-secondary text-secondary" />
            <span className="text-[10px] sm:text-xs font-bold text-primary">4.5</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg sm:text-xl font-black text-primary">
            ₹{currentPrice}
          </span>

          {product.product_del_price > currentPrice && (
            <span className="text-xs sm:text-sm line-through text-muted-foreground opacity-60">
              ₹{product.product_del_price}
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2.5 mt-auto">
        <button
          aria-label="Add to cart"
          onClick={handleAddToCart}
          className="w-12 h-10 flex items-center justify-center border-2 border-primary/20 text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group/btn"
        >
          <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
        </button>
        <button
          aria-label="Buy now"
          onClick={handleBuyNow}
          className="flex-1 bg-primary text-white text-xs sm:text-sm py-2.5 rounded-xl hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all duration-300 font-bold uppercase tracking-wider"
        >
          Buy Now
        </button>
      </div>
    </Card>
  );
};

const BestSellersSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useScrollAnimation();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await getHomeProducts();
        if (res.success) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch best sellers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <section ref={scrollRef as any} className="bg-background py-16 sm:py-24 animate-on-scroll">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1800px] mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-[0.4em] mb-4">
            Most Loved
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary tracking-tight">
            Our Best Sellers
          </h2>
          <div className="h-1.5 w-24 bg-primary/10 mx-auto mt-8 rounded-full overflow-hidden">
             <div className="h-full w-1/2 bg-secondary rounded-full" />
          </div>
        </div>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            xss:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6 sm:gap-8
          "
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-[3/4] p-4 bg-muted animate-pulse rounded-[2rem]"
                />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
