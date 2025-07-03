import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2FHero%20Chatbot%20Vempreender.webp?alt=media&token=cf25148f-5399-4976-bb7e-f9347ba1428f')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-background/70"
      ></div>
      <div className="container relative mx-auto flex h-full flex-grow items-center justify-center px-4 md:px-24">
        <div className="relative mx-auto max-w-3xl text-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-8 -bottom-8 z-0"
          >
            <div className="h-full w-full rounded-full bg-background/70 blur-3xl" />
          </div>

          <div className="relative z-10 p-8">
            <h1 className="font-headline text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Atender bem vende mais.
            </h1>
            <p className="mt-10 text-2xl font-medium leading-tight text-white sm:text-4xl">
              Transforme um bom atendimento em vendas.
            </p>
            <p className="mt-10 text-lg font-normal text-white sm:text-[22px]">
              Se um novo cliente não é bem atendido, a venda vai embora. Simples
              assim. Com Vempreender você tem um Atendente com Inteligência
              Artificial que conversa com todo novo cliente como se fosse você. Ele
              explica seus serviços e ajuda a separar curiosos de clientes.
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
                className="group border-[1.5px] border-primary font-bold text-white transition-all"
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
      </div>
    </section>
  );
}
