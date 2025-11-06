import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MapPin, Users, Filter } from "lucide-react";
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 h-[600px] flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Map view would display nearby matches with anonymized pins
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                  <Badge variant="secondary" className="gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    High Match (80%+)
                  </Badge>
                  <Badge variant="secondary" className="gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500" />
                    Medium Match (60-79%)
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4 mt-4">
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-muted-foreground" />
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
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Nearby Matches
              </h3>
              <Badge variant="default">{mockMatches.length}</Badge>
            </div>

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

      <MatchDetailsModal open={selectedMatch} onOpenChange={setSelectedMatch} />
    </div>
  );
}
