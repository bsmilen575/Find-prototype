import { Users } from 'lucide-react';

export function ConnectionsTab() {
  return (
    <div className="h-full w-full flex items-center justify-center px-8">
      <div className="text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h2>
        <p className="text-gray-500 text-sm">
          When someone nearby shares your interests, they'll appear here
        </p>
      </div>
    </div>
  );
}
