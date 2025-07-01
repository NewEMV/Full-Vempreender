import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NossoPlano() {
  return (
    <section id="nosso-plano" className="py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-24">
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

        <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-8">
          <Card className="flex flex-col border-2 border-red-400 shadow-lg shadow-red-400/20">
            <CardHeader>
              <Button className="w-full bg-red-400 hover:bg-red-500 text-white text-xl font-bold md:text-2xl">Concorrentes - Implantação 5.000,00</Button>
              <CardTitle className="font-medium">
                Implantação nos Concorrentes
              </CardTitle>
              <CardDescription className="text-lg font-bold text-primary md:text-xl">
                Podem custar de 1.200,00 a 5.000,00
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Nossos concorrentes tem produtos interessantes, geralmente integrando diversas ferramentas que são muito úteis, mas que nem todo pequeno empreendedor tem tempo ou habilidade para utilizar, ou seja, você acaba pagando por soluções que não consegue usar.</p>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-2 border-orange-400 shadow-lg shadow-orange-400/20">
            <CardHeader>
              <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white text-xl font-bold md:text-2xl">Concorrentes - Mensalidade 3.000,00</Button>
              <CardTitle className="font-medium">Mensalidade nos Concorrentes</CardTitle>
              <CardDescription className="text-lg font-bold text-primary md:text-xl">
                Podem custar de 900,00 a 3.000,00 por mês.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p>A mensalidade dos nossos concorrentes é proporcional à quantidade de ferramentas e funções embutidas que podem ter muita utilidade se você tiver tempo e/ou habilidades para explorar todo esse potencial. Caso contrário você paga pra não usar.</p>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-2 border-green-400 shadow-lg shadow-green-400/20">
            <CardHeader>
              <Button className="w-full bg-green-400 hover:bg-green-500 text-white text-xl font-bold md:text-2xl">Vempreender - Implantação 400,00</Button>
              <CardTitle className="font-medium">Implantação na Vempreender</CardTitle>
              <CardDescription className="text-lg font-bold text-primary md:text-xl">
                Nossa implantação custa 800,00 fora da promoção.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Nossa Promoção é muito simples. Basta baixar nosso post e publicar no Stories do seu Instagram marcando o @ai.vempreender e você terá 50% de desconto no valor da implantação. Você faz a indicação durante a criação do seu chatbot.</p>
              <CardDescription className="mt-4 text-lg font-bold text-primary md:text-xl">
                Na promoção a implantação custa apenas 400,00.
              </CardDescription>
            </CardContent>
           </Card>
           <Card className="flex flex-col border-2 border-blue-400 shadow-lg shadow-blue-400/20">
            <CardHeader>
              <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white text-xl font-bold md:text-2xl">Vempreender - Mensalidade 250,00</Button>
              <CardTitle className="font-medium">Mensalidade na Vempreender</CardTitle>
              <CardDescription className="text-lg font-bold text-primary md:text-xl">
                Nossa mensalidade custa 579,00 fora da promoção.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>É muito simples. Basta indicar 3 contatos que precisam de um chatbot e já recebe o desconto. Você faz a indicação durante a criação do seu chatbot.</p>
              <CardDescription className="mt-4 text-lg font-bold text-primary md:text-xl">
                  Na promoção a mensalidade fica apenas 250,00.
                </CardDescription>
            </CardContent>
           </Card>
        </div>
      </div>
    </section>
  );
}
