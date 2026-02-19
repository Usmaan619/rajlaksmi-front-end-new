import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Building2,
  Globe,
  Users,
  Award,
  Package,
  TrendingUp,
  Shield,
  FileText,
  Calculator,
  CircleCheckBig,
  Truck,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { B2BFormData, createB2BInquiryAPI } from "@/api/contact.service";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { b2bInquirySchema } from "@/validations/contact.validation";

const B2BMainPage = () => {
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<B2BFormData>({
    resolver: zodResolver(b2bInquirySchema),
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onSubmit = async (data: B2BFormData) => {
    try {
      const response = await createB2BInquiryAPI(data);

      if (response?.success) {
        toast({
          title: "Message Sent Successfully",
          description: "We'll get back to you soon.",
        });
        reset();
      } else {
        toast({
          title: "Submission Failed",
          description: "Please try again.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              B2B & Wholesale Partnership
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Partner with Rajlakshmi Javiks for bulk and wholesale organic
              products. Ethical sourcing and pan-India supply.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-[#01722C] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get a Free Quote
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg border border-green-100 p-8">
                <div className="space-y-6">
                  {[
                    ["Active Partners", "500+"],
                    ["Product Range", "150+"],
                    ["Years in Business", "20+"],
                    ["Satisfaction Rate", "98%"],
                  ].map(([label, value], i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border-b border-green-100 pb-4 last:border-0"
                    >
                      <span className="text-gray-700 font-medium">{label}</span>
                      <span className="text-2xl font-bold text-green-600">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Text */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-green-800">
                  About Our B2B Program
                </h2>

                <p className="text-gray-600 text-base leading-relaxed">
                  Our B2B partnership program empowers retailers, wholesalers,
                  distributors, and corporate clients with premium products and
                  flexible pricing.
                </p>

                <p className="text-gray-600 text-base leading-relaxed">
                  We serve supermarkets, gyms, spas, Ayurvedic stores, online
                  sellers, and export partners across India.
                </p>

                <hr className="border-green-200 my-6" />

                <div className="space-y-4">
                  {[
                    {
                      icon: <Building2 size={24} color="#29A44F" />,
                      title: "Established Network",
                      desc: "500+ active partners across India",
                    },
                    {
                      icon: <Users size={24} color="#29A44F" />,
                      title: "24/7 Personal Care",
                      desc: "Account manager for every partner",
                    },
                    {
                      icon: <Globe size={24} color="#29A44F" />,
                      title: "Pan-India Reach",
                      desc: "Fast logistics nationwide",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-green-50 p-3 rounded-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={scrollToForm}
                  className="bg-[#01722C] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">
              Why Partner With Rajlakshmi Javiks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Award size={32} strokeWidth={1.5} />,
                  title: "Consistent Quality",
                  description:
                    "Premium, lab-tested, high-demand products that your customers trust and love.",
                },
                {
                  icon: <Package size={32} strokeWidth={1.5} />,
                  title: "Reliable Bulk Supply",
                  description:
                    "Fast fulfillment and dependable stock availability for uninterrupted business operations.",
                },
                {
                  icon: <TrendingUp size={32} strokeWidth={1.5} />,
                  title: "Competitive Margins",
                  description:
                    "Wholesale pricing with flexible payment terms and volume-based discounts.",
                },
                {
                  icon: <Shield size={32} strokeWidth={1.5} />,
                  title: "Trusted Brand",
                  description:
                    "Strong customer loyalty and repeat sales backed by Rajlakshmi Javiks's reputation.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-green-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
              How Our B2B Process Works
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Start your journey in 4 simple steps
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FileText size={32} strokeWidth={1.5} />,
                  title: "Submit Inquiry",
                  description:
                    "Fill out our partnership form with your business details and requirements.",
                },
                {
                  icon: <Calculator size={32} strokeWidth={1.5} />,
                  title: "Get Custom Quote",
                  description:
                    "Receive personalized pricing based on your volume and product selection.",
                },
                {
                  icon: <CircleCheckBig size={32} strokeWidth={1.5} />,
                  title: "Approve & Place Order",
                  description:
                    "Review terms, approve the quotation, and confirm your bulk order.",
                },
                {
                  icon: <Truck size={32} strokeWidth={1.5} />,
                  title: "Packaging & Dispatch",
                  description:
                    "We ensure secure packaging and timely delivery to your location.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-green-600">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Inquiry Form */}
        <section
          ref={formRef}
          className="py-16 px-4 bg-gradient-to-br from-green-50 to-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
                  Get a Wholesale Quote
                </h2>
                <p className="text-gray-600">
                  Fill in your details and we'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      {...register("fullName", {
                        required: "Full Name is required",
                      })}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Business Name*
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      {...register("businessName", {
                        required: "Business Name is required",
                      })}
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Enter valid 10-digit mobile number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Business Type*
                    </label>
                    <select
                      className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      {...register("businessType", {
                        required: "Business Type is required",
                      })}
                    >
                      <option value="">Select business type</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="distributor">Distributor</option>
                      <option value="retailer">Retailer</option>
                      <option value="wholesaler">Wholesaler</option>
                    </select>
                    {errors.businessType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Monthly Bulk Requirement
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      {...register("bulkRequirement")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                    {...register("message")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#01722C] hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-white mb-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">
              Contact Us
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-green-100 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.756483627257!2d75.86814137476085!3d22.700107428286067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce21e4694af%3A0xa8938712e4fc840d!2s11%2C%20Manish%20Baag%20Colony%2C%20Navlakha%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1731327925359!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100 p-6 flex items-start gap-4 hover:shadow-xl transition-all duration-300">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <Phone size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
                    <p className="text-gray-600">+91 8769115905</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100 p-6 flex items-start gap-4 hover:shadow-xl transition-all duration-300">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <Mail size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">
                      rajlaxmiorganicfoods@gmail.com
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100 p-6 flex items-start gap-4 hover:shadow-xl transition-all duration-300">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <Clock size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Office Hours
                    </h3>
                    <p className="text-gray-600">Mon - Sat: 10 AM to 8 PM</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100 p-6">
                  <h3 className="font-bold text-gray-800 mb-4">
                    Find Us on the Map
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">
                        Manufacturing Unit
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        S No 174, Near Gaytri Mandir, Behind Kanchan Stone DTC,
                        Alankapuram Road Wadmukh, Alandi Rural, Pune,
                        Maharashtra - 412105
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">
                        Corporate Office
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        11 Manish Baag, Sapna Sangeeta Road, Indore, Madhya
                        Pradesh 452001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default B2BMainPage;
