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
      
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 space-y-3">
        <Button 
          className="w-full h-14 rounded-3xl"
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
          variant="outline" 
          className="w-full h-14 rounded-3xl"
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
