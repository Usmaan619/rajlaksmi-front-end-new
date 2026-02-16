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

const ContactSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-r from-accent/50 to-accent overflow-hidden">
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
                    <p className="text-primary font-semibold text-sm">Phone</p>
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
                    <p className="text-primary font-semibold text-sm">E-mail</p>
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
                <label className="text-foreground/70 text-sm">First Name</label>
                <Input
                  placeholder="Raaj"
                  className="h-12 rounded-lg border-border bg-background"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-foreground/70 text-sm">Last Name</label>
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
                <label className="text-foreground/70 text-sm">Mobile No.</label>
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
  );
};

export default ContactSection;
