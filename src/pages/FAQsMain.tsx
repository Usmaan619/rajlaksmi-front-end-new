import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import Seo from "@/components/Seo";

const faqSections = [
  {
    title: "PRODUCTS & QUALITY",
    faqs: [
      {
        question: "Are Rajlakshmi Javiks products 100% organic?",
        answer:
          "Yes, all Rajlakshmi Javiks products are made using carefully sourced, naturally grown farm produce without synthetic chemicals, fertilizers, or GMOs. Our organic range — including A2 Gir Cow Bilona Ghee, cold-pressed oils, organic pulses, millets, and spices — is certified under FSSAI and NPOP (National Programme for Organic Production) guidelines, ensuring complete organic integrity from farm to your kitchen.",
      },
      {
        question: "Are your products free from chemicals and preservatives?",
        answer:
          "Yes, absolutely. We do not use artificial preservatives, synthetic colours, chemical stabilizers, or any harmful additives in any of our products. Every item — from A2 Bilona Ghee to our cold-pressed oils and organic dry fruits — is processed using traditional, natural methods that retain the food's original nutritional profile and authentic taste without compromising on purity.",
      },
      {
        question: "Are Rajlakshmi Javiks products third-party lab tested?",
        answer: "Yes, all products undergo rigorous third-party quality checks and lab testing at NABL-accredited laboratories before they are released for sale. Tests cover pesticide residue analysis, heavy metals screening, microbial safety, moisture content, and purity assessment. Batch-specific lab reports are available on request, and you can also find certification details on our product packaging for complete transparency.",
      },
      {
        question: "Do you use any artificial colors or flavors?",
        answer:
          "No. We use only natural, unprocessed ingredients in all our products. Our turmeric powder gets its vibrant golden colour from the natural curcumin in the rhizome. Our spices and masalas are ground from pure, sun-dried whole spices without any artificial colour boosters or synthetic flavour enhancers. What you taste and see is exactly what nature provides.",
      },
      {
        question: "How do I know a product is certified or tested?",
        answer:
          "Every Rajlakshmi Javiks product carries visible certification details on its packaging — including FSSAI license number, NPOP organic certification mark, and APEDA registration where applicable. You can also visit the Certifications page on our website to view our complete list of certifications. For batch-specific lab reports, please contact our customer support team with your order details.",
      },
    ],
  },
  {
    title: "ORDERS & DELIVERY",
    faqs: [
      {
        question: "Do you deliver organic food products across India?",
        answer:
          "Yes, Rajlakshmi Javiks International offers PAN India delivery for all our organic food products. We ship to all states and union territories including metro cities like Mumbai, Delhi NCR, Bangalore, Chennai, Hyderabad, Pune, and Kolkata, as well as Tier-2 and Tier-3 cities. Delivery is available for individual retail orders as well as bulk wholesale orders.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery typically takes 3 to 7 business days from the date of dispatch, depending on your delivery location. Metro cities and major urban centres usually receive orders within 3-4 days. Remote and Tier-3 locations may take up to 7 working days. We use reputed courier partners including Delhivery, Blue Dart, and DTDC to ensure safe and timely delivery.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is dispatched, you will receive a tracking link and AWB number via SMS and email registered with your order. You can use this tracking number on the courier partner's website to check real-time delivery status. If you face any tracking issues, please contact our customer support team at contact@rajlakshmijaviks.com or call +91-8769215905.",
      },
      {
        question: "What if my order is delayed?",
        answer:
          "If your order is delayed beyond the estimated delivery window, please first check your tracking link for the latest update. If the shipment appears stuck or undelivered, contact our customer support team immediately at +91-8769215905 or via WhatsApp. We will coordinate with the courier partner on your behalf and ensure your order is delivered or a replacement/refund is processed promptly.",
      },
    ],
  },
  {
    title: "PAYMENTS & PRICING",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), debit and credit cards (Visa, Mastercard, RuPay), net banking, and digital wallets. We also offer EMI options on select credit cards for larger orders. All transactions are processed through secure, encrypted payment gateways to protect your financial data.",
      },
      {
        question: "Is Cash on Delivery (COD) available?",
        answer: "Yes, Cash on Delivery (COD) is available for eligible pin codes across India. COD orders may require a confirmation call from our team before dispatch. Please note that COD availability depends on your delivery location and order value. For large wholesale orders, we recommend prepaid payment for faster processing and priority dispatch.",
      },
      {
        question: "Are prices inclusive of taxes?",
        answer: "Yes, all listed prices on our website are inclusive of applicable GST (Goods and Services Tax) as per Indian tax regulations. There are no hidden charges. For wholesale B2B orders, GST invoices are provided separately for tax credit purposes. Shipping charges, if applicable, are shown separately at checkout before payment confirmation.",
      },
    ],
  },
  {
    title: "RETURNS & REFUNDS",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns or exchanges only in cases of damaged, defective, incorrectly shipped, or tampered products. All return requests must be raised within 48 hours of delivery by sharing photos of the product and packaging with our support team. Perishable and food-grade items are not eligible for return due to health and hygiene regulations unless they arrive in a damaged or compromised condition.",
      },
      {
        question: "How do I request a refund?",
        answer:
          "To request a refund, contact our customer support team at contact@rajlakshmijaviks.com or WhatsApp +91-8769215905 within 48 hours of delivery. Provide your order number, photos of the issue, and a brief description of the problem. Our team will review the request and, upon approval, process the refund to your original payment method or as store credit within 5-7 business days.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Approved refunds are typically processed within 5 to 7 business days after the return request is verified and approved by our team. For UPI and digital wallet payments, refunds may appear faster (within 2-3 days). For credit/debit card refunds, processing time may depend on your bank's policies and can take up to 7-10 business days to reflect in your account.",
      },
    ],
  },
  {
    title: "STORAGE & USAGE",
    faqs: [
      {
        question: "How should I store organic food products?",
        answer:
          "Store all organic food products in a cool, dry place away from direct sunlight and moisture. Once opened, transfer products to airtight, food-grade containers to preserve freshness and prevent contamination. A2 Ghee should be stored in a cool, dark place and can be kept at room temperature. Cold-pressed oils should be stored away from heat sources. Dry fruits and seeds should be refrigerated after opening for extended shelf life.",
      },
      {
        question: "What is the shelf life of your products?",
        answer:
          "Shelf life varies by product category. A2 Gir Cow Bilona Ghee: 12-18 months from manufacture date. Cold-pressed oils: 6-12 months. Organic pulses and millets: 12-24 months when stored in airtight containers. Dry fruits: 6-12 months unopened; 3-4 months after opening in a refrigerator. Spices: 12-24 months. All best-before dates are clearly marked on the packaging.",
      },
      {
        question: "Are your products safe for daily consumption?",
        answer:
          "Yes, all Rajlakshmi Javiks products are made with natural, wholesome ingredients and are safe for regular daily consumption by all age groups including children, elderly individuals, and pregnant women. Our A2 Gir Cow Ghee is particularly recommended for daily use due to its easily digestible fat profile, CLA content, and fat-soluble vitamins. Always consult your physician for specific dietary concerns or health conditions.",
      },
    ],
  },
  {
    title: "SUPPORT & CONTACT",
    faqs: [
      {
        question: "How can I contact Rajlakshmi Javiks International?",
        answer:
          "You can reach us through multiple channels: via the Contact Us page on our website, by email at contact@rajlakshmijaviks.com, by phone at +91-8769215905 or +91-8769115905 (Mon-Sat, 10 AM to 8 PM), or via WhatsApp for quick responses. For B2B wholesale enquiries, please use the B2B Inquiry form on our website for priority handling and custom pricing.",
      },
      {
        question: "Do you offer combo packs or bulk orders?",
        answer:
          "Yes, we offer a wide range of combo packs for gifting, daily household needs, and health-focused dietary plans. Bulk wholesale orders are available for distributors, retailers, health food stores, restaurants, hotels, and corporate gifting requirements. Please use the B2B inquiry form or contact our wholesale team directly for minimum order quantities, bulk pricing tiers, and custom packaging options.",
      },
    ],
  },
];

export default function FAQMainPage() {
  return (
    <>
      <Seo
        title="FAQs | Rajlakshmi Javiks International — Organic Food Questions Answered"
        description="Find answers to frequently asked questions about Rajlakshmi Javiks organic food products, A2 Gir Cow Bilona Ghee quality, lab testing, PAN India delivery, payment options, returns, storage, and wholesale B2B orders."
        url="/faqs"
      />
      <h1 className="sr-only">
        Frequently Asked Questions — Rajlakshmi Javiks International Organic Food. Get answers about our A2 Gir Cow Bilona Ghee, organic pulses, cold-pressed oils, FSSAI certification, lab testing, delivery across India, payment options, return policy, and wholesale ordering process.
      </h1>
      <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(120,60%,30%)]">
            Frequently Asked Questions About Our Organic Products
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our 100% organic food products, A2 Gir Cow Bilona Ghee quality and purity, FSSAI and APEDA certifications, lab testing transparency, ordering process, PAN India delivery timelines, payment options, and our B2B wholesale program. Can't find your answer? Contact our team directly.
          </p>
        </div>

        {faqSections.map((section, sIndex) => (
          <div key={sIndex} className="mb-10">
            <h3 className="text-center text-sm md:text-base font-semibold tracking-wide text-[hsl(120,60%,30%)] mb-4">
              {section.title}
            </h3>

            <Accordion type="single" collapsible className="w-full">
              {section.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${sIndex}-${index}`}
                  className="border border-[hsl(120,20%,85%)] mb-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium py-5 px-6 hover:no-underline [&>svg]:hidden hover:bg-[hsl(120,20%,97%)] transition-colors duration-300">
                    <span className="flex-1">{faq.question}</span>
                    <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(120,60%,35%)] text-white text-xl leading-none transition-transform duration-500 [[data-state=open]_&]:rotate-180 [[data-state=open]_&]:bg-[hsl(120,60%,30%)]">
                      <ChevronDown size={18} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base pb-5 px-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>
    </>
  );
}
