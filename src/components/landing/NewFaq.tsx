
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqData = [
  {
    question: "O que é o Vempreender?",
    answer: "É um atendente com IA que responde seus clientes automaticamente com seu estilo e conhecimento.",
  },
  {
    question: "Preciso entender de tecnologia para usar?",
    answer: "Não. Nós configuramos tudo para você. É só responder um breve formulário.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim. Sem contratos longos ou burocracia. Total liberdade.",
  },
  {
    question: "Funciona em redes sociais como Instagram?",
    answer: "Sim. Você pode divulgar o link do seu Vempreender em bios, anúncios e no WhatsApp.",
  },
  {
    question: "Como funciona o Teste Grátis?",
    answer: "Após o preenchimento do formulário, você terá 7 dias de uso gratuito para testar tudo.",
  },
];

export default function NewFaq() {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dúvidas Frequentes
          </h2>
        </div>

        <div className="mt-12">
          <Card className="bg-white/5 backdrop-blur-lg border-border">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
