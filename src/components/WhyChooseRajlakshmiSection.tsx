import { Button } from "@/components/ui/button";
import farmerImage from "@/assets/WhyChooseRajlakshmiSection/1.webp";
import teamImage from "@/assets/WhyChooseRajlakshmiSection/2.webp";
import farmerBgImg from "@/assets/aboutus/aboutusbgfarmerImg.png";
import { useNavigate } from "react-router-dom";

const WhyChooseRajlakshmiSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Background decorative image */}
      <img
        src={farmerBgImg}
        alt="farmer background"
        width="360"
        height="360"
        loading="lazy"
        decoding="async"
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
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Overlapping Images */}
          <div className="relative w-full max-w-md md:max-w-full lg:max-w-xl mx-auto h-[280px] sm:h-[350px] lg:h-[420px]">
            {/* Team image - back */}
            <div className="absolute top-0 right-0 w-[67%] aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={teamImage}
                alt="Rajlakshmi Javiks International team processing organic food products in Indore"
                width="400"
                height="300"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover shadow-lg"
              />
            </div>

            {/* Farmer image - front */}
            <div className="absolute bottom-0 left-0 w-[40%] z-10 aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={farmerImage}
                alt="Indian organic farmer supplying natural produce to Rajlakshmi Javiks"
                width="240"
                height="320"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover shadow-xl"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-5 text-center md:text-left">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
              Why Choose Rajlakshmi Javiks for Organic Food?
            </h2>

            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
              At Rajlakshmi Javiks International, we believe that food should be pure, natural, and completely safe for your family. Every organic product we offer — from A2 Gir Cow Bilona Ghee to cold-pressed oils, millets, and spices — is carefully grown on certified organic farms without chemicals, pesticides, or synthetic fertilisers. We work directly with trusted farming communities across Madhya Pradesh and Rajasthan, ensuring ethical sourcing and fair trade practices at every step.
            </p>

            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
              Every batch of our products undergoes rigorous third-party lab testing for purity, nutritional content, and adulteration. Our commitment to transparency means you can trust the organic integrity of every item you purchase from us.
            </p>

            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex justify-center md:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                Sustainably farmed — supporting eco-friendly agriculture and soil health
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                No artificial preservatives, colours, or chemical additives in any product
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                Rich in natural nutrients — retaining vitamins, minerals, and antioxidants
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                Trusted by over 17,000+ health-conscious Indian families since 2019
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                FSSAI, APEDA, and NPOP certified for complete food safety compliance
              </li>
              <li className="flex justify-center lg:justify-start items-center gap-2">
                <span className="text-primary">•</span>
                PAN India delivery with secure packaging and cash on delivery options
              </li>
            </ul>

            <div className="pt-2">
              <Button
                aria-label="Read more about our story"
                onClick={() => navigate(`/about`)}
                variant="outline"
                className="bg-white border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md px-6"
              >
                Read more about our story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRajlakshmiSection;
