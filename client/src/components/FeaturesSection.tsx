import { FeatureCard } from "./FeatureCard";
import { Heart, User, Briefcase, Lock, MapPin, Sparkles } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      title: "Niche Interest Matching",
      description: "Connect over specific shared passions—from obscure books like Island of Dr. Moreau to rare hobbies and unique tastes."
    },
    {
      icon: User,
      title: "Whole Person Compatibility",
      description: "AI-powered assessment across all your interests, not just a single profile. Music, books, hobbies, and more analyzed together."
    },
    {
      icon: Briefcase,
      title: "Opportunity Matching",
      description: "Find complementary connections—job seekers meet recruiters, mentors find mentees, collaborators discover partners."
    },
    {
      icon: Lock,
      title: "Privacy-Preserving",
      description: "Your data stays encrypted. See compatibility scores before revealing identity using cryptographic private set intersection."
    },
    {
      icon: MapPin,
      title: "Real-Time Location",
      description: "Discover compatible people nearby right now. Perfect for spontaneous coffee meetups or serendipitous encounters."
    },
    {
      icon: Sparkles,
      title: "Smart Orchestration",
      description: "Multi-stage matching engine combines retrieval, ranking, and filtering to surface the most relevant connections."
    }
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How Find Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three layers of intelligent matching to help you discover meaningful connections
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
