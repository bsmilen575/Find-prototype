import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MapPin, Users, Filter, Settings } from "lucide-react";
import { MatchPreviewCard } from "./MatchPreviewCard";
import { MatchDetailsModal } from "./MatchDetailsModal";

export function MapView() {
  const [radius, setRadius] = useState([500]);
  const [selectedMatch, setSelectedMatch] = useState(false);

  const mockMatches = [
    { id: 1, score: 92, distance: "0.2 mi", types: ["Niche Interests", "Opportunities"] },
    { id: 2, score: 87, distance: "0.5 mi", types: ["Whole Person", "Niche Interests"] },
    { id: 3, score: 78, distance: "0.8 mi", types: ["Opportunities"] }
  ];

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
                    Search Radius: {radius[0]}m
                  </label>
                  <Slider
                    value={radius}
                    onValueChange={setRadius}
                    min={100}
                    max={5000}
                    step={100}
                    className="w-full"
                    data-testid="slider-radius"
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
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
              <Badge variant="secondary">{mockMatches.length}</Badge>
            </div>

            <div className="space-y-4">
              {mockMatches.map((match) => (
                <MatchPreviewCard
                  key={match.id}
                  compatibilityScore={match.score}
                  distance={match.distance}
                  matchTypes={match.types}
                  onViewDetails={() => setSelectedMatch(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <MatchDetailsModal open={selectedMatch} onOpenChange={setSelectedMatch} />
    </div>
  );
}
