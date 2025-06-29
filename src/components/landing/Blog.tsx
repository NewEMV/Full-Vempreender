import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const blogPosts = [
  {
    title: "Impulsionamento no Instagram: O Guia Básico para o Empreendedor Solo",
    image: "https://placehold.co/600x400.png",
    aiHint: "social media marketing"
  },
  {
    title: "Tráfego Pago Descomplicado: Multiplique Clientes sem Perder Dinheiro",
    image: "https://placehold.co/600x400.png",
    aiHint: "online advertising"
  },
  {
    title: "5 Gatilhos Mentais para Encantar Seu Cliente no Primeiro Contato",
    image: "https://placehold.co/600x400.png",
    aiHint: "customer psychology"
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Blog Vempreender: Dicas e Estratégias para sua Empresa Crescer
          </h2>
          <p className="mt-10 text-lg font-normal text-muted-foreground sm:text-xl">
            Quer mais clientes e aumentar suas vendas? No Blog Vempreender você encontra dicas práticas de marketing, vendas e como usar seu chatbot, que é seu Agente IA personalizado, para crescer.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                data-ai-hint={post.aiHint}
                className="w-full h-48 object-cover"
              />
              <CardHeader className="flex-1">
                <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="text-base font-bold">Ver Todas as Dicas no Blog</Button>
        </div>
      </div>
    </section>
  );
}
