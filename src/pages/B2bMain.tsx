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
import Seo from "@/components/Seo";

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
      <Seo 
        title="B2B & Wholesale Organic Products Supplier India | Rajlakshmi Javiks"
        description="Partner with India's leading B2B supplier of bulk organic groceries, cold-pressed oils, and spices. Premium wholesale organic products with pan-India delivery."
        url="/b2b"
      />
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
              aria-label="Get in touch"
              onClick={scrollToForm}
              className="bg-[#01722C] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get in touch
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
                      title: "24/7 Customer Support/ Care",
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
                  aria-label="Get in touch"
                  onClick={scrollToForm}
                  className="bg-[#01722C] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
                >
                  Get in touch
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

        {/* Wholesale Product Categories Section - SEO Expansion */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-8">
              Our Premium Wholesale Organic Categories
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
              As a leading wholesale organic food supplier in India, Rajlakshmi Javiks offers a comprehensive range of 150+ certified products. Whether you are an organic food distributor, a premium supermarket chain, or a boutique wellness brand looking for bulk organic grocery supplies, our high-quality inventory is ready to meet your exact specifications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-green-50 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">Bulk Organic Grains & Pulses</h3>
                <p className="text-gray-600 leading-relaxed">
                  Source the finest chemical-free organic rice, wheat, ancient millets, and unpolished pulses in bulk. Our grains are sourced directly from traditional organic farming clusters, ensuring high nutritional integrity, perfect moisture content, and long shelf life for retailers and food manufacturers.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">Wholesale Cold-Pressed Oils</h3>
                <p className="text-gray-600 leading-relaxed">
                  We are a premier B2B supplier of Kacchi Ghani cold-pressed mustard oil, groundnut oil, and coconut oil. Extracted at room temperature to preserve vital nutrients and pure aroma, our oils are ideal for Ayurvedic products wholesale buyers, health-conscious restaurants, and premium grocery outlets.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">Organic Spices & Masalas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Elevate your product line with our sun-dried, deeply aromatic organic spices. We supply high-curcumin turmeric, robust cumin, and authentic spice blends in bulk quantities. Perfect for white label organic products, export partners, and premium spice distributors seeking pure, unadulterated quality.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">A2 Bilona Ghee & Dairy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover the authentic taste of tradition with our pure A2 Bilona Ghee, crafted from the milk of grass-fed indigenous cows. Our bulk ghee supply is highly sought after by luxury hotels, Ayurvedic practitioners, and holistic wellness brands requiring the highest standard of purity and nutritional value.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">Premium Dry Fruits & Seeds</h3>
                <p className="text-gray-600 leading-relaxed">
                  Stock your shelves with our premium, sulfur-free dry fruits and nutrient-dense seeds like chia and flax. We provide consistent, reliable bulk supply of these high-demand items, perfectly suited for healthy snack brands, corporate gifting companies, and zero-waste bulk grocery stores.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">Custom & White Label Solutions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Looking to build your own brand? We offer extensive private label organic products manufacturing. From custom packaging to unique product formulations, our state-of-the-art facility handles everything, allowing you to launch your organic food brand with zero manufacturing overhead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-8">
              Who Partners With Us?
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
              <p>
                As a trusted organic products B2B manufacturer, Rajlakshmi Javiks caters to a diverse portfolio of business clients. Our robust pan-India logistics network and strict adherence to FSSAI quality standards make us the preferred partner for businesses that refuse to compromise on quality.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Retailers & Supermarkets:</strong> We provide retail-ready packaged organic groceries that fly off the shelves, backed by our strong brand reputation and attractive wholesale margins.</li>
                <li><strong>Hotels, Restaurants & Cafes (HoReCa):</strong> Top-tier culinary establishments rely on our bulk organic staples—from pristine grains to aromatic cold-pressed oils—to craft exceptional, health-conscious menus for their discerning guests.</li>
                <li><strong>Ayurvedic & Wellness Centers:</strong> Our pure A2 ghee, raw honey, and organic spices are foundational ingredients for Ayurvedic practitioners and wellness retreats focused on holistic healing.</li>
                <li><strong>Exporters & Distributors:</strong> We offer comprehensive support for organic food distributors looking to scale, providing consistent bulk supply, necessary certifications, and seamless B2B transaction processes.</li>
              </ul>
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
                  aria-label="Submit Inquiry"
                  disabled={isSubmitting}
                  className="w-full bg-[#01722C] hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* AEO / SEO FAQ Section */}
        <section className="py-16 px-4 bg-white border-t border-green-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">
              Frequently Asked Questions (B2B & Wholesale)
            </h2>
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">What is the Minimum Order Quantity (MOQ) for wholesale organic products?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our MOQ is highly flexible and depends on the specific product category. For most bulk organic groceries like grains and pulses, the MOQ starts at 50kg. For high-value items like organic spices and A2 Bilona Ghee, we offer lower thresholds to accommodate smaller retail partners and boutique brands. Contact us for a precise quotation based on your needs.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">Do you provide lab testing reports and organic certifications?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolutely. As a premier organic products B2B manufacturer, we maintain absolute transparency. Every batch of our products undergoes rigorous third-party lab testing. We provide comprehensive lab reports, FSSAI certificates, and relevant organic compliance documentation with all wholesale orders to ensure complete peace of mind for you and your customers.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">Do you offer private label organic products (White Labeling)?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, we offer end-to-end private labeling and contract manufacturing services. If you want to launch your own brand of cold-pressed oils, organic spices, or dry fruits, we provide bulk manufacturing, custom packaging, and labeling solutions. This allows you to leverage our established manufacturing infrastructure to scale your brand rapidly.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">How long does pan-India wholesale delivery take?</h3>
                <p className="text-gray-700 leading-relaxed">
                  We boast a highly efficient pan-India logistics network. Depending on your location, standard bulk orders are typically dispatched within 48 hours of order confirmation. Delivery to major metro cities usually takes 3-5 business days, while tier-2 and tier-3 cities may take 5-7 business days. We partner with top-tier logistics providers to ensure your bulk organic supplies arrive safely and on time.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">Can I request product samples before placing a large bulk order?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, we highly encourage prospective B2B partners to request samples. We understand that quality verification is crucial when buying organic groceries in bulk. You can purchase a sample kit covering your categories of interest at a nominal cost, which can be adjusted against your first official wholesale order.
                </p>
              </div>
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
                    <p className="text-gray-600">+91-8769215905, 8769115905 </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100 p-6 flex items-start gap-4 hover:shadow-xl transition-all duration-300">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <Mail size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">
                      contact@rajlakshmijaviks.com
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
                        11, Manish Bag Colony, Near Vikram Tower, Sapna
                        Sangeeta, Indore - 452001 M. P. INDIA
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
