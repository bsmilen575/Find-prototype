import { isDemoOnboardingComplete, setDemoOnboardingComplete, setDemoProfileData } from '@/lib/demoMode';
import { SignUpScreen } from './SignUpScreen';
import Home from '@/pages/Home';

export function DemoGate() {
  const handleDemoComplete = (data: { name: string; interests: string[] }) => {
    // Store demo profile data
    setDemoProfileData(data);
    // Mark onboarding as complete
    setDemoOnboardingComplete();
    // Force re-render by updating the page
    window.location.href = '/';
  };

  // If demo onboarding is not complete, show SignUpScreen
  if (!isDemoOnboardingComplete()) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="w-full h-screen max-w-md mx-auto">
          <SignUpScreen 
            mode="demo"
            onDemoComplete={handleDemoComplete}
          />
        </div>
      </div>
    );
  }

  // Otherwise show the main Home component
  return <Home />;
}
