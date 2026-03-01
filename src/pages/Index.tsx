import HeroSection from "@/components/HeroSection";
import CertificationsSection from "@/components/CertificationsSection";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellersSection from "@/components/BestSellersSection";
import OurProductsSection from "@/components/OurProductsSection";
import ExclusiveDealsSection from "@/components/ExclusiveDealsSection";
import BlogsSection from "@/components/BlogsSection";
import FarmerDivider from "@/components/FarmerDivider";
import FarmerDividerExclusive from "@/components/FarmerDividerExclusive";
import OurProductsSectionSimple from "@/components/OurProductsSectionSimple";
import VideoSection from "@/components/VideoSection/VideoSection";
import SellingSection from "@/components/SellingSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import TestimonialSection from "@/components/TestimonialSection";
import CertificationsBottomSection from "@/components/CertificationsBottomSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        {/* <CertificationsSection /> */}
        <FarmerDivider />
        <CategoriesSection />
        <BestSellersSection />
        <FarmerDividerExclusive />
        <ExclusiveDealsSection />
        <BlogsSection />
        <OurProductsSection />
        <SellingSection />
        <WhyChooseUsSection />
        <AboutSection />
        <ContactSection />
        <TestimonialSection />
        <CertificationsBottomSection className="bg-[#F0FFF0]" />
      </main>
    </div>
  );
};

export default Index;
