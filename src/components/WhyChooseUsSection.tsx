import { CheckCircle } from "lucide-react";
import farmersImage from "@/assets/banner-main-page/banner1.png";

const benefits = [
  "Sustainable Farming Techniques",
  "Chemical Free",
  "189 Global Testing Standards",
  "Pesticide Free",
  "Sustainable Farming Techniques",
  "189 Global Testing Standards",
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-gradient-to-r from-accent/50 to-accent py-12 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Farmer Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={farmersImage}
              alt="Traditional farmers with their cattle"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-8">
              Why Choose Us?
            </h2>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-foreground animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-base lg:text-lg font-medium">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
