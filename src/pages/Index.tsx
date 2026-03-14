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

const Index = () => {
  return (
    <>
      <Seo
        title="Rajlakshmi Javiks International | Pure A2 Gir Cow Ghee & Organic Foods"
        description="Rajlakshmi Javiks International is a trusted Indore-based wholesaler of 100% pure Bilona A2 Gir Cow Ghee, organic pulses, millets, and dry fruits. Established in 2019 with a focus on purity and health."
        url="https://rajlakshmijaviks.com/"
      />

      <h1 className="sr-only">
        Rajlakshmi Javiks International is a retail trader and wholesaler based
        in Indore, Madhya Pradesh, specializing in organic and natural food
        products. Established in 2019, the business offers pure organic A2 cow
        ghee, oils, dry fruits, grains, pulses, spices, millets, and other
        natural foods, all with lab-tested quality and available for PAN India
        delivery. Our A2 Gir Cow Ghee Vedik Bilona and Organic Kashmiri Saffron
        are highly rated for their authenticity and purity.
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
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Index;
