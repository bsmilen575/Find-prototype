import { Users, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/lib/useProfile';
import { MatchCard } from './MatchCard';
import { useToast } from '@/hooks/use-toast';

interface Match {
  profileId: string;
  distance: number;
  sharedInterests: string[];
  matchCount: number;
  revealed: boolean;
}

export function ConnectionsTab() {
  const { profileId } = useProfile();
  const { toast } = useToast();

  const { data: matches = [], isLoading } = useQuery<Match[]>({
    queryKey: [`/api/profiles/${profileId}/matches`],
    enabled: !!profileId,
    refetchInterval: 30000,
  });

  const handleReveal = (matchProfileId: string) => {
    toast({
      title: "Reveal request sent",
      description: "Waiting for the other person to reveal themselves too...",
    });
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center px-8">
        <div className="text-center">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No matches yet</h2>
          <p className="text-muted-foreground text-sm">
            When someone nearby shares your interests, they'll appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="p-4 space-y-3">
        <div className="mb-2">
          <h2 className="text-lg font-semibold" data-testid="matches-count">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'} nearby
          </h2>
          <p className="text-sm text-muted-foreground">
            Within 100 meters
          </p>
        </div>
        {matches.map((match) => (
          <MatchCard
            key={match.profileId}
            match={match}
            onReveal={handleReveal}
          />
        ))}
      </div>
    </div>
  );
}
