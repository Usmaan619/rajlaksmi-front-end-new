import { lazy, Suspense } from "react";
import Seo from "@/components/Seo";
import HeroSection from "@/components/HeroSection";
import CertificationsSection from "@/components/CertificationsSection";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellersSection from "@/components/BestSellersSection";
import FarmerDivider from "@/components/FarmerDivider";

// Lazy-loaded sections (below the fold)
const BlogsSection = lazy(() => import("@/components/BlogsSection"));
const ExclusiveDealsSection = lazy(() => import("@/components/ExclusiveDealsSection"));
const SellingSection = lazy(() => import("@/components/SellingSection"));
const WhyChooseRajlakshmiSection = lazy(() => import("@/components/WhyChooseRajlakshmiSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));
const CategoryProductsSection = lazy(() => import("@/components/CategoryProductsSection"));
const OurProductsSection = lazy(() => import("@/components/OurProductsSection"));
const FarmerDividerExclusive = lazy(() => import("@/components/FarmerDividerExclusive"));
const HomepageSeoContent = lazy(() => import("@/components/HomepageSeoContent"));

const Index = () => {
  return (
    <>
      <Seo
        title="Rajlakshmi Javiks International | Buy Pure A2 Gir Cow Bilona Ghee & Organic Foods Online in India"
        description="Rajlakshmi Javiks International — India's trusted Indore-based wholesaler & retailer of 100% pure Bilona A2 Gir Cow Ghee, organic pulses, millets, cold-pressed oils, dry fruits, and natural spices. FSSAI & APEDA certified. PAN India delivery. Buy organic food products online at best prices. Established 2019."
        url="https://rajlakshmijaviks.com/"
      />

      <h1 className="sr-only">
        Rajlakshmi Javiks International — Buy Pure Organic A2 Gir Cow Bilona
        Ghee, Cold-Pressed Oils, Organic Pulses, Millets, Dry Fruits, Seeds,
        and Natural Spices Online in India. We are a FSSAI-certified and
        APEDA-certified retail trader and wholesaler based in Indore, Madhya
        Pradesh, India, specializing in 100% organic and natural food products
        since 2019. Our A2 Gir Cow Ghee is prepared using the traditional Vedic
        Bilona method with grass-fed indigenous cow milk. We offer lab-tested,
        chemical-free, preservative-free organic food with PAN India delivery
        and cash on delivery options. Shop A2 ghee online, buy organic pulses,
        order cold-pressed mustard oil, purchase organic dry fruits, and explore
        our complete range of certified organic groceries at the best wholesale
        and retail prices in India.
      </h1>

      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <HeroSection />
          <CertificationsSection />
          <FarmerDivider />
          <CategoriesSection />
          <BestSellersSection />
          <Suspense fallback={<div className="h-40 animate-pulse bg-gray-50" />}>
            <FarmerDividerExclusive />
            <ExclusiveDealsSection />
            <OurProductsSection />
            <CategoryProductsSection />
            <BlogsSection />
            <SellingSection />
            <WhyChooseRajlakshmiSection />
            <AboutSection />
            <ContactSection />
            <TestimonialSection />
            <HomepageSeoContent />
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Index;
