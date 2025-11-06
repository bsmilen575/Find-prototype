import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CompatibilityScoreCard } from "./CompatibilityScoreCard";
import { Button } from "@/components/ui/button";
import { Heart, User, Briefcase, MessageCircle } from "lucide-react";

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

interface MatchDetailsModalProps {
  match: Match;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatchDetailsModal({ match, open, onOpenChange }: MatchDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-match-details">
        <DialogHeader>
          <DialogTitle className="text-2xl">Match Compatibility Breakdown</DialogTitle>
          <DialogDescription>
            {match.distance} km away • {match.compatibility.overallScore}% compatible
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <CompatibilityScoreCard
            icon={Heart}
            title="Niche Interests"
            score={match.compatibility.nicheScore}
            highlights={match.compatibility.nicheMatches}
            color="blue"
          />
          <CompatibilityScoreCard
            icon={User}
            title="Whole Person"
            score={match.compatibility.wholePersonScore}
            highlights={match.compatibility.wholePersonInsights}
            color="purple"
          />
          <CompatibilityScoreCard
            icon={Briefcase}
            title="Opportunities"
            score={match.compatibility.opportunitiesScore}
            highlights={match.compatibility.opportunityMatches}
            color="green"
          />
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Why You Matched</h4>
          <p className="text-sm text-muted-foreground">
            {match.compatibility.explanation}
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <Button className="flex-1" data-testid="button-connect">
            <MessageCircle className="mr-2 h-4 w-4" />
            Send Connection Request
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-close-modal">
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
