
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermosDeUsoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-24">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Início
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-headline font-semibold text-foreground sm:text-4xl">
                Termos de Uso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/90">
              <p className="text-sm text-muted-foreground">
                Última atualização: 04/07/2025
              </p>
              <p>
                Bem-vindo ao Vempreender! Estes Termos de Uso ("Termos") regem o
                seu acesso e uso dos nossos serviços. Ao criar uma conta ou usar
                nossa Plataforma, você concorda em cumprir estes Termos.
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao se cadastrar e utilizar os serviços do Vempreender, você
                  declara que leu, entendeu e concorda integralmente com as
                  condições aqui estabelecidas. Se você não concorda com estes
                  Termos, não utilize a Plataforma.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  2. Descrição do Serviço
                </h2>
                <p>
                  O Vempreender oferece uma plataforma para a criação e gestão
                  de chatbots de IA. O serviço inclui:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Um formulário para coleta de dados que servirão como base de
                    conhecimento do chatbot.
                  </li>
                  <li>
                    A criação automatizada de um atendente virtual (chatbot) com
                    base nesses dados.
                  </li>
                  <li>
                    Um link exclusivo para o seu chatbot ser acessado por seus
                    clientes (leads).
                  </li>
                  <li>
                    O envio de resumos e transcrições de conversas para o e-mail
                    e WhatsApp do Usuário.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  3. Contas de Usuário e Responsabilidades
                </h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Você é o único responsável por manter a confidencialidade da
                    sua senha e por todas as atividades que ocorrem em sua
                    conta.
                  </li>
                  <li>
                    Você concorda em notificar-nos imediatamente sobre qualquer
                    uso não autorizado de sua conta.
                  </li>
                  <li>
                    As informações fornecidas no cadastro devem ser verdadeiras,
                    precisas e completas.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  4. Conteúdo do Usuário
                </h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Todo o conteúdo que você insere no formulário da Plataforma,
                    incluindo descrições de serviços, FAQs, informações da
                    empresa e dados de contato ("Conteúdo do Usuário"), é de sua
                    inteira responsabilidade.
                  </li>
                  <li>
                    Você garante que possui todos os direitos necessários sobre
                    o Conteúdo do Usuário e que o mesmo não viola nenhuma lei ou
                    direito de terceiros.
                  </li>
                  <li>
                    Ao inserir o Conteúdo do Usuário, você nos concede uma
                    licença mundial, não exclusiva e isenta de royalties para
                    usar, reproduzir, modificar e processar este conteúdo com o
                    único propósito de fornecer e operar os serviços do
                    Vempreender para você.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  5. Pagamentos, Assinatura e Período de Teste
                </h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Período de Teste:</strong> Oferecemos um período de
                    teste gratuito de 7 (sete) dias para contas novas. Caso crie
                    uma nova conta com dados semelhantes, não será concedido o
                    período de teste, necessitando o pagamento das taxas de
                    Implantação e a Mensalidade para a ativação do chatbot.
                  </li>
                  <li>
                    <strong>Cobrança:</strong> Após o término do período de
                    teste de 7 dias, para sua assinatura será ativada mediante a
                    forma de pagamento escolhida, a menos que o serviço seja
                    cancelado por você antes do fim desse período. No primeiro
                    mês você tem dois pagamentos, um referente à Implantação
                    efetiva do seu chatbot automático (cobrada uma única vez) e
                    o segundo referente à Mensalidade recorrente.
                  </li>
                  <li>
                    <strong>Assinatura:</strong> O serviço é cobrado de forma
                    recorrente mensalmente. A renovação é automática.
                  </li>
                  <li>
                    <strong>Cancelamento:</strong> Você pode cancelar sua
                    assinatura a qualquer momento através da área de membros. O
                    cancelamento interromperá as cobranças futuras, mas não
                    haverá reembolso por períodos já pagos. O acesso ao serviço
                    permanecerá ativo até o final do ciclo de faturamento
                    vigente.
                  </li>
                  <li>
                    <strong>Reativação:</strong> Com 30 dias de atraso sua conta
                    é cancelada. Dentro desse período é possível reativar sua
                    conta pagando apenas a Mensalidade e seus encargos. Após os
                    30 dias será preciso pagar por uma nova Implantação além da
                    Mensalidade.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  6. Programa de Afiliados
                </h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    O Usuário pode optar por participar do nosso Programa de
                    Afiliados, cujas regras e percentuais de comissão estão
                    descritos na seção "Afiliados" da Plataforma.
                  </li>
                  <li>
                    É vedado o uso do próprio link na criação do próprio
                    chatbot.
                  </li>
                  <li>
                    O pagamento das comissões está condicionado à confirmação do
                    pagamento pelo cliente indicado e seguirá os prazos e
                    métodos definidos pela Plataforma.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  7. Propriedade Intelectual
                </h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Você retém todos os direitos de propriedade sobre o seu
                    Conteúdo do Usuário.
                  </li>
                  <li>
                    Nós retemos todos os direitos de propriedade sobre a
                    Plataforma Vempreender, incluindo o software, a marca, o
                    design e toda a tecnologia subjacente.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  8. Limitação de Responsabilidade e Garantias
                </h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    O serviço é fornecido "no estado em que se encontra" ("as
                    is"). Não garantimos que o uso do chatbot resultará em um
                    aumento de vendas, retenção de clientes ou qualquer outro
                    resultado comercial específico.
                  </li>
                  <li>
                    Não nos responsabilizamos pela precisão, legalidade ou
                    veracidade das informações fornecidas por você e
                    reproduzidas pelo seu chatbot.
                  </li>
                  <li>
                    Nossa responsabilidade total por quaisquer danos decorrentes
                    destes Termos ou do uso do serviço limita-se ao valor total
                    pago por você no último mês.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">9. Encerramento</h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Podemos suspender ou encerrar sua conta a qualquer momento
                    se você violar estes Termos ou às regras da Legislação da
                    República Federativa do Brasil..
                  </li>
                  <li>
                    Você pode encerrar sua conta a qualquer momento cancelando
                    sua assinatura.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  10. Legislação Aplicável e Foro
                </h2>
                <p>
                  Estes Termos serão regidos e interpretados de acordo com as
                  leis da República Federativa do Brasil. Fica eleito o foro da
                  comarca de São Paulo/SP para dirimir quaisquer controvérsias
                  decorrentes deste documento.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">11. Contato</h2>
                <p>
                  Para qualquer dúvida sobre estes Termos de Uso, entre em
                  contato através do e-mail:{" "}
                  <a
                    href="mailto:vempreender.ia@gmail.com"
                    className="text-primary hover:underline"
                  >
                    vempreender.ia@gmail.com
                  </a>
                  .
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
