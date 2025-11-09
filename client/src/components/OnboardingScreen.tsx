import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function OnboardingScreen() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="w-full h-full relative" data-testid="onboarding-screen">
      <img 
        src="/welcome-screen.png"
        alt="Find Welcome Screen"
        className="w-full h-full object-cover"
        data-testid="welcome-image"
      />
      
      <div className="absolute left-0 right-0 px-4" style={{ bottom: '11%' }}>
        <div className="max-w-md mx-auto space-y-3">
          <button
            className="w-full rounded-full"
            style={{ 
              backgroundColor: '#000000', 
              color: '#ffffff',
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: '400',
              padding: '16px 24px',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setLocation('/signup')}
            data-testid="button-signup"
          >
            Sign up for Beta
          </button>
          <button
            className="w-full rounded-full"
            style={{ 
              fontFamily: 'Georgia, serif',
              border: '1px solid #333333',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              color: '#000000',
              fontSize: '18px',
              fontWeight: '400',
              padding: '16px 24px',
              cursor: 'pointer'
            }}
            onClick={() => setLocation('/signup')}
            data-testid="button-signin"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
