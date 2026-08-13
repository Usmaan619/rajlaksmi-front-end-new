import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, clearToken, setToken } from "@/utils/token";
import api from "@/api/axios";

interface User {
  id: string;
  full_name: string;
  email: string;
  mobile_number?: string;
  profile_image?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user data", err);
      }
    }
  }, []);

  const login = (userData: User, token: string) => {
    setToken(token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    
    // Sync guest cart/wishlist to DB
    syncData(userData.id, token);
  };

  const syncData = async (userId: string, token: string) => {
    try {
      const cartStr = localStorage.getItem("cart");
      const wishStr = localStorage.getItem("wishlist");
      
      if (cartStr) {
        const cartItems = JSON.parse(cartStr);
        if (cartItems.length > 0) {
          await api.post("/users/cart/sync", { items: cartItems });
        }
      }
      
      if (wishStr) {
        const wishItems = JSON.parse(wishStr);
        if (wishItems.length > 0) {
          await api.post("/users/wishlist/sync", { items: wishItems });
        }
      }
      
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
      window.dispatchEvent(new Event("auth_login_success"));
    } catch (err) {
      console.error("Failed to sync local data", err);
      // Even if sync fails, let's trigger refresh so it loads whatever is in DB
      window.dispatchEvent(new Event("auth_login_success"));
    }
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem("user_data");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setUser(null);
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("auth_logout"));
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user_data", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
