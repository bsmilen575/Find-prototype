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
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}>
            <defs>
              {/* Base translucent gradient - neutral with warm/cool undertones */}
              <radialGradient id="base-sphere" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#fdf8f3" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#fefaf6" stopOpacity="0.88" />
                <stop offset="70%" stopColor="#fcf6f1" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#f9f2ed" stopOpacity="0.6" />
              </radialGradient>

              {/* Iridescent layer 1 - warm tones (orange/yellow) */}
              <radialGradient id="warm-gradient" cx="30%" cy="35%">
                <stop offset="0%" stopColor="#ffad5e" stopOpacity="0" />
                <stop offset="25%" stopColor="#ffad5e" stopOpacity="0.35" />
                <stop offset="45%" stopColor="#ffe996" stopOpacity="0.25" />
                <stop offset="75%" stopColor="#ffc875" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffad5e" stopOpacity="0" />
              </radialGradient>

              {/* Iridescent layer 2 - cool tones (cyan/teal) */}
              <radialGradient id="cool-gradient" cx="65%" cy="55%">
                <stop offset="0%" stopColor="#74e2ff" stopOpacity="0" />
                <stop offset="20%" stopColor="#74e2ff" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#5cd4e8" stopOpacity="0.35" />
                <stop offset="65%" stopColor="#89e0f5" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#74e2ff" stopOpacity="0" />
              </radialGradient>

              {/* Iridescent layer 3 - pink/purple accent */}
              <radialGradient id="accent-gradient" cx="45%" cy="65%">
                <stop offset="0%" stopColor="#d48bff" stopOpacity="0" />
                <stop offset="25%" stopColor="#ff9ed4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#d48bff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#d48bff" stopOpacity="0" />
              </radialGradient>

              {/* Specular highlight - bright spot */}
              <radialGradient id="highlight-top" cx="32%" cy="28%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Secondary highlight */}
              <radialGradient id="highlight-secondary" cx="68%" cy="32%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Rim lighting effect */}
              <radialGradient id="rim-light" cx="50%" cy="50%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="75%" stopColor="transparent" />
                <stop offset="85%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="92%" stopColor="rgba(255,255,255,0.25)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </radialGradient>

              {/* Gaussian blur for soft effects */}
              <filter id="soft-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
              </filter>

              <filter id="subtle-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
              </filter>
            </defs>

            {/* Base sphere with translucent neutral gradient */}
            <circle cx="100" cy="100" r="85" fill="url(#base-sphere)" />

            {/* Iridescent layers */}
            <circle cx="100" cy="100" r="85" fill="url(#warm-gradient)" opacity="0.75" style={{ mixBlendMode: 'screen' }} />
            <circle cx="100" cy="100" r="85" fill="url(#cool-gradient)" opacity="0.7" style={{ mixBlendMode: 'screen' }} />
            <circle cx="100" cy="100" r="85" fill="url(#accent-gradient)" opacity="0.65" style={{ mixBlendMode: 'screen' }} />

            {/* Rim lighting */}
            <circle cx="100" cy="100" r="85" fill="url(#rim-light)" />

            {/* Specular highlights */}
            <circle cx="100" cy="100" r="85" fill="url(#highlight-top)" filter="url(#subtle-blur)" />
            <circle cx="100" cy="100" r="85" fill="url(#highlight-secondary)" filter="url(#soft-glow)" />

            {/* Sharp highlight accent */}
            <ellipse cx="75" cy="70" rx="22" ry="28" fill="rgba(255,255,255,0.85)" filter="url(#subtle-blur)" transform="rotate(-25 75 70)" />
            <ellipse cx="75" cy="70" rx="12" ry="16" fill="rgba(255,255,255,0.95)" transform="rotate(-25 75 70)" />
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
