import { useEffect, useState } from "react";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { getAllOffersAPI, Offer } from "@/api/offer.service";
import { Rating } from "react-simple-star-rating";

const AnnouncementBar = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await getAllOffersAPI();
        if (res?.success && res?.data) {
          const activeOffers = res.data.filter((o: Offer) => o.isActive);
          setOffers(activeOffers);
        }
      } catch (err) {
        console.error("Failed to fetch offers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const defaultMessage =
    "Free shipping on order above Rs 1000/- | Fresh batch of A2 Ghee available";
  const items =
    offers.length > 0 ? offers.map((o) => o.offer) : [defaultMessage];

  return (
    <div className="bg-[#01722C] text-white py-1.5 border-b border-white/10 overflow-hidden block">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
        {/* Top Row (Mobile) / Left Section (Desktop) */}
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 sm:gap-4 shrink-0">
          {/* Contact Info */}
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] lg:text-xs font-semibold">
            <div className="flex items-center gap-1 sm:gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer">
              <FiPhoneCall className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-400" />
              <a href="tel:+918769215905">+91-87692 15905</a>
            </div>
            <div className="h-3 w-[1px] bg-white/30" />
            <div className="flex items-center gap-1 sm:gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer">
              <FiMail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-400" />
              <a
                href="mailto:contact@rajlakshmijaviks.com"
                className="hidden sm:block"
              >
                contact@rajlakshmijaviks.com
              </a>
              <a
                href="mailto:contact@rajlakshmijaviks.com"
                className="sm:hidden"
              >
                Email
              </a>
            </div>
          </div>

          {/* Social Icons (Mobile Only here) */}
          <div className="flex sm:hidden items-center gap-2">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Facebook size={12} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Instagram size={12} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Youtube size={12} />
            </a>
          </div>
        </div>

        {/* Center Section - Dynamic Offer Slider */}
        <div className="w-full sm:flex-1 min-w-0 sm:min-w-[250px] flex items-center justify-center overflow-hidden border-t border-white/10 sm:border-none pt-1 sm:pt-0">
          <div className="relative w-full max-w-[420px] overflow-hidden group">
            <div className="flex items-center gap-8 sm:gap-10 whitespace-nowrap animate-offerTicker transition-all duration-300">
              {/* First Track */}
              <div className="flex items-center gap-8 sm:gap-10">
                {items.map((text, i) => (
                  <span
                    key={`orig-${i}`}
                    className="text-[10px] sm:text-[12px] lg:text-[13px] font-bold tracking-wide uppercase"
                  >
                    {text}
                  </span>
                ))}
              </div>
              {/* Duplicate Track for Seamless Loop */}
              <div className="flex items-center gap-8 sm:gap-10">
                {items.map((text, i) => (
                  <span
                    key={`dup-${i}`}
                    className="text-[10px] sm:text-[12px] lg:text-[13px] font-bold tracking-wide uppercase"
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Ratings & Social (Desktop Only) */}
        <div className="hidden sm:flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2">
            <Rating
              initialValue={4.3}
              readonly
              size={14}
              allowFraction
              fillColor="gold"
              emptyColor="#fff"
              SVGstyle={{ display: "inline-block" }}
            />

            <span className="text-[11px] lg:text-xs font-bold leading-none">
              4.3/5 Rating
            </span>
          </div>

          <div className="h-3 w-[1px] bg-white/30" />

          <div className="flex items-center gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="facebook"
              href="https://www.facebook.com/rajendrarajlakshmijaviksinternational/"
              className="hover:text-yellow-400 transition-colors"
            >
              <Facebook size={14} />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="instagram"
              href="https://www.instagram.com/rajlaxmiorganic_/reel/DHGQBxksIxQ/"
              className="hover:text-yellow-400 transition-colors"
            >
              <Instagram size={14} />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="youtube"
              href="https://www.youtube.com/@rajlakshmijaviks"
              className="hover:text-yellow-400 transition-colors"
            >
              <Youtube size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes offerTicker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-offerTicker {
          animation: offerTicker 6s linear infinite;
        }
        .group:hover .animate-offerTicker {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
