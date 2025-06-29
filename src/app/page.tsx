
"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ComoFunciona from "@/components/landing/Features";
import AtraiaClientes from "@/components/landing/AtraiaClientes";
import NossoPlano from "@/components/landing/NossoPlano";
import Depoimentos from "@/components/landing/Faq";
import Blog from "@/components/landing/Blog";
import Afiliados from "@/components/landing/Afiliados";
import NewFaq from "@/components/landing/NewFaq";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

function ReferralHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      toast({
        title: "Indicação Aplicada!",
        description: `Bem-vindo! Seu código de indicação "${ref}" foi aplicado com sucesso.`,
        duration: 5000,
      });
    }
  }, [searchParams, toast]);

  return null;
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <ReferralHandler />
      </Suspense>
      <Header />
      <main className="flex-1">
        <Hero />
        <ComoFunciona />
        <AtraiaClientes />
        <NossoPlano />
        <Depoimentos />
        <Blog />
        <Afiliados />
        <NewFaq />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
