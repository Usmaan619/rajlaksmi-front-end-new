import React from "react";

// Images
import FssaiLogo from "@/assets/certified/FSSAI.svg";
import IndiaOrganicLogo from "@/assets/certified/Natural-icon.png";
import Usda from "@/assets/certified/Orignal-icon.png";
import Apeda from "@/assets/certified/apeda-seeklogo.com.svg";

const logos = [
  {
    src: FssaiLogo,
    alt: "FSSAI certified",
  },
  {
    src: IndiaOrganicLogo,
    alt: "India Organic",
  },
  {
    src: Usda,
    alt: "USDA Organic",
  },
  {
    src: Apeda,
    alt: "APEDA certified",
  },
];

const CertificationsSection: React.FC = () => {
  return (
    <section className="py-10 lg:py-16 border-y border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="sr-only">
            Our Certifications – FSSAI, USDA Organic, India Organic & APEDA
          </h2>

          <div className="w-full max-w-5xl">
            {/* Responsive Logo Grid: 2 columns on mobile, 4 on small screens upwards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center">
              {logos.map((logo, index) => (
                <div key={index} className="w-full flex justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
