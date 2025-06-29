
import { BrainCircuit, Copy, Store, Clock, CalendarClock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Foque no Seu Trabalho!",
    description:
      "Deixe o Vempreender conversar e tirar dúvidas dos seus clientes. Você foca no que realmente importa e retorna o contato no seu tempo.",
  },
  {
    icon: <Copy className="h-8 w-8 text-primary" />,
    title: "Seu clone digital",
    description:
      "Nossa IA aprende com você para atender com seu conhecimento, através de conversas inteligentes, construindo confiança. Faça do atendimento seu melhor vendedor.",
  },
  {
    icon: <Store className="h-8 w-8 text-primary" />,
    title: "Vender!",
    description:
      "Divulgue o link do seu chatbot na Bio do Instagram, no seu Perfil do Google Maps e onde mais quiser. Ao clicar no link, seu novo cliente vai conversar com um Agente IA que tem todo o conhecimento sobre o seu negócio.",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Pronto em Até 24 Horas",
    description:
      "Simples e rápido: preencha o formulário e seu chatbot IA Vempreender fica pronto em até 24h. Teste grátis por 7 dias!",
  },
  {
    icon: <CalendarClock className="h-8 w-8 text-primary" />,
    title: "Atendimento 24/7",
    description:
      "Seu negócio disponível 24 horas por dia, 7 dias por semana. Não perca mais clientes por demora no atendimento. Vempreender está sempre online.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Custo Benefício Excelente",
    description:
      "Atendimento contínuo, inclusive em madrugadas e férias, por uma fração do custo de um atendente humano. Economia real para seu negócio.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Um bom atendimento cativa clientes e impulsiona vendas!
          </h2>
          <p className="mt-10 text-3xl text-muted-foreground/80 sm:text-4xl">
            Empreendedor, sabemos que cada cliente é vital. Vempreender é seu aliado estratégico para transformar o atendimento em resultados reais, com um chatbot que realmente conversa com seu cliente.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transform-gpu bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 border-border"
            >
              <CardHeader className="flex flex-col items-start gap-4">
                {feature.icon}
                <CardTitle className="font-headline text-xl font-medium">
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
