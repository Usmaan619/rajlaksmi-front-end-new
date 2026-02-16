import { Button } from "@/components/ui/button";
import farmerImage from "@/assets/WhyChooseRajlakshmiSection/1.png";
import teamImage from "@/assets/WhyChooseRajlakshmiSection/2.png";
import farmerBgImg from "@/assets/aboutus/aboutusbgfarmerImg.png";

const WhyChooseRajlakshmiSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Background decorative image */}
      <img
        src={farmerBgImg}
        alt="farmer background"
        className="
          absolute
          bottom-0
          right-0
          w-[140px]
          sm:w-[200px]
          lg:w-[360px]
          h-auto
          object-contain
          opacity-60
          pointer-events-none
          select-none
        "
      />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Overlapping Images */}
          <div className="relative w-full max-w-xl mx-auto h-[320px] sm:h-[380px] lg:h-[420px]">
            {/* Team image - back */}
            <div className="absolute top-0 right-0 w-[67%]">
              <img
                src={teamImage}
                alt="Rajlakshmi team"
                className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
              />
            </div>

            {/* Farmer image - front */}
            <div className="absolute bottom-0 left-0 w-[40%] z-10">
              <img
                src={farmerImage}
                alt="Rajasthani farmer"
                className="w-full h-full object-cover rounded-2xl shadow-xl aspect-[3/4]"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-5 text-center lg:text-left">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
              Why Choose Rajlakshmi Javiks?
            </h2>

            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              We believe food should be pure, natural, and safe. Our products
              are carefully grown without chemicals, ethically sourced from
              trusted farmers, and tested to meet high-quality standards.
            </p>

            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                Sustainably farmed
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                No artificial preservatives
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                Rich in natural nutrients
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                Trusted by health-conscious families
              </li>
            </ul>

            <div className="pt-2">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md px-6"
              >
                Read more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRajlakshmiSection;
