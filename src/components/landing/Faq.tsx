
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Eu não aguentava mais passar o dia todo respondendo as mesmas perguntas no WhatsApp. O Vempreender agora faz isso por mim, 24 horas por dia. Meus agendamentos aumentaram e finalmente consigo focar no que eu amo, que é atender minhas clientes. Salvou minha sanidade!",
    name: "Jéssica M., Esteticista",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman portrait",
  },
  {
    quote: "Como advogado, meu tempo é meu bem mais valioso. Perdia horas qualificando contatos. O Vempreender filtra os casos iniciais com uma precisão incrível. O cliente chega pra mim muito mais preparado. Foi o melhor investimento que fiz no meu escritório este ano.",
    name: "Dr. Ricardo P., Advogado",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man portrait",
  },
  {
    quote: "Meu direct vivia lotado de 'quanto custa?'. Era impossível dar atenção de qualidade pra todo mundo. Com o Vempreender, o pessoal já tira as dúvidas iniciais pelo link na bio e quem me chama no WhatsApp já vem decidido. Fechei 5 novos alunos na primeira semana!",
    name: "Fernando G., Personal Trainer",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man smiling",
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="py-20 md:py-32 bg-background/50">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Empreendedores como Você Vão Amar o Vempreender
          </h2>
          <p className="mt-6 text-lg font-normal text-muted-foreground sm:text-xl md:text-2xl">
            Veja o que nossos clientes estão dizendo sobre como o Vempreender transformou seus negócios.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card flex flex-col">
              <CardContent className="p-6 flex flex-col flex-1">
                <Quote className="h-8 w-8 text-primary mb-6" />
                <p className="text-muted-foreground mb-6 flex-1">“{testimonial.quote}”</p>
                <div className="flex items-center gap-4 mt-auto">
                    <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                        <AvatarFallback>{testimonial.name.split(" ")[0][0]}{testimonial.name.split(" ")[1][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-foreground">{testimonial.name.split(",")[0]}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.name.split(",")[1].trim()}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
