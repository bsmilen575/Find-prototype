import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, MapPin } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useProfile } from "@/lib/useProfile";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function OnboardingFlow() {
  const [, setLocation] = useLocation();
  const { setProfile } = useProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = useState("");

  const addInterest = () => {
    const trimmed = currentInterest.trim();
    // Case-insensitive duplicate check
    const lowerInterests = interests.map(i => i.toLowerCase());
    if (trimmed && interests.length < 5 && !lowerInterests.includes(trimmed.toLowerCase())) {
      setInterests([...interests, trimmed]);
      setCurrentInterest("");
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest();
    }
  };

  const handleComplete = async () => {
    if (!name.trim() || interests.length !== 5) {
      toast({
        title: "Incomplete Profile",
        description: "Please enter your name and exactly 5 interests",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const profileData = {
        name: name.trim(),
        interests,
        discoverable: true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const response = await apiRequest("POST", "/api/profiles", profileData);
      const savedProfile = await response.json();
      setProfile(savedProfile.id, savedProfile.name);
      
      toast({
        title: "Profile created!",
        description: "Finding people nearby...",
      });
      
      setLocation("/");
    } catch (error: any) {
      let errorMessage = "Failed to create profile";
      
      // Extract validation error details
      if (error.message && error.message.includes("interests")) {
        errorMessage = "Please add exactly 5 unique interests (duplicates not allowed)";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Find</h2>
          <p className="text-muted-foreground">Discover people nearby with shared interests</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Your Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-name"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Your Interests ({interests.length}/5)
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              Add exactly 5 things you care about (books, music, hobbies, anything)
            </p>
            
            <div className="flex gap-2 mb-3">
              <Input
                type="text"
                placeholder="Type an interest and press Enter"
                value={currentInterest}
                onChange={(e) => setCurrentInterest(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={interests.length >= 5}
                data-testid="input-interests"
              />
              <Button
                onClick={addInterest}
                disabled={!currentInterest.trim() || interests.length >= 5}
                data-testid="button-add-interest"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-2 pr-1"
                  data-testid={`badge-interest-${index}`}
                >
                  {interest}
                  <button
                    onClick={() => removeInterest(index)}
                    className="hover-elevate rounded-full p-1"
                    data-testid={`button-remove-interest-${index}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Location Access Required</p>
              <p className="text-muted-foreground">
                Find needs your location to show matches within 100 meters. Your exact location is never shared.
              </p>
            </div>
          </div>

          <Button
            onClick={handleComplete}
            className="w-full"
            disabled={loading || !name.trim() || interests.length !== 5}
            data-testid="button-complete"
          >
            {loading ? "Creating Profile..." : "Start Finding People"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
