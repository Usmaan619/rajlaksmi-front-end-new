import { Button } from "@/components/ui/button";

import fassaiImg from "@/assets/bottomCertified/fssaiLogo.png";
import labtestedImg from "@/assets/bottomCertified/labtested.png";
import organicLogoImg from "@/assets/bottomCertified/organicLogo.png";
import premiumLogoImg from "@/assets/bottomCertified/premiumLogo.png";

const certifications = [
  { img: fassaiImg, alt: "FSSAI Certification" },
  { img: organicLogoImg, alt: "Organic Certification" },
  { img: labtestedImg, alt: "Lab Tested" },
  { img: premiumLogoImg, alt: "Premium Quality" },
];

const CertificationsBottomSection = ({
  className,
  btnCss,
}: {
  className?: string;
  btnCss?: string;
}) => {
  return (
    <section className={`${className || ""} py-10 sm:py-14 lg:py-20`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary text-center mb-8 lg:mb-12 font-bold">
          Certification
        </h2>

        {/* Certification Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-10 place-items-center">
          {certifications.map((item, index) => (
            <div
              key={index}
              className="animate-fade-up transition-transform duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center p-3 sm:p-4">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* View Certificate Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className={`border-primary ${btnCss} text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 h-10 sm:h-12 w-full sm:w-auto max-w-xs`}
          >
            View Certificate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CertificationsBottomSection;
