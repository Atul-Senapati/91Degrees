"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How often should I change my pad?",
    answer:
      "It's recommended to change your pad every 4-6 hours, or more frequently during heavy flow days. Never wear a pad for more than 8 hours.",
  },
  {
    question: "Are 91 degrees pads hypoallergenic?",
    answer:
      "Yes, all 91 degrees pads are made with hypoallergenic materials and are dermatologically tested to minimize the risk of skin irritation.",
  },
  {
    question: "Do you offer a subscription service?",
    answer:
      "Yes! We offer monthly subscription packages with free shipping and a 10% discount. You can customize your delivery schedule and product mix.",
  },
  {
    question: "What makes 91 degrees different from other brands?",
    answer:
      "91 degrees pads feature our unique triple-layer absorption technology, breathable materials, and odor-neutralizing properties. We also use eco-friendly manufacturing processes.",
  },
  {
    question: "Why should I switch from synthetic pads?",
    answer:
      "Synthetic pads often contain plastics and chemicals that are harmful to your health and the environment. Switching helps reduce rashes, discomfort, and waste.",
  },
    {
    question: "How are you helping the environment?",
    answer:
      "By using plant-based ingredients, reducing plastic waste, and supporting eco-conscious manufacturing, we aim to create a positive impact on both health and the Earth."
  },
];

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="transition-all duration-300"
        >
          <AccordionTrigger className="text-left transition-colors duration-300  no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="transition-all duration-500 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
