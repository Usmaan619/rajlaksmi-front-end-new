import React from "react";

// Images
import FssaiLogo from "@/assets/certified/FSSAI.svg";
import IndiaOrganicLogo from "@/assets/certified/Natural-icon.png";
import Usda from "@/assets/certified/Orignal-icon.png";
import Apeda from "@/assets/certified/apeda-seeklogo.com.svg";

const logos = [
  {
    src: FssaiLogo,
    alt: "FSSAI certified A2 Gir cow ghee by Gauswarn India",
  },
  {
    src: IndiaOrganicLogo,
    alt: "India Organic certified A2 Gir cow ghee",
  },
  {
    src: Usda,
    alt: "USDA Organic certified bilona made A2 ghee",
  },
  {
    src: Apeda,
    alt: "APEDA certified Indian ghee exporter Gauswarn India",
  },
];

const CertificationsSection: React.FC = () => {
  return (
    <section className="bg-popover py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* SEO Hidden Heading */}
        <h2 className="sr-only">
          Our Certifications – FSSAI, USDA Organic, India Organic & APEDA
        </h2>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="img-fluid"
              style={{ maxHeight: "60px", objectFit: "contain" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
