import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { format, formatDistanceToNow } from 'date-fns';
import { Share2, MoreHorizontal, ChevronRight } from 'lucide-react';
import { type Node as GraphNode, type Edge as GraphEdge, type UserGraph } from '@shared/synthetic-data';
import { nearbyPulseData, nearbyPulseGraph } from '@shared/nearby-pulse-data';
import { cosineSimilarity } from '@shared/embedding-helpers';
import { NodeDetailPanel } from './NodeDetailPanel';
import { GraphControls } from './GraphControls';
import { Badge } from '@/components/ui/badge';

interface D3Node extends d3.SimulationNodeDatum, GraphNode {
  x?: number;
  y?: number;
  isGhost?: boolean;
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

interface NavigationLevel {
  nodeId: string;
  label: string;
}

interface SelfMapGraphProps {
  graphData: UserGraph;
  showNearbyPulse?: boolean;
}

export function SelfMapGraph({ graphData, showNearbyPulse = false }: SelfMapGraphProps) {
  const isNearbyPulse = showNearbyPulse;
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tooltipData, setTooltipData] = useState<{node: GraphNode, x: number, y: number} | null>(null);
  const [lensMode, setLensMode] = useState<'none' | 'recency' | 'heat' | 'category'>('none');
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [isLassoMode, setIsLassoMode] = useState(false);
  const [killedNodes, setKilledNodes] = useState<Set<string>>(new Set());
  const [pinnedNodes, setPinnedNodes] = useState<Set<string>>(new Set());
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorNodeId, setAnchorNodeId] = useState<string | null>(null);
  const [navigationStack, setNavigationStack] = useState<NavigationLevel[]>([{nodeId: 'root', label: 'Find'}]);
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [promotedGhosts, setPromotedGhosts] = useState<Set<string>>(new Set());
  const [promotedGhostNodes, setPromotedGhostNodes] = useState<GraphNode[]>([]);
  const simulationRef = useRef<d3.Simulation<D3Node, D3Link> | null>(null);
  const nodeGroupRef = useRef<d3.Selection<SVGGElement, D3Node, SVGGElement, unknown> | null>(null);
  const circlesRef = useRef<d3.Selection<SVGCircleElement, D3Node, SVGGElement, unknown> | null>(null);
  const ghostCirclesRef = useRef<d3.Selection<SVGCircleElement, D3Node, SVGGElement, unknown> | null>(null);
  const ghostLinksRef = useRef<Map<string, string>>(new Map());
  const zoomTransformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);
  const isLassoModeRef = useRef(isLassoMode);

  const matchingNodes = searchQuery.trim()
    ? new Set(
        graphData.nodes
          .filter(n => !killedNodes.has(n.id) && n.label.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(n => n.id)
      )
    : new Set<string>();

  const handleDrillDown = (node: GraphNode) => {
    if (node.children && node.children.length > 0) {
      setNavigationStack(prev => [...prev, { nodeId: node.id, label: node.label }]);
      setCurrentContext(node.id);
      setTooltipData(null);
    } else {
      setSelectedNode(node);
    }
  };

  const handleNavigateBack = () => {
    if (navigationStack.length > 1) {
      const newStack = navigationStack.slice(0, -1);
      setNavigationStack(newStack);
      const newContext = newStack.length === 1 ? null : newStack[newStack.length - 1].nodeId;
      setCurrentContext(newContext);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === navigationStack.length - 1) return;
    const newStack = navigationStack.slice(0, index + 1);
    setNavigationStack(newStack);
    const newContext = newStack.length === 1 ? null : newStack[newStack.length - 1].nodeId;
    setCurrentContext(newContext);
  };

  const findNearestPersonalNode = (ghost: D3Node, personalNodes: D3Node[]): D3Node | null => {
    if (personalNodes.length === 0) return null;
    
    // Use semantic similarity if embeddings are available
    if (ghost.embedding) {
      const nodesWithEmbeddings = personalNodes.filter(n => n.embedding);
      
      if (nodesWithEmbeddings.length > 0) {
        let maxSimilarity = -1;
        let nearest: D3Node | null = null;

        nodesWithEmbeddings.forEach(node => {
          const similarity = cosineSimilarity(ghost.embedding!, node.embedding!);
          if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            nearest = node;
          }
        });

        return nearest;
      }
    }
    
    // Fallback to spatial distance if embeddings not available
    if (!ghost.x || !ghost.y) return null;
    
    let minDist = Infinity;
    let nearest: D3Node | null = null;

    personalNodes.forEach(node => {
      if (node.x !== undefined && node.y !== undefined) {
        const dx = ghost.x! - node.x;
        const dy = ghost.y! - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nearest = node;
        }
      }
    });

    return nearest;
  };

  const handlePromoteGhost = (ghostId: string) => {
    // Find the ghost node in nearbyPulseGraph
    const ghostNode = nearbyPulseGraph.nodes.find(n => n.id === ghostId);
    if (!ghostNode) return;

    // Add to promoted ghosts set (to filter out from ghost rendering)
    setPromotedGhosts(prev => new Set([...Array.from(prev), ghostId]));
    
    // Clone as personal node: explicitly remove isGhost and ghost-specific properties
    const personalNode: GraphNode = {
      ...ghostNode,
      // Ensure no ghost flag
    };
    // @ts-ignore - Remove isGhost property if it exists
    delete (personalNode as any).isGhost;
    
    setPromotedGhostNodes(prev => [...prev, personalNode]);
    
    setTooltipData(null);
    // Optional: persist to backend
    // addNodeToUserGraph(ghostId);
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

    let interestNodes: D3Node[] = [];
    if (currentContext) {
      const contextNode = graphData.nodes.find(n => n.id === currentContext);
      if (contextNode && contextNode.children) {
        interestNodes = graphData.nodes
          .filter(n => !killedNodes.has(n.id) && contextNode.children!.includes(n.id))
          .map(n => ({ ...n }));
      }
    } else {
      interestNodes = [
        ...graphData.nodes.filter(n => !killedNodes.has(n.id)).map(n => ({ ...n })),
        ...promotedGhostNodes.filter(n => !killedNodes.has(n.id)).map(n => ({ ...n }))
      ];
    }

    // Add ghost nodes when in nearbyPulse mode (excluding promoted ones)
    if (isNearbyPulse && !currentContext) {
      const ghostNodeData = nearbyPulseGraph.nodes
        .filter(n => nearbyPulseData.ghostNodes.includes(n.id) && !promotedGhosts.has(n.id))
        .map(n => ({ ...n, isGhost: true }));
      interestNodes = [...interestNodes, ...ghostNodeData];
    }

    const nodes: D3Node[] = [...interestNodes];
    const nodeIdSet = new Set(nodes.map(n => n.id));
    const links: D3Link[] = graphData.edges
      .filter(e => 
        !killedNodes.has(e.source) && 
        !killedNodes.has(e.target) &&
        nodeIdSet.has(e.source) && 
        nodeIdSet.has(e.target)
      )
      .map(e => ({
        ...e,
        source: nodes.find(n => n.id === e.source)!,
        target: nodes.find(n => n.id === e.target)!,
      }));

    setAnchorNodeId('user-anchor');

    const clusterChargeForce = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          
          if (nodeA.id === 'user-anchor' || nodeB.id === 'user-anchor') continue;
          
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

    if (currentContext) {
      const transition = d3.transition().duration(750);
      svg.transition(transition as any)
        .call(zoom.scaleTo as any, 1)
        .call(zoom.translateTo as any, width / 2, height / 2);
    }

    const linkGroup = g.append('g');
    const link = linkGroup
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-opacity', d => d.weight * 0.4 + 0.1)
      .attr('stroke-width', d => d.weight * 2);

    // Separate ghost and regular nodes
    const ghostNodes = nodes.filter(d => (d as D3Node).isGhost);
    const regularNodes = nodes.filter(d => !(d as D3Node).isGhost);

    // Ghost-to-personal links layer (below ghost nodes)
    const ghostLinkGroup = g.append('g')
      .attr('class', 'ghost-links');

    // Ghost nodes layer (rendered first, will be behind regular nodes)
    const ghostNodeGroup = g.append('g')
      .attr('class', 'ghost-nodes')
      .selectAll('g')
      .data(ghostNodes)
      .join('g')
      .attr('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        handlePromoteGhost(d.id);
      })
      .on('mouseover', (event, d) => {
        const [x, y] = d3.pointer(event, svgRef.current);
        setTooltipData({ node: d, x, y });
      })
      .on('mouseout', () => {
        setTooltipData(null);
      });

    const ghostCircles = ghostNodeGroup.append('circle')
      .attr('class', 'ghost-node')
      .attr('r', d => Math.sqrt(d.attentionWeight) * 0.6)
      .attr('fill', 'none')
      .attr('stroke', '#f5a623')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4,2')
      .attr('opacity', 0.35)
      .attr('pointer-events', 'all')
      .attr('data-testid', d => `node-${d.id}`);

    ghostCirclesRef.current = ghostCircles;

    ghostNodeGroup.append('text')
      .text(d => `${d.label} (nearby)`)
      .attr('font-size', '11px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('fill', '#6b7280')
      .attr('text-anchor', 'middle')
      .attr('dy', d => Math.sqrt(d.attentionWeight) * 0.6 + 14)
      .attr('pointer-events', 'none');

    // Regular nodes layer (rendered on top)
    const nodeGroup = g.append('g')
      .attr('class', 'regular-nodes')
      .selectAll('g')
      .data(regularNodes)
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

    // Combine both ghost and regular node groups for lasso selection
    const allNodeGroups = g.selectAll<SVGGElement, D3Node>('.ghost-nodes g, .regular-nodes g');
    nodeGroupRef.current = allNodeGroups as any;

    // Add halos for overlapping nodes
    const overlappingNodeIds = new Set(nearbyPulseData.overlaps.map(o => o.userNodeId));
    const haloGroup = nodeGroup.filter((d: any) => isNearbyPulse && overlappingNodeIds.has(d.id));
    
    haloGroup.append('circle')
      .attr('class', 'halo-ring')
      .attr('r', d => Math.sqrt(d.attentionWeight) * 0.6 + 6)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', d => {
        const overlap = nearbyPulseData.overlaps.find(o => o.userNodeId === d.id);
        return overlap ? overlap.overlapScore * 0.7 : 0.6;
      })
      .style('animation', 'pulse-halo 2s ease-in-out infinite');

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

    let anchorCreated = false;
    let ghostLinksCreated = false;
    let anchorNode: D3Node | null = null;
    let anchorLinks: any = null;
    let anchorGroup: any = null;

    simulation.on('tick', () => {
      // Update link positions
      link
        .attr('x1', d => (d.source as D3Node).x!)
        .attr('y1', d => (d.source as D3Node).y!)
        .attr('x2', d => (d.target as D3Node).x!)
        .attr('y2', d => (d.target as D3Node).y!);

      if (anchorLinks) {
        anchorLinks
          .attr('x1', (d: any) => d.source.x!)
          .attr('y1', (d: any) => d.source.y!)
          .attr('x2', (d: any) => d.target.x!)
          .attr('y2', (d: any) => d.target.y!);
      }

      // Update ghost link positions
      ghostLinkGroup.selectAll('line.ghost-link')
        .attr('x1', (d: any) => d.source.x!)
        .attr('y1', (d: any) => d.source.y!)
        .attr('x2', (d: any) => d.target.x!)
        .attr('y2', (d: any) => d.target.y!);

      // Update node positions
      ghostNodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
      nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
      
      if (anchorGroup && anchorNode) {
        anchorGroup.attr('transform', `translate(${anchorNode.x},${anchorNode.y})`);
      }

      // Post-settling operations: create anchor and ghost links once before freezing
      if (!anchorCreated && simulation.alpha() < 0.005 && interestNodes.length > 0) {
        // Create anchor node at centroid
        const centroidX = d3.mean(interestNodes, d => d.x!) || width / 2;
        const centroidY = d3.mean(interestNodes, d => d.y!) || height / 2;
        
        anchorNode = {
          id: 'user-anchor',
          label: 'You',
          type: 'topic',
          cluster: undefined,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          firstSeen: new Date().toISOString(),
          attentionWeight: 50,
          sharedCount: 0,
          trending: false,
          activityScore: 'High',
          source: 'internal',
          evidence: {},
          x: centroidX,
          y: centroidY,
          fx: centroidX,
          fy: centroidY,
        } as D3Node;
        
        nodes.push(anchorNode);
        
        // Connect non-ghost nodes to the anchor
        const anchorEdges = interestNodes
          .filter(node => !(node as D3Node).isGhost)
          .map(node => ({
            source: node,
            target: anchorNode!,
            weight: 0.05,
            type: 'anchor',
          }));
        
        anchorLinks = linkGroup
          .selectAll('line.anchor-link')
          .data(anchorEdges)
          .join('line')
          .attr('class', 'anchor-link')
          .attr('stroke', '#d1d5db')
          .attr('stroke-opacity', 0.15)
          .attr('stroke-width', 0.5)
          .attr('x1', d => d.source.x!)
          .attr('y1', d => d.source.y!)
          .attr('x2', d => d.target.x!)
          .attr('y2', d => d.target.y!);
        
        anchorGroup = g.append('g')
          .attr('transform', `translate(${centroidX},${centroidY})`)
          .attr('cursor', 'default')
          .attr('data-testid', 'node-user-anchor');
        
        anchorGroup.append('circle')
          .attr('r', 15)
          .attr('fill', '#f59e0b')
          .attr('stroke', '#f59e0b')
          .attr('stroke-width', 3)
          .attr('filter', 'url(#anchor-shadow)');
        
        anchorGroup.append('text')
          .text('★')
          .attr('font-size', '16px')
          .attr('font-family', 'Inter, sans-serif')
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('pointer-events', 'none');
        
        anchorGroup.append('text')
          .text('You')
          .attr('font-size', '11px')
          .attr('font-family', 'Inter, sans-serif')
          .attr('fill', '#374151')
          .attr('text-anchor', 'middle')
          .attr('dy', 28)
          .attr('pointer-events', 'none');
        
        anchorCreated = true;
      }

      // Create ghost-to-personal connections once after settling (before freezing)
      if (!ghostLinksCreated && simulation.alpha() < 0.005 && ghostNodes.length > 0 && regularNodes.length > 0) {
        const ghostLinkPairs: Array<{source: D3Node, target: D3Node}> = [];
        
        ghostNodes.forEach(ghost => {
          const nearest = findNearestPersonalNode(ghost, regularNodes);
          if (nearest) {
            ghostLinksRef.current.set(ghost.id, nearest.id);
            ghostLinkPairs.push({ source: ghost, target: nearest });
          }
        });

        // Render dashed links from ghost nodes to nearest personal nodes
        ghostLinkGroup
          .selectAll('line.ghost-link')
          .data(ghostLinkPairs)
          .join('line')
          .attr('class', 'ghost-link')
          .attr('stroke', '#bbb')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '3,3')
          .attr('opacity', 0.4)
          .attr('x1', d => d.source.x!)
          .attr('y1', d => d.source.y!)
          .attr('x2', d => d.target.x!)
          .attr('y2', d => d.target.y!)
          .lower();
        
        ghostLinksCreated = true;
      }

      // Freeze simulation after settling for stable hover interactions
      if (simulation.alpha() < 0.005) {
        simulation.stop();
      }
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
  }, [graphData, killedNodes, pinnedNodes, currentContext, isNearbyPulse, promotedGhosts, promotedGhostNodes]);

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
      return node.attentionWeight > 80 ? '#1e40af' :
             node.attentionWeight > 60 ? '#3b82f6' :
             node.attentionWeight > 40 ? '#60a5fa' : '#bfdbfe';
    }
    
    if (mode === 'category') {
      return node.categoryColor || '#9ca3af';
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
    // Ghost nodes always keep their fixed color regardless of lens mode
  }, [lensMode]);

  useEffect(() => {
    const matchingNodesArray = Array.from(matchingNodes);
    const selectedNodesArray = Array.from(selectedNodes);
    const pinnedNodesArray = Array.from(pinnedNodes);
    
    if (circlesRef.current) {
      circlesRef.current
        .attr('stroke', (d: any) => {
          if (selectedNodesArray.includes(d.id)) return '#3b82f6';
          if (matchingNodesArray.includes(d.id)) return '#f59e0b';
          if (pinnedNodesArray.includes(d.id)) return '#10b981';
          return '#1f2937';
        })
        .attr('stroke-width', (d: any) => {
          if (selectedNodesArray.includes(d.id) || pinnedNodesArray.includes(d.id) || matchingNodesArray.includes(d.id)) return 3;
          return 1.5;
        })
        .attr('opacity', (d: any) => {
          if (searchQuery && !matchingNodesArray.includes(d.id)) return 0.3;
          return 1;
        });
    }
    
    if (ghostCirclesRef.current) {
      ghostCirclesRef.current
        .attr('stroke', (d: any) => {
          if (selectedNodesArray.includes(d.id)) return '#3b82f6';
          if (matchingNodesArray.includes(d.id)) return '#f59e0b';
          if (pinnedNodesArray.includes(d.id)) return '#10b981';
          return '#9ca3af';
        })
        .attr('stroke-width', (d: any) => {
          if (selectedNodesArray.includes(d.id) || pinnedNodesArray.includes(d.id) || matchingNodesArray.includes(d.id)) return 3;
          return 1.5;
        })
        .attr('opacity', (d: any) => {
          if (searchQuery && !matchingNodesArray.includes(d.id)) return 0.2;
          return 0.6;
        });
    }
  }, [selectedNodes, pinnedNodes, matchingNodes, searchQuery]);

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
      {navigationStack.length > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow px-3 py-2 flex items-center gap-2" data-testid="breadcrumb-navigation">
          {navigationStack.map((level, index) => (
            <div key={level.nodeId} className="flex items-center gap-2">
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className={`text-sm ${
                  index === navigationStack.length - 1
                    ? 'font-semibold text-gray-900'
                    : 'text-gray-600 hover-elevate rounded px-2 py-1'
                }`}
                data-testid={`breadcrumb-${level.nodeId}`}
                disabled={index === navigationStack.length - 1}
              >
                {level.label}
              </button>
              {index < navigationStack.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      )}
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
        showBackButton={navigationStack.length > 1}
        onNavigateBack={handleNavigateBack}
        isNearbyPulse={isNearbyPulse}
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
            <div className="mb-3">
              <div className="text-xs text-gray-700 mb-1">Interest</div>
              <div className="font-semibold text-gray-900">{tooltipData.node.label}</div>
            </div>
            {(tooltipData.node as D3Node).isGhost ? (
              <>
                <div className="mb-3">
                  <div className="text-xs text-amber-600 font-medium mb-1">Trending nearby</div>
                  <div className="text-sm text-gray-900">
                    Popular with {tooltipData.node.sharedCount} users in your area
                  </div>
                </div>
                <div className="text-xs text-gray-600 italic">
                  Click to add to your interests
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <div className="text-xs text-gray-700 mb-1">Last Interaction</div>
                  <div className="text-sm text-gray-900">
                    {formatDistanceToNow(new Date(tooltipData.node.lastActive), { addSuffix: true })}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-700 mb-1 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Shared Nearby</span>
                  </div>
                  <div className="text-sm text-gray-900">{tooltipData.node.sharedCount} users</div>
                </div>
                {tooltipData.node.children && tooltipData.node.children.length > 0 && (
                  <button
                    className="w-full mt-2 pt-2 border-t border-gray-200 flex items-center justify-center gap-1 text-xs text-gray-600 hover-elevate"
                    data-testid="button-expand-node"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDrillDown(tooltipData.node);
                    }}
                  >
                    <MoreHorizontal className="w-3.5 h-3.5" />
                    <span>Expand</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
