import React from "react";
import { TreeDeciduous, Utensils, ShieldCheck, Tractor } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <TreeDeciduous className="w-8 h-8 md:w-10 md:h-10 text-[#2f4f3e]" />,
    title: "Native Sourcing",
    description:
      "Highest quality raw material from native regions all over India.",
  },
  {
    icon: <Utensils className="w-8 h-8 md:w-10 md:h-10 text-[#2f4f3e]" />,
    title: "Traditional Processing",
    description:
      "Minimally processed using time-tested methods, made better. For maximum nutrition.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#2f4f3e]" />,
    title: "Extensive Quality Checks",
    description:
      "Everything goes through 40+ lab tests, to make sure you get only what is best.",
  },
  {
    icon: <Tractor className="w-8 h-8 md:w-10 md:h-10 text-[#2f4f3e]" />,
    title: "Better Rural Lives",
    description:
      "5000+ farmer families are empowered with every Rajlakshmijaviks product you buy.",
  },
];

const WhyChooseRajlakshmiSection = () => {
  return (
    <section className="bg-[#f4f4f2] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2f4f3e] font-serif leading-tight">
            Why Choose Rajlakshmijaviks?
          </h2>
          <div className="w-20 h-1 bg-[#2f4f3e]/20 mx-auto mt-6 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-transparent transition-all duration-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(47,79,62,0.1)] hover:-translate-y-2 group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white shadow-sm border border-[#2f4f3e]/5 transition-transform duration-500 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2f4f3e] mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRajlakshmiSection;
