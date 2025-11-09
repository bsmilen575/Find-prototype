import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { type Node as GraphNode, type Edge as GraphEdge, type UserGraph } from '@shared/synthetic-data';
import { NodeDetailPanel } from './NodeDetailPanel';
import { GraphControls } from './GraphControls';

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
  const [lensMode, setLensMode] = useState<'none' | 'recency' | 'source' | 'heat'>('none');
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [killedNodes, setKilledNodes] = useState<Set<string>>(new Set());
  const [pinnedNodes, setPinnedNodes] = useState<Set<string>>(new Set());
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const simulationRef = useRef<d3.Simulation<D3Node, D3Link> | null>(null);
  const nodeGroupRef = useRef<d3.Selection<SVGGElement, D3Node, SVGGElement, unknown> | null>(null);
  const circlesRef = useRef<d3.Selection<SVGCircleElement, D3Node, SVGGElement, unknown> | null>(null);
  const zoomTransformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);
  const isLassoModeRef = useRef(isLassoMode);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    svg.selectAll('*').remove();

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

    const simulation = d3.forceSimulation<D3Node>(nodes)
      .force('link', d3.forceLink<D3Node, D3Link>(links)
        .id(d => d.id)
        .distance(d => 80 + (1 - d.weight) * 40)
        .strength(d => d.weight * 0.5)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => Math.sqrt((d as D3Node).attentionWeight) * 0.6 + 5));

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
      });

    nodeGroupRef.current = nodeGroup;

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
    
    if (mode === 'source') {
      const sourceColors: Record<string, string> = {
        book: '#8b5cf6',
        podcast: '#ec4899',
        article: '#3b82f6',
        video: '#f59e0b',
        creator: '#10b981',
        topic: '#6366f1',
        tag: '#14b8a6',
      };
      return sourceColors[node.type] || '#9ca3af';
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
      circlesRef.current
        .attr('stroke', (d: any) => selectedNodes.has(d.id) ? '#3b82f6' : pinnedNodes.has(d.id) ? '#10b981' : '#1f2937')
        .attr('stroke-width', (d: any) => selectedNodes.has(d.id) || pinnedNodes.has(d.id) ? 3 : 1.5);
    }
  }, [selectedNodes, pinnedNodes]);

  const handleKillNode = (nodeId: string) => {
    setKilledNodes(prev => new Set([...prev, nodeId]));
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
    </>
  );
}
