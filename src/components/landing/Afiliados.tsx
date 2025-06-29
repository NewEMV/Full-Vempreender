import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";

export default function Afiliados() {
  return (
    <section id="afiliados" className="py-20 md:py-32 bg-background/50">
      <div className="container mx-auto px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Indique Vempreender e Ganhe: Programa de Afiliados
          </h2>
          <p className="mt-10 text-lg font-normal text-muted-foreground sm:text-xl">
            Ajude outros empreendedores a transformar o atendimento com Vempreender e gere uma renda extra. Conheça nosso Programa de Afiliados!
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-xl bg-card p-8 text-center border border-border">
          <Handshake className="mx-auto h-12 w-12 text-primary" />
          <h3 className="mt-6 text-2xl font-bold text-foreground">Lucre Ajudando Outros Negócios</h3>
          <p className="mt-2 text-muted-foreground">
            Promova uma solução que funciona! Indique Vempreender e receba 50% da taxa de Implantação por cada novo cliente.
          </p>
          <div className="my-6 rounded-lg bg-primary/10 p-4">
            <p className="text-2xl font-bold text-primary">
              São R$ 200,00 por indicação convertida!
            </p>
            <p className="text-sm text-primary/80">
              Pagamento transparente 30 dias após a confirmação do cliente.
            </p>
          </div>
          <Button size="lg" className="text-base font-bold">Quero Ser Afiliado!</Button>
        </div>
      </div>
    </section>
  );
}
