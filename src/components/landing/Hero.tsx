
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden py-12"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="h-56 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-primary"></div>
        <div className="h-32 bg-gradient-to-r from-accent to-cyan-400 blur-[106px] dark:to-accent"></div>
      </div>
      <div className="container relative mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Atender bem vende mais.
          </h1>
          <p className="mt-10 text-3xl font-medium leading-tight text-muted-foreground sm:text-4xl">
            Um bom atendimento transforma interesse em vendas.
          </p>
          <p className="mt-6 text-xl text-muted-foreground/80 sm:text-2xl">
            Se um novo cliente não é bem atendido, a venda vai embora. Simples
            assim. Com Vempreender você tem um Atendente com Inteligência
            Artificial que conversa com todo novo cliente como se fosse você. Ele
            responde, explica seus serviços e ajuda a filtrar quem realmente
            está pronto para comprar.
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
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img
              src="https://placehold.co/1200x600.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              data-ai-hint="chatbot interface"
              className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
