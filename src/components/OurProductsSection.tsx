import { useRef } from "react";
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
      className="relative w-[260px] lg:w-[300px] h-[440px] lg:h-[490px] rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
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
        className="absolute bottom-3 left-3 right-3 bg-white rounded-2xl shadow-xl p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-2">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
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
          className="w-full border border-green-700 text-green-700 rounded-full py-2 text-sm font-semibold hover:bg-green-700 hover:text-white transition"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const OurProductsSection = () => {
  return (
    <section className="py-12  lg:py-16 bg-gradient-to-b from-[#EBF4EE] to-white relative overflow-hidden">
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

      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary">
            Our Products
          </h2>
        </div>

        {/* Products Grid */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory
             lg:grid lg:grid-cols-5
             lg:gap-6 lg:px-0
             lg:overflow-visible lg:justify-items-center
             mb-12"
        >
          {products.map((product) => (
            <div className="snap-start flex-shrink-0" key={product.id}>
              <VideoProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
