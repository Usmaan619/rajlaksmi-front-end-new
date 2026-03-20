import { useRef, useEffect, useState, useCallback } from "react";
import { ExternalLink, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import heroGhee from "@/assets/hero-ghee.jpg";
import dealGhee from "@/assets/deal-ghee.jpg";
import VideoSource from "@/assets/Video/gauswarn.mp4";
import ourProductVideoImg from "@/assets/ourproductwithcategory/ourProductVideo.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { getYoutubeShorts } from "@/api/youtube.service";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface ProductVideo {
  id: string | number;
  name: string;
  thumbnail: string;
  price: number;
  videoUrl: string;
}

const fallbackProducts: ProductVideo[] = [
  {
    id: 1,
    name: "A2 Ghee",
    thumbnail: heroGhee,
    price: 899,
    // Using a sample video URL - in production, replace with actual product videos
    videoUrl: "",
  },
  {
    id: 2,
    name: "A2 Ghee",
    thumbnail: dealGhee,
    price: 899,
    videoUrl: "",
  },
  {
    id: 3,
    name: "A2 Ghee",
    thumbnail: heroGhee,
    price: 899,
    videoUrl: "",
  },
  {
    id: 4,
    name: "A2 Ghee",
    thumbnail: dealGhee,
    price: 899,
    videoUrl: "",
  },
  {
    id: 5,
    name: "A2 Ghee",
    thumbnail: heroGhee,
    price: 899,
    videoUrl: "",
  },
];

const VideoProductCard = ({
  product,
  isActive,
  onOpenModal,
}: {
  product: ProductVideo;
  isActive: boolean;
  onOpenModal: (product: ProductVideo) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(`product-video-${product.id}`);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYoutubeId(product.videoUrl);
  const isYoutube = !!youtubeId;

  // 10s playing restriction logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive || isHovered) {
      setIsPlaying(true);
      // Automatically stop video after exactly 10 seconds
      timer = setTimeout(() => {
        setIsPlaying(false);
      }, 10000);
    } else {
      setIsPlaying(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, isHovered]);

  // Handle native video playback based on 10s restricted isPlaying state
  useEffect(() => {
    if (!isYoutube && videoRef.current) {
      if (isPlaying) {
        // Reset to start on new play command to ensure a full 10s loop portion
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isYoutube]);

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
      onClick={() => onOpenModal(product)}
      className={`relative w-[260px] lg:w-[300px] h-[440px] lg:h-[490px] rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-all duration-700 bg-white mx-auto ${
        isActive
          ? "scale-100 shadow-2xl border border-green-600/20 z-20"
          : "scale-[0.85] opacity-30 blur-[0.5px] grayscale-[0.8]"
      } hover:scale-[1.05] hover:opacity-100 hover:blur-none hover:grayscale-0 hover:z-30 will-change-transform`}
    >
      {/* Background Video */}
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <img
          src={product.thumbnail}
          alt={product.name}
          width="300"
          height="490"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video Content */}
        {isYoutube ? (
          isPlaying && (
            <iframe
              loading="lazy"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0&enablejsapi=1&showinfo=0`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={product.name}
            />
          )
        ) : (
          <video
            ref={videoRef}
            src={product.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Top-right icon */}
        <button
          aria-label="View product"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <ExternalLink className="h-4 w-4" />
        </button>

        {/* Wishlist icon */}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: `${product.id}`,
              name: product.name,
              price: product.price,
              image: product.thumbnail,
            });
            toast.success(
              isFavorite ? `Removed from Wishlist` : `Added to Wishlist`,
            );
          }}
          className="absolute top-14 right-4 mt-1 w-9 h-9 rounded-full bg-white text-green-600 flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Floating Info Box */}
      <div
        className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-3 border border-white/20"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/product/${product.id}`);
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover shadow-sm border border-green-100"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-green-900 text-sm line-clamp-2 leading-tight min-h-[32px]">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-green-700 font-bold text-xs">₹</span>
              <span className="text-green-700 font-extrabold text-base">
                {product.price}
              </span>
              <span className="text-green-600/40 text-[10px] font-medium ml-0.5">
                .00
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            aria-label="Add to cart"
            onClick={handleAddToCart}
            className="w-full bg-[#116931] text-white rounded-lg h-9 text-xs font-bold hover:bg-[#0d5427] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-95 animate-glow"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            ADD TO CART
          </button>

          <button
            aria-label="View product"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="w-full bg-white text-[#116931] border border-[#116931]/30 rounded-lg h-9 text-xs font-bold hover:bg-green-50 transition-all duration-300 active:scale-95"
          >
            VIEW PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
};

const OurProductsSection = () => {
  const [products, setProducts] = useState<ProductVideo[]>(fallbackProducts);
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductVideo | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const openVideoModal = (product: ProductVideo) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Fetch YouTube shorts from API
  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const responseData = await getYoutubeShorts();

        // Flexible data extraction dependent on how the backend sends it
        const items = Array.isArray(responseData)
          ? responseData
          : responseData?.data || responseData?.shorts || [];

        if (items.length > 0) {
          const formattedProducts: ProductVideo[] = items
            .map((item: any) => {
              const videoUrl = item.short_id
                ? `https://www.youtube.com/shorts/${item.short_id}`
                : item.videoUrl || item.url || item.link || "";

              const regExp =
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
              const match = videoUrl.match(regExp);
              const youtubeId =
                match && match[2].length === 11 ? match[2] : null;

              const productInfo = item.productId || item.product || {};
              const name =
                productInfo.name || item.title || item.name || "A2 Ghee";
              const price = productInfo.price || item.price || 899;
              const id =
                productInfo._id ||
                productInfo.id ||
                item._id ||
                item.id ||
                Math.random().toString();

              return {
                id,
                name,
                thumbnail: youtubeId
                  ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  : productInfo.image ||
                    productInfo.thumbnail ||
                    item.thumbnail ||
                    item.image ||
                    heroGhee,
                price,
                videoUrl,
              };
            })
            .filter((p: ProductVideo) => p.videoUrl); // Ensure only items with videoUrl

          if (formattedProducts.length > 0) {
            setProducts(formattedProducts);
          }
        }
      } catch (error) {
        console.error("Failed to fetch youtube shorts:", error);
      }
    };

    fetchShorts();
  }, []);

  // Handle Carousel Re-initialization when dynamic API data replaces fallback
  useEffect(() => {
    if (api) {
      setTimeout(() => {
        api.reInit();
      }, 100);
    }
  }, [api, products.length]);

  // Track active slide and total count
  useEffect(() => {
    if (!api) return;

    const updateActiveIndex = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    setCount(api.scrollSnapList().length);
    updateActiveIndex();

    api.on("select", updateActiveIndex);
    return () => {
      api.off("select", updateActiveIndex);
    };
  }, [api]);

  // Auto-scroll logic matching video 10s rule
  useEffect(() => {
    if (!api) return;

    let intervalId = setInterval(() => {
      api.scrollNext();
    }, 10000); // 10 seconds per video before sliding

    const resetInterval = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        api.scrollNext();
      }, 10000);
    };

    api.on("pointerDown", () => clearInterval(intervalId));
    api.on("pointerUp", resetInterval);
    api.on("select", resetInterval);

    return () => clearInterval(intervalId);
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      {/* Bottom Background Image */}
      <img
        src={ourProductVideoImg}
        alt="ourProductVideoImg"
        width="1920"
        height="600"
        loading="lazy"
        decoding="async"
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

      <div className="mx-auto px-4 md:px-8 lg:px-12 relative z-10 w-full max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <p className="text-[#01722C] font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3">
            Pure Indulgence
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#01722C] tracking-tight">
            Our Products
          </h2>
          <div className="h-1 w-24 bg-[#01722C]/20 mx-auto mt-6 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative w-full mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {products.map((product, index) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-[80%] md:basis-[45%] lg:basis-[30%] py-8"
                >
                  <VideoProductCard
                    product={product}
                    isActive={activeIndex === index}
                    onOpenModal={openVideoModal}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Arrows like Testimonial */}
          <div className="hidden sm:flex absolute top-1/2 -left-2 md:-left-8 lg:-left-12 -translate-y-1/2 z-30">
            <button
              aria-label="Previous slide"
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden sm:flex absolute top-1/2 -right-2 md:-right-8 lg:-right-12 -translate-y-1/2 z-30">
            <button
              aria-label="Next slide"
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-8 z-10 relative flex-wrap">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="w-12 h-12 flex items-center justify-center group transition-all"
            >
              <div
                className={`transition-all duration-500 rounded-full ${
                  i === activeIndex
                    ? "w-8 h-2.5 bg-[#01722C]"
                    : "w-3 h-3 bg-[#01722C]/20 group-hover:bg-[#01722C]/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Video Shorts Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[420px] h-[85vh] p-0 overflow-hidden bg-black border-none sm:rounded-[2.5rem] shadow-[0_0_80px_-15px_rgba(0,0,0,0.8)] z-[60] duration-500 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-500 data-[state=open]:ease-in-out">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-full flex flex-col pt-10 px-4 pb-4">
            {selectedProduct && (
              <>
                <div className="flex-1 w-full bg-black rounded-xl overflow-hidden shadow-2xl relative">
                  {getYoutubeId(selectedProduct.videoUrl) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYoutubeId(selectedProduct.videoUrl)}?autoplay=1&rel=0&modestbranding=1`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedProduct.name}
                    />
                  ) : (
                    <video
                      src={selectedProduct.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Product Info in Modal */}
                <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={selectedProduct.thumbnail}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover border border-white/20 shadow-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm sm:text-base line-clamp-1">
                        {selectedProduct.name}
                      </h4>
                      <div className="flex items-baseline gap-0.5 mt-1">
                        <span className="text-green-400 font-bold text-xs">
                          ₹
                        </span>
                        <span className="text-green-400 font-extrabold text-lg">
                          {selectedProduct.price}
                        </span>
                        <span className="text-green-400/40 text-[10px] font-medium ml-0.5">
                          .00
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-[#116931] hover:bg-[#0d5427] text-white font-bold h-9 px-4 shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 animate-glow"
                      onClick={() => {
                        addToCart({
                          id: `product-${selectedProduct.id}`,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          image: selectedProduct.thumbnail,
                          quantity: 1,
                        });
                        toast.success(`${selectedProduct.name} added to cart!`);
                      }}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      ADD TO CART
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-white/30 text-white hover:bg-white hover:text-green-800 font-bold h-9 px-4 shadow-sm transition-all active:scale-95"
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate(`/product/${selectedProduct.id}`);
                      }}
                    >
                      VIEW PRODUCT
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OurProductsSection;
