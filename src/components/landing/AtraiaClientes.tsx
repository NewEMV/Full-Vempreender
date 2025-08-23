import { Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const insights = [
  {
    icon: <Instagram className="h-8 w-8 text-primary" />,
    title: "Turbine seu Impulsionamento no Instagram",
    description:
      "Impulsionou no Instagram e a procura aumentou? Vempreender é seu Agente IA que trabalha 24/7 para recepcionar interessados, responder dúvidas e capturar dados. Contatos qualificados direto para você. Adicione o link na sua Bio!",
  },
  {
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.024 10.428h-6.012v2.856h6.012c-.228 1.452-1.632 3.576-4.5 3.576-2.724 0-4.932-2.22-4.932-4.956s2.208-4.956 4.932-4.956c1.56 0 2.58 .672 3.18 1.248l2.292-2.292c-1.38-1.296-3.18-2.076-5.472-2.076-4.524 0-8.196 3.672-8.196 8.196s3.672 8.196 8.196 8.196c4.716 0 7.824-3.264 7.824-7.98 0-.528-.06-1.02-.156-1.5H12.024v.000z"/>
      </svg>
    ),
    title: "Maximize seu Tráfego Pago",
    description:
      "Invista em Tráfego Pago (Google/Meta Ads) com inteligência. Cada clique é um investimento. Vempreender garante atendimento imediato a todos, qualificando contatos e aproveitando ao máximo seu investimento.",
  },
];

export default function AtraiaClientes() {
  return (
    <section id="atraia-clientes" className="py-5 md:py-8 bg-background/50">
      <div className="container mx-auto px-4 md:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Pronto em até 1 hora!
          </h2>
          <p className="mt-10 text-xl font-normal text-muted-foreground sm:text-2xl">
            Seu incrível trabalho precisa ser divulgado. Elimine o gargalo do atendimento e divulgue seu negócio sem medo. Com Vempreender, você atende a todos, de forma inteligente, eficiente e acessível. O Vempreender cuida da conversa para você vender mais, com mais inteligência e menos esforço.
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
                <p className="text-muted-foreground text-lg">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-lg text-muted-foreground sm:text-xl">
              Quer dominar o Impulsionamento e Tráfego Pago? <a href="#blog" className="text-primary hover:underline">Visite nosso Blog</a> para dicas práticas e faça o Vempreender render ainda mais!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
