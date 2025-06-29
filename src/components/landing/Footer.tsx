import { Github, Twitter, Linkedin } from "lucide-react";
import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Vempreender AI. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
