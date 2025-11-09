import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import sphereImage from '@assets/Find sphere 2_1762667909204.png';

export function OnboardingScreen() {
  const [, setLocation] = useLocation();
  
  // More comprehensive neural network nodes distributed across the sphere
  const nodes = [
    // Top cluster
    { x: 50, y: 15, cluster: 1, intensity: 1 },
    { x: 45, y: 18, cluster: 1, intensity: 0.9 },
    { x: 55, y: 17, cluster: 1, intensity: 0.85 },
    { x: 50, y: 22, cluster: 1, intensity: 0.8 },
    { x: 58, y: 23, cluster: 1, intensity: 0.75 },
    
    // Upper left cluster
    { x: 25, y: 30, cluster: 2, intensity: 1 },
    { x: 22, y: 35, cluster: 2, intensity: 0.9 },
    { x: 28, y: 38, cluster: 2, intensity: 0.85 },
    { x: 32, y: 33, cluster: 2, intensity: 0.8 },
    
    // Upper right cluster
    { x: 75, y: 28, cluster: 3, intensity: 1 },
    { x: 78, y: 33, cluster: 3, intensity: 0.9 },
    { x: 72, y: 36, cluster: 3, intensity: 0.85 },
    { x: 80, y: 38, cluster: 3, intensity: 0.8 },
    
    // Center left cluster
    { x: 20, y: 50, cluster: 4, intensity: 1 },
    { x: 24, y: 52, cluster: 4, intensity: 0.9 },
    { x: 18, y: 55, cluster: 4, intensity: 0.85 },
    { x: 28, y: 54, cluster: 4, intensity: 0.8 },
    
    // Center cluster
    { x: 48, y: 48, cluster: 5, intensity: 1 },
    { x: 52, y: 50, cluster: 5, intensity: 0.95 },
    { x: 50, y: 53, cluster: 5, intensity: 0.9 },
    
    // Center right cluster
    { x: 75, y: 50, cluster: 6, intensity: 1 },
    { x: 78, y: 54, cluster: 6, intensity: 0.9 },
    { x: 72, y: 56, cluster: 6, intensity: 0.85 },
    { x: 80, y: 52, cluster: 6, intensity: 0.8 },
    
    // Lower left cluster
    { x: 30, y: 68, cluster: 7, intensity: 1 },
    { x: 26, y: 72, cluster: 7, intensity: 0.9 },
    { x: 34, y: 73, cluster: 7, intensity: 0.85 },
    { x: 28, y: 76, cluster: 7, intensity: 0.8 },
    
    // Lower center cluster
    { x: 50, y: 75, cluster: 8, intensity: 1 },
    { x: 48, y: 78, cluster: 8, intensity: 0.9 },
    { x: 53, y: 79, cluster: 8, intensity: 0.85 },
    
    // Lower right cluster
    { x: 68, y: 70, cluster: 9, intensity: 1 },
    { x: 72, y: 73, cluster: 9, intensity: 0.9 },
    { x: 65, y: 75, cluster: 9, intensity: 0.85 },
    
    // Additional scattered nodes for web effect
    { x: 38, y: 25, cluster: 10, intensity: 0.7 },
    { x: 62, y: 42, cluster: 10, intensity: 0.7 },
    { x: 42, y: 60, cluster: 10, intensity: 0.7 },
    { x: 58, y: 65, cluster: 10, intensity: 0.7 },
    { x: 35, y: 48, cluster: 10, intensity: 0.7 },
    { x: 65, y: 58, cluster: 10, intensity: 0.7 },
  ];

  // More extensive connections for web-like appearance
  const connections = [
    // Cluster 1 internal (indices 0-4)
    [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [2, 4], [3, 4],
    // Cluster 2 internal (indices 5-8)
    [5, 6], [5, 7], [5, 8], [6, 7], [7, 8],
    // Cluster 3 internal (indices 9-12)
    [9, 10], [9, 11], [9, 12], [10, 11], [11, 12],
    // Cluster 4 internal (indices 13-16)
    [13, 14], [13, 15], [13, 16], [14, 16], [15, 16],
    // Cluster 5 internal (indices 17-19)
    [17, 18], [17, 19], [18, 19],
    // Cluster 6 internal (indices 20-23)
    [20, 21], [20, 22], [20, 23], [21, 22], [22, 23],
    // Cluster 7 internal (indices 24-27)
    [24, 25], [24, 26], [24, 27], [25, 26], [26, 27],
    // Cluster 8 internal (indices 28-30)
    [28, 29], [28, 30], [29, 30],
    // Cluster 9 internal (indices 31-33)
    [31, 32], [31, 33], [32, 33],
    
    // Inter-cluster web connections (using scattered nodes 34-39)
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
    
    // Long-range connections for web complexity
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
          <img 
            src={sphereImage} 
            alt="Find sphere" 
            className="w-full h-full object-contain"
          />
          
          {/* Neural network overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Network connections */}
            <g stroke="#ffffff" strokeWidth="0.15" opacity="0.3" fill="none" filter="url(#glow)">
              {connections.map(([i, j], idx) => {
                const n1 = nodes[i];
                const n2 = nodes[j];
                return (
                  <line
                    key={idx}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                  />
                );
              })}
            </g>
            
            {/* Network nodes with pulsing animation */}
            <g filter="url(#glow)">
              {nodes.map((node, idx) => (
                <circle
                  key={idx}
                  cx={node.x}
                  cy={node.y}
                  r={0.4 + (node.intensity * 0.6)}
                  fill="#ffffff"
                  opacity={0.6 + (node.intensity * 0.3)}
                >
                  <animate
                    attributeName="opacity"
                    values={`${0.4 + (node.intensity * 0.3)};${0.7 + (node.intensity * 0.3)};${0.4 + (node.intensity * 0.3)}`}
                    dur={`${2 + (idx % 3)}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values={`${0.4 + (node.intensity * 0.6)};${0.5 + (node.intensity * 0.7)};${0.4 + (node.intensity * 0.6)}`}
                    dur={`${2 + (idx % 3)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
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
