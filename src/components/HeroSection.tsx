import React, { useState, useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1Img from "@/assets/banner-main-page/banner2.png";
import banner2Img from "@/assets/banner-main-page/banner1.png";

const FALLBACK_BANNERS = [banner1Img, banner2Img];

const HeroSection: React.FC = () => {
  const [bannerUrls] = useState<string[]>(FALLBACK_BANNERS);

  const slides = useMemo(
    () =>
      bannerUrls.map((url, index) => ({
        image: url,
        alt: `Banner ${index + 1}`,
      })),
    [bannerUrls],
  );

  return (
    <section className="relative overflow-hidden">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={6000}
        transitionTime={800}
        animationHandler="fade"
        swipeable
        emulateTouch
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <picture>
              <source media="(max-width:768px)" srcSet={slide.image} />

              <img
                src={slide.image}
                alt={slide.alt}
                className="
          w-full
          object-cover hero-image
        "
              />
            </picture>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;
