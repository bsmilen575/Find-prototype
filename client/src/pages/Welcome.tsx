import { OnboardingScreen } from "@/components/OnboardingScreen";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="w-full h-screen max-w-md mx-auto">
        <OnboardingScreen />
      </div>
    </div>
  );
}
