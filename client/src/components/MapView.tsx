import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MapPin, Users, Filter, Settings, RefreshCw } from "lucide-react";
import { MatchPreviewCard } from "./MatchPreviewCard";
import { MatchDetailsModal } from "./MatchDetailsModal";
import { useProfile } from "@/lib/useProfile";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface Match {
  profileId: string;
  name: string;
  distance: number;
  compatibility: {
    overallScore: number;
    nicheScore: number;
    wholePersonScore: number;
    opportunitiesScore: number;
    nicheMatches: string[];
    wholePersonInsights: string[];
    opportunityMatches: string[];
    explanation: string;
  };
}

export function MapView() {
  const [radius, setRadius] = useState([5]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!profileId) {
      setLocation("/onboarding");
    }
  }, [profileId, setLocation]);

  const { data: matches = [], isLoading, refetch } = useQuery<Match[]>({
    queryKey: [`/api/profiles/${profileId}/matches?radius=${radius[0]}`],
    enabled: !!profileId,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  const handleRefresh = () => {
    if (profileId && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await apiRequest("POST", `/api/profiles/${profileId}/location`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          queryClient.invalidateQueries({ queryKey: [`/api/profiles/${profileId}/matches`] });
          refetch();
        } catch (error) {
          console.error("Failed to update location:", error);
        }
      });
    }
  };

  const getMatchTypes = (compatibility: Match['compatibility']) => {
    const types = [];
    if (compatibility.nicheScore >= 70) types.push("Niche Interests");
    if (compatibility.wholePersonScore >= 70) types.push("Whole Person");
    if (compatibility.opportunitiesScore >= 70) types.push("Opportunities");
    return types.length > 0 ? types : ["Compatible"];
  };

  if (!profileId) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6 h-[500px] flex items-center justify-center bg-muted/30">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Map View</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Interactive map showing anonymized nearby matches with privacy-preserving pins
                </p>
                <div className="mt-6 flex gap-4 justify-center flex-wrap">
                  <Badge variant="secondary" className="gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    High Match (80%+)
                  </Badge>
                  <Badge variant="secondary" className="gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    Medium Match (60-79%)
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Search Radius: {radius[0]} km
                  </label>
                  <Slider
                    value={radius}
                    onValueChange={setRadius}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                    data-testid="slider-radius"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isLoading}>
                  <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Users className="h-5 w-5" />
                Nearby
              </h3>
              <Badge variant="secondary">{matches.length}</Badge>
            </div>

            {isLoading ? (
              <Card className="p-6 text-center text-muted-foreground">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin" />
                Finding matches...
              </Card>
            ) : matches.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">No matches nearby yet</p>
                <p className="text-xs mt-1">Try increasing your search radius</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => (
                  <MatchPreviewCard
                    key={match.profileId}
                    compatibilityScore={match.compatibility.overallScore}
                    distance={`${match.distance} km away`}
                    matchTypes={getMatchTypes(match.compatibility)}
                    onViewDetails={() => setSelectedMatch(match)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedMatch && (
        <MatchDetailsModal
          match={selectedMatch}
          open={!!selectedMatch}
          onOpenChange={(open) => !open && setSelectedMatch(null)}
        />
      )}
    </div>
  );
}
