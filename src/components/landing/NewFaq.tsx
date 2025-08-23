
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
    answer: "É um atendente com IA que responde seus clientes automaticamente com seu estilo, baseado no seu conhecimento.",
  },
  {
    question: "Preciso entender de tecnologia para usar?",
    answer: "Não. Nós configuramos tudo para você. Sua função é fornecer o máximo de informações sobre o seu serviço, principalmente com um FAQ (Perguntas Frequentes) bem extenso que você preenche no formulário de criação do seu chatbot. Existe um botão de ajuda onde você pode copiar um prompt e pedir ajuda ao ChatGPT pra te ajudar a criar as Perguntas e Respostas mais frequentes.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim. Essa é uma assinatura mensal pré paga. Basta parar de pagar ou enviar uma mensagem solicitando o cancelamento para contato@vempreender.com.br",
  },
  {
    question: "Funciona em redes sociais como Instagram?",
    answer: "O Vempreender gera um link que você pode divulgar na Bio do Instagram, anúncios, no Linktr.ee e onde mais desejar",
  },
  {
    question: "Como funciona o Teste Grátis?",
    answer: "Após o preenchimento do formulário, você recebe o link do seu chatbot pronto para uso e terá 10 dias de uso gratuito para testar tudo e fazer os ajustes que achar necessário.",
  },
  {
    question: "Como sei o que o chatbot responde pro meu cliente?",
    answer: "No seu email você receberá:",
  }
];

export default function NewFaq() {
  return (
    <section id="faq" className="py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-24">
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
                    <AccordionTrigger className="text-left font-medium hover:no-underline text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
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
