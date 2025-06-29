import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqData = [
  {
    question: "What services does Vempreender AI offer?",
    answer:
      "We specialize in creating custom AI-powered chatbots for businesses. Our chatbots can handle customer support, qualify leads, answer questions about your services, and integrate with your existing workflows to automate tasks.",
  },
  {
    question: "How does the AI lead qualification work?",
    answer:
      "Our AI analyzes conversations in real-time to identify potential customers. It asks targeted questions based on your criteria (like budget, timeline, and needs) to determine if a user is a good fit for your sales team, saving you time and effort.",
  },
  {
    question: "What is the pricing model for your services?",
    answer:
      "We offer flexible pricing plans tailored to your business size and needs, including monthly subscriptions and custom enterprise solutions. Contact our AI assistant or sales team for a personalized quote.",
  },
  {
    question: "Can the chatbot be customized to match my brand?",
    answer:
      "Absolutely. We work with you to customize the chatbot's personality, conversation style, and visual appearance to ensure it perfectly aligns with your brand identity and voice.",
  },
  {
    question: "What kind of support do you offer after setup?",
    answer:
      "We provide ongoing support and maintenance to ensure your AI chatbot continues to perform optimally. Our team is always available to help with updates, training, and any questions you may have.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our AI solutions and how they
            can help your business grow.
          </p>
        </div>

        <div className="mt-12">
          <Card className="bg-white/5 backdrop-blur-lg border-border">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
