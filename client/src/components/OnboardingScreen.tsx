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
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' }}>
            <defs>
              {/* Layered color bands - like acrylic obelisk */}
              <linearGradient id="color-bands" x1="0%" y1="0%" x2="0%" y2="100%">
                {/* Top - vibrant orange/amber */}
                <stop offset="0%" stopColor="#FF8C00" />
                <stop offset="15%" stopColor="#FF6B00" />
                <stop offset="20%" stopColor="#FFA500" />
                
                {/* Upper middle - cyan/turquoise transition */}
                <stop offset="25%" stopColor="#00CED1" />
                <stop offset="35%" stopColor="#40E0D0" />
                <stop offset="40%" stopColor="#00D9C9" />
                
                {/* Middle - teal/green */}
                <stop offset="45%" stopColor="#00B8A9" />
                <stop offset="55%" stopColor="#5FD9C7" />
                <stop offset="60%" stopColor="#48D1C7" />
                
                {/* Lower middle - dark accent band */}
                <stop offset="65%" stopColor="#2C3E50" />
                <stop offset="70%" stopColor="#1A252F" />
                
                {/* Bottom - bright cyan/teal */}
                <stop offset="75%" stopColor="#00CED1" />
                <stop offset="85%" stopColor="#5FD9C7" />
                <stop offset="100%" stopColor="#40E0D0" />
              </linearGradient>

              {/* Radial overlay for 3D depth */}
              <radialGradient id="sphere-depth" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="85%" stopColor="#000000" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
              </radialGradient>

              {/* Glossy specular highlight */}
              <radialGradient id="gloss-highlight" cx="32%" cy="28%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Secondary reflection */}
              <radialGradient id="secondary-gloss" cx="65%" cy="35%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Edge rim light */}
              <radialGradient id="rim-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="70%" stopColor="transparent" />
                <stop offset="88%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
              </radialGradient>

              {/* Blur filter for soft glow */}
              <filter id="soft-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
              </filter>
            </defs>

            {/* Base colored sphere with vertical bands */}
            <circle cx="100" cy="100" r="85" fill="url(#color-bands)" opacity="0.9" />

            {/* 3D depth shading */}
            <circle cx="100" cy="100" r="85" fill="url(#sphere-depth)" />

            {/* Edge rim lighting */}
            <circle cx="100" cy="100" r="85" fill="url(#rim-glow)" />

            {/* Main glossy highlight */}
            <circle cx="100" cy="100" r="85" fill="url(#gloss-highlight)" filter="url(#soft-blur)" />

            {/* Secondary reflection */}
            <circle cx="100" cy="100" r="85" fill="url(#secondary-gloss)" />

            {/* Sharp bright highlight spot */}
            <ellipse cx="72" cy="68" rx="20" ry="26" fill="rgba(255,255,255,0.9)" filter="url(#soft-blur)" transform="rotate(-22 72 68)" />
            <ellipse cx="72" cy="68" rx="10" ry="14" fill="rgba(255,255,255,1)" transform="rotate(-22 72 68)" />
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
