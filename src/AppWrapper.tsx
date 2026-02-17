import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";

const AppWrapper = ({ children }) => {
  const location = useLocation();

  // yahan auth routes define karo
  const authRoutes = ["/login", "/register", "/forgot-password"];

  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthRoute && <AnnouncementBar />}
      {!isAuthRoute && <Header />}
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
};

export default AppWrapper;
