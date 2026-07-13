import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aboutFarmersImage from "@/assets/category/farmer.png";
import aboutFarmersBgImage from "@/assets/aboutus/aboutusbgfarmerImg.png";

const AboutSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className=" rounded-3xl p-6 lg:p-12 relative overflow-hidden">
          {/* Background image */}
          <img
            src={aboutFarmersBgImage}
            alt="Indian organic farmer background illustration"
            loading="lazy"
            decoding="async"
            className="
    absolute
    bottom-0
    left-0
    w-[160px]
    lg:w-[370px]
    h-auto
    object-contain
    opacity-60
    pointer-events-none
    select-none
  "
          />

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 relative z-10">
            {/* Content */}
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                About Rajlakshmi Javiks International
              </h2>

              <p className="text-primary font-semibold text-sm lg:text-base">
                Pure. Natural. Trusted Since 2019.
              </p>

              <p className="text-foreground/80 text-sm lg:text-base leading-relaxed">
                Rajlakshmi Javiks International is a leading retail trader and
                wholesaler based in Indore, Madhya Pradesh, specializing in
                premium organic and natural food products. Since our establishment
                in 2019, we have been committed to offering 100% pure organic
                A2 Gir Cow Bilona Ghee, cold-pressed oils, premium dry fruits,
                whole grains, organic pulses, natural millets, and authentic
                Indian spices — all rigorously lab-tested for quality and purity.
              </p>

              <p className="text-foreground/80 text-sm lg:text-base leading-relaxed">
                Our products are sourced directly from certified organic farming
                communities across central India, ensuring complete traceability
                from farm to your kitchen. We hold FSSAI, APEDA, and NPOP
                certifications, and every product is available for PAN India
                delivery with secure packaging. Whether you are a health-conscious
                individual, a family seeking chemical-free groceries, or a business
                looking for wholesale organic food supplies, Rajlakshmi Javiks is
                your trusted partner for authentic, pure, and affordable organic
                nutrition.
              </p>

              <Link to="/about">
                <Button
                  aria-label="Read more about us"
                  variant="outline"
                  className="bg-white border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md px-6 mt-3"
                >
                  Read more about us
                </Button>
              </Link>
            </div>

            {/* Main Image */}
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden ">
                <img
                  src={aboutFarmersImage}
                  alt="Indian farmers with organic food products grown for Rajlakshmi Javiks International"
                  width="600"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
