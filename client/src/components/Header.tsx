import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { User, MapPin } from "lucide-react";
import { useLocation } from "wouter";

export function Header() {
  const [, setLocation] = useLocation();

  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
          >
            <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Find</span>
          </button>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => setLocation("/about")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
            >
              About
            </button>
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
