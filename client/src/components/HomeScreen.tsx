import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Power, User, RefreshCw } from "lucide-react";
import { useProfile } from "@/lib/useProfile";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Profile } from "@shared/schema";

interface Match {
  profileId: string;
  distance: number;
  sharedInterests: string[];
  matchCount: number;
  revealed: boolean;
}

export function HomeScreen() {
  const [discoverable, setDiscoverable] = useState(true);
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Fetch profile to initialize discoverable state
  const { data: profile } = useQuery<Profile>({
    queryKey: [`/api/profiles/${profileId}`],
    enabled: !!profileId,
  });

  useEffect(() => {
    if (!profileId) {
      setLocation("/onboarding");
    }
  }, [profileId, setLocation]);

  // Initialize discoverable state from server
  useEffect(() => {
    if (profile && typeof profile.discoverable === 'boolean') {
      setDiscoverable(profile.discoverable);
    }
  }, [profile]);

  const { data: matches = [], isLoading, refetch } = useQuery<Match[]>({
    queryKey: [`/api/profiles/${profileId}/matches`],
    enabled: !!profileId && discoverable,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const handleToggleDiscoverable = async (checked: boolean) => {
    if (!profileId) return;

    try {
      await apiRequest("POST", `/api/profiles/${profileId}/discoverable`, {
        discoverable: checked,
      });
      setDiscoverable(checked);
      
      if (checked) {
        toast({
          title: "You're discoverable",
          description: "People nearby can now see you in their matches",
        });
      } else {
        toast({
          title: "You're hidden",
          description: "You won't appear in anyone's matches",
        });
      }
      
      queryClient.invalidateQueries({ queryKey: [`/api/profiles/${profileId}/matches`] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update discoverable status",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    if (profileId && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await apiRequest("POST", `/api/profiles/${profileId}/location`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          refetch();
        } catch (error) {
          console.error("Failed to update location:", error);
        }
      });
    }
  };

  if (!profileId) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Discovery Toggle Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${discoverable ? 'bg-primary/10' : 'bg-muted'}`}>
                <Power className={`h-6 w-6 ${discoverable ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <h3 className="font-semibold">Connection Status</h3>
                <p className="text-sm text-muted-foreground">
                  {discoverable ? "You're discoverable to nearby people" : "You're hidden from matches"}
                </p>
              </div>
            </div>
            <Switch
              checked={discoverable}
              onCheckedChange={handleToggleDiscoverable}
              data-testid="switch-discoverable"
            />
          </div>
        </Card>

        {/* Matches Section */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Users className="h-5 w-5" />
            Nearby (within 100m)
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{matches.length}</Badge>
            <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {!discoverable ? (
          <Card className="p-8 text-center">
            <Power className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Turn on discoverable mode to see people nearby
            </p>
          </Card>
        ) : isLoading ? (
          <Card className="p-6 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin" />
            Finding matches...
          </Card>
        ) : matches.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">No matches nearby yet</p>
            <p className="text-sm text-muted-foreground">
              People within 100m with 2+ shared interests will appear here
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {matches.map((match, index) => (
              <Card key={match.profileId} className="p-6 hover-elevate" data-testid={`card-match-${index}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white flex-shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">Anonymous Match</h4>
                      <Badge variant="secondary">{match.matchCount} shared</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      {match.distance}m away
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {match.sharedInterests.map((interest, idx) => (
                        <Badge key={idx} className="bg-primary/10 text-primary border-primary/20">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  data-testid={`button-reveal-${index}`}
                >
                  Request to Reveal
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
