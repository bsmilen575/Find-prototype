import { Sparkles, LogOut, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HomeHeaderProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  showNearbyPulse?: boolean;
  onToggleNearbyPulse?: () => void;
  showNearbyPulseControl?: boolean;
  onSimulateSerendipity?: () => void;
  isDemoMode?: boolean;
}

export function HomeHeader({ 
  isOpen, 
  onToggleOpen, 
  showNearbyPulse = false, 
  onToggleNearbyPulse,
  showNearbyPulseControl = false,
  onSimulateSerendipity,
  isDemoMode = false
}: HomeHeaderProps) {
  const handleExitDemo = () => {
    localStorage.removeItem('findMode');
    window.location.href = '/landing';
  };

  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-900" data-testid="heading-find">Find</h1>
        {isDemoMode && (
          <Badge 
            variant="outline" 
            className="gap-1.5 cursor-pointer"
            onClick={handleExitDemo}
            data-testid="badge-demo-mode"
          >
            Demo Mode
            <X className="w-3 h-3" />
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-3">
        {!isDemoMode && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => window.location.href = '/api/logout'}
            className="w-8 h-8"
            data-testid="button-logout"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        )}
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
