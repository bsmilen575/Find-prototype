import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Heart, Briefcase, MapPin, Eye } from "lucide-react";

export function FlowDiagram() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-semibold mb-3">How Find Works</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A privacy-preserving matching engine that connects you with compatible people nearby
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-sm font-medium">Your Profile</div>
            <div className="text-xs text-muted-foreground">Encrypted locally</div>
          </div>
        </Card>

        <div className="flex justify-center">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </div>

        <Card className="p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <div className="text-sm font-medium">Location Check</div>
            <div className="text-xs text-muted-foreground">Real-time proximity</div>
          </div>
        </Card>

        <div className="flex justify-center">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </div>

        <Card className="p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <div className="text-sm font-medium">Match Score</div>
            <div className="text-xs text-muted-foreground">See compatibility</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Heart className="h-6 w-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Niche Interests</h4>
              <p className="text-sm text-muted-foreground">
                Match on specific shared passions—books, music, hobbies. "Island of Dr. Moreau" finds another fan.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Whole Person</h4>
              <p className="text-sm text-muted-foreground">
                AI analyzes across all dimensions—not just one profile. Complete compatibility assessment.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Briefcase className="h-6 w-6 text-primary mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Opportunities</h4>
              <p className="text-sm text-muted-foreground">
                Connect complementary needs—job seekers meet recruiters, mentors find mentees.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
