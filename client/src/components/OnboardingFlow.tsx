import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ProfileInterestsInput } from "./ProfileInterestsInput";
import { Shield, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useProfile } from "@/lib/useProfile";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [, setLocation] = useLocation();
  const { setProfile } = useProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfileData] = useState({
    name: "",
    books: [] as string[],
    music: [] as string[],
    hobbies: [] as string[],
    seeking: [] as string[]
  });

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const steps = [
    {
      title: "What's your name?",
      subtitle: "How should people find you?",
      field: "name" as const,
      type: "text"
    },
    {
      title: "What Books Do You Love?",
      subtitle: "Add specific titles, authors, or genres you're passionate about",
      field: "books" as const,
      type: "tags",
      placeholder: "e.g., Island of Dr. Moreau, Dune, Non-fiction..."
    },
    {
      title: "Your Music Taste",
      subtitle: "Artists, genres, or specific albums that define your sound",
      field: "music" as const,
      type: "tags",
      placeholder: "e.g., Experimental Jazz, Radiohead, Lo-fi..."
    },
    {
      title: "Hobbies & Interests",
      subtitle: "Activities and passions that light you up",
      field: "hobbies" as const,
      type: "tags",
      placeholder: "e.g., Urban Gardening, Photography, Rock Climbing..."
    },
    {
      title: "What Are You Looking For?",
      subtitle: "Opportunities, collaborations, or connections you seek",
      field: "seeking" as const,
      type: "tags",
      placeholder: "e.g., Software Engineer Role, Co-founder, Hiking Buddy..."
    }
  ];

  const currentStep = steps[step];

  const handleNext = async () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Get location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const profileData = {
        ...profile,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const response = await apiRequest("POST", "/api/profiles", profileData);
      const savedProfile = await response.json();
      setProfile(savedProfile.id, savedProfile.name);
      
      toast({
        title: "Profile created!",
        description: "Finding compatible people nearby...",
      });
      
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step + 1} of {totalSteps}</span>
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{currentStep.title}</h2>
          <p className="text-muted-foreground">{currentStep.subtitle}</p>
        </div>

        {currentStep.type === "text" ? (
          <Input
            type="text"
            placeholder="Enter your name"
            value={profile.name}
            onChange={(e) => setProfileData({ ...profile, name: e.target.value })}
            data-testid="input-name"
            className="mb-4"
          />
        ) : (
          <ProfileInterestsInput
            category={currentStep.field}
            placeholder={currentStep.placeholder || ""}
            interests={profile[currentStep.field] as string[]}
            onInterestsChange={(interests) => 
              setProfileData({ ...profile, [currentStep.field]: interests })
            }
          />
        )}

        {step === totalSteps - 1 && (
          <div className="mt-6 p-4 bg-muted rounded-lg flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Location Access Required</p>
              <p className="text-muted-foreground">
                Find needs your location to show you nearby matches. Your exact location is never shared - only proximity to potential matches.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={loading}
              data-testid="button-back"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext}
            className="flex-1"
            disabled={loading || (step === 0 && !profile.name.trim())}
            data-testid="button-next"
          >
            {loading ? "Creating Profile..." : step === totalSteps - 1 ? "Complete Profile" : "Next"}
            {step < totalSteps - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
