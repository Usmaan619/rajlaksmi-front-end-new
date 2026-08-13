import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/api/axios";
import { useAuth } from "./AuthContext";

export interface WishlistItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  discount?: number;
  weightOptions?: string[]; // Adding extra fields that might be useful for wishlist rendering
  rating?: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string | number) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string | number) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      return [];
    }
  });

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/users/wishlist");
      if (res.data && res.data.wishlist) {
        const mappedWishlist = res.data.wishlist.map((item: any) => ({
          id: item.product_id,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
          discount: item.discount ? Number(item.discount) : undefined,
          weightOptions: item.weightOptions ? JSON.parse(item.weightOptions) : undefined,
          rating: item.rating ? Number(item.rating) : undefined
        }));
        setWishlist(mappedWishlist);
      }
    } catch (err) {
      console.error("Error fetching wishlist from DB", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isAuthenticated]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });

    if (isAuthenticated) {
      // toggle API handles both add and remove
      api.post("/users/wishlist/toggle", { item }).catch(console.error);
    }
  };

  const removeFromWishlist = (id: string | number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    
    if (isAuthenticated) {
      // toggle API will remove it if it exists
      api.post("/users/wishlist/toggle", { item: { id } }).catch(console.error);
    }
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });

    if (isAuthenticated) {
      api.post("/users/wishlist/toggle", { item }).catch(console.error);
    }
  };

  const isInWishlist = (id: string | number) => {
    return wishlist.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  useEffect(() => {
    const handleLogout = () => clearWishlist();
    const handleLoginSuccess = () => fetchWishlist();
    
    window.addEventListener("auth_logout", handleLogout);
    window.addEventListener("auth_login_success", handleLoginSuccess);
    
    return () => {
      window.removeEventListener("auth_logout", handleLogout);
      window.removeEventListener("auth_login_success", handleLoginSuccess);
    };
  }, []);

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
