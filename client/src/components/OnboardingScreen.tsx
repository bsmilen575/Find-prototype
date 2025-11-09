import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function OnboardingScreen() {
  const [, setLocation] = useLocation();
  const nodes = [
    { x: 50, y: 15, cluster: 1, intensity: 1 },
    { x: 45, y: 18, cluster: 1, intensity: 0.9 },
    { x: 55, y: 17, cluster: 1, intensity: 0.85 },
    { x: 50, y: 22, cluster: 1, intensity: 0.8 },
    { x: 58, y: 23, cluster: 1, intensity: 0.75 },
    
    { x: 25, y: 30, cluster: 2, intensity: 1 },
    { x: 22, y: 35, cluster: 2, intensity: 0.9 },
    { x: 28, y: 38, cluster: 2, intensity: 0.85 },
    { x: 32, y: 33, cluster: 2, intensity: 0.8 },
    
    { x: 75, y: 28, cluster: 3, intensity: 1 },
    { x: 78, y: 33, cluster: 3, intensity: 0.9 },
    { x: 72, y: 36, cluster: 3, intensity: 0.85 },
    { x: 80, y: 38, cluster: 3, intensity: 0.8 },
    
    { x: 20, y: 50, cluster: 4, intensity: 1 },
    { x: 24, y: 52, cluster: 4, intensity: 0.9 },
    { x: 18, y: 55, cluster: 4, intensity: 0.85 },
    { x: 28, y: 54, cluster: 4, intensity: 0.8 },
    
    { x: 48, y: 48, cluster: 5, intensity: 1 },
    { x: 52, y: 50, cluster: 5, intensity: 0.95 },
    { x: 50, y: 53, cluster: 5, intensity: 0.9 },
    
    { x: 75, y: 50, cluster: 6, intensity: 1 },
    { x: 78, y: 54, cluster: 6, intensity: 0.9 },
    { x: 72, y: 56, cluster: 6, intensity: 0.85 },
    { x: 80, y: 52, cluster: 6, intensity: 0.8 },
    
    { x: 30, y: 68, cluster: 7, intensity: 1 },
    { x: 26, y: 72, cluster: 7, intensity: 0.9 },
    { x: 34, y: 73, cluster: 7, intensity: 0.85 },
    { x: 28, y: 76, cluster: 7, intensity: 0.8 },
    
    { x: 50, y: 75, cluster: 8, intensity: 1 },
    { x: 48, y: 78, cluster: 8, intensity: 0.9 },
    { x: 53, y: 79, cluster: 8, intensity: 0.85 },
    
    { x: 68, y: 70, cluster: 9, intensity: 1 },
    { x: 72, y: 73, cluster: 9, intensity: 0.9 },
    { x: 65, y: 75, cluster: 9, intensity: 0.85 },
    
    { x: 38, y: 25, cluster: 10, intensity: 0.7 },
    { x: 62, y: 42, cluster: 10, intensity: 0.7 },
    { x: 42, y: 60, cluster: 10, intensity: 0.7 },
    { x: 58, y: 65, cluster: 10, intensity: 0.7 },
    { x: 35, y: 48, cluster: 10, intensity: 0.7 },
    { x: 65, y: 58, cluster: 10, intensity: 0.7 },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [2, 4], [3, 4],
    [5, 6], [5, 7], [5, 8], [6, 7], [7, 8],
    [9, 10], [9, 11], [9, 12], [10, 11], [11, 12],
    [13, 14], [13, 15], [13, 16], [14, 16], [15, 16],
    [17, 18], [17, 19], [18, 19],
    [20, 21], [20, 22], [20, 23], [21, 22], [22, 23],
    [24, 25], [24, 26], [24, 27], [25, 26], [26, 27],
    [28, 29], [28, 30], [29, 30],
    [31, 32], [31, 33], [32, 33],
    
    [0, 34], [34, 5], [2, 9], [4, 35],
    [5, 13], [8, 38], [8, 17],
    [9, 35], [12, 20], [11, 35],
    [13, 17], [14, 38], [16, 36],
    [17, 20], [17, 36], [18, 35], [19, 36],
    [20, 39], [22, 35], [23, 39],
    [24, 36], [24, 38], [25, 28],
    [26, 37], [27, 28],
    [28, 37], [30, 31], [30, 37],
    [31, 39], [33, 39],
    
    [0, 9], [2, 20], [4, 12],
    [5, 24], [7, 17], [9, 28],
    [13, 24], [17, 28], [20, 31],
    [3, 34], [10, 35], [14, 36],
    [29, 37], [15, 38], [21, 39],
  ];
  
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
          
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {connections.map(([startIdx, endIdx], idx) => {
              const start = nodes[startIdx];
              const end = nodes[endIdx];
              const avgIntensity = (start.intensity + end.intensity) / 2;
              return (
                <line
                  key={`line-${idx}`}
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="1"
                  opacity={avgIntensity * 0.5}
                  filter="url(#glow)"
                  style={{
                    animation: `pulse ${2 + Math.random()}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              );
            })}
            
            {nodes.map((node, idx) => (
              <g key={`node-${idx}`}>
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r="7"
                  fill="rgba(255, 255, 255, 0.15)"
                  opacity={node.intensity * 0.7}
                  filter="url(#nodeGlow)"
                  style={{
                    animation: `pulse ${1.5 + Math.random() * 0.5}s ease-in-out infinite`,
                    animationDelay: `${Math.random()}s`
                  }}
                />
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r="3.5"
                  fill="white"
                  opacity={node.intensity * 0.95}
                  filter="url(#nodeGlow)"
                  style={{
                    animation: `pulse ${1.5 + Math.random() * 0.5}s ease-in-out infinite`,
                    animationDelay: `${Math.random()}s`
                  }}
                />
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r="1.5"
                  fill="white"
                  opacity={1}
                />
              </g>
            ))}
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
      
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
