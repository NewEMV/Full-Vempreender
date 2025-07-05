import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || "#";
  const chatbotUrl = process.env.NEXT_PUBLIC_CHATBOT_URL || "#";

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

          <div className="relative z-10 p-4 sm:p-8">
            <h1 className="font-headline text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Atender bem vende mais.
            </h1>
            <p className="mt-6 text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-4xl">
              Transforme um bom atendimento em vendas.
            </p>
            <p className="mt-6 text-base font-normal text-white sm:text-xl">
              Quando um novo cliente não é bem atendido, sua chance de venda vai embora. Simples
              assim. Com Vempreender você tem um Atendente com Inteligência
              Artificial que conversa com todo novo cliente como se fosse você. Ele
              explica seus serviços, tira as dúvidas e ajuda a separar curiosos de clientes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
              <Button
                asChild
                size="lg"
                className="w-full text-base font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
              >
                <Link href={authUrl}>
                  Teste Grátis por 7 Dias
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group w-full border-[1.5px] border-primary font-bold text-white transition-all sm:w-auto"
                asChild
              >
                <Link href={chatbotUrl} target="_blank" rel="noopener noreferrer">
                  Saiba Mais
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
