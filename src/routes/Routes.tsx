import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AppWrapper from "@/AppWrapper";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Lazy-loaded components
const Index = lazy(() =>
  import("@/pages/Index").then((module) => ({ default: module.default })),
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((module) => ({ default: module.default })),
);
const AllProducts = lazy(() =>
  import("@/pages/AllProducts").then((module) => ({ default: module.default })),
);
const ProductDetail = lazy(() =>
  import("@/pages/ProductDetail").then((module) => ({
    default: module.default,
  })),
);
const Certifications = lazy(() =>
  import("@/pages/Certification").then((module) => ({
    default: module.default,
  })),
);
const CategoryMain = lazy(() =>
  import("@/pages/CategoryMain").then((module) => ({
    default: module.default,
  })),
);
const ContactMainPage = lazy(() =>
  import("@/pages/ContactUsMain").then((module) => ({
    default: module.default,
  })),
);
const AboutUsMainPage = lazy(() =>
  import("@/pages/AboutUsMain").then((module) => ({ default: module.default })),
);
const Blogs = lazy(() =>
  import("@/pages/BlogMain").then((module) => ({ default: module.default })),
);
const BlogDetail = lazy(() =>
  import("@/pages/BlogDetailsMain").then((module) => ({
    default: module.default,
  })),
);
const PrivacyPolicy = lazy(() =>
  import("@/pages/PrivacyPolicy").then((module) => ({
    default: module.default,
  })),
);
const TermAndCondition = lazy(() =>
  import("@/pages/TermAndCondition").then((module) => ({
    default: module.default,
  })),
);
const ShippingPolicy = lazy(() =>
  import("@/pages/ShippingPolicy").then((module) => ({
    default: module.default,
  })),
);
const RefundPolicy = lazy(() =>
  import("@/pages/RefundPolicy").then((module) => ({
    default: module.default,
  })),
);
const FAQMainPage = lazy(() =>
  import("@/pages/FAQsMain").then((module) => ({ default: module.default })),
);
const B2BMainPage = lazy(() =>
  import("@/pages/B2bMain").then((module) => ({ default: module.default })),
);
const LabReportsPage = lazy(() =>
  import("@/pages/LabReportMain").then((module) => ({
    default: module.default,
  })),
);

const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const LoginPage = lazy(() => import("@/pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/Auth/SignupPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/Auth/ForgotPasswordPage"),
);
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const WishlistPage = lazy(() => import("@/pages/WishlistPage"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("@/pages/PaymentFailed"));
const OrderDetailsPage = lazy(() => import("@/pages/OrderDetailsPage"));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white/80 backdrop-blur-md fixed inset-0 z-[9999]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-sm font-medium text-primary/60 animate-pulse">
        Loading amazing products...
      </p>
    </div>
  </div>
);

const MainRoutes = () => (
  <AppWrapper>
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Public Routes - Only accessible when NOT logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="/cart" element={<CartPage />} />

        {/* Protected Routes - Only accessible when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
        </Route>
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
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        {/* CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </AppWrapper>
);

export default MainRoutes;
