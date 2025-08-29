
"use client";

import Image from "next/image";
import React from "react";
import { Timeline, TimelineItem } from "@/components/ui/timeline";

const timelineData = [
  {
    title: "1. Crie sua Conta",
    content: (
      <div>
        <p className="text-muted-foreground text-lg mb-6">
          O primeiro passo é simples e rápido. Clique em LOGIN e crie sua conta na Vempreender para ter acesso à nossa plataforma e começar a configurar seu assistente virtual.
        </p>
        <Image
            src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Flogin_vempreender.png?alt=media&token=1ad7612f-a1d6-4e1f-851a-e64dffdb1bd2"
            alt="Criação de conta na Vempreender AI"
            width={800}
            height={500}
            className="rounded-lg object-cover w-full h-auto shadow-lg"
        />
      </div>
    ),
  },
  {
    title: "2. Preencha o Formulário",
    content: (
      <div>
        <p className="text-muted-foreground text-lg mb-6">
          Para que a IA responda como você, ela precisa aprender com você. Preencha um formulário detalhado com informações sobre seu negócio, serviços, preços e perguntas frequentes (FAQ). Quanto mais detalhes, mais inteligente será seu chatbot.
        </p>
         <Image
            src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Fform_vempreender.png?alt=media&token=46279254-bb94-4b11-9eb1-9ffaee0f7954"
            alt="Preenchimento de formulário"
            width={800}
            height={500}
            className="rounded-lg object-cover w-full h-auto shadow-lg"
            data-ai-hint="online form"
        />
      </div>
    ),
  },
  {
    title: "3. Teste seu Chatbot",
    content: (
       <div>
        <p className="text-muted-foreground text-lg mb-6">
          Em até 1 hora, seu chatbot estará pronto! Você receberá um link exclusivo para testar as conversas. Interaja com ele como se fosse um cliente para ver a mágica acontecer.
        </p>
         <Image
            src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Fchat_vempreender.png?alt=media&token=74947160-89fa-4b3f-81db-5241805f8577"
            alt="Teste do chatbot"
            width={800}
            height={500}
            className="rounded-lg object-cover w-full h-auto shadow-lg"
            data-ai-hint="chatbot conversation"
        />
      </div>
    ),
  },
  {
    title: "4. Ajuste e Refine",
    content: (
       <div>
        <p className="text-muted-foreground text-lg mb-6">
          Notou que uma resposta pode ser melhor? Sem problemas. Volte ao seu formulário, adicione mais informações, refine as respostas do FAQ e veja seu chatbot ficar cada vez mais preciso e eficiente.
        </p>
         <Image
            src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Fsummarize_vempreender.png?alt=media&token=9c30350a-708f-464a-adc1-ba6a58c9860d"
            alt="Ajuste de configurações"
            width={800}
            height={500}
            className="rounded-lg object-cover w-full h-auto shadow-lg"
            data-ai-hint="dashboard settings"
        />
      </div>
    ),
  },
   {
    title: "5. O que ele faz",
    content: (
      <div className="space-y-6 text-lg">
        <ul className="space-y-4 text-muted-foreground">
          <li className="flex items-start"><span className="text-primary mr-3 mt-1">✔</span><span>Conversa fora do whatsapp, pra não encher sua caixa de mensagens com curiosos.</span></li>
          <li className="flex items-start"><span className="text-primary mr-3 mt-1">✔</span><span>Ajuda a separar curiosos do seu pontencial cliente. Você decide quem vai conversar no seu whatsapp.</span></li>
          <li className="flex items-start"><span className="text-primary mr-3 mt-1">✔</span><span>Tira dúvidas e incentiva o cliente a desejar seu produto ou serviço. Você ainda recebe os dados de contato e uma sugestão de abordagem baseada no perfil do cliente.</span></li>
          <li className="flex items-start"><span className="text-primary mr-3 mt-1">✔</span><span>Insira o link da sua Agenda pra aceitar agendamentos.</span></li>
        </ul>
        <Image
            src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Fcalendar_vempreender.png?alt=media&token=453cb2f1-17e0-45dd-adcf-2f8b2a826cf4"
            alt="Resumo da conversa do chatbot"
            width={800}
            height={500}
            className="rounded-lg object-contain w-full h-auto shadow-lg"
            data-ai-hint="conversation summary"
        />
      </div>
    ),
  },
   {
    title: "6. O que ele NÃO faz",
    content: (
       <div className="space-y-6 text-lg">
        <ul className="space-y-4 text-muted-foreground">
          <li className="flex items-start"><span className="text-destructive mr-3 mt-1">✖</span><span>Não é indicado para pedidos de delivery, mas funciona muito bem para agendar encomendas.</span></li>
          <li className="flex items-start"><span className="text-destructive mr-3 mt-1">✖</span><span>Não se integra a sistemas de CRM ou outras ferramentas.</span></li>
          <li className="flex items-start"><span className="text-destructive mr-3 mt-1">✖</span><span>Não processa pagamentos. O foco é no atendimento inicial.</span></li>
        </ul>
        <Image
            src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Fdelivery.webp?alt=media&token=6179d062-8226-4f10-935f-24bb3d3ddf36"
            alt="Funções não inclusas"
            width={600}
            height={375}
            className="rounded-lg object-cover w-full h-auto shadow-lg"
            data-ai-hint="delivery box"
        />
      </div>
    ),
  },
  {
    title: "7. Para quem é indicado",
    content: (
      <div>
        <p className="text-muted-foreground text-lg mb-6">
          Ideal para prestadores de serviço e autônomos que recebem muitos contatos pelo Instagram ou tráfego pago e perdem muito tempo respondendo as mesmas perguntas.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-card rounded-lg text-center"><p className="font-bold">Esteticistas</p></div>
            <div className="p-4 bg-card rounded-lg text-center"><p className="font-bold">Advogados</p></div>
            <div className="p-4 bg-card rounded-lg text-center"><p className="font-bold">Nutricionistas</p></div>
            <div className="p-4 bg-card rounded-lg text-center"><p className="font-bold">Psicólogos</p></div>
            <div className="p-4 bg-card rounded-lg text-center"><p className="font-bold">Terapeutas</p></div>
            <div className="p-4 bg-card rounded-lg text-center"><p className="font-bold">Personal Trainers</p></div>
            <div className="p-4 bg-card rounded-lg text-center"><p className="font-bold">E muitos outros!</p></div>
        </div>
      </div>
    ),
  },
];


export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-background py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-6 text-xl font-normal text-muted-foreground sm:text-2xl">
            Em poucos passos, você transforma seu atendimento e libera seu tempo para focar no que realmente importa: seu negócio.
          </p>
        </div>
        <Timeline className="mt-12">
            {timelineData.map((item, index) => (
                <TimelineItem key={index} title={item.title}>
                    {item.content}
                </TimelineItem>
            ))}
        </Timeline>
      </div>
    </section>
  );
}
