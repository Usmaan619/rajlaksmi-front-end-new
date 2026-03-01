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
const optimizeImage = (url: any, width = 1400) => {
  if (!url || typeof url !== "string") return url;
  if (url.includes("res.cloudinary.com")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

const HeroSection: React.FC = () => {
  const [bannerUrls, setBannerUrls] = useState<string[]>(FALLBACK_BANNERS);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    try {
      const res = await getHomeBannerAPI();

      // Axios typically returns response body in res.data
      // My service returns res.data, so res here is the response body
      // If the body is { success: true, data: { ... } }, then:
      const rawData = res?.data || res;

      const urls = [
        rawData?.banner1,
        rawData?.banner2,
        rawData?.banner3,
        rawData?.banner4,
      ].filter((url) => typeof url === "string" && url.length > 0);

      if (urls.length > 0) {
        setBannerUrls(urls);
      } else {
        setBannerUrls(FALLBACK_BANNERS);
      }
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

  const slides = useMemo(
    () =>
      bannerUrls.map((url, index) => ({
        desktop: optimizeImage(url, 1400),
        mobile: optimizeImage(url, 768),
        alt: `Banner ${index + 1}`,
      })),
    [bannerUrls],
  );

  useEffect(() => {
    if (!slides.length) return;
    const img = new Image();
    img.src = slides[0].desktop;
  }, [slides]);

  if (loading) {
    return (
      <section className="w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[1920/650] bg-[#F9F9F9] animate-pulse" />
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <Suspense
        fallback={
          <div className="w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[1920/650] bg-[#F9F9F9] animate-pulse" />
        }
      >
        <div className="relative group">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            infiniteLoop
            autoPlay
            interval={6000}
            transitionTime={800}
            animationHandler="fade"
            swipeable={true}
            emulateTouch={true}
            stopOnHover={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => (
              <li
                className={`inline-block mx-1.5 h-1 md:h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  isSelected
                    ? "bg-[#01722C] w-8 md:w-12 text-[#01722C]"
                    : "bg-black/10 hover:bg-black/20 w-3 md:w-4 text-transparent"
                }`}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            )}
          >
            {slides.map((item, index) => (
              <div
                key={index}
                className="relative aspect-[16/9] sm:aspect-[16/7] md:aspect-[1920/650] overflow-hidden"
              >
                <picture>
                  <source media="(max-width:768px)" srcSet={item.mobile} />
                  <img
                    src={item.desktop}
                    alt={item.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchpriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full object-cover block"
                    onError={(e) => {
                      e.currentTarget.src = banner1Img;
                    }}
                  />
                </picture>
              </div>
            ))}
          </Carousel>

          {/* Bottom decorative fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </div>
      </Suspense>
    </section>
  );
};

export default HeroSection;
