
import Logo from "@/components/icons/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-24 sm:flex-row">
        <Logo />
        <div className="text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <a href="#" className="hover:text-foreground">Política de Privacidade</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-foreground">Termos de Uso</a>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; Vempreender {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
