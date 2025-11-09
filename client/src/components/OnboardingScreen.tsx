import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import sphereImage from '@assets/Find sphere 2_1762667909204.png';

export function OnboardingScreen() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f5f3f0', fontFamily: 'Georgia, Garamond, serif' }} data-testid="onboarding-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <div className="relative w-56 h-56 mb-12" data-testid="sphere-container">
          <img 
            src={sphereImage} 
            alt="Find sphere" 
            className="w-full h-full object-contain"
          />
          
          {/* Glowing network overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
            <defs>
              {/* Glow filter for network */}
              <filter id="network-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* Animated glow pulse */}
              <filter id="pulse-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Network connections - thin lines connecting nodes */}
            <g opacity="0.4" stroke="#00d9ff" strokeWidth="0.5" fill="none" filter="url(#network-glow)">
              {/* Horizontal connections */}
              <path d="M 40,60 Q 100,58 160,60" />
              <path d="M 30,100 Q 100,100 170,100" />
              <path d="M 40,140 Q 100,142 160,140" />
              
              {/* Vertical connections */}
              <path d="M 60,30 Q 58,100 60,170" />
              <path d="M 100,20 Q 100,100 100,180" />
              <path d="M 140,30 Q 142,100 140,170" />
              
              {/* Diagonal connections */}
              <path d="M 45,45 Q 100,100 155,155" />
              <path d="M 155,45 Q 100,100 45,155" />
              
              {/* Curved connections wrapping around sphere */}
              <path d="M 70,50 Q 100,45 130,50" />
              <path d="M 50,70 Q 45,100 50,130" />
              <path d="M 130,150 Q 100,155 70,150" />
              <path d="M 150,130 Q 155,100 150,70" />
            </g>

            {/* Network nodes - glowing dots at intersections */}
            <g filter="url(#pulse-glow)">
              {/* Top nodes */}
              <circle cx="60" cy="60" r="2" fill="#00d9ff" opacity="0.8" />
              <circle cx="100" cy="55" r="2.5" fill="#00ffcc" opacity="0.9" />
              <circle cx="140" cy="60" r="2" fill="#00d9ff" opacity="0.8" />
              
              {/* Middle ring nodes */}
              <circle cx="40" cy="100" r="2" fill="#66ffee" opacity="0.7" />
              <circle cx="100" cy="100" r="3" fill="#00ffcc" opacity="1">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="160" cy="100" r="2" fill="#66ffee" opacity="0.7" />
              
              {/* Bottom nodes */}
              <circle cx="60" cy="140" r="2" fill="#00d9ff" opacity="0.8" />
              <circle cx="100" cy="145" r="2.5" fill="#00ffcc" opacity="0.9" />
              <circle cx="140" cy="140" r="2" fill="#00d9ff" opacity="0.8" />
              
              {/* Side nodes */}
              <circle cx="70" cy="80" r="1.5" fill="#66ffee" opacity="0.6" />
              <circle cx="130" cy="80" r="1.5" fill="#66ffee" opacity="0.6" />
              <circle cx="70" cy="120" r="1.5" fill="#66ffee" opacity="0.6" />
              <circle cx="130" cy="120" r="1.5" fill="#66ffee" opacity="0.6" />
            </g>
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
