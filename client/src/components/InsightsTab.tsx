import { Lightbulb } from 'lucide-react';

export function InsightsTab() {
  return (
    <div className="h-full w-full flex items-center justify-center px-8">
      <div className="text-center">
        <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Insights</h2>
        <p className="text-gray-500 text-sm">
          Discover patterns in your interests and connections
        </p>
      </div>
    </div>
  );
}
