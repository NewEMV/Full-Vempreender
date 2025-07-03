import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navLinks = [
    { href: "/#inicio", label: "Início" },
    { href: "/#como-funciona", label: "Como Funciona" },
    { href: "/#atraia-clientes", label: "Atraia Clientes" },
    { href: "/#nosso-plano", label: "Nosso Plano" },
    { href: "/#depoimentos", label: "Depoimentos" },
    { href: "/blog", label: "Blog" },
    { href: "/#afiliados", label: "Afiliados" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/60 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-24">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center space-x-4 text-base font-medium lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:bg-accent/20 hover:text-foreground"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
