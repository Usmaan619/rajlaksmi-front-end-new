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
    <section className="py-12 lg:py-20 bg-[#F9FBF9] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#01722C] font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4">
            Quality Guaranteed
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#01722C] tracking-tight font-serif mb-4">
            Our Trusted Certifications
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Adhering to the highest global standards to bring you pure,
            authentic, and safe organic products from the heart of India.
          </p>
        </div>

        {/* Logo Container */}
        <div className="relative group">
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full -z-10 transition-colors duration-700 group-hover:bg-[#01722C]/5" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16 items-center justify-items-center">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="w-full flex justify-center transform transition-all duration-500 hover:scale-110 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                <div className="p-4 sm:p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(1,114,44,0.1)] transition-all">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small Trust Footnote */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-100 flex flex-center flex-col items-center">
          <div className="h-1 w-12 bg-[#01722C]/20 mb-6 rounded-full" />
          <p className="text-[#01722C]/60 text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase text-center">
            Purity & Integrity in Every Pack
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
