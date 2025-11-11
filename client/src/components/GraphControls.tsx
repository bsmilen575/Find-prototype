import { Eye, Flame, Clock, Lasso, Plus, Search, ArrowLeft, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { clusterCategoryMetadata } from '@/shared/cluster-colors';

interface Circuit {
  id: string;
  name: string;
  nodeIds: string[];
  createdAt: Date;
}

interface GraphControlsProps {
  lensMode: 'none' | 'recency' | 'heat' | 'category';
  onLensModeChange: (mode: 'none' | 'recency' | 'heat' | 'category') => void;
  isLassoMode: boolean;
  onLassoModeChange: (enabled: boolean) => void;
  selectedNodesCount: number;
  onCreateCircuit: () => void;
  circuits?: Circuit[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchingNodesCount: number;
  anchorNodeId: string | null;
  showBackButton?: boolean;
  onNavigateBack?: () => void;
  isNearbyPulse?: boolean;
}

export function GraphControls({ 
  lensMode, 
  onLensModeChange, 
  isLassoMode, 
  onLassoModeChange,
  selectedNodesCount,
  onCreateCircuit,
  circuits = [],
  searchQuery,
  onSearchChange,
  matchingNodesCount,
  anchorNodeId,
  showBackButton = false,
  onNavigateBack,
  isNearbyPulse = false
}: GraphControlsProps) {
  const lenses = [
    { id: 'none' as const, label: 'Default', icon: Eye },
    { id: 'recency' as const, label: 'Recency', icon: Clock },
    { id: 'heat' as const, label: 'Heat', icon: Flame },
    { id: 'category' as const, label: 'Category', icon: Palette },
  ];

  return (
    <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-auto z-20 bg-white rounded-xl border border-gray-300 shadow-lg p-3 space-y-3 max-w-full md:max-w-md">
      {showBackButton && onNavigateBack && (
        <Button
          size="sm"
          variant="outline"
          onClick={onNavigateBack}
          className="gap-1.5 w-full"
          data-testid="button-back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Button>
      )}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search interests..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
          data-testid="input-search-graph"
        />
        {searchQuery && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {matchingNodesCount} {matchingNodesCount === 1 ? 'match' : 'matches'}
          </div>
        )}
      </div>
      
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
      
      {lensMode === 'heat' && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-800" />
              <span>&gt;80</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>60-80</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span>40-60</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-200" />
              <span>&lt;40</span>
            </div>
          </div>
        </div>
      )}

      {lensMode === 'category' && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Semantic Categories</h4>
          <div className="space-y-1.5">
            {clusterCategoryMetadata.map((category) => (
              <div 
                key={category.id} 
                className="flex items-start gap-1.5"
                data-testid={`legend-category-${category.id}`}
              >
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" 
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <span className="font-medium">{category.name}</span>
                  <span className="text-gray-500 ml-1">
                    ({category.examples.slice(0, 2).join(', ')})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {anchorNodeId && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-amber-500" style={{ boxShadow: '0 2px 8px rgba(245, 158, 11, 0.6)' }} />
            <span>★ You</span>
          </div>
        </div>
      )}

      {isNearbyPulse && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Nearby Pulse Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" className="flex-shrink-0">
                <circle 
                  cx="8" 
                  cy="8" 
                  r="6" 
                  fill="#e5e7eb" 
                  stroke="#9ca3af" 
                  strokeWidth="1.5" 
                  strokeDasharray="3,1.5"
                  opacity="0.6"
                />
              </svg>
              <span>Ghost Node (Popular Nearby)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" className="flex-shrink-0">
                <circle 
                  cx="8" 
                  cy="8" 
                  r="7" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
              <span>Halo (Also Popular Here)</span>
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
