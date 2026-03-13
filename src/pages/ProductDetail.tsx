import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "@/api/axios";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  Award,
  Leaf,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import productChana from "@/assets/product-chana.jpg";
import productMaize from "@/assets/product-maize.jpg";
import productNutmeg from "@/assets/product-nutmeg.jpg";
import productRice from "@/assets/product-rice.jpg";
import productOil from "@/assets/product-oil.jpg";

import paymentLogo1 from "@/assets/product-detail-visa/Visa.webp";
import paymentLogo2 from "@/assets/product-detail-visa/rupay.webp";
import paymentLogo3 from "@/assets/product-detail-visa/master-card.webp";
import paymentLogo4 from "@/assets/product-detail-visa/Bhim.webp";
import paymentLogo5 from "@/assets/product-detail-visa/razor-pay.webp";
import Seo from "@/components/Seo";
import RelatedProduct from "@/components/RelatedProduct";
import WriteReviewModal from "@/components/WriteReviewModal";
import BentoGrid from "@/components/BentoGrid";
import FAQSection from "@/components/FAQSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DEFAULT_PRODUCT = {
  name: "Organic Toor Dal",
  subtitle:
    "Naturally grown, protein-rich organic toor dal for everyday healthy meals.",
  rating: 4.5,
  reviews: 112,
  tags: [
    "100% Natural",
    "Chemical-Free",
    "Lactose-Free",
    "Gluten-Free",
    "Traditionally Churned",
  ],
  images: [productChana, productMaize, productNutmeg, productRice, productOil],
  sizes: [
    { weight: "250g", price: "" },
    { weight: "500g", price: "" },
    { weight: "1kg", price: "" },
    { weight: "5kg", price: "" },
    { weight: "10kg", price: "" },
  ],
  selectedSize: "1kg",
  price: 240,
  originalPrice: 480,
  discount: 50,
  availability: "In Stock",
  category: "Gir Ghee",
  offers: [
    {
      title: "Flat 10% OFF",
      desc: "Get Flat ₹100/FF on orders above ₹999 with code.",
      code: "SAVE10",
    },
    {
      title: "Flat 10% OFF",
      desc: "Get Flat 100/OFF on orders above ₹1699 with code.",
      code: "SAVE10",
    },
    {
      title: "Flat 10% OFF",
      desc: "Get Flat ₹500/FF on order above ₹599 with code.",
      code: "SAVE10",
    },
  ],
  description: `Our Organic Toor Dal is cultivated using traditional and sustainable farming methods without the use of harmful chemicals or pesticides. Each grain is carefully selected and processed to preserve its natural nutrition, taste, and aroma.
This dal is rich in protein and essential nutrients, making it a perfect choice for daily meals. Whether you're preparing simple dal or traditional recipes, our toor dal ensures purity and great taste in every bite.`,
  healthBenefits: [
    "High in plant-based protein",
    "Supports muscle growth and energy",
    "Easy to digest",
    "Naturally gluten-free",
    "Suitable for all age groups",
  ],
  ingredients: "100% Organic Toor Dal\n(No additives, no preservatives)",
  longDescription: `Our Organic Toor Dal is cultivated using traditional and sustainable farming methods without the use of harmful chemicals or pesticides. Each grain is carefully selected and processed to preserve its natural nutrition, taste, and aroma.
This dal is rich in protein and essential nutrients, making it a perfect choice for daily meals. Whether you're preparing simple dal or traditional recipes, our toor dal ensures purity and great taste in every bite.`,
};

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getProductReviews } from "@/api/feedback.service";
import { sortWeights, getWeightValue } from "@/lib/utils";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { id } = useParams();
  const [apiProduct, setApiProduct] = useState<any>(null);
  const [allReviews, setAllReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingsBreakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    if (!id) return;
    try {
      const res = await getProductReviews(id);
      if (res.reviews) {
        const reviewsData = res.reviews;
        const total = reviewsData.length;

        // Calculate stats accurately if API values are 0 or missing
        const calculatedAvg =
          total > 0
            ? reviewsData.reduce(
                (acc: number, r: any) => acc + (parseFloat(r.rating) || 0),
                0,
              ) / total
            : 0;

        const calculatedBreakdown = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
        reviewsData.forEach((r: any) => {
          const rati = Math.round(parseFloat(r.rating) || 0);
          if (rati >= 1 && rati <= 5) {
            calculatedBreakdown[
              rati.toString() as keyof typeof calculatedBreakdown
            ]++;
          }
        });

        setAllReviews(reviewsData);
        setReviewStats({
          averageRating:
            res.averageRating && res.averageRating > 0
              ? res.averageRating
              : calculatedAvg,
          totalReviews:
            res.totalReviews && res.totalReviews > 0 ? res.totalReviews : total,
          ratingsBreakdown: res.ratingsBreakdown || calculatedBreakdown,
        });
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setIsLoading(true);
      // Artificial delay for skeleton as requested
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        await Promise.all([fetchReviews(), delay]);

        const res = await api.get(`/products/get-product/${id}`);
        if (res.data?.success) {
          setApiProduct(res.data.products);
        }
      } catch (err) {
        console.error("Error loading product detail data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Calculate dynamic stats or use fake defaults
  const dynamicRating =
    reviewStats.totalReviews > 0 ? Number(reviewStats.averageRating) || 0 : 0;
  const dynamicReviewCount =
    reviewStats.totalReviews > 0 ? reviewStats.totalReviews : 0;

  const product = apiProduct
    ? {
        ...DEFAULT_PRODUCT,
        id: apiProduct.id,
        name: apiProduct.product_name || DEFAULT_PRODUCT.name,
        subtitle: apiProduct.short_description || DEFAULT_PRODUCT.subtitle,
        description: apiProduct.full_description || DEFAULT_PRODUCT.description,
        healthBenefits: apiProduct.health_benefits
          ? apiProduct.health_benefits.split("\n").filter(Boolean)
          : DEFAULT_PRODUCT.healthBenefits,
        ingredients: apiProduct.ingredients || DEFAULT_PRODUCT.ingredients,
        longDescription:
          apiProduct.full_description || DEFAULT_PRODUCT.longDescription,
        images: apiProduct.product_images?.length
          ? apiProduct.product_images
          : DEFAULT_PRODUCT.images,
        sizes: (() => {
          if (!apiProduct.product_weight) return [];
          let parsed;
          if (Array.isArray(apiProduct.product_weight)) {
            parsed = apiProduct.product_weight;
          } else {
            try {
              parsed = JSON.parse(apiProduct.product_weight);
              if (!Array.isArray(parsed)) parsed = [parsed];
            } catch {
              parsed = [apiProduct.product_weight];
            }
          }

          // Ensure each item is an object with at least a weight property
          const mapped: {
            weight: string;
            price: number;
            purchase_price: number;
            del_price: number;
          }[] = parsed.map((item: any) => {
            if (typeof item === "object" && item !== null) {
              return {
                weight: String(item.weight || ""),
                price: Number(item.price) || 0,
                purchase_price: Number(item.purchase_price) || 0,
                del_price: Number(item.del_price) || 0,
              };
            }
            return {
              weight: String(item),
              price: Number(apiProduct.product_price) || 0,
              purchase_price: Number(apiProduct.product_purchase_price) || 0,
              del_price: Number(apiProduct.product_del_price) || 0,
            };
          });

          return mapped.sort(
            (a, b) => getWeightValue(a.weight) - getWeightValue(b.weight),
          );
        })(),
        price: Number(apiProduct.product_price) || DEFAULT_PRODUCT.price,
        originalPrice:
          Number(apiProduct.product_del_price) || DEFAULT_PRODUCT.originalPrice,
        discount: Number(apiProduct.discount) || DEFAULT_PRODUCT.discount,
        category: apiProduct.category_name || DEFAULT_PRODUCT.category,
        categoryId: apiProduct.category_id,
        rating: dynamicRating,
        reviews: dynamicReviewCount,
        stock: apiProduct.product_stock ?? 0,
        isFeatured: !!apiProduct.is_featured,
        bestSeller: !!apiProduct.best_saller,
        createdAt: apiProduct.created_at,
        updatedAt: apiProduct.updated_at,
        purchasePrice: apiProduct.product_purchase_price, // internal but mapping it
      }
    : {
        ...DEFAULT_PRODUCT,
        id: "",
        categoryId: "",
        createdAt: "",
        updatedAt: "",
        rating: dynamicRating,
        reviews: dynamicReviewCount,
        stock: 0,
        isFeatured: false,
        bestSeller: false,
      };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Rajlaxmi Javik!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link.");
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);

  // sizes is always {weight, price, del_price...}[] after our mapping
  const sizesArr = product.sizes as {
    weight: string;
    price: number;
    del_price: number;
  }[];
  const selectedSizeInfo = sizesArr[selectedSizeIdx] || {
    weight: "N/A",
    price: product.price,
    del_price: product.originalPrice,
  };

  const currentPrice = selectedSizeInfo.price || product.price;
  const currentDelPrice = selectedSizeInfo.del_price || product.originalPrice;

  let currentDiscount = product.discount;
  if (currentDelPrice > currentPrice) {
    currentDiscount = Math.round(
      ((currentDelPrice - currentPrice) / currentDelPrice) * 100,
    );
  } else {
    currentDiscount = 0;
  }
  const isFavorite = isInWishlist(`product-detail-${product.name}`);
  const [copiedCode, setCopiedCode] = useState<number | null>(null);
  const [reviewPage, setReviewPage] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    const stockLimit = product.stock > 0 ? product.stock : 99;
    if (quantity < stockLimit) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: `product-${product.id}`,
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      quantity: quantity,
      weight: selectedSizeInfo.weight,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart({
      id: `product-${product.id}`,
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      quantity: quantity,
      weight: selectedSizeInfo.weight,
    });
    navigate("/cart");
  };

  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(allReviews.length / reviewsPerPage);
  const reviews = allReviews.slice(
    reviewPage * reviewsPerPage,
    reviewPage * reviewsPerPage + reviewsPerPage,
  );

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 1000);
  };

  const prevImage = () =>
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  const nextImage = () =>
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );

  const PAYMENT_LOGOS = [
    paymentLogo1,
    paymentLogo2,
    paymentLogo3,
    paymentLogo4,
    paymentLogo5,
  ];
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-6 lg:py-10">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <Skeleton className="aspect-square w-full rounded-2xl mb-4" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-24 w-full rounded-xl" />
              <div className="flex gap-4">
                <Skeleton className="h-12 flex-1 rounded-lg" />
                <Skeleton className="h-12 flex-1 rounded-lg" />
              </div>
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${product.name} | Buy 100% Pure Organic – Rajlakshmi Javiks`}
        description={product.subtitle || product.description}
        url={window.location.href}
        image={product.images[0]}
      />

      <h1 className="sr-only">
        {product.name} is a high-quality organic product by Rajlakshmi Javiks.
        Perfect for healthy cooking, Ayurveda remedies, and sustainable living.
        Our {product.name} is lab-tested and chemically pure.
      </h1>

      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-6 lg:py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link
              to="/products"
              className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to previous page
            </Link>
            <span className="text-muted-foreground text-sm">
              | Listed in category:
            </span>
            <Link
              to="/products"
              className="text-primary hover:underline text-sm font-medium"
            >
              {product.category}
            </Link>
          </div>

          {/* Product Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-popover/80 shadow-soft flex items-center justify-center hover:bg-popover transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-popover/80 shadow-soft flex items-center justify-center hover:bg-popover transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {product.bestSeller && (
                  <Badge className="bg-golden hover:bg-golden/90 text-white border-none py-1 px-3">
                    Best Seller
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-primary hover:bg-primary/90 text-white border-none py-1 px-3">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-sm">
                {product.subtitle}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <Rating
                    initialValue={Number(product.rating) || 0}
                    readonly
                    allowFraction
                    size={22}
                    fillColor="orange"
                    className="flex"
                    SVGclassName="inline-block"
                  />
                </div>
                {product.rating > 0 && (
                  <span className="text-sm font-semibold text-foreground">
                    {Number(product.rating).toFixed(1)}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                  from {product.reviews} Reviews
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => {
                      toggleWishlist({
                        id: product.name,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        originalPrice: product.originalPrice,
                        discount: product.discount,
                        weightOptions: product.sizes.map((s: any) =>
                          typeof s === "object" ? s.weight : String(s),
                        ),
                      });
                      toast.success(
                        isFavorite
                          ? `Removed from Wishlist`
                          : `Added to Wishlist`,
                      );
                    }}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    title="Share product"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    {tag} |
                  </span>
                ))}
              </div>

              {/* Offers */}
              <div className="mt-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="offers" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2 border border-primary/20 bg-accent/10 rounded-lg px-4 [&>svg]:ml-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/10 text-primary border-none text-[10px] h-5 px-2">
                          {product.offers.length}
                        </Badge>
                        <span className="text-sm font-semibold text-foreground">
                          Offers Available
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {product.offers.map((offer, index) => (
                          <div
                            key={index}
                            className="border border-primary/30 rounded-lg p-3 bg-accent/20"
                          >
                            <p className="text-primary font-bold text-xs mb-1">
                              {offer.title}
                            </p>
                            <p className="text-muted-foreground text-[11px] leading-tight mb-2">
                              {offer.desc}
                            </p>
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-muted-foreground">
                                Use Code:
                              </span>
                              <span className="text-primary font-semibold text-xs">
                                {offer.code}
                              </span>
                              <button
                                onClick={() =>
                                  handleCopyCode(offer.code, index)
                                }
                                className="ml-auto text-primary hover:text-primary/80 text-xs font-medium flex items-center gap-0.5"
                              >
                                {copiedCode === index ? "Copied!" : "Copy"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Size Selector */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizesArr.map((sizeObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSizeIdx(idx)}
                      className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                        selectedSizeIdx === idx
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {sizeObj.weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <p className="text-sm">
                Availability:{" "}
                <span
                  className={`font-semibold ${
                    product.stock > 0 ? "text-primary" : "text-destructive"
                  }`}
                >
                  {product.stock > 0 ? `In Stock` : "Out of Stock"}
                </span>
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-bold text-foreground">
                  ₹{(currentPrice * quantity).toFixed(2)}
                </span>
                {currentDelPrice > currentPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{(currentDelPrice * quantity).toFixed(2)}
                    </span>
                    {currentDiscount > 0 && (
                      <Badge className="bg-[#DFF1E5] text-[#29A44F] text-sm px-4 py-2 rounded-md">
                        Save {currentDiscount}%
                      </Badge>
                    )}
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Quantity
                </h3>
                <div className="flex items-center w-32 border border-border rounded-lg overflow-hidden h-12">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="flex-1 flex items-center justify-center hover:bg-muted transition-colors border-r border-border h-full"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4 text-foreground" />
                  </button>
                  <div className="flex-1 flex items-center justify-center font-semibold text-foreground">
                    {quantity}
                  </div>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="flex-1 flex items-center justify-center hover:bg-muted transition-colors border-l border-border h-full"
                    disabled={
                      quantity >= (product.stock > 0 ? product.stock : 99)
                    }
                  >
                    <Plus className="h-4 w-4 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-white h-12 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="flex-1 h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy it now
                </Button>
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <h4 className="text-center text-sm font-semibold mb-3 text-[#FDBC2D]">
                  Guaranteed Safe Checkout
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 border border-border rounded-lg">
                  {PAYMENT_LOGOS.map((logo, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center border border-border rounded-md p-2 min-h-[60px] bg-white"
                    >
                      <img
                        src={logo}
                        alt={`Payment method ${idx + 1}`}
                        className="w-full max-h-10 object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Truck, label: "Fast Shipping" },
                  { icon: Shield, label: "Secure Payment" },
                  { icon: Award, label: "Quality Product" },
                  { icon: Leaf, label: "Natural Ingredients" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Description Section */}
          <div className="mt-12 lg:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-6">
                  Product Details
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem
                    value="item-1"
                    className="border-b border-[hsl(120,20%,85%)]"
                  >
                    <AccordionTrigger className="group text-left text-base md:text-lg font-medium py-5 hover:no-underline [&>svg]:hidden">
                      <span className="flex-1">Description</span>
                      <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(120,60%,35%)] text-white transition-transform duration-200 group-data-[state=open]:rotate-180">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base pb-5 whitespace-pre-line leading-relaxed">
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="item-2"
                    className="border-b border-[hsl(120,20%,85%)]"
                  >
                    <AccordionTrigger className="group text-left text-base md:text-lg font-medium py-5 hover:no-underline [&>svg]:hidden">
                      <span className="flex-1">Health Benefits</span>
                      <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(120,60%,35%)] text-white transition-transform duration-200 group-data-[state=open]:rotate-180">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base pb-5">
                      <ul className="space-y-2">
                        {product.healthBenefits.map((benefit: string) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="item-3"
                    className="border-b border-[hsl(120,20%,85%)]"
                  >
                    <AccordionTrigger className="group text-left text-base md:text-lg font-medium py-5 hover:no-underline [&>svg]:hidden">
                      <span className="flex-1">Ingredients</span>
                      <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(120,60%,35%)] text-white transition-transform duration-200 group-data-[state=open]:rotate-180">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base pb-5 whitespace-pre-line leading-relaxed">
                      {product.ingredients}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border-none">
                    <AccordionTrigger className="group text-left text-base md:text-lg font-medium py-5 hover:no-underline [&>svg]:hidden">
                      <span className="flex-1">Additional Information</span>
                      <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(120,60%,35%)] text-white transition-transform duration-200 group-data-[state=open]:rotate-180">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pb-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-foreground">
                            Product ID
                          </p>
                          <p>{product.id}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Category ID
                          </p>
                          <p>{product.categoryId}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Created At
                          </p>
                          <p>
                            {product.createdAt
                              ? new Date(product.createdAt).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Updated At
                          </p>
                          <p>
                            {product.updatedAt
                              ? new Date(product.updatedAt).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Description Image */}
              <div className="flex items-start justify-center">
                <div className="rounded-2xl overflow-hidden shadow-card w-full md:w-[450px] md:h-[450px]">
                  <img
                    src={product.images[0]}
                    alt="Product close-up"
                    className="w-full h-auto md:h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Customer Reviews Section */}
          <div className="mt-16 lg:mt-20">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary text-center mb-10 ">
              Customer Reviews
            </h2>

            {/* Reviews Summary Breakdown */}
            {allReviews.length > 0 && (
              <div className="mb-12 p-8 bg-white rounded-2xl border border-border shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                  <div className="text-center md:border-r border-border md:pr-10">
                    <p className="text-6xl font-bold text-foreground mb-2">
                      {Number(reviewStats.averageRating).toFixed(1)}
                    </p>
                    <div className="flex justify-center mb-2">
                      <Rating
                        initialValue={Number(reviewStats.averageRating)}
                        readonly
                        allowFraction
                        size={28}
                        fillColor="orange"
                        className="flex"
                        SVGclassName="inline-block"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Based on {reviewStats.totalReviews} verified reviews
                    </p>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count =
                        (reviewStats.ratingsBreakdown as any)[
                          star.toString()
                        ] || 0;
                      const percentage =
                        reviewStats.totalReviews > 0
                          ? (count / reviewStats.totalReviews) * 100
                          : 0;
                      return (
                        <div
                          key={star}
                          className="flex items-center gap-4 group"
                        >
                          <span className="text-sm font-semibold w-14 text-foreground">
                            {star} Stars
                          </span>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full transition-all duration-500 group-hover:bg-orange-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right font-medium">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl p-6 shadow-md border border-border flex flex-col h-full"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-muted overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center text-primary font-bold text-xl uppercase">
                          {review.name?.[0] || "U"}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold text-foreground">
                            {review.name}
                          </p>
                          <Rating
                            initialValue={Number(review.rating) || 0}
                            readonly
                            allowFraction
                            size={16}
                            fillColor="orange"
                            className="flex"
                            SVGclassName="inline-block"
                          />
                        </div>
                        <p className="text-xs text-primary font-medium">
                          {review.title || "Verified Customer"}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed italic flex-1">
                      "
                      {review.feedback ||
                        review.quote ||
                        "No feedback provided."}
                      "
                    </p>
                    <div className="pt-3 border-t border-border mt-auto">
                      <p className="text-[10px] text-muted-foreground">
                        Reviewed on{" "}
                        {review.created_at
                          ? new Date(review.created_at).toLocaleDateString()
                          : "unknown date"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center bg-muted/30 rounded-2xl border-2 border-dashed border-muted">
                  <p className="text-muted-foreground text-lg mb-2">
                    No reviews yet for this product.
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Be the first to share your experience!
                  </p>
                </div>
              )}
            </div>

            {/* Review Navigation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
                disabled={reviewPage === 0}
                className="bg-white rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground w-10 h-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {Array.from({ length: totalReviewPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === reviewPage ? "bg-primary" : "bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setReviewPage((p) => Math.min(totalReviewPages - 1, p + 1))
                }
                disabled={reviewPage === totalReviewPages - 1}
                className="bg-white rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground w-10 h-10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Write a Review Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-white rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
              >
                Write a review
              </Button>
            </div>
          </div>

          <WriteReviewModal
            productId={id || ""}
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            onSuccess={fetchReviews}
          />
        </main>
        <RelatedProduct
          category={apiProduct?.category_name}
          currentProductId={id}
        />
        <BentoGrid />
        <FAQSection />
      </div>
    </>
  );
};

export default ProductDetail;
