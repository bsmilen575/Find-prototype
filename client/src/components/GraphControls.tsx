import { Eye, Flame, Clock, Box, Lasso, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface Circuit {
  id: string;
  name: string;
  nodeIds: string[];
  createdAt: Date;
}

interface GraphControlsProps {
  lensMode: 'none' | 'recency' | 'source' | 'heat';
  onLensModeChange: (mode: 'none' | 'recency' | 'source' | 'heat') => void;
  isLassoMode: boolean;
  onLassoModeChange: (enabled: boolean) => void;
  selectedNodesCount: number;
  onCreateCircuit: () => void;
  circuits?: Circuit[];
}

export function GraphControls({ 
  lensMode, 
  onLensModeChange, 
  isLassoMode, 
  onLassoModeChange,
  selectedNodesCount,
  onCreateCircuit,
  circuits = []
}: GraphControlsProps) {
  const lenses = [
    { id: 'none' as const, label: 'Default', icon: Eye },
    { id: 'recency' as const, label: 'Recency', icon: Clock },
    { id: 'source' as const, label: 'Source', icon: Box },
    { id: 'heat' as const, label: 'Heat', icon: Flame },
  ];

  return (
    <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-auto z-20 bg-white rounded-xl border border-gray-300 shadow-lg p-3 space-y-3 max-w-full md:max-w-md">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={isLassoMode ? 'default' : 'outline'}
          onClick={() => onLassoModeChange(!isLassoMode)}
          className="gap-1.5"
          data-testid="button-lasso-mode"
        >
          <Lasso className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isLassoMode ? `Selected: ${selectedNodesCount}` : 'Select Nodes'}</span>
          <span className="sm:hidden">{isLassoMode ? selectedNodesCount : 'Select'}</span>
        </Button>
        {isLassoMode && selectedNodesCount >= 2 && (
          <Button
            size="sm"
            variant="default"
            onClick={onCreateCircuit}
            className="gap-1.5"
            data-testid="button-create-circuit"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create Circuit</span>
            <span className="sm:hidden">Create</span>
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
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
              <span className="hidden sm:inline">{lens.label}</span>
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
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-teal-500" />
              <span>Tag</span>
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
      
      {circuits.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Your Circuits ({circuits.length})</h4>
          <div className="space-y-1">
            {circuits.slice(0, 3).map((circuit) => (
              <div
                key={circuit.id}
                className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1"
                data-testid={`circuit-${circuit.id}`}
              >
                {circuit.name}
              </div>
            ))}
            {circuits.length > 3 && (
              <p className="text-xs text-gray-500">+{circuits.length - 3} more</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
