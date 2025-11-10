import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Sparkles } from 'lucide-react';

interface Match {
  profileId: string;
  distance: number;
  sharedInterests: string[];
  matchCount: number;
  revealed: boolean;
}

interface MatchNotificationModalProps {
  match: Match | null;
  open: boolean;
  onClose: () => void;
  onViewMatch: () => void;
}

export function MatchNotificationModal({ match, open, onClose, onViewMatch }: MatchNotificationModalProps) {
  useEffect(() => {
    if (open && match) {
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  }, [open, match]);

  if (!match) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-sm"
        data-testid="match-notification-modal"
      >
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl" data-testid="modal-title">
            New Match!
          </DialogTitle>
          <DialogDescription className="text-center">
            Someone nearby shares your interests
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span data-testid="modal-distance">
              {match.distance}m away
            </span>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-center">
              {match.matchCount} shared {match.matchCount === 1 ? 'interest' : 'interests'}
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {match.sharedInterests.map((interest, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs"
                  data-testid={`modal-interest-${idx}`}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-testid="button-dismiss"
            >
              Dismiss
            </Button>
            <Button
              className="flex-1"
              onClick={onViewMatch}
              data-testid="button-view-match"
            >
              View Match
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
