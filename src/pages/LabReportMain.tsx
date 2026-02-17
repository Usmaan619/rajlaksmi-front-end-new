import React, { useState } from "react";
import {
  CheckCircle,
  Download,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import labrepotImage from "@/assets/labreport/labreport.png";
import farmerImage from "@/assets/WhyChooseRajlakshmiSection/1.png";
import teamImage from "@/assets/WhyChooseRajlakshmiSection/2.png";
import farmerBgImg from "@/assets/aboutus/aboutusbgfarmerImg.png";

import pesticideImg from "@/assets/labreport/1.png";
import metalImg from "@/assets/labreport/2.png";
import microbeImg from "@/assets/labreport/3.png";
import moistureImg from "@/assets/labreport/4.png";
import purityImg from "@/assets/labreport/5.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LabReportsPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      title: "Lab Report Questions",
      faqs: [
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
      ],
    },
  ];

  const steps = [
    { number: "1", desc: "Raw materials are sourced from trusted farms" },
    { number: "2", desc: "Samples are collected batch-wise" },
    {
      number: "3",
      desc: "Testing is conducted in certified laboratories",
      highlight: true,
    },
    { number: "4", desc: "Reports are reviewed by our quality team" },
    { number: "5", desc: "Approved batches are processed and packed" },
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
      <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
        {/* Background decorative image */}
        <img
          src={farmerBgImg}
          alt="farmer background"
          className="
          absolute
          bottom-0
          right-0
          w-[140px]
          sm:w-[200px]
          lg:w-[360px]
          h-auto
          object-contain
          opacity-60
          pointer-events-none
          select-none
        "
        />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Overlapping Images */}
            <div className="relative w-full max-w-xl mx-auto h-[320px] sm:h-[380px] lg:h-[420px]">
              {/* Team image - back */}
              <div className="absolute top-0 right-0 w-[67%]">
                <img
                  src={teamImage}
                  alt="Rajlakshmi team"
                  className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
                />
              </div>

              {/* Farmer image - front */}
              <div className="absolute bottom-0 left-0 w-[40%] z-10">
                <img
                  src={farmerImage}
                  alt="Rajasthani farmer"
                  className="w-full h-full object-cover rounded-2xl shadow-xl aspect-[3/4]"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-5 text-center lg:text-left">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                Transparency You Can Trust
              </h2>

              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                At Rajlakshmi Javiks, we believe that purity and quality should
                not just be claimed — they should be proven. Our lab testing
                process ensures that every product you consume is safe,
                hygienic, and meets established quality standards.
              </p>

              <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
                <li className="flex justify-center lg:justify-start items-center gap-2">
                  <span className="text-primary">•</span>
                  Sustainably farmed
                </li>
                <li className="flex justify-center lg:justify-start items-center gap-2">
                  <span className="text-primary">•</span>
                  No artificial preservatives
                </li>
                <li className="flex justify-center lg:justify-start items-center gap-2">
                  <span className="text-primary">•</span>
                  Rich in natural nutrients
                </li>
                <li className="flex justify-center lg:justify-start items-center gap-2">
                  <span className="text-primary">•</span>
                  Trusted by health-conscious families
                </li>
              </ul>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md px-6"
                >
                  Read more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Do Our Lab Reports Cover */}
      <section className="py-16 px-4 bg-[#F0FFF0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                What Do Our Lab Reports Cover?
              </h2>

              <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-green-100">
                {[
                  {
                    img: pesticideImg,
                    text: "Pesticide residue analysis",
                  },
                  {
                    img: metalImg,
                    text: "Heavy metals testing",
                  },
                  {
                    img: microbeImg,
                    text: "Microbial safety checks",
                  },
                  {
                    img: moistureImg,
                    text: "Moisture content analysis",
                  },
                  {
                    img: purityImg,
                    text: "Purity and contamination assessment",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.text}
                      className="w-8 h-8 object-contain"
                    />
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
                <button className="bg-[#01722C] hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download Report
                </button>
                <button className=" border-2 border-[#01722C] text-[#01722C] hover:bg-green-50 font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone size={20} />
                  Contact Support
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <img
                src={labrepotImage}
                alt="Lab scientist testing"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <div className="px-4 sm:px-6 md:px-8 lg:px-12mx-auto"> */}

      {/* Testing Process */}

      <section
        style={{
          padding: "64px 16px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Heading */}
          <h2
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "700",
              color: "#1a5c2e",
              marginBottom: "48px",
            }}
          >
            Testing Process
          </h2>

          {/* Steps Row */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              overflowX: "auto",
              paddingBottom: "8px",
              alignItems: "center",
            }}
            className="py-10"
          >
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  minWidth: "180px",
                  width: "220px",
                  height: "190px",
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  padding: "24px 16px",
                  backgroundColor: "#ffffff",
                  boxShadow: step.highlight
                    ? "0 8px 24px rgba(0,0,0,0.12)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                  transform: step.highlight ? "scale(1.06)" : "scale(1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  cursor: "default",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = step.highlight
                    ? "scale(1.06) translateY(-8px)"
                    : "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 32px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = step.highlight
                    ? "scale(1.06)"
                    : "scale(1)";
                  e.currentTarget.style.boxShadow = step.highlight
                    ? "0 8px 24px rgba(0,0,0,0.12)"
                    : "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "20px",
                    marginBottom: "16px",
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p
            style={{
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "13px",
              marginTop: "40px",
            }}
          >
            Only products that meet our internal quality standards are released
            for sale.
          </p>
        </div>
      </section>

      {/* Testing Authority & Standards */}
      <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
        {/* Background decorative image */}
        <img
          src={farmerBgImg}
          alt="farmer background"
          className="
      absolute
      bottom-0
      right-0
      w-[140px]
      sm:w-[200px]
      lg:w-[360px]
      h-auto
      object-contain
      opacity-60
      pointer-events-none
      select-none
    "
        />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Overlapping Images */}
            <div className="relative w-full max-w-xl mx-auto h-[320px] sm:h-[380px] lg:h-[420px]">
              {/* Team image - back */}
              <div className="absolute top-0 right-0 w-[67%]">
                <img
                  src={teamImage}
                  alt="Rajlakshmi team"
                  className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
                />
              </div>

              {/* Farmer image - front */}
              <div className="absolute bottom-0 left-0 w-[40%] z-10">
                <img
                  src={farmerImage}
                  alt="Rajasthani farmer"
                  className="w-full h-full object-cover rounded-2xl shadow-xl aspect-[3/4]"
                />
              </div>
            </div>

            {/* Right - Updated Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                Testing Authority & Standards
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-2">
                    Tested By Accredited Certifying Agencies
                  </h3>
                  <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
                    <li className="flex justify-center lg:justify-start items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span>FSSAI-licensed</span>
                    </li>
                    <li className="flex justify-center lg:justify-start items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span>NABL-accredited labs for unbiased testing</span>
                    </li>
                    <li className="flex justify-center lg:justify-start items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span>
                        Third-party audits to guarantee transparency and
                        credibility apart from internal inspection
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-2">
                    Batch-Wise Testing Policy
                  </h3>
                  <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
                    <li className="flex justify-center lg:justify-start items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span>
                        Every production batch is tested in-house and by
                        third-party labs before distribution
                      </span>
                    </li>
                    <li className="flex justify-center lg:justify-start items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span>
                        Ensures traceability and accountability throughout the
                        supply chain for quality assurance
                      </span>
                    </li>
                    <li className="flex justify-center lg:justify-start items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span>
                        Each batch lab report can be viewed by customers via
                        unique QR code in packaging
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                  Our reports comply with industry quality benchmarks set by
                  national and international agencies, including the Food Safety
                  and Standards Authority of India (FSSAI). Additional batch
                  certifications align with global quality and organic standards
                  where applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-12">
            Frequently Asked Questions (Lab Reports)
          </h2>

          {faqs.map((section, sIndex) => (
            <div key={sIndex} className="mb-10">
              <Accordion type="single" collapsible className="w-full">
                {section.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${sIndex}-${index}`}
                    className="border-b border-[hsl(120,20%,85%)]"
                  >
                    <AccordionTrigger className="text-left text-base md:text-lg font-medium py-5 hover:no-underline [&>svg]:hidden">
                      <span className="flex-1">{faq.question}</span>
                      <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(120,60%,35%)] text-white text-xl leading-none transition-transform duration-200 [[data-state=open]_&]:rotate-45">
                        +
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="text-muted-foreground text-sm md:text-base pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LabReportsPage;
