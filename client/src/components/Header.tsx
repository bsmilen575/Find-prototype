import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { MapPin, User } from "lucide-react";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">Find</span>
            </a>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/about">
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </Link>
            <ThemeToggle />
            <Button variant="ghost" size="icon" data-testid="button-profile">
              <User className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
