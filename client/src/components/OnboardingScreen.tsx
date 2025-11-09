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
              {/* Spherical gradient mask for 3D effect */}
              <radialGradient id="sphere-mask" cx="50%" cy="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="85%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>

              {/* Main specular highlight - very bright */}
              <radialGradient id="main-highlight" cx="35%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* 3D sphere shading */}
              <radialGradient id="sphere-shading" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="50%" stopColor="transparent" />
                <stop offset="85%" stopColor="#000000" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
              </radialGradient>

              {/* Light refraction glow */}
              <filter id="glow-filter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
              </filter>
            </defs>

            {/* Horizontal color bands (from top to bottom of sphere) */}
            
            {/* Top band - Bright Orange/Amber */}
            <ellipse cx="100" cy="40" rx="75" ry="18" fill="#FF7700" opacity="0.95" />
            <ellipse cx="100" cy="40" rx="75" ry="18" fill="url(#sphere-shading)" />
            
            {/* Upper band - Yellow/Orange blend */}
            <ellipse cx="100" cy="55" rx="82" ry="20" fill="#FFA030" opacity="0.95" />
            <ellipse cx="100" cy="55" rx="82" ry="20" fill="url(#sphere-shading)" />
            
            {/* Upper-middle - Cyan/Turquoise */}
            <ellipse cx="100" cy="75" rx="85" ry="22" fill="#00D4D4" opacity="0.95" />
            <ellipse cx="100" cy="75" rx="85" ry="22" fill="url(#sphere-shading)" />
            
            {/* Center-top - Bright Teal */}
            <ellipse cx="100" cy="95" rx="85" ry="20" fill="#40E0CC" opacity="0.95" />
            <ellipse cx="100" cy="95" rx="85" ry="20" fill="url(#sphere-shading)" />
            
            {/* Center - Deep Teal/Green */}
            <ellipse cx="100" cy="110" rx="85" ry="18" fill="#00B8A0" opacity="0.95" />
            <ellipse cx="100" cy="110" rx="85" ry="18" fill="url(#sphere-shading)" />
            
            {/* Center-bottom - Dark Charcoal band */}
            <ellipse cx="100" cy="125" rx="83" ry="16" fill="#34495E" opacity="0.95" />
            <ellipse cx="100" cy="125" rx="83" ry="16" fill="url(#sphere-shading)" />
            
            {/* Lower-middle - Bright Cyan */}
            <ellipse cx="100" cy="140" rx="80" ry="18" fill="#00CED1" opacity="0.95" />
            <ellipse cx="100" cy="140" rx="80" ry="18" fill="url(#sphere-shading)" />
            
            {/* Lower - Turquoise */}
            <ellipse cx="100" cy="155" rx="72" ry="16" fill="#5FD9CC" opacity="0.95" />
            <ellipse cx="100" cy="155" rx="72" ry="16" fill="url(#sphere-shading)" />
            
            {/* Bottom band - Bright Teal */}
            <ellipse cx="100" cy="168" rx="60" ry="14" fill="#40E0D0" opacity="0.95" />
            <ellipse cx="100" cy="168" rx="60" ry="14" fill="url(#sphere-shading)" />

            {/* Circular mask to create sphere shape */}
            <circle cx="100" cy="100" r="85" fill="url(#sphere-mask)" style={{ mixBlendMode: 'destination-in' }} />

            {/* Main glossy highlight - super bright like acrylic */}
            <circle cx="100" cy="100" r="85" fill="url(#main-highlight)" filter="url(#glow-filter)" />
            
            {/* Sharp highlight spot */}
            <ellipse cx="75" cy="65" rx="25" ry="32" fill="rgba(255,255,255,0.85)" filter="url(#glow-filter)" transform="rotate(-20 75 65)" />
            <ellipse cx="75" cy="65" rx="14" ry="18" fill="rgba(255,255,255,0.95)" transform="rotate(-20 75 65)" />
            <ellipse cx="75" cy="65" rx="6" ry="8" fill="#ffffff" transform="rotate(-20 75 65)" />
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
