import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { format } from 'date-fns';
import { TrendingUp, Share2 } from 'lucide-react';
import { type Node as GraphNode, type Edge as GraphEdge, type UserGraph } from '@shared/synthetic-data';
import { NodeDetailPanel } from './NodeDetailPanel';
import { GraphControls } from './GraphControls';
import { Badge } from '@/components/ui/badge';

interface D3Node extends d3.SimulationNodeDatum, GraphNode {
  x?: number;
  y?: number;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  weight: number;
  type: string;
}

interface Circuit {
  id: string;
  name: string;
  nodeIds: string[];
  createdAt: Date;
}

interface SelfMapGraphProps {
  graphData: UserGraph;
}

export function SelfMapGraph({ graphData }: SelfMapGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tooltipData, setTooltipData] = useState<{node: GraphNode, x: number, y: number} | null>(null);
  const [lensMode, setLensMode] = useState<'none' | 'recency' | 'heat'>('none');
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [killedNodes, setKilledNodes] = useState<Set<string>>(new Set());
  const [pinnedNodes, setPinnedNodes] = useState<Set<string>>(new Set());
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorNodeId, setAnchorNodeId] = useState<string | null>(null);
  const simulationRef = useRef<d3.Simulation<D3Node, D3Link> | null>(null);
  const nodeGroupRef = useRef<d3.Selection<SVGGElement, D3Node, SVGGElement, unknown> | null>(null);
  const circlesRef = useRef<d3.Selection<SVGCircleElement, D3Node, SVGGElement, unknown> | null>(null);
  const zoomTransformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);
  const isLassoModeRef = useRef(isLassoMode);

  const matchingNodes = searchQuery.trim()
    ? new Set(
        graphData.nodes
          .filter(n => !killedNodes.has(n.id) && n.label.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(n => n.id)
      )
    : new Set<string>();

  const calculateAnchorNode = (nodes: D3Node[], links: D3Link[]): string | null => {
    if (nodes.length === 0) return null;

    const degreeMap = new Map<string, number>();
    nodes.forEach(node => degreeMap.set(node.id, 0));
    
    links.forEach(link => {
      const sourceId = typeof link.source === 'object' ? (link.source as D3Node).id : String(link.source);
      const targetId = typeof link.target === 'object' ? (link.target as D3Node).id : String(link.target);
      degreeMap.set(sourceId, (degreeMap.get(sourceId) || 0) + 1);
      degreeMap.set(targetId, (degreeMap.get(targetId) || 0) + 1);
    });

    const maxDegree = Math.max(...Array.from(degreeMap.values()));
    const maxAttention = Math.max(...nodes.map(n => n.attentionWeight));

    let maxCentrality = -1;
    let anchorId: string | null = null;

    nodes.forEach(node => {
      const degree = degreeMap.get(node.id) || 0;
      const normalizedDegree = maxDegree > 0 ? degree / maxDegree : 0;
      const normalizedAttention = maxAttention > 0 ? node.attentionWeight / maxAttention : 0;
      const centrality = (normalizedDegree * 0.6) + (normalizedAttention * 0.4);

      if (centrality > maxCentrality) {
        maxCentrality = centrality;
        anchorId = node.id;
      }
    });

    return anchorId;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'anchor-shadow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    filter.append('feDropShadow')
      .attr('dx', 0)
      .attr('dy', 2)
      .attr('stdDeviation', 4)
      .attr('flood-color', '#f59e0b')
      .attr('flood-opacity', 0.6);

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        zoomTransformRef.current = event.transform;
      });

    svg.call(zoom);

    const nodes: D3Node[] = graphData.nodes
      .filter(n => !killedNodes.has(n.id))
      .map(n => ({ ...n }));
    const links: D3Link[] = graphData.edges
      .filter(e => !killedNodes.has(e.source) && !killedNodes.has(e.target))
      .map(e => ({
        ...e,
        source: nodes.find(n => n.id === e.source)!,
        target: nodes.find(n => n.id === e.target)!,
      }));

    const anchorId = calculateAnchorNode(nodes, links);
    setAnchorNodeId(anchorId);

    const clusterChargeForce = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          
          const dx = nodeB.x! - nodeA.x!;
          const dy = nodeB.y! - nodeA.y!;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance === 0) continue;
          
          const sameCluster = nodeA.cluster && nodeB.cluster && nodeA.cluster === nodeB.cluster;
          const strength = sameCluster ? -150 : -350;
          
          const force = strength / (distance * distance);
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          
          nodeA.vx = (nodeA.vx || 0) + fx;
          nodeA.vy = (nodeA.vy || 0) + fy;
          nodeB.vx = (nodeB.vx || 0) - fx;
          nodeB.vy = (nodeB.vy || 0) - fy;
        }
      }
    };

    const simulation = d3.forceSimulation<D3Node>(nodes)
      .force('link', d3.forceLink<D3Node, D3Link>(links)
        .id(d => d.id)
        .distance(d => {
          const sourceNode = d.source as D3Node;
          const targetNode = d.target as D3Node;
          const sameCluster = sourceNode.cluster && targetNode.cluster && sourceNode.cluster === targetNode.cluster;
          return sameCluster ? 70 : 140;
        })
        .strength(d => d.weight * 0.5)
      )
      .force('charge', clusterChargeForce)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => Math.sqrt((d as D3Node).attentionWeight) * 0.6 + 10))
      .alphaDecay(0.01);

    simulationRef.current = simulation;

    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-opacity', d => d.weight * 0.4 + 0.1)
      .attr('stroke-width', d => d.weight * 2);

    const nodeGroup = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, D3Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any
      )
      .on('click', (event, d) => {
        event.stopPropagation();
        if (isLassoModeRef.current) {
          setSelectedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(d.id)) {
              newSet.delete(d.id);
            } else {
              newSet.add(d.id);
            }
            return newSet;
          });
        } else {
          setSelectedNode(d);
        }
      })
      .on('mouseover', (event, d) => {
        const [x, y] = d3.pointer(event, svgRef.current);
        setTooltipData({ node: d, x, y });
      })
      .on('mouseout', () => {
        setTooltipData(null);
      });

    nodeGroupRef.current = nodeGroup as any;

    const circles = nodeGroup.append('circle')
      .attr('r', d => Math.sqrt(d.attentionWeight) * 0.6)
      .attr('fill', d => getNodeColor(d, lensMode))
      .attr('stroke', '#1f2937')
      .attr('stroke-width', 1.5)
      .attr('data-testid', d => `node-${d.id}`);

    circlesRef.current = circles;

    const labels = nodeGroup.append('text')
      .text(d => d.label)
      .attr('font-size', '11px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('fill', '#374151')
      .attr('text-anchor', 'middle')
      .attr('dy', d => Math.sqrt(d.attentionWeight) * 0.6 + 14)
      .attr('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as D3Node).x!)
        .attr('y1', d => (d.source as D3Node).y!)
        .attr('x2', d => (d.target as D3Node).x!)
        .attr('y2', d => (d.target as D3Node).y!);

      nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    svg.on('click', () => {
      setSelectedNode(null);
      if (!isLassoMode) {
        setSelectedNodes(new Set());
      }
    });

    return () => {
      simulation.stop();
    };
  }, [graphData, killedNodes, pinnedNodes]);

  useEffect(() => {
    isLassoModeRef.current = isLassoMode;
  }, [isLassoMode]);

  useEffect(() => {
    if (!svgRef.current || !nodeGroupRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const existingBrush = svg.select('.brush');

    if (isLassoMode) {
      if (existingBrush.empty()) {
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        
        const brush = d3.brush()
          .extent([[0, 0], [width, height]])
          .on('start brush', (event) => {
            if (!event.selection) return;
            const [[x0, y0], [x1, y1]] = event.selection;
            
            const transform = zoomTransformRef.current;
            const [tx0, ty0] = transform.invert([x0, y0]);
            const [tx1, ty1] = transform.invert([x1, y1]);
            
            const selected = new Set<string>();
            
            nodeGroupRef.current?.each(function(d: any) {
              if (d.x >= tx0 && d.x <= tx1 && d.y >= ty0 && d.y <= ty1) {
                selected.add(d.id);
              }
            });
            
            setSelectedNodes(selected);
          })
          .on('end', (event) => {
            if (!event.selection) {
              setSelectedNodes(new Set());
            }
          });

        svg.append('g')
          .attr('class', 'brush')
          .call(brush as any);
      }
    } else {
      existingBrush.remove();
    }

    return () => {
      existingBrush.remove();
    };
  }, [isLassoMode, killedNodes]);

  const getNodeColor = (node: GraphNode, mode: typeof lensMode): string => {
    if (mode === 'none') return '#9ca3af';
    
    if (mode === 'recency') {
      const daysSinceActive = Math.floor(
        (new Date().getTime() - new Date(node.lastActive).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceActive < 7) return '#10b981';
      if (daysSinceActive < 30) return '#f59e0b';
      if (daysSinceActive < 90) return '#ef4444';
      return '#6b7280';
    }
    
    if (mode === 'heat') {
      return node.attentionWeight > 80 ? '#ef4444' :
             node.attentionWeight > 60 ? '#f59e0b' :
             node.attentionWeight > 40 ? '#fbbf24' : '#9ca3af';
    }
    
    return '#9ca3af';
  };

  useEffect(() => {
    if (circlesRef.current) {
      circlesRef.current
        .transition()
        .duration(300)
        .attr('fill', (d: any) => getNodeColor(d, lensMode));
    }
  }, [lensMode]);

  useEffect(() => {
    if (circlesRef.current) {
      const matchingNodesArray = Array.from(matchingNodes);
      const selectedNodesArray = Array.from(selectedNodes);
      const pinnedNodesArray = Array.from(pinnedNodes);
      
      circlesRef.current
        .attr('stroke', (d: any) => {
          if (selectedNodesArray.includes(d.id)) return '#3b82f6';
          if (matchingNodesArray.includes(d.id)) return '#f59e0b';
          if (pinnedNodesArray.includes(d.id)) return '#10b981';
          if (anchorNodeId === d.id) return '#f59e0b';
          return '#1f2937';
        })
        .attr('stroke-width', (d: any) => {
          if (selectedNodesArray.includes(d.id) || pinnedNodesArray.includes(d.id) || matchingNodesArray.includes(d.id)) return 3;
          if (anchorNodeId === d.id) return 3;
          return 1.5;
        })
        .attr('filter', (d: any) => {
          if (anchorNodeId === d.id) return 'url(#anchor-shadow)';
          return null;
        })
        .attr('opacity', (d: any) => {
          if (searchQuery && !matchingNodesArray.includes(d.id)) return 0.3;
          return 1;
        });
    }
  }, [selectedNodes, pinnedNodes, matchingNodes, searchQuery, anchorNodeId]);

  const handleKillNode = (nodeId: string) => {
    setKilledNodes(prev => new Set([...Array.from(prev), nodeId]));
    setSelectedNode(null);
  };

  const handlePinNode = (nodeId: string) => {
    setPinnedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleCreateCircuit = () => {
    if (selectedNodes.size >= 2) {
      const selectedLabels = Array.from(selectedNodes).map(id => 
        graphData.nodes.find(n => n.id === id)?.label
      ).filter(Boolean);
      
      const newCircuit: Circuit = {
        id: `circuit-${Date.now()}`,
        name: `Circuit: ${selectedLabels.slice(0, 3).join(', ')}${selectedLabels.length > 3 ? '...' : ''}`,
        nodeIds: Array.from(selectedNodes),
        createdAt: new Date(),
      };
      
      setCircuits(prev => [...prev, newCircuit]);
      setSelectedNodes(new Set());
      setIsLassoMode(false);
    }
  };

  return (
    <>
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ backgroundColor: '#f5f3f0' }}
        data-testid="graph-svg"
      />
      <GraphControls
        lensMode={lensMode}
        onLensModeChange={setLensMode}
        isLassoMode={isLassoMode}
        onLassoModeChange={setIsLassoMode}
        selectedNodesCount={selectedNodes.size}
        onCreateCircuit={handleCreateCircuit}
        circuits={circuits}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        matchingNodesCount={matchingNodes.size}
        anchorNodeId={anchorNodeId}
      />
      {selectedNode && (
        <NodeDetailPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onKill={handleKillNode}
          onPin={handlePinNode}
          isPinned={pinnedNodes.has(selectedNode.id)}
        />
      )}
      {tooltipData && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: `${tooltipData.x + 15}px`,
            top: `${tooltipData.y - 10}px`,
          }}
          data-testid="node-tooltip"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 pointer-events-auto" style={{ minWidth: '200px' }}>
            <div className="font-bold text-gray-900 mb-2">{tooltipData.node.label}</div>
            <div className="text-sm text-gray-600 mb-2">
              Added {format(new Date(tooltipData.node.createdAt), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">Activity:</span>
              <Badge
                variant={
                  tooltipData.node.activityScore === 'High'
                    ? 'default'
                    : tooltipData.node.activityScore === 'Medium'
                    ? 'secondary'
                    : 'outline'
                }
                className={
                  tooltipData.node.activityScore === 'High'
                    ? 'bg-green-500 hover:bg-green-600'
                    : tooltipData.node.activityScore === 'Medium'
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }
              >
                {tooltipData.node.activityScore}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
              <Share2 className="w-3 h-3" />
              <span>{tooltipData.node.sharedCount} shares</span>
            </div>
            {tooltipData.node.trending && (
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
