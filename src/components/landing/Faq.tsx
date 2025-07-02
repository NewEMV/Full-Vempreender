
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
  {
    quote: "Muitos pacientes chegavam com dúvidas básicas que tomavam tempo da consulta. O Vempreender agora educa eles antes mesmo de agendar. Otimizou meu tempo e melhorou a experiência do paciente. Recomendo demais!",
    name: "Dra. Ana B., Nutricionista",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman professional",
  },
  {
    quote: "A primeira sessão de terapia pode ser intimidante. O Vempreender ajuda a quebrar o gelo, respondendo perguntas iniciais e explicando minha abordagem. Os clientes chegam mais tranquilos e confiantes. Fez toda a diferença.",
    name: "Lucas T., Psicólogo",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man thinking",
  },
];

export default function Depoimentos() {
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <section id="depoimentos" className="py-10 md:py-16 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Depoimentos
          </h2>
          <p className="mt-6 text-2xl font-medium text-muted-foreground/80 sm:text-[22px]">
            Veja o que nossos clientes estão dizendo sobre como o Vempreender transformou seus negócios.
          </p>
        </div>

        <div
          className="relative mt-12 w-full overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={cn(
              "flex w-max shrink-0 gap-4 py-4 animate-marquee",
              isPaused && "pause-animation"
            )}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={`testimonial-1-${index}`}
                className="w-[350px] md:w-[400px] flex-shrink-0"
              >
                <Card className="bg-card flex flex-col h-full cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
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
              </div>
            ))}
            {testimonials.map((testimonial, index) => (
              <div
                key={`testimonial-2-${index}`}
                className="w-[350px] md:w-[400px] flex-shrink-0"
              >
                <Card className="bg-card flex flex-col h-full cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
