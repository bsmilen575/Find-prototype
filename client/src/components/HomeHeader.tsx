import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface HomeHeaderProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  showNearbyPulse?: boolean;
  onToggleNearbyPulse?: () => void;
  showNearbyPulseControl?: boolean;
  onSimulateSerendipity?: () => void;
}

export function HomeHeader({ 
  isOpen, 
  onToggleOpen, 
  showNearbyPulse = false, 
  onToggleNearbyPulse,
  showNearbyPulseControl = false,
  onSimulateSerendipity
}: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2">
      <h1 className="text-2xl font-semibold text-gray-900" data-testid="heading-find">Find</h1>
      <div className="flex items-center gap-3">
        {onSimulateSerendipity && (
          <Button
            size="sm"
            variant="outline"
            onClick={onSimulateSerendipity}
            className="gap-1.5"
            data-testid="button-simulate-serendipity"
          >
            <Sparkles className="w-3 h-3" />
            Simulate
          </Button>
        )}
        {showNearbyPulseControl && onToggleNearbyPulse && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Nearby Pulse</span>
            <button
              onClick={onToggleNearbyPulse}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showNearbyPulse ? 'bg-amber-500' : 'bg-gray-300'
              }`}
              data-testid="toggle-nearby-pulse"
              aria-label="Toggle nearby pulse overlay"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showNearbyPulse ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Open</span>
          <button
            onClick={onToggleOpen}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isOpen ? 'bg-black' : 'bg-gray-300'
            }`}
            data-testid="toggle-open"
            aria-label="Toggle discoverable"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isOpen ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
