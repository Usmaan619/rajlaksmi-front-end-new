import React from "react";

import FssaiLogo from "@/assets/certified/FSSAI.webp";
import IndiaOrganicLogo from "@/assets/certified/100_ Naturals.webp";
import Usda from "@/assets/certified/GUARANTED ORIGINAL.webp";
import Apeda from "@/assets/certified/APEDA.webp";
import impandexpot from "@/assets/certified/ICE.webp";

const logos = [
  { src: FssaiLogo, alt: "FSSAI certified A2 Gir cow ghee by Gauswarn India" },
  { src: IndiaOrganicLogo, alt: "India Organic certified A2 Gir cow ghee" },
  { src: Usda, alt: "USDA Organic certified bilona made A2 ghee" },
  { src: Apeda, alt: "APEDA certified Indian ghee exporter Gauswarn India" },
  { src: impandexpot, alt: "Import and export certified" },
];

const Certified: React.FC = () => {
  return (
    <section className="py-8 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">
          Our Certifications – FSSAI, USDA Organic, India Organic & APEDA
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="
                max-h-[50px]
                sm:max-h-[70px]
                md:max-h-[90px]
                lg:max-h-[100px]
                object-contain
                grayscale
                hover:grayscale-0
                transition duration-300
              "
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certified;
