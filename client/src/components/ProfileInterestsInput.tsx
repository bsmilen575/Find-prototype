import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProfileInterestsInputProps {
  category: string;
  placeholder: string;
  interests: string[];
  onInterestsChange: (interests: string[]) => void;
}

export function ProfileInterestsInput({ 
  category, 
  placeholder, 
  interests, 
  onInterestsChange 
}: ProfileInterestsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!interests.includes(inputValue.trim())) {
        onInterestsChange([...interests, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeInterest = (interestToRemove: string) => {
    onInterestsChange(interests.filter(i => i !== interestToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{category}</label>
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        data-testid={`input-${category.toLowerCase()}`}
      />
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <Badge key={index} variant="secondary" className="gap-1">
            {interest}
            <button
              onClick={() => removeInterest(interest)}
              className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              data-testid={`button-remove-${interest}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
