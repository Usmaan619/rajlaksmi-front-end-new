import { useState, useEffect } from "react";
import { Heart, Star, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getHomeProducts } from "@/api/product.service";
import { Skeleton } from "@/components/ui/skeleton";

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
        p-3 sm:p-4
        rounded-2xl
        border
        bg-popover
        flex
        flex-col
        gap-2
        overflow-visible
        cursor-pointer
        group
        hover:shadow-lg
        transition-shadow
      "
    >
      {/* Image */}
      <div className="relative">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={product.product_images[0]}
            alt={product.product_name}
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

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
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[40px]">
          {product.product_name}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-base sm:text-lg font-bold text-primary">
            ₹{currentPrice}
          </span>

          {product.product_del_price > currentPrice && (
            <span className="text-xs sm:text-sm line-through text-gray-400">
              ₹{product.product_del_price}
            </span>
          )}

          {currentDiscount > 0 && (
            <span className="bg-green-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded">
              {currentDiscount}% OFF
            </span>
          )}
        </div>

        {/* Unit + Rating */}
        <div className="flex items-center justify-between mt-2">
          <div className="relative">
            <button
              aria-label="Select unit"
              onClick={(e) => {
                e.stopPropagation();
                if (weights.length > 1) setShowUnits(!showUnits);
              }}
              className="flex items-center gap-1 border rounded px-2 py-1 text-[11px] sm:text-xs"
            >
              {selectedUnitWeight}
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
                    {typeof unit === "object" ? unit.weight : unit}
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
      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          aria-label="Add to cart"
          onClick={handleAddToCart}
          className="flex-1 border border-primary text-primary text-[10px] sm:text-[11px] md:text-xs h-8 sm:h-9 rounded-md hover:bg-primary hover:text-white transition-colors font-bold"
        >
          ADD TO CART
        </button>
        <button
          aria-label="Buy now"
          onClick={handleBuyNow}
          className="flex-1 bg-primary text-white text-[10px] sm:text-[11px] md:text-xs h-8 sm:h-9 rounded-md hover:bg-primary/90 transition-colors font-bold shadow-sm animate-glow"
        >
          BUY NOW
        </button>
      </div>
    </Card>
  );
};

const BestSellersSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="px-3 sm:px-6 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-[#116931] font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
            Most Loved
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#116931] tracking-tight">
            Our Best Sellers
          </h2>
          <div className="h-1 w-24 bg-[#116931]/20 mx-auto mt-6 rounded-full" />
        </div>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4 sm:gap-6
          "
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-[2/3] p-4 bg-muted animate-pulse rounded-2xl"
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
