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
  {
    src: FssaiLogo,
    alt: "FSSAI certified organic food products by Rajlakshmi Javiks International",
  },
  {
    src: IndiaOrganicLogo,
    alt: "100% Natural and Organic food certification India",
  },
  {
    src: Usda,
    alt: "Guaranteed Original authentic organic products certification",
  },
  { src: Apeda, alt: "APEDA certified organic food export quality products" },
  {
    src: impandexpot,
    alt: "Import and Export certification for international organic trade",
  },
  {
    src: NPOP,
    alt: "NPOP National Programme for Organic Production certified by Government of India",
  },
];

const CertificationsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[#116931] font-semibold text-[11px] sm:text-xs uppercase tracking-[0.3em] mb-3">
            Quality Guaranteed — Certified Organic Purity
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#116931] tracking-tight font-serif mb-3">
            Our Trusted Certifications & Quality Standards
          </h2>

          <p className="text-gray-500 text-sm sm:text-base max-w-6xl mx-auto leading-relaxed">
            At Rajlakshmi Javiks International, every organic food product we
            sell meets the highest national and international quality standards.
            Our certifications from FSSAI, APEDA, and NPOP guarantee that you
            receive genuine, lab-tested, and chemical-free organic food — from
            pure A2 Gir Cow Bilona Ghee to cold-pressed oils, organic pulses,
            millets, dry fruits, and natural spices. We adhere to rigorous
            testing protocols and transparent supply chain practices to bring
            you authentic, safe, and nutritious organic products from the heart
            of India.
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
              <div className="w-full flex items-center justify-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 group-hover:shadow-lg group-hover:border-[#116931]/20 transition-all duration-300">
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
