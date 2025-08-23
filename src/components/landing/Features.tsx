
"use client";

import { useEffect, useRef } from 'react';
import { BrainCircuit, Copy, Clock, CalendarClock, Rocket, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Foque no Seu Trabalho!",
    description:
      "Deixe o Vempreender conversar e tirar dúvidas dos seus clientes. Você foca no que realmente importa, que é o seu trabalho. E você retorna o contato no seu tempo.",
  },
  {
    icon: <Copy className="h-8 w-8 text-primary" />,
    title: "Seu clone digital",
    description:
      "Nossa IA aprende com você para atender usando seu conhecimento, gerando confiança com conversas humanizadas. Faça do atendimento seu melhor vendedor.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Vender!",
    description:
      "Divulgue seu link na Bio do Instagram, no Linktr.ee e onde mais quiser. Ao clicar no link, seu novo cliente vai conversar com um Agente IA que sabe tudo sobre o seu negócio.",
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
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: "Whatsapp Livre",
    description:
      "O Vempreender recebe os novos clientes (e curiosos) no chat. E no seu Whatsapp você só conversa com os potenciais clientes, sem perder tempo com curiosos.",
  },
];

// Helper to chunk the array
const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunked_arr: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunked_arr.push(array.slice(i, i + size));
    }
    return chunked_arr;
};


export default function ComoFunciona() {
  const featureRows = chunkArray(features, 3);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    const currentRefs = rowsRef.current;
    currentRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section id="como-funciona" className="py-5 md:py-8 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Um bom atendimento cativa clientes!
          </h2>
          <p className="mt-10 text-xl text-muted-foreground/80 sm:text-2xl">
            Empreendedor, cada cliente é vital. Vempreender é seu aliado estratégico para transformar o atendimento em resultados reais, com um chatbot que realmente conversa com seu cliente.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-12">
            {featureRows.map((row, rowIndex) => (
                <div 
                    key={rowIndex}
                    ref={el => rowsRef.current[rowIndex] = el}
                    className="feature-row grid grid-cols-1 gap-8 md:grid-cols-3"
                >
                    {row.map((feature, cardIndex) => (
                        <Card
                            key={feature.title}
                            className={cn(
                                "feature-card transform-gpu bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 border-border",
                                cardIndex === 0 && "feature-card-left",
                                cardIndex === 1 && "feature-card-center",
                                cardIndex === 2 && "feature-card-right"
                            )}
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
            ))}
        </div>
      </div>
    </section>
  );
}
