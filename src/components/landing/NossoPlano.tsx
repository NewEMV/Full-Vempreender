
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Rocket } from "lucide-react";

const plansData = [
  {
    id: 1,
    buttonText: "Concorrentes - Implantação 5.000,00",
    title: "Implantação nos Concorrentes",
    price: "Podem custar de 1.200,00 a 5.000,00",
    description: "Nossos concorrentes tem produtos interessantes, geralmente integrando diversas ferramentas que são muito úteis, mas que nem todo pequeno empreendedor tem tempo ou habilidade para utilizar, ou seja, você acaba pagando por soluções que não consegue usar.",
    colors: "border-red-900/80 shadow-red-900/30",
    buttonColors: "bg-red-900/80 hover:bg-red-900 text-white",
    topClass: "top-24",
  },
  {
    id: 2,
    buttonText: "Concorrentes - Mensalidade 3.000,00",
    title: "Mensalidade nos Concorrentes",
    price: "Podem custar de 900,00 a 3.000,00 por mês.",
    description: "A mensalidade dos nossos concorrentes é proporcional à quantidade de ferramentas e funções embutidas que podem ter muita utilidade se você tiver tempo e/ou habilidades para explorar todo esse potencial. Caso contrário você paga pra não usar.",
    colors: "border-orange-400/80 shadow-orange-400/30",
    buttonColors: "bg-orange-400/80 hover:bg-orange-500 text-white",
    topClass: "top-[11rem]",
  },
  {
    id: 3,
    buttonText: "Vempreender - Implantação 400,00",
    title: "Implantação na Vempreender",
    price: "Nossa implantação custa 800,00 fora da promoção.",
    description: "Nossa Promoção é muito simples. Basta baixar nosso post e publicar no Stories do seu Instagram marcando o @ai.vempreender e você terá 50% de desconto no valor da implantação. Você faz a indicação durante a criação do seu chatbot.",
    promoPrice: "Na promoção a implantação custa apenas 400,00.",
    colors: "border-green-900/80 shadow-green-900/30",
    buttonColors: "bg-green-900/80 hover:bg-green-900 text-white",
    topClass: "top-[16rem]",
  },
  {
    id: 4,
    buttonText: "Vempreender - Mensalidade 250,00",
    title: "Mensalidade na Vempreender",
    price: "Nossa mensalidade custa 579,00 fora da promoção.",
    description: "É muito simples. Basta indicar 3 contatos que precisam de um chatbot e já recebe o desconto. Você faz a indicação durante a criação do seu chatbot.",
    promoPrice: "Na promoção a mensalidade fica apenas 250,00.",
    colors: "border-blue-900/80 shadow-blue-900/30",
    buttonColors: "bg-blue-900/80 hover:bg-blue-900 text-white",
    topClass: "top-[21rem]",
  }
];


export default function NossoPlano() {
  return (
    <section id="nosso-plano" className="relative py-5 md:py-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2FHero%20Chatbot%20Vempreender.webp?alt=media&token=cf25148f-5399-4976-bb7e-f9347ba1428f')",
        }}
      ></div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-background/70"
      ></div>
      <div className="container relative mx-auto px-4 md:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Simples no uso. Enorme no resultado.
          </h2>
          <p className="mt-10 text-lg font-normal text-muted-foreground sm:text-xl">
            Sem complexidade ou funcionalidades que você não usa. Foco em resolver seu problema principal: atender bem para vender mais.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-lg font-medium text-primary">
            Vempreender será seu melhor funcionário por uma fração do salário de um atendente humano. Não falta, não esquece suas instruções e não te atrapalha.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-2xl">
          {plansData.map((plan, index) => (
             <div 
                key={plan.id}
                className={`sticky ${plan.topClass} ${
                    index > 0 ? "mt-4" : ""
                }`}
            >
                <Card className={`flex flex-col border-2 ${plan.colors}`}>
                <CardHeader>
                    <Button className={`w-full text-lg font-bold md:text-xl ${plan.buttonColors}`}>
                    {plan.buttonText}
                    </Button>
                    <CardTitle className="pt-2 font-medium">
                    {plan.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-bold text-primary md:text-xl">
                    {plan.price}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <p>{plan.description}</p>
                    {plan.promoPrice && (
                    <CardDescription className="mt-4 text-lg font-bold text-primary md:text-xl">
                        {plan.promoPrice}
                    </CardDescription>
                    )}
                </CardContent>
                </Card>
            </div>
          ))}
          <div className="h-[100vh]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
