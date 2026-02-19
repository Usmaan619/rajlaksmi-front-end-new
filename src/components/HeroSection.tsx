import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1Img from "@/assets/banner-main-page/banner2.png";
import banner2Img from "@/assets/banner-main-page/banner1.png";

import { getHomeBannerAPI } from "@/api/contact.service";

/* =========================
   LAZY LOAD CAROUSEL
========================= */
const Carousel = lazy(() =>
  import("react-responsive-carousel").then((mod) => ({
    default: mod.Carousel,
  })),
);

/* =========================
   FALLBACK
========================= */
const FALLBACK_BANNERS = [banner1Img, banner2Img];

/* =========================
   CLOUDINARY OPTIMIZER
========================= */
const optimizeImage = (url: string, width = 1400) => {
  if (!url) return "";
  if (url.includes("res.cloudinary.com")) {
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

      const urls = [
        res?.banner1,
        res?.banner2,
        res?.banner3,
        res?.banner4,
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
        desktop: optimizeImage(url, 1400),
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
     SKELETON (NO CLS)
  ========================= */
  if (loading || !slides.length) {
    return (
      <section className="w-full h-[220px] md:h-[420px] bg-gray-100 animate-pulse" />
    );
  }

  return (
    <section className="relative overflow-hidden">
      <Suspense
        fallback={
          <div className="w-full h-[220px] md:h-[420px] bg-gray-100 animate-pulse" />
        }
      >
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          infiniteLoop
          autoPlay
          interval={6500}
          transitionTime={600}
          animationHandler="fade"
          swipeable={false}
          emulateTouch={false}
          stopOnHover={false}
        >
          {slides.map((item, index) => (
            <div key={item.alt}>
              <picture>
                <source media="(max-width:768px)" srcSet={item.mobile} />

                <img
                  src={item.desktop}
                  alt={item.alt}
                  width="1262"
                  height="508"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="w-full object-cover hero-image"
                  onError={(e) => {
                    e.currentTarget.src = banner1Img;
                  }}
                />
              </picture>
            </div>
          ))}
        </Carousel>
      </Suspense>
    </section>
  );
};

export default HeroSection;
