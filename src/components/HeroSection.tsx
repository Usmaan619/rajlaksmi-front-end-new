import React, { useState, useEffect, useMemo, useCallback } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1Img from "@/assets/banner-main-page/banner2.png";
import banner2Img from "@/assets/banner-main-page/banner1.png";

import { getHomeBannerAPI } from "@/api/contact.service";
import { Carousel } from "react-responsive-carousel";

/* =========================
   FALLBACK
========================= */
const FALLBACK_BANNERS = [banner1Img, banner2Img];

/* =========================
   CLOUDINARY OPTIMIZER
========================= */
const optimizeImage = (url: string, width = 1905) => {
  if (!url) return "";
  if (url.includes("res.cloudinary.com")) {
    // Ensuring we use the requested width for optimization
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

const HeroSection: React.FC = () => {
  const [bannerUrls, setBannerUrls] = useState<string[]>(FALLBACK_BANNERS);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH BANNERS
  ========================= */
  const fetchBanners = useCallback(async () => {
    try {
      const res = await getHomeBannerAPI();
      const rawData = res?.data || res;

      const urls = [
        rawData?.banner1,
        rawData?.banner2,
        rawData?.banner3,
        rawData?.banner4,
      ].filter(Boolean);

      setBannerUrls(urls.length ? urls : FALLBACK_BANNERS);
    } catch (error) {
      console.error("Banner fetch error:", error);
      setBannerUrls(FALLBACK_BANNERS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  /* =========================
     SLIDES
  ========================= */
  const slides = useMemo(
    () =>
      bannerUrls.map((url, index) => ({
        desktop: optimizeImage(url, 1905),
        mobile: optimizeImage(url, 768),
        alt: `Banner ${index + 1}`,
      })),
    [bannerUrls],
  );

  /* =========================
     PRELOAD FIRST IMAGE
  ========================= */
  useEffect(() => {
    if (!slides.length) return;

    const img = new Image();
    img.src = slides[0].desktop;
  }, [slides]);

  /* =========================
     SKELETON
  ========================= */
  if (loading) {
    return (
      <section className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[1905/550] bg-gray-100 animate-pulse" />
    );
  }

  /* =========================
     MAIN
  ========================= */
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="relative w-full">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          infiniteLoop
          autoPlay
          interval={6000}
          transitionTime={700}
          swipeable
          emulateTouch
          stopOnHover={false}
          className="main-carousel"
          // renderIndicator={(onClickHandler, isSelected, index, label) => (
          //   <li
          //     className="inline-block mx-1 py-3 cursor-pointer group"
          //     onClick={onClickHandler}
          //     onKeyDown={(e) => {
          //       if (e.key === "Enter" || e.key === " ") {
          //         onClickHandler(e as any);
          //       }
          //     }}
          //     key={index}
          //     role="button"
          //     tabIndex={0}
          //     aria-label={`${label} ${index + 1}`}
          //   >
          //     <div
          //       className={`rounded-full transition-all duration-500
          //       ${
          //         isSelected
          //           ? "bg-[#01722C] w-6 md:w-8 h-2 md:h-2.5"
          //           : "bg-black/20 group-hover:bg-black/30 w-2 md:w-3 h-2"
          //       }`}
          //     />
          //   </li>
          // )}
          renderIndicator={(onClickHandler, isSelected, index, label) => (
            <li key={index} className="inline-block mx-1 py-4">
              <button
                type="button"
                onClick={onClickHandler}
                aria-label={`${label} ${index + 1}`}
                className="cursor-pointer group focus:outline-none"
              >
                <span
                  className={`rounded-full transition-all duration-700 block
        ${
          isSelected
            ? "bg-primary w-10 md:w-14 h-1.5 md:h-2"
            : "bg-primary/20 group-hover:bg-primary/40 w-2 md:w-3 h-1.5 md:h-2"
        }`}
                />
              </button>
            </li>
          )}
        >
          {slides.map((item, index) => (
            <div key={index} className="relative w-full h-full overflow-hidden">
              <picture className="w-full h-full">
                {/* Mobile */}
                <source media="(max-width:768px)" srcSet={item.mobile} />
                {/* Desktop */}
                <img
                  src={item.desktop}
                  alt={item.alt}
                  width="1905"
                  height="550"
                  loading="eager"
                  // @ts-ignore - fetchpriority is the native attribute name
                  fetchpriority="high"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[6s] ease-linear scale-100 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_BANNERS[0];
                  }}
                />
              </picture>
            </div>
          ))}
        </Carousel>

        {/* bottom gradient decoration - transitioning to the new off-white background */}
        <div className="absolute inset-x-0 bottom-0 h-16 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
