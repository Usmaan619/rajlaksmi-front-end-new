import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    addToCart({
      id: `product-wishlist-${item.id}`,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      weight: item.weightOptions
        ? item.weightOptions[0]
        : item.weight || undefined,
    });
    toast.success(`${item.name} added to cart!`);
    removeFromWishlist(item.id); // Typically removing from wishlist on add to cart
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 tekxt-center">
        <div className="bg-white p-6 rounded-full mb-6">
          <Heart className="h-16 w-16 text-red-500  fill-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-[#01722C] mb-2">
          Your Wishlist is Empty
        </h2>
        <p className=" mb-8 max-w-md">
          Save items you love and buy them later. Let's start adding some
          amazing products to your wishlist!
        </p>
        <Link to="/products">
          <Button className="bg-[#01722C] hover:bg-[#01722C] text-white  text-md rounded-md shadow-lg transition-transform hover:scale-105">
            Explore Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#01722C] flex items-center gap-3">
            <Heart className="text-rose-500 fill-rose-500 h-6 w-6 sm:h-8 sm:w-8" />
            My Wishlist ({wishlistCount})
          </h1>
          <Link
            to="/products"
            className="text-[#01722C] font-semibold hover:text-emerald-800 flex items-center gap-2"
          >
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow group relative cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* Remove from wishlist button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                    toast.info(`${item.name} removed from wishlist`);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm transition-all z-10"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <CardContent className="p-5 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1 flex-1 pr-2">
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-[#01722C]">
                    ₹{item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{item.originalPrice}
                    </span>
                  )}
                  {item.discount && (
                    <Badge className="bg-primary rounded-md text-primary-foreground text-[10px] px-2 py-0.5">
                      {item.discount}% OFF
                    </Badge>
                  )}
                </div>

                <Button
                  onClick={(e) => handleAddToCart(e, item)}
                  className="w-full bg-[#01722C] hover:bg-[#06a443] text-white gap-2 font-semibold"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
