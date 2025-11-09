import { Button } from '@/components/ui/button';

export function OnboardingScreen() {
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
        <div className="relative w-48 h-48 mb-12" data-testid="sphere-container">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 25%, 
                  #ffffff 0%, 
                  #fafafa 5%, 
                  #efefef 10%, 
                  #e0e0e0 15%, 
                  #d0d0d0 20%, 
                  #c0c0c0 25%, 
                  #b0b0b0 30%, 
                  #a0a0a0 35%, 
                  #909090 40%, 
                  #808080 45%, 
                  #707070 50%, 
                  #606060 55%, 
                  #505050 60%, 
                  #404040 70%, 
                  #303030 80%, 
                  #202020 90%, 
                  #151515 100%
                )
              `,
              boxShadow: `
                inset -35px -35px 70px rgba(0, 0, 0, 0.6),
                inset 15px 15px 25px rgba(255, 255, 255, 0.5),
                inset -3px -3px 10px rgba(0, 0, 0, 0.4),
                inset 1px 1px 3px rgba(255, 255, 255, 0.6),
                -20px 20px 40px rgba(0, 0, 0, 0.35),
                20px -20px 35px rgba(255, 255, 255, 0.15),
                0 35px 70px rgba(0, 0, 0, 0.25)
              `,
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              top: '12%',
              left: '18%',
              width: '45%',
              height: '45%',
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 15%, rgba(255, 255, 255, 0.7) 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
              filter: 'blur(0.3px)',
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              top: '18%',
              left: '24%',
              width: '20%',
              height: '20%',
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.5) 40%, transparent 60%)',
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              top: '35%',
              left: '8%',
              width: '55%',
              height: '18%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.5) 75%, transparent 100%)',
              filter: 'blur(1.5px)',
              transform: 'rotate(-22deg)',
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              bottom: '18%',
              right: '15%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle at center, rgba(200, 200, 200, 0.4) 0%, rgba(180, 180, 180, 0.25) 35%, transparent 70%)',
              filter: 'blur(5px)',
            }}
          />
          
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, 
                  transparent 58%, 
                  rgba(255, 255, 255, 0.35) 68%, 
                  rgba(255, 255, 255, 0.2) 75%,
                  rgba(255, 255, 255, 0.1) 80%,
                  transparent 87%
                )
              `,
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              top: '55%',
              left: '25%',
              width: '35%',
              height: '12%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.35) 60%, transparent 100%)',
              filter: 'blur(2px)',
              transform: 'rotate(-30deg)',
            }}
          />
          
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
