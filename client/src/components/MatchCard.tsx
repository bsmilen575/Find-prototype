import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Lock } from 'lucide-react';

interface Match {
  profileId: string;
  distance: number;
  sharedInterests: string[];
  matchCount: number;
  revealed: boolean;
}

interface MatchCardProps {
  match: Match;
  onReveal: (profileId: string) => void;
}

export function MatchCard({ match, onReveal }: MatchCardProps) {
  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2"
      data-testid={`match-card-${match.profileId}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span data-testid={`match-distance-${match.profileId}`}>
            {match.distance}m away
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
          <Lock className="w-3.5 h-3.5" />
          <span>Anonymous</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          {match.matchCount} shared {match.matchCount === 1 ? 'interest' : 'interests'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {match.sharedInterests.map((interest, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs"
              data-testid={`interest-badge-${idx}`}
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        className="w-full"
        variant="outline"
        size="sm"
        onClick={() => onReveal(match.profileId)}
        disabled={match.revealed}
        data-testid={`button-reveal-${match.profileId}`}
      >
        {match.revealed ? 'Revealed' : 'Reveal yourself'}
      </Button>
    </Card>
  );
}
