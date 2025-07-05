
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PoliticaDePrivacidadePage() {
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
                Política de Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/90">
              <p className="text-sm text-muted-foreground">
                Última atualização: 04/07/2025
              </p>
              <p>
                Bem-vindo à Política de Privacidade do Vempreender (aqui
                referido como "nós", "nosso" ou "Plataforma"). Esta política
                descreve como coletamos, usamos, armazenamos, compartilhamos e
                protegemos suas informações pessoais. Ao criar uma conta e
                utilizar nossos serviços, você concorda com as práticas
                descritas neste documento.
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  1. Quais Dados Coletamos?
                </h2>
                <p>
                  Para fornecer nossos serviços, coletamos os seguintes tipos de
                  informações:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Dados de Cadastro:</strong> Nome completo, e-mail,
                    data de nascimento, número de WhatsApp, senha de acesso. Se o
                    login for via Google, coletamos as informações fornecidas
                    pela plataforma Google (nome, e-mail, foto de perfil).
                  </li>
                  <li>
                    <strong>Dados da Empresa e do Negócio:</strong> Nome da
                    empresa, CNPJ ou CPF, endereço completo (rua, número,
                    complemento, bairro, cidade, estado, CEP), nicho de
                    trabalho, horário de funcionamento e formas de pagamento
                    aceitas.
                  </li>
                  <li>
                    <strong>
                      Dados para Configuração do Chatbot (Base de Conhecimento):
                    </strong>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li><strong>Personalidade do Bot:</strong> Nome do atendente virtual, tom de conversa, humor e saudação preferida.</li>
                        <li><strong>Serviços:</strong> Títulos e descrições dos serviços ou produtos que você oferece.</li>
                        <li><strong>FAQs:</strong> Perguntas e respostas frequentes sobre seu negócio.</li>
                        <li><strong>Palavras-Chave Negativas:</strong> Termos que o chatbot deve evitar.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Dados de Pagamento:</strong> Informações do seu
                    cartão de crédito, que são coletadas e processadas
                    diretamente pelo nosso parceiro de pagamentos, a Asaas. Nós
                    não armazenamos os dados completos do seu cartão de crédito
                    em nossos servidores.
                  </li>
                  <li>
                    <strong>Dados do Programa de Afiliados:</strong> Nome e
                    WhatsApp dos contatos que você indica para obter descontos,
                    e seus dados para gestão da sua conta de afiliado.
                  </li>
                  <li>
                    <strong>Dados de Uso e Técnicos:</strong> Endereço IP, tipo
                    de navegador, sistema operacional e informações sobre como
                    você interage com nossa plataforma.
                  </li>
                  <li>
                    <strong>Cookies:</strong> Usamos cookies para melhorar a
                    experiência de navegação, autenticação e análise de uso da
                    plataforma.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  2. Como Utilizamos Seus Dados?
                </h2>
                <p>
                  Seus dados são a matéria-prima para o funcionamento da
                  Plataforma. Nós os utilizamos para:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Criar e Gerenciar sua Conta:</strong> Autenticar seu
                    acesso e manter seu perfil.
                  </li>
                  <li>
                    <strong>Construir seu Chatbot:</strong> Utilizar os dados da
                    sua empresa, serviços e FAQs para treinar e operar o seu
                    atendente de IA personalizado.
                  </li>
                  <li>
                    <strong>Fornecer o Serviço:</strong> Permitir que seus
                    clientes (leads) interajam com seu chatbot.
                  </li>
                  <li>
                    <strong>Processar Pagamentos:</strong> Gerenciar sua
                    assinatura, período de teste e cobranças através da Asaas.
                  </li>
                  <li>
                    <strong>Enviar Notificações:</strong> Enviar resumos e
                    transcrições de conversas para seu e-mail e WhatsApp,
                    conforme o serviço contratado.
                  </li>
                  <li>
                    <strong>Gerenciar o Programa de Afiliados:</strong> Validar
                    indicações para aplicação de descontos.
                  </li>
                  <li>
                    <strong>Melhorar a Plataforma:</strong> Analisar dados de
                    uso de forma anonimizada para aprimorar nossos serviços.
                  </li>
                  <li>
                    <strong>Comunicação:</strong> Entrar em contato com você
                    para suporte técnico ou informações importantes sobre sua
                    conta.
                  </li>
                </ul>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  3. Com Quem Compartilhamos Seus Dados?
                </h2>
                <p>
                  Nós não vendemos suas informações pessoais. O compartilhamento
                  ocorre apenas com operadores e parceiros essenciais para a
                  prestação do serviço:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                    <li><strong>Firebase (Google):</strong> Para armazenamento seguro dos dados do formulário (Firestore) e autenticação de usuários.</li>
                    <li><strong>OpenAI:</strong> A base de conhecimento que você fornece é utilizada para processar as perguntas dos seus leads e gerar respostas através da API da OpenAI.</li>
                    <li><strong>Asaas:</strong> Para processamento seguro de pagamentos e gestão de assinaturas.</li>
                    <li><strong>Evolution API:</strong> Para o envio das notificações de resumo de conversa para o seu número de WhatsApp.</li>
                    <li><strong>n8n e Qdrant:</strong> Ferramentas de automação e vetorização de dados usadas no nosso backend para criar e operar os chatbots.</li>
                    <li><strong>Autoridades Legais:</strong> Em caso de obrigação legal ou ordem judicial.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  4. Armazenamento e Segurança dos Dados
                </h2>
                <p>
                    Seus dados são armazenados em servidores de nuvem seguros (Firebase/Google Cloud) e protegidos com as melhores práticas de segurança digital, incluindo criptografia. As conversas entre seus leads e o chatbot são armazenadas temporariamente em nosso banco de dados (Supabase/Postgres) e são purgadas (apagadas) periodicamente após o envio do resumo e transcrição, conforme descrito nos Termos de Uso.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  5. Seus Direitos como Titular dos Dados (LGPD)
                </h2>
                <p>Você, como titular dos dados, tem o direito de:</p>
                <ul className="list-disc space-y-2 pl-6">
                    <li>Confirmar a existência de tratamento de seus dados.</li>
                    <li>Acessar seus dados.</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                    <li>Solicitar a portabilidade dos seus dados a outro fornecedor.</li>
                    <li>Eliminar os dados tratados com o seu consentimento.</li>
                    <li>Obter informações sobre as entidades com as quais compartilhamos seus dados.</li>
                    <li>Revogar seu consentimento a qualquer momento.</li>
                </ul>
                <p>Para exercer seus direitos, entre em contato conosco através do e-mail: <a href="mailto:contato@vempreender.com.br" className="text-primary hover:underline">contato@vempreender.com.br</a>.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  6. Alterações na Política de Privacidade
                </h2>
                <p>
                    Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações significativas através de e-mail ou por um aviso em nossa plataforma.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Contato</h2>
                <p>
                  Se tiver qualquer dúvida sobre esta política, entre em contato
                  com o Controlador de Dados: [Nome da Sua Empresa ou Seu Nome
                  Completo] CNPJ/CPF: 135.499.508-29 E-mail:{" "}
                  <a
                    href="mailto:contato@vempreender.com.br"
                    className="text-primary hover:underline"
                  >
                    contato@vempreender.com.br
                  </a>
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
