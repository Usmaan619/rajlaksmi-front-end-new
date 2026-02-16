import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are Rajlakshmi Javiks products 100% organic?",
    answer:
      "Yes, all our products are 100% organic, sourced directly from certified organic farms. We ensure that every product meets the highest organic standards.",
  },
  {
    question: "Are your products chemical and preservative free?",
    answer:
      "Absolutely. Our products are free from chemicals, preservatives, and artificial additives. We believe in delivering pure, natural goodness.",
  },
  {
    question: "Do you conduct quality or lab testing?",
    answer:
      "Yes, we conduct rigorous quality and lab testing on all our products to ensure they meet safety and purity standards before reaching our customers.",
  },
  {
    question: "How should I store organic products?",
    answer:
      "We recommend storing our organic products in a cool, dry place away from direct sunlight. Once opened, keep them in airtight containers for freshness.",
  },
  {
    question: "Do you offer home delivery?",
    answer:
      "Yes, we offer home delivery across multiple locations. You can place your order online and have it delivered right to your doorstep.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods including UPI, credit/debit cards, net banking, and cash on delivery for your convenience.",
  },
];

const FAQSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[hsl(120,60%,30%)]">
        Frequently Asked Questions (FAQs)
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
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
    </section>
  );
};

export default FAQSection;
