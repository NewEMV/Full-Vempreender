import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NossoPlano() {
  return (
    <section id="nosso-plano" className="py-20 md:py-32">
      <div className="container mx-auto px-24">
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

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-medium">Implantação Vempreender</CardTitle>
              <CardDescription>
                De <span className="line-through">R$ 800,00</span> por <span className="text-primary font-bold text-2xl">R$ 400,00</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Garanta seu Desconto na implantação do seu chatbot Vempreender. Durante a criação do seu chatbot, basta baixar e publicar nosso post nos Stories do seu Instagram marcando o @vempreender.ia.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-base font-bold">Começar Agora!</Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col border-primary shadow-lg shadow-primary/20">
            <CardHeader>
              <CardTitle className="font-medium">Mensalidade Vempreender</CardTitle>
              <CardDescription>
                 De <span className="line-through">R$ 579,00</span> por <span className="text-primary font-bold text-2xl">R$ 250,00/mês</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p>Conquiste seu desconto permanente nas mensalidades. Basta indicar 3 amigos durante a criação do seu chatbot.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-base font-bold">Quero meu Vempreender!</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
