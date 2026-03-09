import React from "react";
import img1 from "@/assets/category-ghee.jpg";
import img2 from "@/assets/category-flours.jpg";
import img3 from "@/assets/category-spices.jpg";
import img4 from "@/assets/category-oils.jpg";

const BentoGrid = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px]">
        {/* Large card - spans 2 cols and 2 rows */}
        <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 rounded-2xl md:rounded-3xl overflow-hidden relative group">
          <img
            src={img1}
            alt="Feature 1"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Top middle card */}
        <div className="col-span-1 rounded-2xl md:rounded-3xl overflow-hidden relative group">
          <img
            src={img2}
            alt="Feature 2"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Right tall card - spans 2 rows */}
        <div className="col-span-1 row-span-2 md:col-span-1 md:row-span-2 rounded-2xl md:rounded-3xl overflow-hidden relative group">
          <img
            src={img3}
            alt="Feature 3"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Bottom middle card */}
        <div className="col-span-1 rounded-2xl md:rounded-3xl overflow-hidden relative group">
          <img
            src={img4}
            alt="Feature 4"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
