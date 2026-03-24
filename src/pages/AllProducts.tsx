import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Search, Loader2 } from "lucide-react";
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
import { sortWeights, getUnitInfo } from "@/lib/utils";

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

const getWeightOptions = (weight: any): any[] => {
  let options: any[] = [];

  if (!weight) return [{ weight: "N/A", price: "" }];

  if (Array.isArray(weight)) {
    options = weight;
  } else {
    try {
      const parsed = JSON.parse(weight);
      if (Array.isArray(parsed)) {
        options = parsed;
      } else {
        options = [parsed];
      }
    } catch (e) {
      if (
        typeof weight === "string" &&
        (weight.includes("Size") || weight.includes("KG"))
      ) {
        const matches = weight.match(/\d+(\.\d+)?(kg|g|gm|ml|l|ltr)/gi);
        options =
          matches && matches.length > 0 ? matches : [{ weight: weight }];
      } else {
        options = [{ weight: weight }];
      }
    }
  }

  options = options.map((opt) =>
    typeof opt === "string" ? { weight: String(opt), price: "" } : opt,
  );

  return sortWeights(options);
};

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
  const weights = getWeightOptions(product.weight_options);
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);

  const unitInfo = getUnitInfo(weights[selectedWeightIdx]?.weight);
  const ratePerUnit = unitInfo.value > 0 
    ? (Number(weights[selectedWeightIdx]?.price || product.price) / unitInfo.value) 
    : 0;

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
        lg:h-[448px]
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
            src={productImage || producttest}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = producttest;
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
              {selectedWeightObj.weight}
              {weights.length > 1 && <ChevronDown className="h-3 w-3" />}
            </button>
            <div className="mt-1">
               <span className="text-[10px] text-primary/70 font-semibold block">
                  Rate: ₹{ratePerUnit.toFixed(2)} / {unitInfo.unit}
               </span>
            </div>
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
                    {w.weight}
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
      </div>
    </Card>
  );
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

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let minPrice: number | undefined;
      let maxPrice: number | undefined;

      if (selectedPriceRange !== "all") {
        const [min, max] = selectedPriceRange.split("-");
        minPrice = parseInt(min);
        maxPrice = max === "+" ? undefined : parseInt(max);
      }

      const res = await getProducts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchQuery || undefined,
        category: selectedCategory === "all" ? undefined : selectedCategory,
        weight: selectedWeight === "all" ? undefined : selectedWeight,
        minPrice,
        maxPrice,
      });

      if (res.success) {
        const productData = res.products || res.data || [];

        // Map backend fields to frontend names if needed
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
        setError("Failed to fetch products");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching products");
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    searchQuery,
    selectedCategory,
    selectedWeight,
    selectedPriceRange,
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleApplyFilters = () => {
    setCurrentPage(1);
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
    setCurrentPage(1);
    setSearchParams({});
    setMobileFilterOpen(false);
  };

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Input
          placeholder="Find your products"
          className="pr-10 bg-white border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Category
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-popover border-border">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.category_name}>
                {cat.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Price Range
        </label>
        <Select
          value={selectedPriceRange}
          onValueChange={setSelectedPriceRange}
        >
          <SelectTrigger className="bg-popover border-border">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0-500">₹0 - ₹500</SelectItem>
            <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
            <SelectItem value="1000-+">₹1000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          aria-label="Clear Filters"
          variant="outline"
          className="bg-white flex-1 border-border text-muted-foreground"
          onClick={handleClearFilters}
        >
          Clear
        </Button>
        <Button
          aria-label="Apply Filters"
          className="flex-1 bg-primary text-primary-foreground"
          onClick={handleApplyFilters}
        >
          Apply
        </Button>
      </div>
    </div>
  );

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
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileFilterOpen(true)}
              >
                <Search className="h-4 w-4" />
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
                        setCurrentPage(newPage);
                        setSearchParams({
                          ...Object.fromEntries(searchParams.entries()),
                          page: newPage.toString(),
                        });
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

              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-28">
                  <FilterContent />
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex">
            <div className="bg-white w-80 h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  aria-label="Close Filters"
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Close
                </Button>
              </div>
              <FilterContent />
            </div>

            {/* Click outside to close */}
            <div
              className="flex-1"
              onClick={() => setMobileFilterOpen(false)}
            />
          </div>
        )}

        <WhyChooseRajlakshmiSection />
        <ContactSection />
        <TestimonialSection />
        <CertificationsBottomSection className="bg-[#F0FFF0]" />
      </div>
    </>
  );
};

export default AllProducts;
