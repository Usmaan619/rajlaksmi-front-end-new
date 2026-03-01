import { useState, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Loader2,
  Search,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import CertificationsBottomSection from "@/components/CertificationsBottomSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getProducts } from "@/api/product.service";
import { Product } from "@/types/product";
import producttest from "@/assets/product-nutmeg.jpg";
import { Skeleton } from "@/components/ui/skeleton";

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

const ProductSkeleton = () => (
  <div className="w-full lg:w-[290px] border border-gray-100 rounded-2xl p-3 flex flex-col gap-3 bg-white">
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
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 flex-1" />
    </div>
  </div>
);

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 border border-[hsl(140,40%,75%)] rounded-full px-4 py-1.5 text-sm text-foreground hover:border-[hsl(140,60%,30%)] transition-colors bg-background"
      >
        {value || label}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 bg-background border border-border rounded-lg shadow-lg z-[60] min-w-[160px]">
          <button
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            All
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${value === opt ? "font-semibold text-[hsl(140,60%,30%)]" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-cat-${product.id}`);

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
  const weights = getWeightOptions(
    product.weight_options || product.product_weight,
  );
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [showWeights, setShowWeights] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-cat-${product.id}`,
      name: pName,
      price: pPrice,
      image: productImage || producttest,
      quantity: 1,
      weight: selectedWeight,
    });
    toast.success(`${pName} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-cat-${product.id}`,
      name: pName,
      price: pPrice,
      image: productImage || producttest,
      quantity: 1,
      weight: selectedWeight,
    });
    navigate("/cart");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full lg:w-[290px] overflow-visible cursor-pointer
 h-auto lg:min-h-[448px] border border-[hsl(140,40%,80%)] rounded-2xl p-3 hover:shadow-md transition-shadow flex flex-col gap-2 group bg-white"
    >
      {/* Image Wrap */}
      <div className="relative mb-2">
        {pDiscount > 0 && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            {pDiscount}% Off
          </span>
        )}
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={productImage || producttest}
            alt={pName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = producttest;
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `product-cat-${product.id}`,
              name: pName,
              price: pPrice,
              image: productImage || producttest,
              originalPrice: pDelPrice,
              discount: pDiscount,
              weightOptions: weights,
            });
            toast.success(
              isFavorite ? `Removed from Wishlist` : `Added to Wishlist`,
            );
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform z-10"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px]">
        {pName}
      </h3>

      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-[hsl(140,60%,30%)] font-bold text-sm">
          ₹{pPrice}
        </span>
        {pDelPrice > pPrice && (
          <span className="text-muted-foreground line-through text-xs">
            ₹{pDelPrice}
          </span>
        )}
      </div>

      {/* Weight + Rating */}
      <div className="flex items-center justify-between mt-2">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (weights.length > 1) setShowWeights(!showWeights);
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] bg-white"
          >
            {selectedWeight}
            {weights.length > 1 && <ChevronDown className="h-3 w-3" />}
          </button>
          {showWeights && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-lg z-[50] min-w-[70px]">
              {weights.map((w: string) => (
                <div
                  key={w}
                  className="px-2 py-1 hover:bg-muted cursor-pointer text-[10px]"
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
        <div className="flex items-center gap-0.5">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-muted-foreground">{pRating}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={handleAddToCart}
          className="flex-1 border border-[hsl(140,60%,30%)] text-[hsl(140,60%,30%)] text-[11px] py-1.5 rounded-md hover:bg-[hsl(140,60%,30%)] hover:text-white transition-colors font-medium"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[hsl(140,60%,30%)] text-white text-[11px] py-1.5 rounded-md hover:bg-[hsl(140,60%,25%)] transition-colors font-medium"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const CategoryMain = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [availability, setAvailability] = useState("");
  const [weight, setWeight] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let minPrice: number | undefined;
      let maxPrice: number | undefined;

      if (filterBy) {
        if (filterBy === "Under ₹300") {
          minPrice = 0;
          maxPrice = 300;
        } else if (filterBy === "₹300 - ₹500") {
          minPrice = 300;
          maxPrice = 500;
        } else if (filterBy === "₹500 - ₹1000") {
          minPrice = 500;
          maxPrice = 1000;
        } else if (filterBy === "Above ₹1000") {
          minPrice = 1000;
        }
      }

      const res = await getProducts({
        category: categoryName || undefined,
        minPrice,
        maxPrice,
        weight: weight === "All" || !weight ? undefined : weight,
      });

      if (res.success) {
        let fetched = res.products || res.data || [];

        // Local Sorting
        if (sortBy === "Price: Low to High") {
          fetched.sort(
            (a, b) =>
              (a.product_price || a.price) - (b.product_price || b.price),
          );
        } else if (sortBy === "Price: High to Low") {
          fetched.sort(
            (a, b) =>
              (b.product_price || b.price) - (a.product_price || a.price),
          );
        } else if (sortBy === "Rating") {
          fetched.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === "Discount") {
          fetched.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        }

        // Add 3 second artificial delay for visual skeleton impact as requested
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setProducts(fetched);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [categoryName, filterBy, weight, availability, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName, availability, weight, filterBy, sortBy]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50/30">
        {/* Header Title */}
        <section className="px-4 md:px-16 lg:px-24 pt-8 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {categoryName || "Organic Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pure, naturally grown products for your healthy lifestyle.
          </p>
        </section>

        {/* Filter Bar */}
        <section className="px-4 md:px-16 lg:px-24 pb-4 sticky top-[64px] lg:top-[80px] bg-gray-50/90 backdrop-blur-sm z-40 py-2 border-b border-gray-200/50 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              label="Availability"
              options={["In Stock", "Out of Stock"]}
              value={availability}
              onChange={setAvailability}
            />
            <FilterDropdown
              label="Weight"
              options={[
                "250ml",
                "500ml",
                "1000ml",
                "250g",
                "500g",
                "1kg",
                "5kg",
              ]}
              value={weight}
              onChange={setWeight}
            />
            <FilterDropdown
              label="Filter By Price"
              options={[
                "Under ₹300",
                "₹300 - ₹500",
                "₹500 - ₹1000",
                "Above ₹1000",
              ]}
              value={filterBy}
              onChange={setFilterBy}
            />
            <FilterDropdown
              label="Sort By"
              options={[
                "Price: Low to High",
                "Price: High to Low",
                "Rating",
                "Discount",
              ]}
              value={sortBy}
              onChange={setSortBy}
            />

            {(availability || weight || filterBy || sortBy) && (
              <button
                onClick={() => {
                  setAvailability("");
                  setWeight("");
                  setFilterBy("");
                  setSortBy("");
                }}
                className="text-xs text-red-500 hover:underline ml-2"
              >
                Clear All
              </button>
            )}
          </div>
        </section>

        {/* Product Grid */}
        <section className="px-4 md:px-16 lg:px-24 pb-8">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:justify-center lg:[grid-template-columns:repeat(auto-fit,290px)]">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:justify-center lg:[grid-template-columns:repeat(auto-fit,290px)]">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-white">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your filters or selecting a different category.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-40 hover:text-foreground transition-colors"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                    currentPage === i + 1
                      ? "bg-[hsl(140,60%,30%)] text-white shadow-md scale-110"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-40 hover:text-foreground transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>

        <CertificationsSection />

        {/* Why Choose Section (Dynamic Title) */}
        <section className="mx-4 md:mx-16 lg:mx-24 mb-12 rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-[hsl(140,60%,30%)] mb-4">
                Why Choose Our {categoryName || "Organic Products"}?
              </h2>
              <p className="text-sm text-foreground mb-4 leading-relaxed text-gray-600">
                Our products are carefully cultivated without synthetic
                fertilizers or pesticides. Each product is processed with utmost
                care to preserve its natural nutritional value, making it a
                perfect choice for health-conscious families.
              </p>
              <div className="space-y-4 mt-2">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Ideal for:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Daily home cooking",
                      "Traditional recipes",
                      "Protein-rich diets",
                      "Healthy lifestyle",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-[300px] md:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
                alt="Organic farming"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
            </div>
          </div>
        </section>
      </div>
      <ContactSection />
      <CertificationsBottomSection className="bg-white" />
    </>
  );
};

export default CategoryMain;
