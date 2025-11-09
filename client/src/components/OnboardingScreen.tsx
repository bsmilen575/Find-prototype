import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function OnboardingScreen() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f5f3f0', fontFamily: 'Georgia, Garamond, serif' }} data-testid="onboarding-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <div className="relative w-56 h-56 mb-12" data-testid="sphere-container">
          {/* Suspended shadow */}
          <svg className="absolute" style={{ top: '85%', left: '15%', width: '70%', height: '30%' }}>
            <defs>
              <radialGradient id="shadow-gradient">
                <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
                <stop offset="50%" stopColor="rgba(0,0,0,0.12)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <filter id="shadow-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
              </filter>
            </defs>
            <ellipse cx="50%" cy="45%" rx="45%" ry="18%" fill="url(#shadow-gradient)" filter="url(#shadow-blur)" />
          </svg>

          {/* Main sphere SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.25))' }}>
            <defs>
              {/* Base sphere with color bands gradient */}
              <linearGradient id="sphere-bands" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF7700" />
                <stop offset="12%" stopColor="#FFA030" />
                <stop offset="25%" stopColor="#00D4D4" />
                <stop offset="38%" stopColor="#40E0CC" />
                <stop offset="50%" stopColor="#00B8A0" />
                <stop offset="62%" stopColor="#34495E" />
                <stop offset="75%" stopColor="#00CED1" />
                <stop offset="88%" stopColor="#5FD9CC" />
                <stop offset="100%" stopColor="#40E0D0" />
              </linearGradient>

              {/* 3D sphere shading - darker on edges */}
              <radialGradient id="sphere-3d" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                <stop offset="85%" stopColor="rgba(0,0,0,0.3)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
              </radialGradient>

              {/* Glossy highlight */}
              <radialGradient id="gloss" cx="35%" cy="30%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="20%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>

            {/* Base sphere with color bands */}
            <circle cx="100" cy="100" r="85" fill="url(#sphere-bands)" />

            {/* 3D shading overlay */}
            <circle cx="100" cy="100" r="85" fill="url(#sphere-3d)" />

            {/* Main glossy highlight */}
            <circle cx="100" cy="100" r="85" fill="url(#gloss)" opacity="0.9" />

            {/* Sharp bright highlight spot */}
            <ellipse cx="75" cy="65" rx="28" ry="35" fill="rgba(255,255,255,0.7)" transform="rotate(-20 75 65)" />
            <ellipse cx="75" cy="65" rx="18" ry="22" fill="rgba(255,255,255,0.85)" transform="rotate(-20 75 65)" />
            <ellipse cx="75" cy="65" rx="8" ry="10" fill="rgba(255,255,255,1)" transform="rotate(-20 75 65)" />
          </svg>
        </div>
        
        <h1 style={{ color: '#1a1a1a', textAlign: 'center', marginBottom: '1rem', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '3rem', fontWeight: '600', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' }} data-testid="text-title">
          Find
        </h1>
        <p style={{ color: '#6b6b6b', textAlign: 'center', marginBottom: '3rem', maxWidth: '24rem', paddingLeft: '1rem', paddingRight: '1rem', fontFamily: 'Georgia, Garamond, serif', lineHeight: '1.6' }} data-testid="text-description">
          Discover people or things nearby that you might like.
        </p>
      </div>
      
      <div className="p-6 pb-10 space-y-3">
        <Button 
          className="w-full h-14 rounded-2xl"
          style={{ 
            backgroundColor: '#000000', 
            color: '#ffffff',
            fontFamily: 'Georgia, Garamond, serif'
          }}
          onClick={() => setLocation('/signup')}
          data-testid="button-signup"
        >
          Sign up for Beta
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-14 rounded-2xl"
          style={{ 
            fontFamily: 'Georgia, Garamond, serif',
            borderColor: '#d0d0d0'
          }}
          onClick={() => setLocation('/signup')}
          data-testid="button-signin"
        >
          Sign In
        </Button>
      </div>
      
    </div>
  );
}
