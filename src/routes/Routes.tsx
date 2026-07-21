import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AppWrapper from "@/AppWrapper";
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
const GalleryMain = lazy(() => import("@/pages/GalleryMain"));
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
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: '#f9f6f0' }}>
    {/* Logo */}
    <div style={{ animation: 'logoFadeIn 0.5s ease forwards' }}>
      <img
        src="/RAJLAXMI-JAVIK-png.png"
        alt="Rajlakshmi Javiks"
        width="180"
        height="72"
        style={{ width: '160px', height: 'auto' }}
      />
    </div>

    {/* Tagline */}
    <p style={{
      marginTop: '16px',
      fontSize: '13px',
      color: '#01722C',
      fontWeight: 600,
      letterSpacing: '0.05em',
      opacity: 0,
      animation: 'logoFadeIn 0.5s ease 0.3s forwards'
    }}>
      Pure • Natural • Organic
    </p>

    {/* Progress Bar */}
    <div style={{
      marginTop: '32px',
      width: '180px',
      height: '3px',
      background: '#d9f0e3',
      borderRadius: '99px',
      overflow: 'hidden',
      opacity: 0,
      animation: 'logoFadeIn 0.3s ease 0.4s forwards'
    }}>
      <div style={{
        height: '100%',
        background: '#01722C',
        borderRadius: '99px',
        animation: 'progressBar 1.2s ease-in-out infinite'
      }} />
    </div>

    <style>{`
      @keyframes logoFadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes progressBar {
        0%   { width: 0%;   margin-left: 0; }
        50%  { width: 70%;  margin-left: 15%; }
        100% { width: 0%;   margin-left: 100%; }
      }
    `}</style>
  </div>
);

const MainRoutes = () => (
  <AppWrapper>
    <Suspense fallback={<PageLoader />}>
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
        <Route path="/gallery" element={<GalleryMain />} />
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
