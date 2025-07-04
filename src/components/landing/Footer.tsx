
import Logo from "@/components/icons/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:px-24 sm:flex-row">
        <Logo />
        <div className="text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <Link href="/politica-de-privacidade" className="hover:text-foreground">Política de Privacidade</Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/termos-de-uso" className="hover:text-foreground">Termos de Uso</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; Vempreender {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
