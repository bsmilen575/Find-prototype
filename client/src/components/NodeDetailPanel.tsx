import { X, ExternalLink } from 'lucide-react';
import { type Node } from '@shared/synthetic-data';
import { Button } from './ui/button';
import { syntheticUserGraph } from '@shared/synthetic-data';

interface NodeDetailPanelProps {
  node: Node;
  onClose: () => void;
  onKill: (nodeId: string) => void;
  onPin: (nodeId: string) => void;
  isPinned: boolean;
}

export function NodeDetailPanel({ node, onClose, onKill, onPin, isPinned }: NodeDetailPanelProps) {
  const neighbors = syntheticUserGraph.edges
    .filter(e => e.source === node.id || e.target === node.id)
    .map(e => {
      const neighborId = e.source === node.id ? e.target : e.source;
      return syntheticUserGraph.nodes.find(n => n.id === neighborId);
    })
    .filter(Boolean);

  const daysSinceActive = Math.floor(
    (new Date().getTime() - new Date(node.lastActive).getTime()) / (1000 * 60 * 60 * 24)
  );

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      book: '📚',
      podcast: '🎙️',
      article: '📰',
      video: '📹',
      creator: '👤',
      topic: '💡',
      tag: '🏷️',
    };
    return icons[type] || '📌';
  };

  return (
    <div
      className="absolute top-0 right-0 w-80 h-full bg-white border-l border-gray-300 shadow-lg overflow-y-auto"
      style={{ backgroundColor: '#ffffff' }}
      data-testid="node-detail-panel"
    >
      <div className="sticky top-0 bg-white border-b border-gray-300 p-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Node Details</h2>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          data-testid="button-close-panel"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getTypeIcon(node.type)}</span>
            <h3 className="text-xl font-semibold text-gray-900">{node.label}</h3>
          </div>
          <p className="text-sm text-gray-500 capitalize">{node.type}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Why it's here</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Source:</span>
              <span className="font-medium text-gray-900">{node.source}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Attention weight:</span>
              <span className="font-medium text-gray-900">{node.attentionWeight}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Evidence</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            {node.evidence.likes !== undefined && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Likes:</span>
                <span className="text-gray-900">{node.evidence.likes}</span>
              </div>
            )}
            {node.evidence.saves !== undefined && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Saves:</span>
                <span className="text-gray-900">{node.evidence.saves}</span>
              </div>
            )}
            {node.evidence.watchTime !== undefined && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Watch time:</span>
                <span className="text-gray-900">{Math.floor(node.evidence.watchTime / 60)}h {node.evidence.watchTime % 60}m</span>
              </div>
            )}
            {node.evidence.highlights !== undefined && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Highlights:</span>
                <span className="text-gray-900">{node.evidence.highlights}</span>
              </div>
            )}
            {node.evidence.visits !== undefined && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Visits:</span>
                <span className="text-gray-900">{node.evidence.visits}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline</h4>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">First seen:</span>
              <span className="text-gray-900">{new Date(node.firstSeen).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Last active:</span>
              <span className="text-gray-900">
                {daysSinceActive === 0 ? 'Today' : `${daysSinceActive}d ago`}
              </span>
            </div>
          </div>
        </div>

        {node.cluster && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Cluster</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-900">
                {syntheticUserGraph.clusters.find(c => c.id === node.cluster)?.name}
              </p>
            </div>
          </div>
        )}

        {neighbors.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Connected to ({neighbors.length})
            </h4>
            <div className="space-y-2">
              {neighbors.slice(0, 5).map((neighbor) => (
                <div
                  key={neighbor!.id}
                  className="bg-gray-50 rounded-lg p-2 flex items-center justify-between hover-elevate"
                  data-testid={`neighbor-${neighbor!.id}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(neighbor!.type)}</span>
                    <span className="text-sm text-gray-900">{neighbor!.label}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              ))}
              {neighbors.length > 5 && (
                <p className="text-xs text-gray-500 text-center">
                  +{neighbors.length - 5} more connections
                </p>
              )}
            </div>
          </div>
        )}

        <div className="pt-4 space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onKill(node.id)}
            data-testid="button-kill-node"
          >
            Kill this node
          </Button>
          <Button
            variant={isPinned ? "default" : "outline"}
            className="w-full"
            onClick={() => onPin(node.id)}
            data-testid="button-keep-node"
          >
            {isPinned ? 'Pinned ✓' : 'Keep & pin this node'}
          </Button>
        </div>
      </div>
    </div>
  );
}
