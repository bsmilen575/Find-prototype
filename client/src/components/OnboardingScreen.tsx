import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function OnboardingScreen() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f2ede8' }} data-testid="onboarding-screen">
      <div className="flex-1 flex items-center justify-center">
        <img 
          src="/attached_assets/Screenshot 2025-11-09 at 10.48.33 AM_1762714116206.png"
          alt="Find Welcome"
          className="w-full h-auto max-w-2xl"
          data-testid="welcome-image"
        />
      </div>
      
      <div className="p-6 pb-10 space-y-3">
        <Button 
          size="lg"
          className="w-full rounded-3xl"
          style={{ 
            backgroundColor: '#000000', 
            color: '#ffffff',
            fontFamily: 'Georgia, serif',
            fontSize: '1.125rem',
            fontWeight: '400'
          }}
          onClick={() => setLocation('/signup')}
          data-testid="button-signup"
        >
          Sign up for Beta
        </Button>
        <Button 
          size="lg"
          variant="outline" 
          className="w-full rounded-3xl"
          style={{ 
            fontFamily: 'Georgia, serif',
            borderColor: '#333333',
            borderWidth: '1px',
            backgroundColor: 'transparent',
            color: '#000000',
            fontSize: '1.125rem',
            fontWeight: '400'
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
