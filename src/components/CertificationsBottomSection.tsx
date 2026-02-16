import { Button } from "@/components/ui/button";

import fassaiImg from "@/assets/bottomCertified/fssaiLogo.png";
import labtestedImg from "@/assets/bottomCertified/labtested.png";
import organicLogoImg from "@/assets/bottomCertified/organicLogo.png";
import premiumLogoImg from "@/assets/bottomCertified/premiumLogo.png";

const CertificationsBottomSection = ({ className }: { className?: string }) => {
  return (
    <section
      className={`${className || ""} py-12 sm:py-14 lg:py-20`}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary text-center mb-8 lg:mb-12 font-bold">
          Certification
        </h2>

        {/* Certification Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-10 place-items-center">
          {/* FSSAI */}
          <div className="animate-fade-up">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full  flex items-center justify-center  p-3 sm:p-4">
              <img
                src={fassaiImg}
                alt="FSSAI Certification"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Organic */}
          <div className="animate-fade-up">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full  flex items-center justify-center  p-3">
              <img
                src={organicLogoImg}
                alt="Organic Certification"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Lab Tested */}
          <div className="animate-fade-up">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full  flex items-center justify-center  p-3">
              <img
                src={labtestedImg}
                alt="Lab Tested"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Premium Quality */}
          <div className="animate-fade-up">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full  flex items-center justify-center  p-3">
              <img
                src={premiumLogoImg}
                alt="Premium Quality"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* View Certificate Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 h-10 sm:h-12"
          >
            View Certificate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CertificationsBottomSection;
