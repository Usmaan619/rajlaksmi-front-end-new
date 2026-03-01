import HeroSection from "@/components/HeroSection";
import CertificationsSection from "@/components/CertificationsSection";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellersSection from "@/components/BestSellersSection";
import ExclusiveDealsSection from "@/components/ExclusiveDealsSection";
import BlogsSection from "@/components/BlogsSection";
import FarmerDivider from "@/components/FarmerDivider";
import FarmerDividerExclusive from "@/components/FarmerDividerExclusive";
import SellingSection from "@/components/SellingSection";
import WhyChooseRajlakshmiSection from "@/components/WhyChooseRajlakshmiSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import TestimonialSection from "@/components/TestimonialSection";
import CertificationsBottomSection from "@/components/CertificationsBottomSection";
import CategoryProductsSection from "@/components/CategoryProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <CertificationsSection />
        <FarmerDivider />
        <CategoriesSection />
        <BestSellersSection />
        <FarmerDividerExclusive />
        <ExclusiveDealsSection />
        <CategoryProductsSection />
        <BlogsSection />
        <SellingSection />
        <WhyChooseRajlakshmiSection />
        <AboutSection />
        <ContactSection />
        <TestimonialSection />
        <CertificationsBottomSection className="bg-[#F0FFF0]" />
      </main>
    </div>
  );
};

export default Index;
