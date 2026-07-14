import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import WhatsAppButton from "./components/WhatsAppButton";

const AppWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // yahan auth routes define karo
  const authRoutes = ["/login", "/register", "/forgot-password"];

  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthRoute && <AnnouncementBar />}
      {!isAuthRoute && <Header />}
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      {!isAuthRoute && <Footer />}
      <WhatsAppButton />
    </div>
  );
};

export default AppWrapper;
