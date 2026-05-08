import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Search, Loader2, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import producttest from "@/assets/product-nutmeg.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart, Star, ChevronDown } from "lucide-react";

import { getProducts } from "@/api/product.service";
import { getCategories, Category } from "@/api/category.service";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  sortWeights,
  getUnitInfo,
  getWeightValue,
  parseProductWeights,
  getDisplayWeight,
} from "@/lib/utils";

import Seo from "@/components/Seo";

import WhyChooseRajlakshmiSection from "@/components/WhyChooseRajlakshmiSection";
import ContactSection from "@/components/ContactSection";
import TestimonialSection from "@/components/TestimonialSection";
import CertificationsBottomSection from "@/components/CertificationsBottomSection";

const ITEMS_PER_PAGE = 12;

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

const ProductSkeleton = () => (
  <div className="w-full lg:w-[290px] border border-gray-100 rounded-[20px] p-3 flex flex-col gap-[10px] bg-white">
    <Skeleton className="w-full aspect-square rounded-xl" />
    <Skeleton className="h-4 w-3/4" />
    <div className="flex gap-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
    <div className="flex justify-between items-center">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-8" />
    </div>
    <div className="flex gap-2 mt-auto">
      <Skeleton className="h-8 flex-1" />
      <Skeleton className="h-8 flex-1" />
    </div>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-all-${product.id}`);

  const productImage = getFirstImage(product.product_images);
  const weights = parseProductWeights(product.weight_options);
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);

  const unitInfo = getUnitInfo(weights[selectedWeightIdx]?.weight);
  const weightInKg = getWeightValue(weights[selectedWeightIdx]?.weight) / 1000;
  const ratePerUnit = weights[selectedWeightIdx]?.selling_rate > 0
    ? weights[selectedWeightIdx].selling_rate
    : weightInKg > 0
      ? Number(weights[selectedWeightIdx]?.price || product.price) / weightInKg
      : Number(weights[selectedWeightIdx]?.price || product.price);

  const [showWeights, setShowWeights] = useState(false);

  const selectedWeightObj = weights[selectedWeightIdx] || {
    weight: "N/A",
    price: "",
  };
  const currentPrice =
    Number(selectedWeightObj.price ? selectedWeightObj.price : product.price) ||
    0;
  const pDelPrice = Number(product.product_del_price) || 0;

  let currentDiscount = product.discount || 0;
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
      name: product.product_name,
      price: currentPrice,
      image: productImage,
      quantity: 1,
      weight: selectedWeightObj.weight,
    });
    toast.success(`${product.product_name} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-${product.id}`,
      name: product.product_name,
      price: currentPrice,
      image: productImage,
      quantity: 1,
      weight: selectedWeightObj.weight,
    });
    navigate("/cart");
  };

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        w-full
        lg:w-[290px]
        h-auto
        lg:min-h-[448px]
        cursor-pointer
        bg-popover
        border
        border-border
        rounded-[20px]
        overflow-visible
        group
        hover:shadow-card
        transition-all
        duration-300
        p-3
        flex
        flex-col
        gap-[10px]
      "
    >
      {/* Image */}
      <div className="relative">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted relative">
          <img
            src={productImage || ""}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "";
            }}
          />
        </div>

        <button
          aria-label="Add to Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: product.id,
              name: product.product_name,
              price: currentPrice,
              image: productImage,
              originalPrice: pDelPrice,
              discount: product.discount,
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

      {/* Content */}
      <div className="space-y-2 flex-1 flex flex-col">
        <h3 className="font-medium text-foreground text-sm line-clamp-2 min-h-[40px]">
          {product.product_name}
        </h3>

        <div className="mt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-primary font-bold text-base">
              ₹{currentPrice.toFixed(2)}
            </span>
            {pDelPrice > currentPrice && (
              <span className="text-muted-foreground line-through text-xs">
                ₹{pDelPrice.toFixed(2)}
              </span>
            )}
            {currentDiscount > 0 && (
              <Badge className="bg-primary rounded-md text-primary-foreground text-[10px] px-2 py-0.5">
                {currentDiscount}% Off
              </Badge>
            )}
          </div>
          <span className="text-[10px] text-primary/70 font-semibold block">
            Rate: ₹{ratePerUnit.toFixed(2)} / {/kg|g|gm|ml|ltr|l/i.test(selectedWeightObj.weight) ? "kg" : unitInfo.unit}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              aria-label="Select Weight"
              onClick={(e) => {
                e.stopPropagation();
                if (weights.length > 1) setShowWeights(!showWeights);
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-md border text-xs bg-white"
            >
              {getDisplayWeight(selectedWeightObj.weight)}
              {weights.length > 1 && <ChevronDown className="h-3 w-3" />}
            </button>
            {showWeights && (
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
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{product.rating || "4.5"}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto pt-2">
          <Button
            aria-label="Add to cart"
            variant="outline"
            onClick={handleAddToCart}
            className="flex-1 border-primary text-primary text-[10px] sm:text-[11px] h-8 sm:h-9 rounded-md hover:bg-primary hover:text-white transition-colors font-bold px-1"
          >
            ADD TO CART
          </Button>
          <Button
            aria-label="Buy now"
            onClick={handleBuyNow}
            className="flex-1 bg-primary text-white text-[10px] sm:text-[11px] h-8 sm:h-9 rounded-md hover:bg-primary/90 transition-colors font-bold shadow-sm animate-glow px-1"
          >
            BUY NOW
          </Button>
        </div>
      </div>
    </Card>
  );
};

const categoryOrder = [
  "PULSES",
  "MILLET",
  "MASALA",
  "SWEETS",
  "HONEY",
  "DRY FRUITS",
  "SEEDS",
  "OTHER ITEMS",
  "HOME MADE AACHAR",
  "FRUITS DRINKS / CHUTNEY",
  "RICE & WHEAT",
  "OILS & GHEE",
  "RLJ PRODUCTS",
  "KHAKHRA",
  "KHAPLI WHEAT KHAKHRA (EMMER WHEAT)",
  "MILLETS KHAKHRA",
  "FASTING / UPVAS SPECIAL - GLUTEN FREE KHAKHRA",
  "ROASTED MILLET DRY BHAKRI",
];

interface FilterContentProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (val: string) => void;
  categories: Category[];
  searchParams: any;
  setSearchParams: any;
  loading: boolean;
  handleApplyFilters: () => void;
  handleClearFilters: () => void;
}

const FilterContent = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  categories,
  searchParams,
  setSearchParams,
  loading,
  handleApplyFilters,
  handleClearFilters,
}: FilterContentProps) => (
  <div className="space-y-8">
    {/* Search */}
    <div className="relative group">
      <Input
        placeholder="Search products..."
        className="pr-10 bg-white border-border rounded-xl focus:ring-primary focus:border-primary transition-all duration-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {loading && searchQuery && (
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
        )}
        <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
    </div>

    {/* Category Filter */}
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
        Categories
      </h3>
      <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <button
          onClick={() => {
            setSelectedCategory("all");
            const params = new URLSearchParams(searchParams);
            params.delete("category");
            params.set("page", "1");
            setSearchParams(params);
          }}
          className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
            selectedCategory === "all"
              ? "bg-primary text-white font-bold shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          All Products
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.category_name);
              const params = new URLSearchParams(searchParams);
              params.set("category", cat.category_name);
              params.set("page", "1");
              setSearchParams(params);
            }}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
              selectedCategory === cat.category_name
                ? "bg-primary text-white font-bold shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat.category_name}
          </button>
        ))}
      </div>
    </div>

    {/* Price Filter */}
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
        Price Range
      </h3>
      <div className="flex flex-col gap-1">
        {[
          { label: "All Prices", value: "all" },
          { label: "₹0 - ₹500", value: "0-500" },
          { label: "₹500 - ₹1000", value: "500-1000" },
          { label: "₹1000+", value: "1000-+" },
        ].map((range) => (
          <button
            key={range.value}
            onClick={() => {
              setSelectedPriceRange(range.value);
              const params = new URLSearchParams(searchParams);
              if (range.value === "all") params.delete("price");
              else params.set("price", range.value);
              params.set("page", "1");
              setSearchParams(params);
            }}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
              selectedPriceRange === range.value
                ? "bg-primary/10 text-primary font-bold border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>

    {/* Actions */}
    <div className="pt-4 flex flex-col gap-3 border-top border-dashed">
      <Button
        aria-label="Clear All Filters"
        variant="ghost"
        className="w-full text-muted-foreground text-xs hover:text-destructive"
        onClick={handleClearFilters}
      >
        Reset All Filters
      </Button>
    </div>
  </div>
);

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1"),
  );
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [selectedWeight, setSelectedWeight] = useState(
    searchParams.get("weight") || "all",
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    searchParams.get("price") || "all",
  );

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res.success && res.data) {
        const sorted = [...res.data].sort((a, b) => {
          const indexA = categoryOrder.indexOf(a.category_name);
          const indexB = categoryOrder.indexOf(b.category_name);
          const finalIndexA = indexA === -1 ? 999 : indexA;
          const finalIndexB = indexB === -1 ? 999 : indexB;
          return finalIndexA - finalIndexB;
        });
        setCategories(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Sync URL params to local state
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const weight = searchParams.get("weight") || "all";
    const price = searchParams.get("price") || "all";
    const page = parseInt(searchParams.get("page") || "1");

    setSearchQuery(search);
    setSelectedCategory(category);
    setSelectedWeight(weight);
    setSelectedPriceRange(price);
    setCurrentPage(page);
  }, [searchParams]);

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Get values directly from searchParams to be the source of truth
    const urlQuery = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "all";
    const urlWeight = searchParams.get("weight") || "all";
    const urlPriceRange = searchParams.get("price") || "all";
    const urlPage = parseInt(searchParams.get("page") || "1");

    try {
      let minPrice: number | undefined;
      let maxPrice: number | undefined;

      if (urlPriceRange !== "all") {
        const [min, max] = urlPriceRange.split("-");
        minPrice = parseInt(min);
        maxPrice = max === "+" ? undefined : parseInt(max);
      }

      const res = await getProducts({
        page: urlPage,
        limit: ITEMS_PER_PAGE,
        search: urlQuery || undefined,
        category: urlCategory === "all" ? undefined : urlCategory,
        weight: urlWeight === "all" ? undefined : urlWeight,
        minPrice,
        maxPrice,
      });

      if (res.success) {
        const productData = res.products || res.data || [];

        const mappedProducts = productData.map((p: any) => ({
          ...p,
          price: p.product_price !== undefined ? p.product_price : p.price,
          mrp: p.product_del_price !== undefined ? p.product_del_price : p.mrp,
          weight_options:
            p.product_weight !== undefined
              ? p.product_weight
              : p.weight_options,
        }));

        setProducts(mappedProducts);
        if (res.pagination) {
          setTotalPages(res.pagination.totalPages || 1);
        } else {
          setTotalPages(1);
        }
      } else {
        setError("No products found for this criteria");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching products");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Debounce search update to URL
  useEffect(() => {
    // Only debounce if the searchQuery in state is different from searchParams
    const currentUrlSearch = searchParams.get("search") || "";
    if (searchQuery === currentUrlSearch) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, searchParams, setSearchParams]);

  const handleApplyFilters = () => {
    const params: any = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (selectedWeight !== "all") params.weight = selectedWeight;
    if (selectedPriceRange !== "all") params.price = selectedPriceRange;
    params.page = "1";
    setSearchParams(params);
    setMobileFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedWeight("all");
    setSelectedPriceRange("all");
    setSearchParams({});
    setMobileFilterOpen(false);
  };

  const filterProps = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    categories,
    searchParams,
    setSearchParams,
    loading,
    handleApplyFilters,
    handleClearFilters,
  };

  return (
    <>
      <Seo
        title="Our Complete range of Pure Organic Products – Rajlakshmi Javiks"
        description="Explore our wide range of 100% natural, chemical-free organic products including A2 Gir Cow Ghee, Pulses, Millets, and more. Quality you can trust."
        url="https://rajlakshmijaviks.com/products"
      />

      <h1 className="sr-only">
        Rajlakshmi Javiks offers a wide collection of pure organic food products
        sourced directly from farmers. Our range includes Bilona A2 Gir Cow
        Ghee, ancient millets, organic pulses, cold-pressed oils, and natural
        honey. All products are 100% pure, lab-tested, and free from
        preservatives, ensuring the best health for your family.
      </h1>

      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 mt-5">
          <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Title + mobile filter */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#116931]">
                All Products
              </h2>

              {/* Mobile Filter Button */}
              <Button
                aria-label="Filter Products"
                variant="outline"
                className="lg:hidden gap-2 items-center rounded-xl border-[#116931] text-[#116931] hover:bg-[#116931] hover:text-white transition-colors"
                onClick={() => setMobileFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Products */}
              <div className="flex-1">
                {loading ? (
                  <div
                    className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    gap-4
                    lg:gap-6
                    lg:justify-center
                    lg:[grid-template-columns:repeat(auto-fit,290px)]
                  "
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <ProductSkeleton key={i} />
                    ))}
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-destructive font-medium mb-4">{error}</p>
                    <Button aria-label="Try Again" onClick={fetchAllProducts}>
                      Try Again
                    </Button>
                  </div>
                ) : products?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <h3 className="text-xl font-semibold mb-2">
                      No products found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      aria-label="Clear all filters"
                      variant="outline"
                      onClick={handleClearFilters}
                    >
                      Clear all filters
                    </Button>
                  </div>
                ) : (
                  <div
                    className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    gap-4
                    lg:gap-6
                    lg:justify-center
                    lg:[grid-template-columns:repeat(auto-fit,290px)]
                  "
                  >
                    {products?.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 py-2">
                    <Button
                      aria-label="Previous Page"
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full border-border hover:border-primary transition-colors"
                      disabled={currentPage === 1}
                      onClick={() => {
                        const newPage = currentPage - 1;
                        if (newPage < 1) return;
                        const params = new URLSearchParams(searchParams);
                        params.set("page", newPage.toString());
                        setSearchParams(params);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1;
                      // Dynamic pagination: show current, first, last, and neighbors
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 &&
                          pageNum <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            aria-label={`Page ${pageNum}`}
                            key={pageNum}
                            variant={
                              currentPage === pageNum ? "default" : "ghost"
                            }
                            className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${
                              currentPage === pageNum
                                ? "bg-primary text-white shadow-md scale-110"
                                : "hover:text-primary hover:bg-primary/5"
                            }`}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              setSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                page: pageNum.toString(),
                              });
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            {pageNum}
                          </Button>
                        );
                      } else if (
                        (pageNum === 2 && currentPage > 3) ||
                        (pageNum === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <span
                            key={pageNum}
                            className="px-1 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <Button
                      aria-label="Next Page"
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full border-border hover:border-primary transition-colors"
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        const newPage = currentPage + 1;
                        setCurrentPage(newPage);
                        setSearchParams({
                          ...Object.fromEntries(searchParams.entries()),
                          page: newPage.toString(),
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-28">
                  <FilterContent {...filterProps} />
                </div>
              </aside>
            </div>
          </div>
        </main>

        {mobileFilterOpen && (
          <div className="fixed inset-0 z-[60] bg-black/5 backdrop-blur-sm flex justify-end">
            <div className="bg-white w-[85%] max-w-sm h-full shadow-2xl animate-in slide-in-from-right duration-300 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">Filters</h3>
                </div>
                <Button
                  aria-label="Close Filters"
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-muted"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <FilterContent {...filterProps} />
            </div>

            {/* Click outside to close */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setMobileFilterOpen(false)}
            />
          </div>
        )}

        <WhyChooseRajlakshmiSection />
        <ContactSection />
        <TestimonialSection />
        {/* <CertificationsBottomSection className="bg-[#F0FFF0]" /> */}
      </div>
    </>
  );
};

export default AllProducts;
