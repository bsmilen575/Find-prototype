import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProfileInterestsInput } from "./ProfileInterestsInput";
import { Shield, ChevronRight, ChevronLeft } from "lucide-react";

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    books: [] as string[],
    music: [] as string[],
    hobbies: [] as string[],
    seeking: [] as string[]
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const steps = [
    {
      title: "What Books Do You Love?",
      subtitle: "Add specific titles, authors, or genres you're passionate about",
      category: "books",
      placeholder: "e.g., Island of Dr. Moreau, Dune, Non-fiction..."
    },
    {
      title: "Your Music Taste",
      subtitle: "Artists, genres, or specific albums that define your sound",
      category: "music",
      placeholder: "e.g., Experimental Jazz, Radiohead, Lo-fi..."
    },
    {
      title: "Hobbies & Interests",
      subtitle: "Activities and passions that light you up",
      category: "hobbies",
      placeholder: "e.g., Urban Gardening, Photography, Rock Climbing..."
    },
    {
      title: "What Are You Looking For?",
      subtitle: "Opportunities, collaborations, or connections you seek",
      category: "seeking",
      placeholder: "e.g., Software Engineer Role, Co-founder, Hiking Buddy..."
    }
  ];

  const currentStep = steps[step - 1];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      console.log("Profile completed:", profile);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{currentStep.title}</h2>
          <p className="text-muted-foreground">{currentStep.subtitle}</p>
        </div>

        <ProfileInterestsInput
          category={currentStep.category}
          placeholder={currentStep.placeholder}
          interests={profile[currentStep.category as keyof typeof profile]}
          onInterestsChange={(interests) => 
            setProfile({ ...profile, [currentStep.category]: interests })
          }
        />

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              data-testid="button-back"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext}
            className="flex-1"
            data-testid="button-next"
          >
            {step === totalSteps ? "Complete Profile" : "Next"}
            {step < totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
