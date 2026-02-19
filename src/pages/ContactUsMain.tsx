import {
  Phone,
  Mail,
  Clock,
  Truck,
  HelpCircle,
  ArrowLeftRight,
} from "lucide-react";
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
import farmerIllustration from "@/assets/category/farmer.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormData,
} from "@/validations/contact.validation";
import { createContactAPI } from "@/api/contact.service";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Label = ({ text }: { text: string }) => (
  <label className="text-foreground/70 text-sm">
    {text} <span className="text-red-500">*</span>
  </label>
);

const ContactMainPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setLoading(true);
      await createContactAPI(data);

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
    <>
      <ContactBanner />
      <section className="py-12 lg:py-20 bg-[#F0FFF0] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* LEFT SIDE */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-3">
                  Send Us a Message
                </h2>
                <p className="text-foreground/70 text-sm lg:text-base">
                  Get in touch with us to know more about our products.
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="font-heading text-xl lg:text-2xl font-bold text-primary">
                  Contact Us
                </h3>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+918769115905">+91-87691 15905</a>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:rajlaxmiorganicfoods@gmail.com">
                    rajlaxmiorganicfoods@gmail.com
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <p>Mon - Sat: 10 AM to 8 PM</p>
                </div>
              </div>

              <img
                src={RAJLAXMIJAVIKImg}
                alt="Logo"
                className="w-28 opacity-60"
              />
            </div>

            {/* RIGHT SIDE FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* First + Last */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label text="First Name" />
                  <Input
                    {...register("firstName")}
                    placeholder="Raaj"
                    className="h-12 bg-transparent"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.firstName?.message}
                  </p>
                </div>

                <div>
                  <Label text="Last Name" />
                  <Input
                    {...register("lastName")}
                    placeholder="Sharma"
                    className="h-12 bg-transparent"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>

              {/* Email + Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label text="E-mail" />
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="xxxxxx01@gmail.com"
                    className="h-12 bg-transparent"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.email?.message}
                  </p>
                </div>

                <div>
                  <Label text="Mobile No." />
                  <Input
                    type="tel"
                    {...register("mobile")}
                    placeholder="+91-xxxxx xxxxx"
                    className="h-12 bg-transparent"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.mobile?.message}
                  </p>
                </div>
              </div>

              {/* Query Type */}
              <div>
                <Label text="Select Query Type" />
                <Select onValueChange={(value) => setValue("queryType", value)}>
                  <SelectTrigger className="h-12 bg-transparent">
                    <SelectValue placeholder="Select Query Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Inquiry">
                      General Inquiry
                    </SelectItem>
                    <SelectItem value="Product Inquiry">
                      Product Inquiry
                    </SelectItem>
                    <SelectItem value="Order Related">Order Related</SelectItem>
                    <SelectItem value="Bulk Order">Bulk Order</SelectItem>
                    <SelectItem value="Feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-xs">
                  {errors.queryType?.message}
                </p>
              </div>

              {/* Message */}
              <div>
                <Label text="Message" />
                <Textarea
                  {...register("message")}
                  placeholder="Message"
                  className="min-h-[120px] bg-transparent"
                />
                <p className="text-red-500 text-xs">
                  {errors.message?.message}
                </p>
              </div>

              {/* Button */}
              <Button type="submit" disabled={loading} className="h-12 px-8">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

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
    <section className="w-full bg-[#F0FFF0] py-10 md:py-14 h-[28rem]">
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
