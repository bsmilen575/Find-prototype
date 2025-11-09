import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function OnboardingScreen() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f5f3f0', fontFamily: 'Georgia, Garamond, serif' }} data-testid="onboarding-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <div className="relative w-56 h-56 mb-12" data-testid="sphere-container">
          {/* Smooth acrylic sphere - no section lines, no background */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <defs>
              {/* Smooth color bands gradient - no hard edges */}
              <linearGradient id="sphere-colors" x1="0%" y1="0%" x2="0%" y2="100%">
                {/* Top - Orange/Amber */}
                <stop offset="0%" stopColor="#FF8C42" />
                <stop offset="8%" stopColor="#FFB366" />
                
                {/* Upper - Cyan/Turquoise transition */}
                <stop offset="18%" stopColor="#5DD9D2" />
                <stop offset="28%" stopColor="#00CED1" />
                
                {/* Middle-upper - Teal */}
                <stop offset="38%" stopColor="#40E0D0" />
                <stop offset="48%" stopColor="#00B8A9" />
                
                {/* Center - Dark charcoal band */}
                <stop offset="55%" stopColor="#8B7E74" />
                <stop offset="62%" stopColor="#5D4E47" />
                
                {/* Middle-lower - Pink/Mauve */}
                <stop offset="70%" stopColor="#E8A0BF" />
                <stop offset="78%" stopColor="#C17799" />
                
                {/* Lower - Bright Cyan */}
                <stop offset="85%" stopColor="#5DD9D2" />
                
                {/* Bottom - Yellow accent */}
                <stop offset="92%" stopColor="#FFD95A" />
                <stop offset="100%" stopColor="#FFB347" />
              </linearGradient>

              {/* 3D sphere shading - creates depth */}
              <radialGradient id="sphere-depth" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="70%" stopColor="rgba(0,0,0,0)" />
                <stop offset="88%" stopColor="rgba(0,0,0,0.35)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
              </radialGradient>

              {/* Main glossy highlight - acrylic look */}
              <radialGradient id="acrylic-gloss" cx="35%" cy="28%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="10%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="25%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="70%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>

              {/* Secondary reflection */}
              <radialGradient id="reflection" cx="65%" cy="40%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>

              {/* Soft blur for highlights */}
              <filter id="soft-glow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
              </filter>
            </defs>

            {/* Base colored sphere with smooth gradient bands */}
            <circle cx="100" cy="100" r="85" fill="url(#sphere-colors)" />

            {/* 3D depth shading overlay */}
            <circle cx="100" cy="100" r="85" fill="url(#sphere-depth)" />

            {/* Main glossy acrylic highlight */}
            <circle cx="100" cy="100" r="85" fill="url(#acrylic-gloss)" opacity="0.95" />

            {/* Secondary reflection */}
            <circle cx="100" cy="100" r="85" fill="url(#reflection)" />

            {/* Sharp bright specular highlight */}
            <ellipse cx="70" cy="60" rx="30" ry="38" fill="rgba(255,255,255,0.75)" filter="url(#soft-glow)" transform="rotate(-18 70 60)" />
            <ellipse cx="70" cy="60" rx="20" ry="25" fill="rgba(255,255,255,0.9)" transform="rotate(-18 70 60)" />
            <ellipse cx="70" cy="60" rx="10" ry="13" fill="rgba(255,255,255,1)" transform="rotate(-18 70 60)" />
            
            {/* Smaller edge highlights for extra gloss */}
            <ellipse cx="130" cy="80" rx="8" ry="12" fill="rgba(255,255,255,0.5)" transform="rotate(25 130 80)" />
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
