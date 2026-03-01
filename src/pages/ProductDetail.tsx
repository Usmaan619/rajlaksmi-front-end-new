import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import ReviewSection from "@/components/ReviewSection";
import RelatedProduct from "@/components/RelatedProduct";
import WriteReviewModal from "@/components/WriteReviewModal";
import BentoGrid from "@/components/BentoGrid";
import OurProductsSection from "@/components/OurProductsSection";
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
  sizes: ["1kg", "250g", "500g", "5KG", "10KG"],
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

const allReviews = [
  {
    id: 1,
    name: "Raaj",
    title: "CEO Founder",
    quote:
      "Finally, a brand I can trust for 100% organic essentials. Healthy, wholesome, and absolutely worth it!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya S.",
    title: "Home Chef",
    quote:
      "The quality of toor dal is amazing. Cooks perfectly every time and tastes so fresh compared to store brands.",
    rating: 5,
  },
  {
    id: 3,
    name: "Raj M.",
    title: "Health Enthusiast",
    quote:
      "Finally, a brand I can trust for 100% organic essentials. Healthy, wholesome, and absolutely worth it!",
    rating: 4,
  },
  {
    id: 4,
    name: "Sneha K.",
    title: "Nutritionist",
    quote:
      "I recommend Rajlakshmi products to all my clients. Pure, clean ingredients with no hidden additives.",
    rating: 5,
  },
  {
    id: 5,
    name: "Amit P.",
    title: "Regular Customer",
    quote:
      "Been ordering for 6 months now. Consistent quality and great packaging. Highly recommend!",
    rating: 4,
  },
  {
    id: 6,
    name: "Meera D.",
    title: "Food Blogger",
    quote:
      "The aroma and texture of these organic products are unmatched. My recipes have never tasted better!",
    rating: 5,
  },
];

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getProductReviews } from "@/api/feedback.service";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { id } = useParams();
  const [apiProduct, setApiProduct] = useState<any>(null);
  const [allReviews, setAllReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    if (!id) return;
    try {
      const res = await getProductReviews(id);
      if (res.reviews) {
        setAllReviews(res.reviews);
        setReviewStats({
          averageRating: res.averageRating || 0,
          totalReviews: res.totalReviews || 0,
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
    reviewStats.totalReviews > 0 ? reviewStats.averageRating : 4.5;
  const dynamicReviewCount =
    reviewStats.totalReviews > 0 ? reviewStats.totalReviews : 112;

  const product = apiProduct
    ? {
        ...DEFAULT_PRODUCT,
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
          if (!apiProduct.product_weight) return DEFAULT_PRODUCT.sizes;
          if (Array.isArray(apiProduct.product_weight))
            return apiProduct.product_weight;
          try {
            const parsed = JSON.parse(apiProduct.product_weight);
            return Array.isArray(parsed) ? parsed : DEFAULT_PRODUCT.sizes;
          } catch {
            return DEFAULT_PRODUCT.sizes;
          }
        })(),
        price: Number(apiProduct.product_price) || DEFAULT_PRODUCT.price,
        originalPrice:
          Number(apiProduct.product_del_price) || DEFAULT_PRODUCT.originalPrice,
        discount: Number(apiProduct.discount) || DEFAULT_PRODUCT.discount,
        category: apiProduct.category_name || DEFAULT_PRODUCT.category,
        rating: dynamicRating,
        reviews: dynamicReviewCount,
      }
    : {
        ...DEFAULT_PRODUCT,
        rating: dynamicRating,
        reviews: dynamicReviewCount,
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
  const [selectedSize, setSelectedSize] = useState("1kg");
  const isFavorite = isInWishlist(`product-detail-${product.name}`);
  const [copiedCode, setCopiedCode] = useState<number | null>(null);
  const [reviewPage, setReviewPage] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: `product-${product.name}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      weight: selectedSize,
    });
    toast.success(`${product.name} added to cart!`);
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
    setTimeout(() => setCopiedCode(null), 2000);
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
                    selectedImage === index ? "border-primary" : "border-border"
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
            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-muted-foreground text-sm">{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= Math.floor(product.rating) ? "fill-golden text-golden" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {product.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                from {product.reviews} Reviews
              </span>
              {/* Icons */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => {
                    toggleWishlist({
                      id: `product-detail-${product.name}`,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      originalPrice: product.originalPrice,
                      discount: product.discount,
                      weightOptions: product.sizes,
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
            {/* <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Offers Available
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                        onClick={() => handleCopyCode(offer.code, index)}
                        className="ml-auto text-primary hover:text-primary/80 text-xs font-medium flex items-center gap-0.5"
                      >
                        {copiedCode === index ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <p className="text-sm">
              Availability:{" "}
              <span className="text-primary font-semibold">
                {product.availability}
              </span>
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
              <Badge className="bg-[#DFF1E5] text-[#29A44F] text-sm px-4 py-2 rounded-md">
                Save {product.discount}%
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleAddToCart}
                className="flex-1 h-12 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
              >
                Add to Cart
              </Button>
              <Button className="flex-1 h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
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
              </Accordion>
            </div>

            {/* Description Image */}
            <div className="flex items-start justify-center">
              <div className="rounded-2xl overflow-hidden shadow-card max-w-md w-full">
                <img
                  src={productChana}
                  alt="Product close-up"
                  className="w-full h-auto object-cover"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-card rounded-xl p-6 shadow-md border border-border"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-muted overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-muted-foreground/50"
                      >
                        <circle cx="12" cy="8" r="4" fill="currentColor" />
                        <path
                          d="M12 14c-6 0-8 3-8 6v1h16v-1c0-3-2-6-8-6z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex gap-0.5 ml-auto">
                    <Rating
                      initialValue={review.rating}
                      readonly
                      allowFraction
                      size={18}
                      fillColor="orange"
                      className="flex"
                      SVGclassName="inline-block"
                    />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed italic">
                  "{review.feedback || review.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-primary font-medium">
                    {review.title || "Verified Customer"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Review Navigation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
              disabled={reviewPage === 0}
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground w-10 h-10"
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
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground w-10 h-10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Write a Review Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(true)}
              className="rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
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
  );
};

export default ProductDetail;
