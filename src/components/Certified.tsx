import React from "react";

import FssaiLogo from "@/assets/new-img/certified/FSSAI.svg";
import IndiaOrganicLogo from "@/assets/new-img/certified/Natural-icon.png";
import Usda from "@/assets/new-img/certified/Orignal-icon.png";
import Apeda from "@/assets/new-img/certified/apeda-seeklogo.com.svg";

const logos = [
  { src: FssaiLogo, alt: "FSSAI certified A2 Gir cow ghee by Gauswarn India" },
  { src: IndiaOrganicLogo, alt: "India Organic certified A2 Gir cow ghee" },
  { src: Usda, alt: "USDA Organic certified bilona made A2 ghee" },
  { src: Apeda, alt: "APEDA certified Indian ghee exporter Gauswarn India" },
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
