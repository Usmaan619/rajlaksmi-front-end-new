import {
  Phone,
  Mail,
  Clock,
  Truck,
  HelpCircle,
  ArrowLeftRight,
} from "lucide-react";
import { Link } from "react-router-dom";
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
import Seo from "@/components/Seo";

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
      <Seo
        title="Contact Us | Rajlakshmi Javiks International — Organic Food Enquiries, Wholesale & Support"
        description="Contact Rajlakshmi Javiks International for organic food product enquiries, bulk wholesale orders, B2B pricing, order tracking, and customer support. Based in Indore, MP. Call +91-8769215905 or email us. PAN India organic food delivery."
        url="/contact"
      />
      <h1 className="sr-only">
        Contact Rajlakshmi Javiks International — Organic Food Company in Indore, Madhya Pradesh. Reach us for product enquiries, A2 Gir Cow Bilona Ghee orders, bulk organic food purchasing, wholesale pricing, certification details, delivery support, and B2B partnerships.
      </h1>
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
                <p className="text-foreground/70 text-sm lg:text-base leading-relaxed">
                  Have a question about our <Link to="/categories" className="text-green-700 hover:underline">organic food products</Link>, <Link to="/products?category=OILS+%26+GHEE" className="text-green-700 hover:underline">A2 Gir Cow Bilona Ghee</Link>, <Link to="/products?category=OILS+%26+GHEE" className="text-green-700 hover:underline">cold-pressed oils</Link>, or <Link to="/b2b" className="text-green-700 hover:underline">bulk order pricing</Link>? Need help tracking an order or understanding our <Link to="/certifications" className="text-green-700 hover:underline">FSSAI certifications</Link>? Fill out the form below and our team will respond within 24 hours (Mon-Sat, 10 AM to 8 PM IST).
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="font-heading text-xl lg:text-2xl font-bold text-primary">
                  Contact Us
                </h3>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+918769215905"> +91-8769215905, 8769115905</a>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:contact@rajlakshmijaviks.com">
                    contact@rajlakshmijaviks.com
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
                    placeholder="First Name"
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
                    placeholder="Last Name"
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
                    placeholder="E-mail"
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
                    placeholder="Mobile No."
                    className="h-12 bg-transparent"
                  />
                  <p className="text-red-500 text-xs">
                    {errors.mobile?.message}
                  </p>
                </div>
              </div>

              {/* Query Type */}
              <div>
                <Label
                  aria-label="Select Query Type"
                  text="Select Query Type"
                />
                <Select
                  aria-label="Select Query Type"
                  onValueChange={(value) => setValue("queryType", value)}
                >
                  <SelectTrigger
                    aria-label="Select Query Type"
                    className="h-12 bg-transparent"
                  >
                    <SelectValue
                      aria-label="Select Query Type"
                      placeholder="Select Query Type"
                    />
                  </SelectTrigger>
                  <SelectContent aria-label="Select Query Type">
                    <SelectItem
                      aria-label="Select Query Type"
                      value="General Inquiry"
                    >
                      General Inquiry
                    </SelectItem>
                    <SelectItem
                      aria-label="Select Query Type"
                      value="Product Inquiry"
                    >
                      Product Inquiry
                    </SelectItem>
                    <SelectItem
                      aria-label="Select Query Type"
                      value="Order Related"
                    >
                      Order Related
                    </SelectItem>
                    <SelectItem
                      aria-label="Select Query Type"
                      value="Bulk Order"
                    >
                      Bulk Order
                    </SelectItem>
                    <SelectItem aria-label="Select Query Type" value="Feedback">
                      Feedback
                    </SelectItem>
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
              <Button
                aria-label="Send Message"
                type="submit"
                disabled={loading}
                className="h-12 px-8"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Locations & Map Section for Local SEO */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Visit Our Offices
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We proudly operate pan-India with our state-of-the-art manufacturing unit in Pune and our corporate headquarters strategically located in Indore.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-green-100 min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.756483627257!2d75.86814137476085!3d22.700107428286067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce21e4694af%3A0xa8938712e4fc840d!2s11%2C%20Manish%20Baag%20Colony%2C%20Navlakha%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1731327925359!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rajlakshmi Javiks Corporate Office Location Map"
              ></iframe>
            </div>

            {/* Address Details */}
            <div className="bg-gradient-to-br from-[#E6F4EA] to-white rounded-2xl shadow-md border border-green-100 p-8 flex flex-col justify-center space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">Corporate Headquarters</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  11, Manish Bag Colony,<br />
                  Near Vikram Tower, Sapna Sangeeta,<br />
                  Indore - 452001, Madhya Pradesh, INDIA
                </p>
              </div>
              
              <hr className="border-green-200" />
              
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">Manufacturing Unit</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  S No 174, Near Gaytri Mandir,<br />
                  Behind Kanchan Stone DTC, Alankapuram Road Wadmukh,<br />
                  Alandi Rural, Pune - 412105, Maharashtra, INDIA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO / SEO FAQ Section */}
      <section className="py-16 px-4 bg-[#F0FFF0] border-t border-b border-green-100">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Support Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Quick answers to the most common queries we receive.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">How quickly do you respond to customer support emails?</h3>
              <p className="text-gray-700 leading-relaxed">
                Our dedicated customer service team operates Monday through Saturday, from 10 AM to 8 PM IST. Any email sent to contact@rajlakshmijaviks.com or inquiry submitted through the form above is typically answered within 24 hours during standard business days.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">How can I track my recent organic food order?</h3>
              <p className="text-gray-700 leading-relaxed">
                Once your order is successfully dispatched from our fulfillment center, you will receive an automated email and SMS containing your unique tracking link and courier details. You can also log into your 'Profile' section on our website to view real-time status updates for all your past and current purchases.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Who should I contact for B2B wholesale pricing and bulk partnerships?</h3>
              <p className="text-gray-700 leading-relaxed">
                If you are a supermarket, distributor, or wellness brand looking for bulk organic products, please select "Bulk Order" as your Query Type in the contact form above. Alternatively, you can visit our dedicated B2B page to submit a specialized wholesale inquiry, and our corporate sales manager will reach out to you with custom pricing.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-3">Do you accept returns or exchanges for damaged products?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes. We stand firmly by the premium quality of our organic products. If you receive a damaged, tampered, or incorrect item, please contact our support team at +91-8769215905 within 48 hours of delivery. Kindly attach a photograph of the damaged product in your email, and we will promptly initiate a replacement or refund as per our Return Policy.
              </p>
            </div>
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
    <section className="w-full bg-gradient-to-r from-[#E6F4EA] to-white overflow-hidden">
      <div className="max-w-[1470px] mx-auto px-4 md:px-10 lg:px-16 py-12 md:py-16 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Content */}
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A6A2F] leading-tight mb-4">
              Get in Touch with Rajlakshmi Javiks International
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              We are deeply committed to bringing you the purest, highest-quality <Link to="/certifications" className="text-green-700 hover:underline">certified organic food products</Link> directly from trusted Indian farms. Whether you need expert guidance choosing the right Ayurvedic staples, require support tracking your recent <Link to="/b2b" className="text-green-700 hover:underline">bulk order</Link>, or wish to understand more about our rigorous FSSAI and organic certifications, our dedicated support team is always just a message away.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              As a premier organic food manufacturer and <Link to="/b2b" className="text-green-700 hover:underline">B2B distributor</Link> based in Indore, Madhya Pradesh, we prioritize clear communication and exceptional customer service. Reach out to us today to experience the authentic taste of tradition backed by modern reliability.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="w-40 md:w-64 lg:w-80 shrink-0">
            <img
              src={farmerIllustration}
              alt="Farmer Illustration"
              className="w-full h-auto object-contain drop-shadow-md"
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
    <section className="w-full bg-white py-10 md:py-16 mb-16">
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
