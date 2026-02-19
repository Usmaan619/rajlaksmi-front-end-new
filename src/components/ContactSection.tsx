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

const ContactSection = () => {
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
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              </div>

              <div>
                <Label text="Mobile No." />
                <Input
                  type="tel"
                  {...register("mobile")}
                  placeholder="+91-xxxxx xxxxx"
                  className="h-12 bg-transparent"
                />
                <p className="text-red-500 text-xs">{errors.mobile?.message}</p>
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
              <p className="text-red-500 text-xs">{errors.message?.message}</p>
            </div>

            {/* Button */}
            <Button type="submit" disabled={loading} className="h-12 px-8">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
