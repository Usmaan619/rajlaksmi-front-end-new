import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/api/axios";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight?: string;
  originalId?: string;
  gst_percent?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const fetchCart = async () => {
    try {
      const res = await api.get("/users/cart");
      if (res.data && res.data.cart) {
        const mappedCart = res.data.cart.map((item: any) => ({
          id: item.unique_id,
          originalId: item.product_id,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          quantity: item.quantity,
          weight: item.weight,
          gst_percent: Number(item.gst_percent)
        }));
        setCart(mappedCart);
      }
    } catch (err) {
      console.error("Error fetching cart from DB", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        console.warn("Local storage quota exceeded. Saving cart without images.");
        try {
          // If images are large base64 strings, saving without them might work
          const cartWithoutImages = cart.map(item => ({ ...item, image: "" }));
          localStorage.setItem("cart", JSON.stringify(cartWithoutImages));
        } catch (fallbackError) {
          console.error("Failed to save cart even without images.", fallbackError);
        }
      } else {
        console.error("Error saving cart to local storage:", error);
      }
    }
    }
  }, [cart, isAuthenticated]);

  const addToCart = (item: CartItem) => {
    // Force a dynamically unique ID that accounts for the variant weight
    const uniqueId = `${item.id}-${item.weight || "noweight"}`;
    const cartItemToInsert = { ...item, id: uniqueId, originalId: item.id };

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === cartItemToInsert.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === cartItemToInsert.id
            ? { ...i, quantity: i.quantity + cartItemToInsert.quantity }
            : i,
        );
      }
      return [...prevCart, cartItemToInsert];
    });

    if (isAuthenticated) {
      api.post("/users/cart/add", { item: cartItemToInsert }).catch(console.error);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    
    if (isAuthenticated) {
      api.delete(`/users/cart/remove/${encodeURIComponent(id)}`).catch(console.error);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    let updatedItem: CartItem | undefined;
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, quantity };
          return updatedItem;
        }
        return item;
      });
    });

    if (isAuthenticated && updatedItem) {
      api.post("/users/cart/add", { item: updatedItem }).catch(console.error);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const handleLogout = () => clearCart();
    const handleLoginSuccess = () => fetchCart();
    
    window.addEventListener("auth_logout", handleLogout);
    window.addEventListener("auth_login_success", handleLoginSuccess);
    
    return () => {
      window.removeEventListener("auth_logout", handleLogout);
      window.removeEventListener("auth_login_success", handleLoginSuccess);
    };
  }, []);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
