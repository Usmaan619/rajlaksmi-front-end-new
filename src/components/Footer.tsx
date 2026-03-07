import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MailCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import footerBg from "@/assets/ourproductwithcategory/ourProductWithCategory.png";
import logo from "@/assets/logo/RAJLAXMI-JAVIK-png.png";
import {
  newsLatterFormData,
  newsLatterSchema,
} from "@/validations/contact.validation";
import { createNewsletterAPI, NewsletterPayload } from "@/api/contact.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<newsLatterFormData>({
    resolver: zodResolver(newsLatterSchema),
  });

  const onSubmit = async (data: NewsletterPayload) => {
    try {
      setLoading(true);
      await createNewsletterAPI(data);

      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you soon.",
      });
      reset();
    } catch (error: any) {
      toast({
        title: error.message || "Failed to send message",
        description: "We'll get back to you soon.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative ">
      {/* Floating Newsletter */}
      <div className="absolute -top-8 md:-top-16 left-0 right-0 max-w-6xl mx-auto px-4 z-20">
        <div className="bg-[#f4b42b] rounded-2xl px-5 py-5 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-center md:text-left">
            <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
              Newsletter
            </p>
            <h3 className="text-white text-lg md:text-2xl lg:text-3xl font-bold leading-tight">
              Subscribe to our newsletter
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full md:w-auto items-center overflow-hidden rounded-full border border-white/20 bg-white shadow-inner"
          >
            <Input
              type="email"
              placeholder="Your E-mail"
              {...register("email")}
              className="h-10 md:h-12 w-full md:w-64 lg:w-72 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-sm"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-10 md:h-12 px-5 md:px-8 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-none font-medium text-xs md:text-sm transition-colors"
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div
        className="
          relative
          text-white
          pt-28 md:pt-32 
          bg-slate-900
          bg-no-repeat
          bg-bottom
        "
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: "100% auto",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/75" />

        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <img src={logo} alt="logo" className="w-32 sm:w-40 mb-4" />
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-center sm:text-left">
                Contact Info
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Call us at</p>
                    <p className="text-white/80">+91-8769215905, 8769115905</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Email us at</p>
                    <p className="text-white/80">contact@rajlakshmijaviks.com</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Our Address</p>
                    <p className="text-white/80 leading-relaxed">
                      11, Manish Bag Colony, Near Vikram Tower, Sapna Sangeeta,
                      Indore - 452001 M. P. INDIA
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Our Site + Categories */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-2 gap-8">
                {/* Our Site */}
                <div>
                  <h4 className="text-xl font-semibold mb-6">Our Site</h4>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/certifications">Certifications</Link>
                    </li>
                    <li>
                      <Link to="/track-order">Track Order</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQs</Link>
                    </li>
                    <li>
                      <Link to="/lab-report">Lab Report</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blogs</Link>
                    </li>
                  </ul>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xl font-semibold mb-6">Categories</h4>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li>
                      <Link to="/categories?category=OILS%20%26%20GHEE">Ghee & Oil</Link>
                    </li>
                    <li>
                      <Link to="/categories?category=DRY%20FRUITS">Dry Fruits</Link>
                    </li>
                    <li>
                      <Link to="/categories?category=PULSES">Pulses & Grains</Link>
                    </li>
                    <li>
                      <Link to="/categories?category=SEEDS">Seeds</Link>
                    </li>
                    <li>
                      <Link to="/categories?category=MASALA">Spices</Link>
                    </li>
                    <li>
                      <Link to="/categories?category=MASALA">Spices & Flours</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/shipping">Shipping Policy</Link>
              <Link to="/returns">Return Policy</Link>
            </div>

            <div className="flex items-center gap-3">
              <span>Follow Us</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Facebook size={16} />
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Instagram size={16} />
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Youtube size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-white/60">
            <p>Copyright 2026 © Rajlakshmi Javiks International</p>
            <p>
              Web Design by <span className="text-white">11_Future_Tech</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
