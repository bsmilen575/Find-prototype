import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompatibilityScoreCard } from "./CompatibilityScoreCard";
import { Button } from "@/components/ui/button";
import { Heart, User, Briefcase, MessageCircle } from "lucide-react";

interface MatchDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatchDetailsModal({ open, onOpenChange }: MatchDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-match-details">
        <DialogHeader>
          <DialogTitle className="text-2xl">Match Compatibility Breakdown</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <CompatibilityScoreCard
            icon={Heart}
            title="Niche Interests"
            score={92}
            highlights={["Island of Dr. Moreau", "Experimental Jazz", "Urban Gardening"]}
            color="blue"
          />
          <CompatibilityScoreCard
            icon={User}
            title="Whole Person"
            score={84}
            highlights={["Books", "Music", "Hobbies", "Values"]}
            color="purple"
          />
          <CompatibilityScoreCard
            icon={Briefcase}
            title="Opportunities"
            score={78}
            highlights={["Software Engineer", "Mentorship", "Collaboration"]}
            color="green"
          />
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Why You Matched</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Both share a passion for obscure literary works like "Island of Dr. Moreau"</li>
            <li>• Compatible music taste spanning experimental and indie genres</li>
            <li>• One seeking software engineering role, other hiring for engineer position</li>
            <li>• Both active in urban sustainability and gardening communities</li>
          </ul>
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
