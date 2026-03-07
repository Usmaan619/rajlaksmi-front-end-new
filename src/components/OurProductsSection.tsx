import { useRef, useEffect, useState, useCallback } from "react";
import { ExternalLink, Heart } from "lucide-react";
import heroGhee from "@/assets/hero-ghee.jpg";
import dealGhee from "@/assets/deal-ghee.jpg";
import VideoSource from "@/assets/Video/gauswarn.mp4";
import ourProductVideoImg from "@/assets/ourproductwithcategory/ourProductVideo.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "A2 Ghee",
    thumbnail: heroGhee,
    price: 899,
    // Using a sample video URL - in production, replace with actual product videos
    videoUrl: VideoSource,
  },
  {
    id: 2,
    name: "A2 Ghee",
    thumbnail: dealGhee,
    price: 899,
    videoUrl: "VideoSource",
  },
  {
    id: 3,
    name: "A2 Ghee",
    thumbnail: heroGhee,
    price: 899,
    videoUrl: "VideoSource",
  },
  {
    id: 4,
    name: "A2 Ghee",
    thumbnail: dealGhee,
    price: 899,
    videoUrl: "VideoSource",
  },
  {
    id: 5,
    name: "A2 Ghee",
    thumbnail: heroGhee,
    price: 899,
    videoUrl: "VideoSource",
  },
  {
    id: 6,
    name: "A2 Ghee",
    thumbnail: heroGhee,
    price: 899,
    videoUrl: "VideoSource",
  },
];

const VideoProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-video-${product.id}`);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `product-${product.id}`,
      name: product.name,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative w-[260px] lg:w-[300px] h-[440px] lg:h-[490px] rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      {/* Background Video */}
      <div
        className="relative w-full h-full"
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => videoRef.current?.pause()}
      >
        {/* Thumbnail */}
        <img
          src={product.thumbnail}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video */}
        <video
          ref={videoRef}
          src={product.videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Top-right icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center shadow-md mb-2"
        >
          <ExternalLink className="h-4 w-4" />
        </button>

        {/* Wishlist icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `product-video-${product.id}`,
              name: product.name,
              price: product.price,
              image: product.thumbnail,
            });
            toast.success(
              isFavorite ? `Removed from Wishlist` : `Added to Wishlist`,
            );
          }}
          className="absolute top-14 right-4 mt-1 w-9 h-9 rounded-full bg-white text-white flex items-center justify-center shadow-md"
        >
          <Heart
            className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Floating Info Box */}
      <div
        className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-2">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-green-700 text-sm">
              {product.name}
            </h3>
            <p className="text-green-700 font-bold text-sm">
              ₹{product.price}.00
            </p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full border border-green-700 text-green-700 rounded-md py-1.5 text-xs font-bold hover:bg-green-700 hover:text-white transition-colors duration-300"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const CARD_WIDTH = 220; // matches w-[220px]
const CARD_GAP = 12; // matches gap-3
const AUTO_SLIDE_INTERVAL = 3000; // slightly slower for better readability

const OurProductsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect mobile (< md = 768px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    autoSlideTimer.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % products.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: next * (CARD_WIDTH + CARD_GAP),
            behavior: "smooth",
          });
        }
        return next;
      });
    }, AUTO_SLIDE_INTERVAL);
  }, [stopAutoSlide]);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
    setCurrentIndex(index);
  }, []);

  // Auto-slide only on mobile
  useEffect(() => {
    if (isMobile) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
    return () => stopAutoSlide();
  }, [isMobile, startAutoSlide, stopAutoSlide]);

  const handleTouchStart = () => stopAutoSlide();

  const handleTouchEnd = () => {
    if (scrollRef.current) {
      const index = Math.round(
        scrollRef.current.scrollLeft / (CARD_WIDTH + CARD_GAP),
      );
      setCurrentIndex(index);
    }
    setTimeout(() => {
      if (isMobile) startAutoSlide();
    }, 1500);
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      {/* Bottom Background Image */}
      <img
        src={ourProductVideoImg}
        alt="ourProductVideoImg"
        className="
        absolute
        bottom-0
        left-0
        w-full
        h-auto
        object-cover
        opacity-40
        pointer-events-none
        select-none
      "
      />

      <div className="mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary">
            Our Products
          </h2>
        </div>

        {/* Products Grid / Auto-Slide on Mobile */}
        <div
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-3 overflow-x-auto pb-6 px-1 snap-x snap-mandatory
             md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6
             md:gap-6 md:px-0
             md:overflow-visible md:justify-items-center
             mb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              className="snap-start flex-shrink-0 w-[260px] md:w-full"
              key={product.id}
            >
              <VideoProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Dot Indicators — mobile only */}
        {isMobile && (
          <div className="flex justify-center gap-2 mb-6 md:hidden">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stopAutoSlide();
                  scrollToIndex(i);
                  setTimeout(() => startAutoSlide(), 1500);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 h-2 bg-green-600"
                    : "w-2 h-2 bg-green-300"
                }`}
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProductsSection;
