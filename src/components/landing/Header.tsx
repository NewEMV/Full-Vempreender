import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
    { href: "/#inicio", label: "Início" },
    { href: "/#solucoes", label: "Soluções" },
    { href: "/#como-funciona", label: "Como Funciona" },
    { href: "/#atraia-clientes", label: "Atraia Clientes" },
    { href: "/#nosso-plano", label: "Planos" },
    { href: "/#depoimentos", label: "Depoimentos" },
    { href: "/blog", label: "Blog" },
    { href: "/#afiliados", label: "Afiliados" },
    { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const authUrl = "https://lpcba.vempreender.com.br/auth.html";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/60 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-24">
        <Link href="/">
          <Logo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <div className="flex items-center space-x-4 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button
              variant="ghost"
              className="text-muted-foreground hover:bg-accent/20 hover:text-foreground"
              asChild
          >
              <Link href={authUrl} target="_blank" rel="noopener noreferrer">Login</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <Link href="/">
                    <Logo />
                  </Link>
                </div>
                <nav className="flex flex-col gap-6 text-lg font-medium">
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
                <div className="mt-auto border-t pt-6">
                   <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:bg-accent/20 hover:text-foreground text-lg"
                      asChild
                    >
                      <Link href={authUrl} target="_blank" rel="noopener noreferrer">Login</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
