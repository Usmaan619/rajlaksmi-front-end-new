import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import producttest from "@/assets/product-nutmeg.jpg";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getProducts } from "@/api/product.service";
import { Product } from "@/types/product";
import {
  sortWeights,
  getWeightMultiplier,
  parseProductWeights,
  getDisplayWeight,
} from "@/lib/utils";

const getFirstImage = (images: any) => {
  if (!images) return "";
  if (Array.isArray(images)) return images.length > 0 ? images[0] : "";
  if (typeof images !== "string") return "";
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : images;
  } catch (e) {
    return images;
  }
};

// Replaced by parseProductWeights from utils.ts

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-related-${product.id}`);

  // Normalize product fields
  const pName = product.product_name || (product as any).name;
  const pPrice = Number(
    product.product_price !== undefined ? product.product_price : product.price,
  );
  const pDelPrice = Number(
    product.product_del_price !== undefined
      ? product.product_del_price
      : (product as any).mrp,
  );
  const pDiscount = product.discount || 0;
  const pRating = product.rating || "4.5";

  const productImage = getFirstImage(product.product_images);
  const weights = parseProductWeights(
    product.weight_options || product.product_weight,
  );
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [showWeights, setShowWeights] = useState(false);

  const selectedWeightObj = weights[selectedWeightIdx] || {
    weight: "N/A",
    price: "",
  };
  const weightMultiplier = getWeightMultiplier(selectedWeightObj.weight);
  const currentPrice = (selectedWeightObj.price
    ? Number(selectedWeightObj.price)
    : pPrice) * weightMultiplier;
  
  const currentDelPrice = pDelPrice * weightMultiplier;

  let currentDiscount = pDiscount;
  if (selectedWeightObj.price && pDelPrice > currentPrice) {
    currentDiscount = Math.round(
      ((pDelPrice - currentPrice) / pDelPrice) * 100,
    );
  } else if (currentPrice >= pDelPrice) {
    currentDiscount = 0;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-${product.id}`,
      name: pName,
      price: currentPrice,
      image: productImage,
      quantity: 1,
      weight: selectedWeightObj.weight,
    });
    toast.success(`${pName} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-${product.id}`,
      name: pName,
      price: currentPrice,
      image: productImage,
      quantity: 1,
      weight: selectedWeightObj.weight,
    });
    navigate("/cart");
  };

  return (
    <Card
      onClick={() => {
        navigate(`/product/${product.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="w-[290px] h-[448px] cursor-pointer bg-popover border border-border rounded-[20px] overflow-visible
 group hover:shadow-card transition-all duration-300 p-[20px] flex flex-col gap-[10px]"
    >
      <div className="relative">
        <div className="aspect-square rounded-xl overflow-hidden bg-white border border-gray-100">
          <img
            src={productImage || producttest}
            alt={pName}
            width="265"
            height="265"
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = producttest;
            }}
          />
        </div>

        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `${product.id}`,
              name: pName,
              price: currentPrice,
              image: productImage,
              originalPrice: currentDelPrice,
              discount: currentDiscount,
              weightOptions: weights,
            });
            toast.success(
              isFavorite ? `Removed from Wishlist` : `Added to Wishlist`,
            );
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-popover shadow-soft flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <div className="space-y-2 flex-1 flex flex-col">
        <h3 className="font-medium text-foreground text-sm line-clamp-2 min-h-[40px]">
          {pName}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-primary font-bold text-base">
            ₹{currentPrice.toFixed(2)}
          </span>
          {currentDelPrice > currentPrice && (
            <span className="text-muted-foreground line-through text-xs">
              ₹{currentDelPrice.toFixed(2)}
            </span>
          )}
          {currentDiscount > 0 && (
            <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
              {currentDiscount}% Off
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              aria-label="Select unit"
              onClick={(e) => {
                e.stopPropagation();
                if (weights.length > 1) setShowWeights(!showWeights);
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-md border text-xs bg-white"
            >
              {getDisplayWeight(selectedWeightObj.weight)}
              {weights.length > 1 && <ChevronDown className="h-3 w-3" />}
            </button>
            {showWeights && weights.length > 1 && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-lg z-20 min-w-[80px]">
                {weights.map((w: any, idx: number) => (
                  <div
                    key={idx}
                    className="px-3 py-1 hover:bg-muted cursor-pointer text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWeightIdx(idx);
                      setShowWeights(false);
                    }}
                  >
                    {getDisplayWeight(w.weight)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-golden text-golden" />
            <span className="text-xs">{pRating}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1 mt-auto">
          <Button
            aria-label="Add to cart"
            size="sm"
            className="flex-1 text-[10px] sm:text-[11px] h-8 sm:h-9 font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm animate-glow"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
          <Button
            aria-label="Buy now"
            size="sm"
            variant="outline"
            className="flex-1 text-[10px] sm:text-[11px] h-8 sm:h-9 bg-white font-bold border-primary text-primary hover:bg-primary hover:text-white"
            onClick={handleBuyNow}
          >
            BUY NOW
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface RelatedProductProps {
  category?: string;
  currentProductId?: string | number;
}

const RelatedProduct = ({
  category,
  currentProductId,
}: RelatedProductProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRelatedProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Use the provided category if we have it, otherwise fetch general products
      const searchCategory = category || undefined;

      const res = await getProducts({
        category: searchCategory,
        limit: 10,
      });

      if (res.success) {
        let fetchedProducts = res.products || res.data || [];

        // Filter out current
        if (currentProductId) {
          fetchedProducts = fetchedProducts.filter(
            (p) => String(p.id) !== String(currentProductId),
          );
        }

        // Fallback logic: If we specifically asked for a category and found NOTHING,
        // then try fetching general products so the section isn't empty.
        if (fetchedProducts.length === 0 && searchCategory) {
          const fallbackRes = await getProducts({ limit: 10 });
          if (fallbackRes.success) {
            fetchedProducts = (
              fallbackRes.products ||
              fallbackRes.data ||
              []
            ).filter((p) => String(p.id) !== String(currentProductId));
          }
        }

        setProducts(fetchedProducts);
      }
    } catch (err) {
      console.error("Failed to fetch related products", err);
    } finally {
      setLoading(false);
    }
  }, [category, currentProductId]);

  useEffect(() => {
    // If category is specifically passed (even as null/empty), we fetch.
    // If it's undefined, it likely means ProductDetail hasn't loaded apiProduct yet.
    if (category !== undefined) {
      fetchRelatedProducts();
    }
  }, [fetchRelatedProducts, category]);

  useEffect(() => {
    if (!api || products.length === 0) return;

    autoplayRef.current = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [api, products]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  if (loading && category !== undefined) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">
          Loading related products...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 to-white relative overflow-hidden mb-5">
      <div className="mx-auto px-10 relative z-10">
        <h2 className="text-3xl font-bold text-[#01722C] mb-6">
          Related Products
        </h2>

        <Carousel
          opts={{ align: "start", loop: products.length > 4 }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="pl-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-auto mr-4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            aria-label="Previous slide"
            onClick={scrollPrev}
            className="w-10 h-10 bg-white rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Next slide"
            onClick={scrollNext}
            className="w-10 h-10 bg-white rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;
