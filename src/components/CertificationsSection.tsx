import React from "react";
import FssaiLogo from "@/assets/certified/FSSAI.webp";
import IndiaOrganicLogo from "@/assets/certified/100_ Naturals.webp";
import Usda from "@/assets/certified/GUARANTED ORIGINAL.webp";
import Apeda from "@/assets/certified/APEDA.webp";
import impandexpot from "@/assets/certified/ICE.webp";
import NPOP from "@/assets/certified/npop.webp";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const logos = [
  { src: FssaiLogo, alt: "FSSAI certified" },
  { src: IndiaOrganicLogo, alt: "India Organic" },
  { src: Usda, alt: "USDA Organic" },
  { src: Apeda, alt: "APEDA certified" },
  { src: impandexpot, alt: "Import and Export certified" },
  {
    src: NPOP,
    alt: "NPOP National Programme for Organic Production certified",
  },
];

const CertificationsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[#01722C] font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] mb-3">
            Quality Guaranteed
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#01722C] tracking-tight font-serif mb-3">
            Our Trusted Certifications
          </h2>

          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Adhering to the highest global standards to bring you pure,
            authentic, and safe organic products from the heart of India.
          </p>
        </div>

        {/* MOBILE SLIDER */}
        <div className="block md:hidden">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {logos.map((logo, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <div className="p-3">
                    <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width="100"
                        height="64"
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6 items-stretch justify-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex group">
              <div className="w-full flex items-center justify-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 group-hover:shadow-lg group-hover:border-[#01722C]/20 transition-all duration-300">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width="120"
                  height="64"
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-auto object-contain transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
