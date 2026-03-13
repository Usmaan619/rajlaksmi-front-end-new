import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBlogs } from "@/api/blog.service";
import { useNavigate } from "react-router-dom";

import productRice from "@/assets/product-rice.jpg";

const CARD_WIDTH = 220; // matches min-w-[220px]
const CARD_GAP = 12; // matches gap-3
const AUTO_SLIDE_INTERVAL = 3000;

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs({ limit: 5 });
        if (res.success) {
          setBlogs(res.blogs);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    if (!isMobile || blogs.length <= 1) return;
    stopAutoSlide();
    autoSlideTimer.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % blogs.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: next * (CARD_WIDTH + CARD_GAP),
            behavior: "smooth",
          });
        }
        return next;
      });
    }, AUTO_SLIDE_INTERVAL);
  }, [isMobile, blogs.length, stopAutoSlide]);

  useEffect(() => {
    if (isMobile && blogs.length > 1) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
    return () => stopAutoSlide();
  }, [isMobile, blogs.length, startAutoSlide, stopAutoSlide]);

  const handleTouchStart = () => stopAutoSlide();

  const handleTouchEnd = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / (CARD_WIDTH + CARD_GAP));
      setCurrentIndex(index);
    }
    setTimeout(() => {
      if (isMobile) startAutoSlide();
    }, 1500);
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * (CARD_WIDTH + CARD_GAP),
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <section className="py-12 md:py-16 overflow-hidden bg-white">
      <div className="mx-auto px-3 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-14 text-center relative flex flex-col items-center">
          <p className="text-[#01722C] font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3">
            The Wisdom of Tradition
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#01722C] tracking-tight">
            Our Stories & Blogs
          </h2>
          <div className="h-1 w-24 bg-[#01722C]/20 mt-6 rounded-full" />
        </div>

        {/* Mobile: Horizontal Scroll with Auto-slide | Tablet/Desktop: Grid */}
        <div
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory
                     md:grid md:grid-cols-3
                     lg:grid-cols-5
                     md:gap-6 md:overflow-visible scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 min-w-[220px] bg-card rounded-[20px] border p-3 space-y-3"
                >
                  <Skeleton className="h-[160px] w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : blogs.map((blog, idx) => (
                <article
                  key={blog.id}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="flex-shrink-0 min-w-[220px] max-w-[220px] md:min-w-0 md:max-w-full snap-start bg-card rounded-[20px] border p-3 flex flex-col shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={blog.image || productRice}
                      alt={blog.title}
                      className="w-full h-[220px] object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge
                      className={`absolute top-2 left-2 bg-forest text-white text-xs font-medium px-3 py-1 rounded-full`}
                    >
                      {blog.category || "Organic"}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 mt-2.5">
                    <h3 className="font-heading font-bold text-base text-foreground mb-1 line-clamp-1">
                      {blog.title}
                    </h3>

                    <p className="text-muted-foreground text-[13px] mb-2 line-clamp-2">
                      {blog.description || "Explore healthy living tips..."}
                    </p>

                    <p className="text-xs text-muted-foreground mb-3">
                      By {blog.author || "Admin"} |{" "}
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString()
                        : "Aug 12, 2026"}
                    </p>

                    <button className="mt-auto text-[#01722C] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
                      Read more about this story
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
        </div>

        {/* Dot Indicators - Mobile only */}
        {isMobile && blogs.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {blogs.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stopAutoSlide();
                  scrollToIndex(i);
                  setTimeout(() => startAutoSlide(), 1500);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-6 h-2 bg-[#01722C]"
                    : "w-2 h-2 bg-[#01722C]/20"
                }`}
              />
            ))}
          </div>
        )}

        {/* Explore All Stories Button - Bottom Center */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/blog")}
            className="bg-white border-2 border-[#01722C] text-[#01722C] px-10 py-3 rounded-md text-sm font-bold hover:bg-[#01722C] hover:text-white transition-all duration-500 shadow-md hover:shadow-lg active:scale-95"
          >
            Explore All Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
