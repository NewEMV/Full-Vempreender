
import { Instagram, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const insights = [
  {
    icon: <Instagram className="h-8 w-8 text-primary" />,
    title: "Turbine seu Impulsionamento no Instagram",
    description:
      "Impulsionou no Instagram e a procura aumentou? Vempreender é seu Agente IA 24/7 para recepcionar interessados, responder dúvidas e capturar dados. Contatos qualificados direto para você. Adicione o link na sua Bio!",
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Maximize seu Tráfego Pago",
    description:
      "Invista em Tráfego Pago (Google/Meta Ads) com inteligência. Cada clique é um investimento. Vempreender garante atendimento imediato a todos, qualificando contatos e aproveitando ao máximo seu investimento.",
  },
];

export default function AtraiaClientes() {
  return (
    <section id="atraia-clientes" className="py-20 md:py-32 bg-background/50">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sua Máquina de Aquisição de Clientes
          </h2>
          <p className="mt-10 text-xl text-muted-foreground sm:text-2xl">
            Você já faz um trabalho incrível e que merece ser visto! Elimine o gargalo do atendimento e divulgue seu negócio sem medo. Com Vempreender, você atende a todos, de forma inteligente, eficiente e acessível. O Vempreender cuida da conversa para você vender mais, com mais inteligência e menos esforço.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {insights.map((insight) => (
            <Card
              key={insight.title}
              className="transform-gpu bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 border-border"
            >
              <CardHeader className="flex flex-col items-start gap-4">
                {insight.icon}
                <CardTitle className="font-headline text-xl font-medium">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground sm:text-xl">
            Quer dominar o Impulsionamento e Tráfego Pago? <a href="#blog" className="text-primary hover:underline">Visite nosso Blog</a> para dicas práticas e faça o Vempreender render ainda mais!
          </p>
        </div>

      </div>
    </section>
  );
}
