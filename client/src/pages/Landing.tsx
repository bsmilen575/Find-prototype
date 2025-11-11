import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import findLogo from '@assets/Find_logo-removebg-preview_1762715955146.png';

export default function Landing() {
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();

  const handleInstall = async () => {
    await promptInstall();
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col" style={{ backgroundColor: '#f5f3f0', fontFamily: 'Georgia, Garamond, serif' }} data-testid="landing-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <div className="relative w-72 h-auto mb-12" data-testid="logo-container">
          <img 
            src={findLogo} 
            alt="Find Logo" 
            className="w-full h-auto"
            data-testid="img-logo"
          />
        </div>
        
        <h1 style={{ color: '#1a1a1a', textAlign: 'center', marginBottom: '1rem', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '3rem', fontWeight: '600', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' }} data-testid="text-title">
          Find
        </h1>
        <p style={{ color: '#6b6b6b', textAlign: 'center', marginBottom: '3rem', maxWidth: '24rem', paddingLeft: '1rem', paddingRight: '1rem', fontFamily: 'Georgia, Garamond, serif', lineHeight: '1.6' }} data-testid="text-description">
          Discover people or things nearby that you might like.
        </p>
      </div>
      
      <div className="p-6 pb-10 space-y-3">
        {canInstall && (
          <Button 
            variant="outline"
            className="w-full h-14 rounded-2xl gap-2"
            style={{ 
              fontFamily: 'Georgia, Garamond, serif',
              borderColor: '#d0d0d0'
            }}
            onClick={handleInstall}
            data-testid="button-install-app"
          >
            <Download className="w-5 h-5" />
            Install App
          </Button>
        )}
        <Button 
          className="w-full h-14 rounded-2xl"
          style={{ 
            backgroundColor: '#000000', 
            color: '#ffffff',
            fontFamily: 'Georgia, Garamond, serif'
          }}
          onClick={() => window.location.href = "/api/login"}
          data-testid="button-login"
        >
          Get Started
        </Button>
        {isInstalled && (
          <p className="text-center text-sm text-gray-500" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
            App installed - Sign in to continue
          </p>
        )}
      </div>
    </div>
  );
}
