import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MatchNotificationScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }} data-testid="match-notification-screen">
      <div className="h-11" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-6 shadow-lg" data-testid="icon-match">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        
        <div className="text-center mb-8 max-w-sm">
          <h2 className="text-gray-900 mb-3" data-testid="text-match-title">Someone nearby!</h2>
          <p className="text-gray-700 text-lg leading-relaxed" data-testid="text-match-message">
            Someone nearby shares an interest. Their favorite book is also{' '}
            <span className="font-semibold text-gray-900">The Island of Dr. Moreau</span>
          </p>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <Button 
            className="w-full h-14 rounded-2xl bg-black hover:bg-gray-800 text-white"
            data-testid="button-reveal"
          >
            Reveal myself to them
          </Button>
          
          <p className="text-gray-500 text-center text-sm px-4" data-testid="text-disclaimer">
            They'll only see you if they also choose to reveal
          </p>
        </div>
        
        <div className="mt-8 bg-gray-50 rounded-xl p-4 max-w-sm border border-gray-100">
          <p className="text-gray-600 text-sm text-center" data-testid="text-info">
            This person is within 100m and is currently open to connections
          </p>
        </div>
      </div>
    </div>
  );
}
