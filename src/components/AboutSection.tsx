import { Button } from "@/components/ui/button";
import aboutFarmersImage from "@/assets/category/farmer.png";
import aboutFarmersBgImage from "@/assets/aboutus/aboutusbgfarmerImg.png";

const AboutSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className=" rounded-3xl p-6 lg:p-12 relative overflow-hidden">
          {/* Background image */}
          <img
            src={aboutFarmersBgImage}
            alt="farmer background"
            className="
    absolute
    bottom-0
    left-0
    w-[160px]
    lg:w-[370px]
    h-auto
    object-contain
    opacity-60
    pointer-events-none
    select-none
  "
          />

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                About Rajlakshmi Javiks
              </h2>

              <p className="text-primary font-semibold text-sm lg:text-base">
                Pure. Natural. Trusted.
              </p>

              <p className="text-foreground/80 text-sm lg:text-base leading-relaxed">
                Rajlakshmi Javiks ek bharosemand organic brand hai jo aap tak
                100% natural aur chemical-free food products pahunchane ke liye
                samarpit hai. Humare products seedhe un kisanon aur farms se
                aate hain jahan paramparik aur sustainable farming techniques ka
                use kiya jata hai.
              </p>

              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md px-6"
              >
                Read more
              </Button>
            </div>

            {/* Main Image */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={aboutFarmersImage}
                  alt="Farmers with organic products"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
