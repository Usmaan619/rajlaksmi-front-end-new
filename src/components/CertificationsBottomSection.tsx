import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

import fassaiImg from "@/assets/bottomCertified/fssaiLogo.png";
import labtestedImg from "@/assets/bottomCertified/labtested.png";
import organicLogoImg from "@/assets/bottomCertified/organicLogo.png";
import premiumLogoImg from "@/assets/bottomCertified/premiumLogo.png";

const certifications = [
  { img: fassaiImg, alt: "FSSAI Certification", label: "FSSAI Certified" },
  { img: organicLogoImg, alt: "Organic Certification", label: "100% Organic" },
  { img: labtestedImg, alt: "Lab Tested", label: "Lab Tested" },
  { img: premiumLogoImg, alt: "Premium Quality", label: "Premium Quality" },
];

const CertificationsBottomSection = ({
  className,
  btnCss,
}: {
  className?: string;
  btnCss?: string;
}) => {
  return (
    <section
      className={`${className || "bg-white"} py-14 sm:py-20 lg:py-24 relative overflow-hidden`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16 text-center">
          <p className="text-primary font-bold text-xs sm:text-sm uppercase tracking-[0.3em] mb-4">
            Quality Assurance
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Our Certifications
          </h2>
          <div className="h-1.5 w-24 bg-primary/10 mx-auto mt-6 rounded-full" />
        </div>

        {/* Certification Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-16 place-items-center">
          {certifications.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="relative mb-4">
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-125 transition-transform duration-500 blur-xl" />

                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-white border border-gray-100 flex items-center justify-center p-5 sm:p-6 shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* View Certificate Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className={`border-primary/50 text-primary hover:bg-primary hover:text-white h-12 px-10 rounded-md font-bold transition-colors duration-300 ${btnCss}`}
          >
            <FileText className="w-4 h-4 mr-2" />
            View Certificates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CertificationsBottomSection;
