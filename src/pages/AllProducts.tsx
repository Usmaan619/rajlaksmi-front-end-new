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

import WhyChooseRajlakshmiSection from "@/components/WhyChooseRajlakshmiSection";
import ContactSection from "@/components/ContactSection";
import TestimonialSection from "@/components/TestimonialSection";
import CertificationsBottomSection from "@/components/CertificationsBottomSection";

const ITEMS_PER_PAGE = 10;

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

const getWeightOptions = (weight: any) => {
  if (!weight) return ["N/A"];
  if (Array.isArray(weight)) return weight.length > 0 ? weight : ["N/A"];
  try {
    const parsed = JSON.parse(weight);
    return Array.isArray(parsed) ? parsed : [weight];
  } catch (e) {
    return [weight];
  }
};

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-all-${product.id}`);

  const productImage = getFirstImage(product.product_images);
  const weights = getWeightOptions(product.weight_options);
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [showWeights, setShowWeights] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-all-${product.id}`,
      name: product.product_name || product.name,
      price: product.price,
      image: productImage,
      quantity: 1,
      weight: selectedWeight,
    });
    toast.success(`${product.product_name || product.name} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-all-${product.id}`,
      name: product.product_name || product.name,
      price: product.price,
      image: productImage,
      quantity: 1,
      weight: selectedWeight,
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
            alt={product.product_name || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = producttest;
            }}
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `product-all-${product.id}`,
              name: product.product_name || product.name,
              price: product.price,
              image: productImage,
              originalPrice: product.product_del_price,
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
        <h3 className="font-medium text-foreground text-sm line-clamp-2">
          {product.product_name || product.name}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-primary font-bold text-base">
            ₹{product.price}
          </span>
          {product.product_del_price > product.price && (
            <span className="text-muted-foreground line-through text-xs">
              ₹{product.product_del_price}
            </span>
          )}

          <Badge className="bg-primary rounded-md text-primary-foreground text-[10px] px-2 py-0.5">
            {product.discount || 33}% Off
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (weights.length > 1) setShowWeights(!showWeights);
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-md border text-xs bg-white"
            >
              {selectedWeight}
              {weights.length > 1 && <ChevronDown className="h-3 w-3" />}
            </button>
            {showWeights && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-lg z-20 min-w-[80px]">
                {weights.map((w: string) => (
                  <div
                    key={w}
                    className="px-3 py-1 hover:bg-muted cursor-pointer text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWeight(w);
                      setShowWeights(false);
                    }}
                  >
                    {w}
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
          <Button
            size="sm"
            className="flex-1 text-[11px] sm:text-xs md:text-sm h-8 sm:h-9"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-[11px] sm:text-xs md:text-sm h-8 sm:h-9 bg-white border-border hover:bg-primary/5"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

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
      if (res.success) setCategories(res.data || []);
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

      {/* Weight Filter */}
      {/* <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Weight
        </label>
        <Select value={selectedWeight} onValueChange={setSelectedWeight}>
          <SelectTrigger className="bg-popover border-border">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="250g">250g</SelectItem>
            <SelectItem value="500g">500g</SelectItem>
            <SelectItem value="1000g">1000g</SelectItem>
            <SelectItem value="2000g">2000g</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

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
          variant="outline"
          className="bg-white flex-1 border-border text-muted-foreground"
          onClick={handleClearFilters}
        >
          Clear
        </Button>
        <Button
          className="flex-1 bg-primary text-primary-foreground"
          onClick={handleApplyFilters}
        >
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 mt-5">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Title + mobile filter */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
              All Products
            </h2>

            {/* Mobile Filter Button */}
            <Button
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
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <p className="text-muted-foreground animate-pulse">
                    Loading products...
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-destructive font-medium mb-4">{error}</p>
                  <Button onClick={fetchAllProducts}>Try Again</Button>
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
                  <Button variant="outline" onClick={handleClearFilters}>
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
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
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
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <Button
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
          <div className="flex-1" onClick={() => setMobileFilterOpen(false)} />
        </div>
      )}

      <WhyChooseRajlakshmiSection />
      <ContactSection />
      <TestimonialSection />
      <CertificationsBottomSection className="bg-[#F0FFF0]" />
    </div>
  );
};

export default AllProducts;
