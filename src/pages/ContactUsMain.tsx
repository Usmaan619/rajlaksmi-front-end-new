import { Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RAJLAXMIJAVIKImg from "@/assets/logo/RAJLAXMI-JAVIK-png.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import farmerIllustration from "@/assets/category/farmer.png";
import { Truck, HelpCircle, ArrowLeftRight } from "lucide-react";

const ContactMainPage = () => {
  return (
    <>
      <ContactBanner />
      <section className="py-12 lg:py-20 bg-[#F0FFF0] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-3">
                  Send Us a Message
                </h2>
                <p className="text-foreground/70 text-sm lg:text-base">
                  Get in touch with us to know more about our products, quality
                  process, and how we ensure purity in every batch.
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="font-heading text-xl lg:text-2xl font-bold text-primary">
                  Contact Us
                </h3>

                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary font-semibold text-sm">
                        Phone
                      </p>
                      <a
                        href="tel:+918769115905"
                        className="text-foreground/80 text-sm hover:text-primary transition-colors"
                      >
                        +91-87691 15905
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary font-semibold text-sm">
                        E-mail
                      </p>
                      <a
                        href="mailto:rajlaxmiorganicfoods@gmail.com"
                        className="text-foreground/80 text-sm hover:text-primary transition-colors"
                      >
                        rajlaxmiorganicfoods@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary font-semibold text-sm">
                        Office Hours
                      </p>
                      <p className="text-foreground/80 text-sm">
                        Mon - Sat: 10 AM to 8 PM
                      </p>
                      <p className="text-foreground/80 text-sm">Sun : Close</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo */}
              {/* Logo */}
              <div className="flex justify-center lg:justify-start pt-4">
                <img
                  src={RAJLAXMIJAVIKImg}
                  alt="Rajlaxmi Javik Logo"
                  className="w-20 sm:w-24 lg:w-28 xl:w-32 object-contain opacity-60"
                />
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-foreground/70 text-sm">
                    First Name
                  </label>
                  <Input
                    placeholder="Raaj"
                    className="h-12 rounded-lg border-border bg-background"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-foreground/70 text-sm">
                    Last Name
                  </label>
                  <Input
                    placeholder="Sharma"
                    className="h-12 rounded-lg border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-foreground/70 text-sm">E-mail</label>
                  <Input
                    type="email"
                    placeholder="xxxxxx01@gmail.com"
                    className="h-12 rounded-lg border-border bg-background"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label className="text-foreground/70 text-sm">
                    Mobile No.
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91-xxxxx xxxxx"
                    className="h-12 rounded-lg border-border bg-background"
                  />
                </div>
              </div>

              {/* Query Type */}
              <div className="space-y-2">
                <Select>
                  <SelectTrigger className="h-12 rounded-lg border-border bg-background">
                    <SelectValue placeholder="Select Query Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="product">Product Inquiry</SelectItem>
                    <SelectItem value="order">Order Related</SelectItem>
                    <SelectItem value="bulk">Bulk Order</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-foreground/70 text-sm">Message</label>
                <Textarea
                  placeholder="Message"
                  className="min-h-[120px] rounded-lg border-border bg-background resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 h-12">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <div className="w-full border-0">
        <iframe
          title="map-section"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.756483627257!2d75.86814137476085!3d22.700107428286067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce21e4694af%3A0xa8938712e4fc840d!2sIndore!"
          height="450"
          loading="lazy"
          style={{ width: "100%", border: "0" }}
        ></iframe>
      </div>
      <QuickHelpSection />
    </>
  );
};

export default ContactMainPage;

const ContactBanner = () => {
  return (
    <section className="w-full  overflow-hidden">
      <div className="max-w-[1470px] mx-auto px-4 md:px-10 lg:px-16 py-8 md:py-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Content */}
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-3xl font-bold text-[#0A6A2F] leading-tight">
              Get in Touch with Rajlakshmi Javiks
            </h2>
            <p className="text-sm md:text-lg text-[#0A6A2F] mt-2">
              Whether you need help choosing the right product, tracking your
              order, or understanding our certifications, we’re just a message
              away.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="w-32 md:w-48 lg:w-56 shrink-0">
            <img
              src={farmerIllustration}
              alt="Farmer Illustration"
              className="w-full h-auto object-contain opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const QuickHelpSection = () => {
  const cards = [
    {
      icon: <Truck className="w-6 h-6 text-[#0A6A2F]" />,
      title: "Track Your Order",
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-[#0A6A2F]" />,
      title: "View FAQs",
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6 text-[#0A6A2F]" />,
      title: "Shipping & Returns",
    },
  ];

  return (
    <section className="w-full bg-[#F0FFF0] py-10 md:py-14 mb-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-[#0A6A2F]">
            Need Quick Help?
          </h2>
          <p className="text-sm md:text-base text-[#0A6A2F] mt-1">
            Our team is here to help you
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                py-8
                px-6
                flex
                flex-col
                items-center
                justify-center
                text-center
                gap-4
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
              "
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-[#E6F4EA] flex items-center justify-center">
                {card.icon}
              </div>

              {/* Text + Arrow */}
              <div className="flex items-center gap-2 text-[#0A6A2F] font-medium text-sm md:text-base">
                <span>{card.title}</span>
                <span className="text-lg">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
