
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sobrecarga era rotina. Com Vempreender, tenho um atendente 24h que fala minha língua e qualifica clientes. Minhas vendas aumentaram, e eu foco no meu trabalho. Um divisor de águas!",
    name: "Maria, Esteticista",
  },
  {
    quote: "Achei que chatbot era complexo e caro. Vempreender me surpreendeu! Configurei em minutos e meu consultório passou a encantar clientes na hora com conversas fluidas. A confiança que gera é impressionante.",
    name: "Carlos, Advogado Autônomo",
  },
  {
    quote: "Dúvidas chegavam a qualquer hora. Com Vempreender, o cliente é atendido na hora com a resposta exata, e eu pego a conversa adiantada. Praticidade e custo-benefício imbatíveis!",
    name: "Ana, Personal Trainer",
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="py-20 md:py-32 bg-background/50">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Empreendedores como Você Vão Amar o Vempreender
          </h2>
          <p className="mt-10 text-3xl text-muted-foreground sm:text-4xl">
            Em breve, histórias de sucesso de empreendedores que transformaram seus negócios com Vempreender. Veja alguns exemplos do que eles dirão sobre nosso atendimento inteligente:
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary mb-6" />
                <p className="text-muted-foreground mb-6">“{testimonial.quote}”</p>
                <p className="font-bold text-foreground">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
