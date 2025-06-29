import { Bot, BarChart, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Intelligent Chatbot",
    description:
      "Engage customers 24/7 with a smart AI that understands context, answers complex questions, and provides a human-like conversational experience.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Automated Lead Qualification",
    description:
      "Our AI automatically identifies and qualifies high-potential leads, so your sales team can focus on closing deals instead of prospecting.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Data-Driven Insights",
    description:
      "Gain valuable insights from customer interactions. Understand their needs, pain points, and feedback to improve your products and services.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Seamless Integration",
    description:
      "Easily integrate our AI chatbot with your existing website, CRM, and other business tools for a streamlined and efficient workflow.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Supercharge Your Business with AI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From automating customer service to qualifying leads, our AI is
            designed to help you work smarter, not harder.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transform-gpu bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 border-border"
            >
              <CardHeader className="flex flex-col items-start gap-4">
                {feature.icon}
                <CardTitle className="font-headline text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
