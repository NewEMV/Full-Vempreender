import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[url('/Hero-Chatbot-Vempreender.webp')] bg-cover bg-center bg-fixed bg-no-repeat"
      ></div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -top-40 -left-20 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-purple-900 to-transparent opacity-25 blur-[100px]"
        ></div>
        <div
          className="absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tl from-emerald-800 to-transparent opacity-25 blur-[100px]"
        ></div>
        <div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-700 to-transparent opacity-15 blur-[80px]"
        ></div>
      </div>
      <div className="container relative mx-auto flex h-full flex-grow items-center px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Atender bem vende mais.
          </h1>
          <p className="mt-10 text-2xl font-medium leading-tight text-muted-foreground sm:text-4xl">
            Transforme um bom atendimento em vendas.
          </p>
          <p className="mt-10 text-lg font-normal text-muted-foreground/80 sm:text-[22px]">
            Se um novo cliente não é bem atendido, a venda vai embora. Simples
            assim. Com Vempreender você tem um Atendente com Inteligência
            Artificial que conversa com todo novo cliente como se fosse você. Ele
            responde, explica seus serviços e ajuda a separar curiosos de clientes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="text-base font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            >
              Teste Grátis Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="group border-[1.5px] border-primary font-bold transition-all"
            >
              Saiba Mais{" "}
              <span
                aria-hidden="true"
                className="ml-2 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
