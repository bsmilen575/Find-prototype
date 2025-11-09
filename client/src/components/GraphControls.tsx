import { Eye, Flame, Clock, Box } from 'lucide-react';
import { Button } from './ui/button';

interface GraphControlsProps {
  lensMode: 'none' | 'recency' | 'source' | 'heat';
  onLensModeChange: (mode: 'none' | 'recency' | 'source' | 'heat') => void;
}

export function GraphControls({ lensMode, onLensModeChange }: GraphControlsProps) {
  const lenses = [
    { id: 'none' as const, label: 'Default', icon: Eye },
    { id: 'recency' as const, label: 'Recency', icon: Clock },
    { id: 'source' as const, label: 'Source', icon: Box },
    { id: 'heat' as const, label: 'Heat', icon: Flame },
  ];

  return (
    <div className="absolute bottom-6 left-6 bg-white rounded-xl border border-gray-300 shadow-lg p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-1">Lens:</span>
        {lenses.map((lens) => {
          const Icon = lens.icon;
          return (
            <Button
              key={lens.id}
              size="sm"
              variant={lensMode === lens.id ? 'default' : 'outline'}
              onClick={() => onLensModeChange(lens.id)}
              className="gap-1.5"
              data-testid={`button-lens-${lens.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {lens.label}
            </Button>
          );
        })}
      </div>
      
      {lensMode === 'recency' && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>&lt;7d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>&lt;30d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>&lt;90d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span>&gt;90d</span>
            </div>
          </div>
        </div>
      )}
      
      {lensMode === 'source' && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span>Book</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span>Podcast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Article</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Video</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Creator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span>Topic</span>
            </div>
          </div>
        </div>
      )}
      
      {lensMode === 'heat' && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>&gt;80</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>60-80</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span>40-60</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span>&lt;40</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
