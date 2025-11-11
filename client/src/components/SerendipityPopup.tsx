import { Button } from './ui/button';
import { X } from 'lucide-react';
import type { FakeEncounter } from '@shared/serendipity-data';

interface SerendipityPopupProps {
  match: FakeEncounter | null;
  revealed: boolean;
  onReveal: () => void;
  onDismiss: () => void;
}

export function SerendipityPopup({ match, revealed, onReveal, onDismiss }: SerendipityPopupProps) {
  if (!match) return null;

  if (!revealed) {
    return (
      <div 
        className="fixed bottom-6 right-6 bg-white shadow-lg border border-gray-200 rounded-2xl p-5 w-80 animate-in fade-in slide-in-from-bottom-4 duration-500"
        data-testid="serendipity-popup-initial"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-base">Serendipity Nearby</h3>
          <button 
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
            data-testid="button-dismiss-serendipity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          Someone {match.distance} away also loves <strong>{match.sharedThemes[0]}</strong>—tap Reveal to see what connects you.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={onReveal}
            className="flex-1"
            size="sm"
            data-testid="button-reveal-connection"
          >
            Reveal Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-6 right-6 bg-white shadow-lg border border-gray-200 rounded-2xl p-5 w-96 animate-in fade-in slide-in-from-bottom-4 duration-500"
      data-testid="serendipity-popup-revealed"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-base">Shared Curiosity</h3>
        <button 
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
          data-testid="button-dismiss-revealed"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm text-gray-700">
          You and <strong>{match.nearbyUser.alias}</strong> both explore{' '}
          <strong>{match.sharedThemes.join(' & ')}</strong>.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-xs font-medium text-gray-600 mb-1">Shared interests:</p>
          <p className="text-sm text-gray-800">{match.sharedNodes.join(', ')}</p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {Math.round(match.nearbyUser.overlapPercent * 100)}% overlap · {match.distance} away
          </p>
        </div>
        
        <p className="text-xs text-gray-400 italic">
          (Simulated connection — demo only)
        </p>
      </div>
    </div>
  );
}
