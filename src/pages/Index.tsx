import Seo from "@/components/Seo";
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
import OurProductsSection from "@/components/OurProductsSection";

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
          {/* <CertificationsBottomSection
          className="bg-[#F0FFF0] "
          btnCss="bg-white mb"
        /> */}
        </main>
      </div>
    </>
  );
};

export default Index;
