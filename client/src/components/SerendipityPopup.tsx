import { Button } from './ui/button';
import { X, Smartphone, UserPlus } from 'lucide-react';
import type { FakeEncounter } from '@shared/serendipity-data';

type SerendipityStage = 'teaser' | 'revealed' | 'matched';

interface SerendipityPopupProps {
  match: FakeEncounter | null;
  stage: SerendipityStage;
  onFindOutWho: () => void;
  onMatched: () => void;
  onDismiss: () => void;
}

export function SerendipityPopup({ match, stage, onFindOutWho, onMatched, onDismiss }: SerendipityPopupProps) {
  if (!match) return null;

  if (stage === 'teaser') {
    return (
      <div 
        className="fixed bottom-6 right-6 bg-white shadow-lg border border-gray-200 rounded-2xl p-5 w-80 animate-in fade-in slide-in-from-bottom-4 duration-500"
        data-testid="serendipity-popup-teaser"
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
          {match.nearbyUser.alias} ({match.distance} away)
        </p>
        <div className="flex gap-2">
          <Button
            onClick={onDismiss}
            variant="outline"
            className="flex-1"
            size="sm"
            data-testid="button-ignore"
          >
            Ignore
          </Button>
          <Button
            onClick={onFindOutWho}
            className="flex-1"
            size="sm"
            data-testid="button-find-out-who"
          >
            Find out who?
          </Button>
        </div>
      </div>
    );
  }

  if (stage === 'revealed') {
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
          
          <p className="text-xs text-gray-500 italic mb-2">
            Waiting for them to also tap "Find out who?"...
          </p>

          <div className="pt-2">
            <Button
              onClick={onMatched}
              className="w-full"
              size="sm"
              data-testid="button-simulate-match"
            >
              Simulate Mutual Match
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Stage 3: Matched - both users said yes
  return (
    <div 
      className="fixed bottom-6 right-6 bg-white shadow-lg border border-gray-200 rounded-2xl p-5 w-96 animate-in fade-in slide-in-from-bottom-4 duration-500"
      data-testid="serendipity-popup-matched"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-base">It's a Match!</h3>
        <button 
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
          data-testid="button-dismiss-matched"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
          <p className="text-sm text-gray-700 mb-1">
            Meet <strong className="text-gray-900 text-base">{match.nearbyUser.firstName}</strong>
          </p>
          <p className="text-xs text-gray-600">
            {match.distance} away · {Math.round(match.nearbyUser.overlapPercent * 100)}% overlap
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-xs font-medium text-gray-600 mb-1">You both love:</p>
          <p className="text-sm text-gray-800">{match.sharedNodes.join(', ')}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700 mb-2">Connect:</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              size="sm"
              data-testid="button-tap-phones"
            >
              <Smartphone className="w-4 h-4" />
              Tap Phones
            </Button>
            <Button
              className="flex-1 gap-2"
              size="sm"
              data-testid="button-add-network"
            >
              <UserPlus className="w-4 h-4" />
              Add to Network
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-400 italic pt-2 border-t border-gray-100">
          (Simulated match — demo only)
        </p>
      </div>
    </div>
  );
}
