import React from "react";

// Images
import FssaiLogo from "@/assets/certified/FSSAI.svg";
import IndiaOrganicLogo from "@/assets/certified/Natural-icon.png";
import Usda from "@/assets/certified/Orignal-icon.png";
import Apeda from "@/assets/certified/apeda-seeklogo.com.svg";

const logos = [
  { src: FssaiLogo, alt: "FSSAI certified" },
  { src: IndiaOrganicLogo, alt: "India Organic" },
  { src: Usda, alt: "USDA Organic" },
  { src: Apeda, alt: "APEDA certified" },
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

        {/* Logos */}
        <div className="relative">
          {/* decorative bg */}
          <div className="absolute inset-0 bg-[#01722C]/5 blur-3xl rounded-full -z-10" />

          {/* GRID */}
          <div className="grid grid-cols-4 gap-2 sm:gap-6 md:gap-10 items-center justify-items-center">
            {logos.map((logo, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="w-full flex items-center justify-center p-2 sm:p-4 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-8 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
