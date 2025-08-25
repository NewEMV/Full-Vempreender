
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
    title: "Vender",
    description:
      "Nossa IA aplica técnicas de Vendas, Persuasão e Quebra de Objeções às respostas, gerando uma conversa envolvente pra te ajudar a vender mais.",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Não perca tempo.",
    description:
      "Divulgue seu link na Bio do Instagram, no Linktree e onde mais quiser. Ao clicar no link, seu novo cliente vai conversar com um Agente IA que sabe tudo sobre o seu negócio.",
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

export default function Solucoes() {
  return (
    <section id="solucoes" className="py-5 md:py-8 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Um bom atendimento cativa clientes!
          </h2>
          <p className="mt-10 text-xl font-normal text-muted-foreground/80 sm:text-2xl">
            Cada cliente é vital. Vempreender é seu aliado para transformar o atendimento em resultados reais. Um Agente IA que realmente conversa com seu cliente.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                        <p className="text-muted-foreground text-lg">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
