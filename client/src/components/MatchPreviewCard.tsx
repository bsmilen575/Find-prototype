import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Eye, Shield } from "lucide-react";

interface MatchPreviewCardProps {
  compatibilityScore: number;
  distance: string;
  matchTypes: string[];
  onViewDetails: () => void;
}

export function MatchPreviewCard({ 
  compatibilityScore, 
  distance, 
  matchTypes,
  onViewDetails 
}: MatchPreviewCardProps) {
  return (
    <Card className="p-6 hover-elevate active-elevate-2" data-testid="card-match-preview">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-muted">
          <AvatarFallback className="bg-muted">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Compatible Match</span>
              <Badge variant="default" className="bg-primary">
                {compatibilityScore}% Match
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {matchTypes.map((type, index) => (
              <Badge key={index} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
          
          <Button 
            onClick={onViewDetails}
            className="w-full"
            data-testid="button-view-match"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Match Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
