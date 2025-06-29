import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
  { href: "#pricing", label: "Pricing" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden text-muted-foreground hover:bg-accent/20 hover:text-foreground md:inline-flex"
          >
            Sign In
          </Button>
          <Button className="font-bold shadow-md shadow-primary/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
