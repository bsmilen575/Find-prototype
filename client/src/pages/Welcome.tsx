import { Header } from "@/components/Header";
import { OnboardingScreen } from "@/components/OnboardingScreen";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OnboardingScreen />
    </div>
  );
}
