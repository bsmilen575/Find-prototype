import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { User, MapPin, Settings } from "lucide-react";
import { useLocation } from "wouter";

export function Header() {
  const [, setLocation] = useLocation();

  return (
    <header className="border-b backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setLocation("/home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
          >
            <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Find</span>
          </button>

          <nav className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation("/settings")}
              data-testid="button-settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation("/profile/me")}
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
