import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqSections = [
  {
    title: "PRODUCTS & QUALITY",
    faqs: [
      {
        question: "Are Rajlakshmi Jiviks products 100% organic?",
        answer:
          "Yes, our products are made using carefully sourced farm items and natural processing methods.",
      },
      {
        question: "Are your products free from chemicals and preservatives?",
        answer:
          "Yes, we do not use artificial preservatives or harmful chemicals.",
      },
      {
        question: "Are Rajlakshmi Jiviks products lab tested?",
        answer: "Yes, all products go through quality checks and lab testing.",
      },
      {
        question: "Do you use any artificial colors or flavors?",
        answer:
          "No, we use only natural ingredients without artificial colors or flavors.",
      },
      {
        question: "How do I know a product is certified or tested?",
        answer:
          "You can check certification details on the product packaging or description.",
      },
    ],
  },
  {
    title: "ORDERS & DELIVERY",
    faqs: [
      {
        question: "Do you deliver across India?",
        answer:
          "Yes, we deliver to most locations across India depending on service availability.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery usually takes 3–7 business days depending on your location.",
      },
      {
        question: "How can I track my order?",
        answer:
          "You will receive a tracking link via SMS or email after dispatch.",
      },
      {
        question: "What if my order is delayed?",
        answer:
          "If your order is delayed, please contact our support team for assistance.",
      },
    ],
  },
  {
    title: "PAYMENTS & PRICING",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept UPI, debit/credit cards, net banking, and other secure online payment options.",
      },
      {
        question: "Is Cash on Delivery (COD) available?",
        answer: "Yes, COD is available in select locations.",
      },
      {
        question: "Are prices inclusive of taxes?",
        answer: "Yes, all listed prices are inclusive of applicable taxes.",
      },
    ],
  },
  {
    title: "RETURNS & REFUNDS",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "Returns or exchanges are accepted only in cases of damaged, defective, or incorrect items.",
      },
      {
        question: "How do I request a refund?",
        answer:
          "You can contact our support team with your order details to request a refund.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Refunds are usually processed within 5–7 business days after approval.",
      },
    ],
  },
  {
    title: "STORAGE & USAGE",
    faqs: [
      {
        question: "How should I store organic food products?",
        answer:
          "Store products in a cool, dry place. After opening, keep them in airtight containers.",
      },
      {
        question: "What is the shelf life of your products?",
        answer:
          "Shelf life varies by product. Please check the packaging for details.",
      },
      {
        question: "Are your products safe for daily consumption?",
        answer:
          "Yes, our products are made with natural ingredients and are safe for regular use.",
      },
    ],
  },
  {
    title: "SUPPORT & CONTACT",
    faqs: [
      {
        question: "How can I contact Rajlakshmi Jiviks?",
        answer:
          "You can contact us through the Contact Us page or via WhatsApp and email.",
      },
      {
        question: "Do you offer combo packs or bulk orders?",
        answer:
          "Yes, we offer combo packs and bulk order options. Please contact support for details.",
      },
    ],
  },
];

export default function FAQMainPage() {
  return (
    <>
      <section className="w-full max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(120,60%,30%)]">
            Everything You Need to Know
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Find answers to common questions about our products, quality
            standards, ordering process, and delivery.
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
      </section>
    </>
  );
}
