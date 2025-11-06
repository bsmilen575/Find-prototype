import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface CompatibilityScoreCardProps {
  icon: LucideIcon;
  title: string;
  score: number;
  highlights: string[];
  color: "blue" | "purple" | "green";
}

export function CompatibilityScoreCard({ 
  icon: Icon, 
  title, 
  score, 
  highlights,
  color 
}: CompatibilityScoreCardProps) {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    green: "text-green-600 dark:text-green-400"
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`h-6 w-6 ${colorClasses[color]}`} />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Match Score</span>
          <span className={`text-2xl font-bold ${colorClasses[color]}`}>{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
      </div>
      
      <div className="space-y-2">
        {highlights.map((highlight, index) => (
          <Badge key={index} variant="secondary" className="mr-2 mb-2">
            {highlight}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
