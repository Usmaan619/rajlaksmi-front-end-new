import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AllProducts from "@/pages/AllProducts";
import ProductDetail from "@/pages/ProductDetail";
import Certifications from "@/pages/Certification";
import CategoryMain from "@/pages/CategoryMain";
import ContactMainPage from "@/pages/ContactUsMain";
import AboutUsMainPage from "@/pages/AboutUsMain";
import Blogs from "@/pages/BlogMain";
import BlogDetail from "@/pages/BlogDetailsMain";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermAndCondition from "@/pages/TermAndCondition";
import ShippingPolicy from "@/pages/ShippingPolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import FAQMainPage from "@/pages/FAQsMain";
import B2BMainPage from "@/pages/B2bMain";
import LabReportsPage from "@/pages/LabReportMain";
import AppWrapper from "@/AppWrapper";

import ProfilePage from "@/pages/ProfilePage";
import OrdersPage from "@/pages/OrdersPage";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import WishlistPage from "@/pages/WishlistPage";

const MainRoutes = () => (
  <AppWrapper>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/categories" element={<CategoryMain />} />
      <Route path="/contact" element={<ContactMainPage />} />
      <Route path="/about" element={<AboutUsMainPage />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermAndCondition />} />
      <Route path="/shipping" element={<ShippingPolicy />} />
      <Route path="/returns" element={<RefundPolicy />} />
      <Route path="/faq" element={<FAQMainPage />} />
      <Route path="/b2b" element={<B2BMainPage />} />
      <Route path="/lab-report" element={<LabReportsPage />} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppWrapper>
);

export default MainRoutes;
