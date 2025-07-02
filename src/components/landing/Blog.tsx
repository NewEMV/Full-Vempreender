import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const blogPosts = [
  {
    title: "Impulsionamento no Instagram: O Guia Básico para o Empreendedor Solo",
    image: "https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Blog-Imagens%2Fpost-instagram.webp?alt=media&token=75622abb-f783-44c3-abf1-029087d77d52",
    aiHint: "social media marketing"
  },
  {
    title: "Tráfego Pago Descomplicado: Multiplique Clientes sem Perder Dinheiro",
    image: "https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Blog-Imagens%2Fpost-trafego.webp?alt=media&token=49681585-9be3-45ed-aa2c-6f56785cbabc",
    aiHint: "online advertising"
  },
  {
    title: "5 Gatilhos Mentais para Encantar Seu Cliente no Primeiro Contato",
    image: "https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Blog-Imagens%2Fpost-gatilhos-imagem.webp?alt=media&token=a036cc19-90ce-4ee9-856a-c68204427fe8",
    aiHint: "customer psychology"
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-10 md:py-16">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Blog Vempreender: Dicas e Estratégias para sua Empresa Crescer
          </h2>
          <p className="mt-10 text-lg font-normal text-muted-foreground sm:text-xl">
            Quer mais clientes e aumentar suas vendas? No Blog Vempreender você encontra dicas práticas de marketing, vendas e como usar seu chatbot, que é seu Agente IA personalizado, para crescer.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
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
