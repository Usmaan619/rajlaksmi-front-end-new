import React, { useState } from "react";
import {
  CheckCircle,
  Download,
  Phone,
  FlaskConical,
  Microscope,
  ClipboardCheck,
  FileCheck,
  Award,
} from "lucide-react";
import WhyChooseRajlakshmiSection from "@/components/WhyChooseRajlakshmiSection";

const LabReportsPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "Are all products lab tested?",
      answer:
        "Yes, all our products undergo rigorous lab testing to ensure purity and quality before reaching our customers.",
    },
    {
      question: "Can I view a lab report for a product?",
      answer:
        "Absolutely! Lab reports are available for download on each product page, or you can request them from our customer support team.",
    },
    {
      question: "Do lab results vary by batch?",
      answer:
        "Each batch is tested individually to maintain consistent quality standards. Reports are batch-specific and available upon request.",
    },
    {
      question: "Are lab reports updated regularly?",
      answer:
        "Yes, we conduct regular testing for each production batch and update reports accordingly to ensure transparency.",
    },
    {
      question: "Do you offer home delivery?",
      answer:
        "Yes, we offer home delivery across India. Orders are typically delivered within 5-10 working days.",
    },
    {
      question: "What testing methods do you accept?",
      answer:
        "We use internationally recognized testing methods including FSSAI, NABL-accredited labs, and follow ISO standards for quality assurance.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 px-4  to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
              Lab Reports & Quality Testing
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Your Trust, Our Responsibility
            </p>
          </div>
        </div>
      </section>
      <WhyChooseRajlakshmiSection />

      {/* What Do Our Lab Reports Cover */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                What Do Our Lab Reports Cover?
              </h2>

              <div className="space-y-4">
                {[
                  {
                    icon: <CheckCircle size={20} className="text-white" />,
                    text: "Pesticide residue analysis",
                  },
                  {
                    icon: <CheckCircle size={20} className="text-white" />,
                    text: "Heavy metals testing",
                  },
                  {
                    icon: <CheckCircle size={20} className="text-white" />,
                    text: "Microbial safety checks",
                  },
                  {
                    icon: <CheckCircle size={20} className="text-white" />,
                    text: "Moisture content analysis",
                  },
                  {
                    icon: <CheckCircle size={20} className="text-white" />,
                    text: "Purity and contamination assessment",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-green-600 rounded-full p-1 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 text-sm mt-6 leading-relaxed">
                These tests help ensure that our products are tested for safe
                consumption, but they don't harm the nutrients.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download Report
                </button>
                <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone size={20} />
                  Contact Support
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581093458791-9d42e2e8c1c1?w=600&h=700&fit=crop"
                alt="Lab scientist testing"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-12">
            Testing Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                number: "1",
                icon: <FlaskConical size={32} />,
                title: "Sample Collection",
                desc: "Raw materials are collected for testing",
              },
              {
                number: "2",
                icon: <Microscope size={32} />,
                title: "Laboratory Analysis",
                desc: "Samples undergo detailed lab testing",
              },
              {
                number: "3",
                icon: <ClipboardCheck size={32} />,
                title: "Quality Verification",
                desc: "Results are verified against standards",
              },
              {
                number: "4",
                icon: <FileCheck size={32} />,
                title: "Report Generation",
                desc: "Comprehensive lab report is generated",
              },
              {
                number: "5",
                icon: <Award size={32} />,
                title: "Certification",
                desc: "Products are certified and approved",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-green-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {step.number}
                </div>
                <div className="text-green-600 flex justify-center mb-3">
                  {step.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-sm mt-8">
            This ensures that every batch of every quality product will
            safeguard our customers' trust.
          </p>
        </div>
      </section>

      {/* Testing Authority & Standards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 row-span-2">
                <img
                  src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=500&fit=crop"
                  alt="Organic grains"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&h=240&fit=crop"
                  alt="Spices in bowls"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1599909533854-e2cd6c3d3ea0?w=400&h=240&fit=crop"
                  alt="Organic products"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800">
                Testing Authority & Standards
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Tested By Accredited Certifying Agencies
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>FSSAI-licensed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>NABL-accredited labs for unbiased testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>
                        Third-party audits to guarantee transparency and
                        credibility apart from internal inspection
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Batch-Wise Testing Policy
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>
                        Every production batch is tested in-house and by
                        third-party labs before distribution
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>
                        Ensures traceability and accountability throughout the
                        supply chain for quality assurance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-green-600 mt-1 flex-shrink-0"
                      />
                      <span>
                        Each batch lab report can be viewed by customers via
                        unique QR code in packaging
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Our reports comply with industry quality benchmarks set by
                  national and international agencies, including Food Safety and
                  Standards Authority of India (FSSAI). Additional batch
                  certifications in regulatory research regulations align us
                  with Global Organic Textile Standards (GOTS) certification,
                  where applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-12">
            Frequently Asked Questions (Lab Reports)
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-green-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-green-600 transition-transform flex-shrink-0 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-green-50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Have Questions About Our Lab Reports?
          </h2>
          <p className="text-green-50 mb-8">
            Our team is here to help you understand our quality testing process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <Download size={20} />
              Download Sample Report
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Phone size={20} />
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabReportsPage;
