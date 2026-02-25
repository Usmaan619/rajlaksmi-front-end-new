import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import CertificationsBottomSection from "@/components/CertificationsBottomSection";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight: string;
  weightOptions: string[];
  rating: number;
  badge: string;
  available: boolean;
};

const allProducts: Product[] = [
  {
    id: 1,
    name: "Organic Kabuli Chana",
    image:
      "https://images.unsplash.com/photo-1515543904532-3b4e62e2e72e?w=300&h=300&fit=crop",
    price: 299,
    originalPrice: 499,
    discount: 50,
    weight: "500ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 2,
    name: "Organic Maize Whole",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=300&fit=crop",
    price: 299,
    originalPrice: 549,
    discount: 50,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 3,
    name: "Organic Nutmeg Whole",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    price: 899,
    originalPrice: 1100,
    discount: 50,
    weight: "500ml",
    weightOptions: ["250ml", "500ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 4,
    name: "Organic Idli Rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    price: 699,
    originalPrice: 1100,
    discount: 50,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 5,
    name: "Organic Kabuli Chana",
    image:
      "https://images.unsplash.com/photo-1515543904532-3b4e62e2e72e?w=300&h=300&fit=crop",
    price: 699,
    originalPrice: 999,
    discount: 50,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 6,
    name: "Organic Maize Whole",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=300&fit=crop",
    price: 299,
    originalPrice: 549,
    discount: 50,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 7,
    name: "Organic Nutmeg Whole",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    price: 199,
    originalPrice: 399,
    discount: 50,
    weight: "500ml",
    weightOptions: ["250ml", "500ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 8,
    name: "Organic Idli Rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    price: 899,
    originalPrice: 1100,
    discount: 50,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 9,
    name: "Organic Kabuli Chana",
    image:
      "https://images.unsplash.com/photo-1515543904532-3b4e62e2e72e?w=300&h=300&fit=crop",
    price: 299,
    originalPrice: 499,
    discount: 50,
    weight: "500ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 10,
    name: "Organic Maize Whole",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=300&fit=crop",
    price: 299,
    originalPrice: 549,
    discount: 50,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 11,
    name: "Organic Nutmeg Whole",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    price: 899,
    originalPrice: 1100,
    discount: 50,
    weight: "500ml",
    weightOptions: ["250ml", "500ml"],
    rating: 4.5,
    badge: "Hot",
    available: true,
  },
  {
    id: 12,
    name: "Organic Idli Rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    price: 699,
    originalPrice: 1100,
    discount: 50,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.5,
    badge: "Hot",
    available: false,
  },
  {
    id: 13,
    name: "Organic Toor Dal",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    price: 399,
    originalPrice: 599,
    discount: 33,
    weight: "500ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.0,
    badge: "Hot",
    available: true,
  },
  {
    id: 14,
    name: "Organic Moong Dal",
    image:
      "https://images.unsplash.com/photo-1515543904532-3b4e62e2e72e?w=300&h=300&fit=crop",
    price: 349,
    originalPrice: 499,
    discount: 30,
    weight: "500ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.2,
    badge: "Hot",
    available: true,
  },
  {
    id: 15,
    name: "Organic Chana Dal",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=300&fit=crop",
    price: 259,
    originalPrice: 399,
    discount: 35,
    weight: "1000ml",
    weightOptions: ["500ml", "1000ml"],
    rating: 4.3,
    badge: "Hot",
    available: true,
  },
  {
    id: 16,
    name: "Organic Urad Dal",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    price: 449,
    originalPrice: 699,
    discount: 36,
    weight: "500ml",
    weightOptions: ["250ml", "500ml", "1000ml"],
    rating: 4.6,
    badge: "Hot",
    available: true,
  },
];

const ITEMS_PER_PAGE = 12;

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
        <div className="absolute top-full mt-1 left-0 bg-background border border-border rounded-lg shadow-lg z-20 min-w-[160px]">
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
  const [selectedWeight, setSelectedWeight] = useState(product.weight);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-cat-${product.id}`);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-cat-${product.id}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      weight: selectedWeight,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-cat-${product.id}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      weight: selectedWeight,
    });
    navigate("/cart");
  };

  return (
    // <div className="w-[290px] h-[448px] border border-[hsl(140,40%,80%)] rounded-2xl p-3 hover:shadow-md transition-shadow flex flex-col">
    // <div className="w-full lg:w-[290px] h-[448px] border border-[hsl(140,40%,80%)] rounded-2xl p-3 hover:shadow-md transition-shadow flex flex-col">
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full lg:w-[290px] overflow-visible cursor-pointer
 h-auto lg:h-[448px] border border-[hsl(140,40%,80%)] rounded-2xl p-3 hover:shadow-md transition-shadow flex flex-col gap-2 group"
    >
      {/* Badge */}
      <div className="relative mb-2">
        <span className="absolute top-1 left-1 bg-[hsl(0,80%,50%)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          {product.badge}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `product-cat-${product.id}`,
              name: product.name,
              price: product.price,
              image: product.image,
              originalPrice: product.originalPrice,
              discount: product.discount,
              weightOptions: product.weightOptions,
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
      <h3 className="text-sm font-semibold text-foreground truncate">
        {product.name}
      </h3>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-[hsl(140,60%,30%)] font-bold text-sm">
          ₹{product.price}
        </span>
        <span className="text-muted-foreground line-through text-xs">
          ₹{product.originalPrice}
        </span>
        <span className="bg-[hsl(140,60%,30%)] text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
          {product.discount}%OFF
        </span>
      </div>

      {/* Weight + Rating */}
      <div className="flex items-center justify-between mt-2">
        <select
          value={selectedWeight}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSelectedWeight(e.target.value)}
          className="border border-border rounded text-xs px-1.5 py-0.5 bg-background text-foreground"
        >
          {product.weightOptions.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-0.5">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-muted-foreground">
            {product.rating}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          className="flex-1 border border-[hsl(140,60%,30%)] text-[hsl(140,60%,30%)] text-xs py-1.5 rounded-md hover:bg-[hsl(140,60%,30%)] hover:text-white transition-colors font-medium"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[hsl(140,60%,30%)] text-white text-xs py-1.5 rounded-md hover:bg-[hsl(140,60%,25%)] transition-colors font-medium"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const CategoryMain = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [availability, setAvailability] = useState("");
  const [weight, setWeight] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (availability === "In Stock") result = result.filter((p) => p.available);
    if (availability === "Out of Stock")
      result = result.filter((p) => !p.available);

    if (weight) result = result.filter((p) => p.weightOptions.includes(weight));

    if (filterBy === "Under ₹300") result = result.filter((p) => p.price < 300);
    else if (filterBy === "₹300 - ₹500")
      result = result.filter((p) => p.price >= 300 && p.price <= 500);
    else if (filterBy === "₹500 - ₹1000")
      result = result.filter((p) => p.price >= 500 && p.price <= 1000);
    else if (filterBy === "Above ₹1000")
      result = result.filter((p) => p.price > 1000);

    if (sortBy === "Price: Low to High")
      result.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low")
      result.sort((a, b) => b.price - a.price);
    else if (sortBy === "Rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Discount")
      result.sort((a, b) => b.discount - a.discount);

    return result;
  }, [availability, weight, filterBy, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  useMemo(() => setCurrentPage(1), [availability, weight, filterBy, sortBy]);

  return (
    <>
      <div className="min-h-screen">
        {/* Header */}
        <section className="px-4 md:px-16 lg:px-24 pt-8 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Organic Pulses
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pure, protein-rich pulses for healthy everyday meals
          </p>
        </section>

        {/* Filter Bar */}
        <section className="px-4 md:px-16 lg:px-24 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              label="Availability"
              options={["In Stock", "Out of Stock"]}
              value={availability}
              onChange={setAvailability}
            />
            <FilterDropdown
              label="Weight (Kg, ltr)"
              options={["250ml", "500ml", "1000ml"]}
              value={weight}
              onChange={setWeight}
            />
            <FilterDropdown
              label="Filter By"
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
          </div>
        </section>

        {/* Product Grid */}
        <section className="px-4 md:px-16 lg:px-24 pb-8">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:justify-center lg:[grid-template-columns:repeat(auto-fit,290px)]">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              No products match your filters.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-40 hover:text-foreground transition-colors"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-sm transition-colors ${
                    currentPage === i + 1
                      ? "bg-[hsl(140,60%,30%)] text-white font-bold"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-40 hover:text-foreground transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* Certification Logos */}

        <CertificationsSection />
        {/* Why Choose Section */}
        <section className="mx-4 md:mx-16 lg:mx-24 mb-12 rounded-3xl overflow-hidden ">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-[hsl(140,60%,30%)] mb-4">
                Why Choose Our Organic Pulses?
              </h2>
              <p className="text-sm text-foreground mb-4">
                Our pulses are carefully cultivated without synthetic
                fertilizers or pesticides. Each product is processed with utmost
                care to preserve its natural nutritional value, making it a
                perfect choice for health-conscious families.
              </p>
              <p className="text-sm font-semibold text-foreground mb-2">
                Ideal for:
              </p>
              <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                <li>Daily home cooking</li>
                <li>Traditional Indian recipes</li>
                <li>Protein-rich diets</li>
                <li>Healthy lifestyle choices</li>
              </ul>
            </div>
            <div className="relative min-h-[250px] md:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
                alt="Organic pulses and grains"
                className="w-full h-full object-cover"
                loading="lazy"
              />
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
