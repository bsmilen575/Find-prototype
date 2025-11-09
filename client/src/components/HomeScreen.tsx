import { useEffect, useRef, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { MapPin, Info, X } from 'lucide-react';
import * as d3 from 'd3';

const CLUSTERS = [
  { name: "AI & Cognition", color: "#14b8a6" },
  { name: "Philosophy & Meaning", color: "#8b5cf6" },
  { name: "Design & Aesthetics", color: "#ec4899" },
  { name: "Literature & Film", color: "#3b82f6" },
  { name: "Movement & Outdoors", color: "#10b981" },
  { name: "Food & Ritual", color: "#f59e0b" }
];

const sampleLabels: Record<string, string[]> = {
  "AI & Cognition": ["AI Consciousness", "Turing Test", "Interpretability", "Embeddings", "Attention", "Memory", "Vector DBs", "LLMs"],
  "Philosophy & Meaning": ["Existentialism", "Ethics", "Identity", "Mind", "Truth", "Knowledge", "Logic", "Free Will", "Phenomenology"],
  "Design & Aesthetics": ["Minimalism", "Typography", "Motion", "UI Patterns", "Color Theory", "Icons", "Brand Systems", "Interaction"],
  "Literature & Film": ["Murakami", "Borges", "Blade Runner", "Ex Machina", "Cannes", "Sci-Fi Cinema", "Cinematography", "Surrealism", "Dr. Moreau"],
  "Movement & Outdoors": ["Running", "Cycling", "Swimming", "Hiking", "Climbing", "Yoga", "Strength Training", "Trail Exploration"],
  "Food & Ritual": ["Cooking", "Baking", "Coffee", "Tea Ceremony", "Fermentation", "Farmers Markets", "Dining with Friends", "Nutrition"]
};

const nearbyLabels: Record<string, string[]> = {
  "AI & Cognition": ["AGI Safety", "Neural Networks", "GPT Models", "Robotics", "Transformers", "Deep Learning"],
  "Philosophy & Meaning": ["Stoicism", "Absurdism", "Consciousness", "Meditation", "Purpose", "Eastern Philosophy"],
  "Design & Aesthetics": ["Brutalism", "Swiss Design", "3D Graphics", "Generative Art", "Grid Systems", "Wabi-Sabi"],
  "Literature & Film": ["Dostoevsky", "Lynch Films", "A24", "Criterion", "Kafka", "Coen Brothers", "Tarkovsky"],
  "Movement & Outdoors": ["Rock Climbing", "Marathon Training", "Bouldering", "Surfing", "Parkour", "Trail Running", "Calisthenics"],
  "Food & Ritual": ["Sourdough", "Wine Tasting", "Foraging", "Food Photography", "Slow Food", "Urban Gardening", "Kombucha"]
};

interface Node extends d3.SimulationNodeDatum {
  id: number;
  label: string;
  cluster: string;
  color: string;
  centrality: number;
  overlap: boolean;
}

interface Edge {
  source: number | Node;
  target: number | Node;
  cross: boolean;
  weight: number;
}

interface HoverCard {
  nodeId: number;
  nodeLabel: string;
  cluster: string;
  x: number;
  y: number;
  overlapCount: number;
  reason: string;
}

export function HomeScreen() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<Node, Edge> | null>(null);
  const [viewMode, setViewMode] = useState<'mine' | 'nearby'>('mine');
  const [pathMode, setPathMode] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
  const [hoverCard, setHoverCard] = useState<HoverCard | null>(null);
  const [pathHoverNode, setPathHoverNode] = useState<{ label: string; cluster: string; x: number; y: number } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    d3.select(svgRef.current).selectAll("*").remove();

    const labelsToUse = viewMode === 'nearby' ? nearbyLabels : sampleLabels;
    const nodes: Node[] = [];
    let id = 0;
    CLUSTERS.forEach(c => {
      const labels = labelsToUse[c.name];
      labels.forEach(l => {
        nodes.push({
          id: id++,
          label: l,
          cluster: c.name,
          color: c.color,
          centrality: Math.random(),
          overlap: viewMode === 'nearby' && Math.random() < 0.25
        });
      });
    });

    nodesRef.current = nodes;

    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const same = a.cluster === b.cluster;
        const chance = same ? 0.6 : 0.12;
        if (Math.random() < chance) {
          edges.push({ source: a.id, target: b.id, cross: !same, weight: same ? 0.6 : 0.2 });
        }
      }
    }

    const svg = d3.select(svgRef.current);
    const g = svg.append("g");

    const link = g.selectAll("line")
      .data(edges)
      .join("line")
      .attr("stroke", (d: Edge) => d.cross ? "#cbd5e1" : "#94a3b8")
      .attr("stroke-width", (d: Edge) => d.cross ? 0.8 : 1.2)
      .attr("stroke-opacity", (d: Edge) => d.cross ? 0.2 : 0.3);

    const pathLinesGroup = g.append("g").attr("class", "path-lines");

    const defs = svg.append("defs");
    const filter = defs.append("filter")
      .attr("id", "glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const selectFilter = defs.append("filter")
      .attr("id", "selectGlow");
    selectFilter.append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");
    const selectMerge = selectFilter.append("feMerge");
    selectMerge.append("feMergeNode").attr("in", "coloredBlur");
    selectMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const node = g.selectAll("g.node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .style("cursor", pathMode ? "crosshair" : "pointer");

    node.on("click", function(event: MouseEvent, d: Node) {
      event.stopPropagation();
      if (pathMode) {
        setSelectedNodes(prev => {
          if (prev.includes(d.id)) {
            return prev.filter(id => id !== d.id);
          } else if (prev.length < 4) {
            return [...prev, d.id];
          }
          return prev;
        });
      }
    });

    node.on("mouseenter", function(event: MouseEvent, d: Node) {
      if (pathMode) {
        setPathHoverNode({
          label: d.label,
          cluster: d.cluster,
          x: event.clientX,
          y: event.clientY
        });
      } else {
        const reasons = [
          `You and 2 nearby annotated ${d.label} this week.`,
          `3 people here bridge ${d.label} ↔ another interest.`,
          `Live overlap detected on ${d.label}.`
        ];

        setHoverCard({
          nodeId: d.id,
          nodeLabel: d.label,
          cluster: d.cluster,
          x: event.clientX,
          y: event.clientY,
          overlapCount: Math.floor(Math.random() * 5) + 1,
          reason: reasons[Math.floor(Math.random() * reasons.length)]
        });
      }
    });

    node.on("mousemove", function(event: MouseEvent, d: Node) {
      if (pathMode) {
        setPathHoverNode(prev => prev ? {
          ...prev,
          x: event.clientX,
          y: event.clientY
        } : null);
      } else {
        setHoverCard(prev => prev && prev.nodeId === d.id ? {
          ...prev,
          x: event.clientX,
          y: event.clientY
        } : prev);
      }
    });

    node.on("mouseleave", function() {
      if (pathMode) {
        setPathHoverNode(null);
      } else {
        setHoverCard(null);
      }
    });

    function updateNodeVisuals() {
      node.selectAll("*").remove();

      node.each(function(d: Node) {
        const nodeGroup = d3.select(this);
        const isSelected = selectedNodes.includes(d.id);

        if (isSelected && pathMode) {
          nodeGroup.append("circle")
            .attr("r", 4 + 8 * d.centrality + 5)
            .attr("fill", "none")
            .attr("stroke", "#fbbf24")
            .attr("stroke-width", 3)
            .attr("opacity", 0.9)
            .style("filter", "url(#selectGlow)");
        }

        nodeGroup.append("circle")
          .attr("r", 4 + 8 * d.centrality)
          .attr("fill", d.color)
          .attr("stroke", d3.color(d.color)?.darker(1)?.toString() || "#000")
          .attr("stroke-width", 1)
          .style("filter", (d.overlap && viewMode === 'nearby') ? "url(#glow)" : "none")
          .style("opacity", 0.85);

        if (d.overlap && viewMode === 'mine') {
          for (let i = 0; i < 2; i++) {
            const angle = (i / 2) * Math.PI * 2;
            const radius = 4 + 8 * d.centrality + 6;
            nodeGroup.append("circle")
              .attr("r", 2)
              .attr("fill", "#ffffff")
              .attr("stroke", d.color)
              .attr("stroke-width", 1)
              .attr("cx", Math.cos(angle) * radius)
              .attr("cy", Math.sin(angle) * radius)
              .style("opacity", 0.8);
          }
        }
      });
    }

    updateNodeVisuals();

    function updatePathLines() {
      pathLinesGroup.selectAll("*").remove();

      if (pathMode && selectedNodes.length > 1) {
        const selectedNodeData = selectedNodes
          .map(id => nodes.find(n => n.id === id))
          .filter(n => n && n.x !== undefined && n.y !== undefined) as Node[];

        for (let i = 0; i < selectedNodeData.length - 1; i++) {
          const source = selectedNodeData[i];
          const target = selectedNodeData[i + 1];
          
          pathLinesGroup.append("line")
            .attr("x1", source.x!)
            .attr("y1", source.y!)
            .attr("x2", target.x!)
            .attr("y2", target.y!)
            .attr("stroke", "#fbbf24")
            .attr("stroke-width", 3)
            .attr("stroke-dasharray", "8,4")
            .attr("opacity", 0.8)
            .style("filter", "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))");
        }
      }
    }

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id((d: any) => d.id).strength((d: any) => d.weight))
      .force("charge", d3.forceManyBody().strength(-70))
      .force("radial", d3.forceRadial((d: any) => 150 * (1 - d.centrality) + 40, width / 2, height / 2))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);
        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        updatePathLines();
      });

    simulationRef.current = simulation;

    setTimeout(() => {
      simulation.alpha(0);
      simulation.stop();
    }, 2000);

    if (pathMode) {
      simulation.alpha(0.3);
      setTimeout(() => {
        simulation.stop();
      }, 500);
    }

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });

    svg.call(zoom);

    return () => {
      simulation.stop();
    };
  }, [viewMode, pathMode, selectedNodes]);

  useEffect(() => {
    if (!pathMode || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const nodes = nodesRef.current;

    svg.selectAll("g.node").each(function(d: any) {
      const nodeGroup = d3.select(this);
      const node = d as Node;
      const isSelected = selectedNodes.includes(node.id);

      nodeGroup.selectAll("circle").filter(function(this: SVGCircleElement) {
        return d3.select(this).attr("stroke") === "#fbbf24";
      }).remove();

      if (isSelected) {
        nodeGroup.insert("circle", ":first-child")
          .attr("r", 4 + 8 * node.centrality + 5)
          .attr("fill", "none")
          .attr("stroke", "#fbbf24")
          .attr("stroke-width", 3)
          .attr("opacity", 0.9)
          .style("filter", "url(#selectGlow)");
      }
    });

    const pathLinesGroup = svg.select("g.path-lines");
    pathLinesGroup.selectAll("*").remove();

    if (selectedNodes.length > 1) {
      const selectedNodeData = selectedNodes
        .map(id => nodes.find(n => n.id === id))
        .filter(n => n && n.x !== undefined && n.y !== undefined) as Node[];

      for (let i = 0; i < selectedNodeData.length - 1; i++) {
        const source = selectedNodeData[i];
        const target = selectedNodeData[i + 1];
        
        pathLinesGroup.append("line")
          .attr("x1", source.x!)
          .attr("y1", source.y!)
          .attr("x2", target.x!)
          .attr("y2", target.y!)
          .attr("stroke", "#fbbf24")
          .attr("stroke-width", 3)
          .attr("stroke-dasharray", "8,4")
          .attr("opacity", 0.8)
          .style("filter", "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))");
      }
    }
  }, [selectedNodes, pathMode]);

  const clearPath = () => {
    setSelectedNodes([]);
    setPathMode(false);
  };

  const buildPath = () => {
    if (selectedNodes.length >= 2) {
      const selectedLabels = selectedNodes
        .map(id => nodesRef.current.find(n => n.id === id)?.label)
        .filter(Boolean)
        .join(' → ');
      alert(`Found 3 people nearby who traverse:\n${selectedLabels}`);
      clearPath();
    }
  };

  const startPulse = () => {
    setPulseActive(true);
    setTimeout(() => {
      setPulseActive(false);
      alert('5-min Pulse complete! Found 3 overlaps.');
    }, 3000);
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }} data-testid="home-screen">
      <div className="h-11" />
      
      <div className="px-6 pt-6 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-gray-900" data-testid="text-app-title">Find</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowInfo(true)} className="text-gray-400 hover:text-gray-600" data-testid="button-info">
              <Info className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-500">Open</span>
            <Switch className="scale-75" defaultChecked data-testid="switch-discoverable" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => { setViewMode('mine'); setPathMode(false); setSelectedNodes([]); }}
              className={`px-3 py-1 rounded-md text-xs transition-colors ${
                viewMode === 'mine' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              data-testid="button-view-mine"
            >
              Mine
            </button>
            <button
              onClick={() => { setViewMode('nearby'); setPathMode(false); setSelectedNodes([]); }}
              className={`px-3 py-1 rounded-md text-xs transition-colors ${
                viewMode === 'nearby' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              data-testid="button-view-nearby"
            >
              Nearby Pulse
            </button>
          </div>
        </div>
      </div>
      
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <svg 
          ref={svgRef} 
          className="w-full h-full"
          data-testid="svg-graph"
        />
        
        {hoverCard && !pathMode && (
          <div
            className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-30 max-w-[200px] pointer-events-none"
            style={{
              left: hoverCard.x + 10 + 200 > window.innerWidth ? hoverCard.x - 210 : hoverCard.x + 10,
              top: hoverCard.y - 10,
              transform: 'translate(0, -100%)'
            }}
            data-testid="card-hover"
          >
            <p className="text-xs mb-1">{hoverCard.nodeLabel}</p>
            <p className="text-xs text-gray-400 mb-2">{hoverCard.cluster}</p>
            <p className="text-xs text-gray-500 mb-2">{hoverCard.reason}</p>
            <div className="w-full bg-gray-900 text-white text-xs py-1.5 rounded text-center">
              See {hoverCard.overlapCount} nearby
            </div>
          </div>
        )}

        {pathHoverNode && pathMode && (
          <div
            className="absolute bg-gray-900/95 border border-gray-700 rounded-lg shadow-lg px-3 py-2 z-30 pointer-events-none whitespace-nowrap"
            style={{
              left: pathHoverNode.x + 10 + 150 > window.innerWidth ? pathHoverNode.x - 160 : pathHoverNode.x + 10,
              top: pathHoverNode.y - 10,
              transform: 'translate(0, -100%)'
            }}
            data-testid="tooltip-path"
          >
            <p className="text-white text-xs mb-0.5">{pathHoverNode.label}</p>
            <p className="text-gray-400 text-xs">{pathHoverNode.cluster}</p>
          </div>
        )}

        <div className="absolute top-4 left-4 right-4 text-center">
          <p className="text-gray-400 text-xs" data-testid="text-hint">
            {viewMode === 'nearby' 
              ? pulseActive 
                ? "Scanning for overlaps..."
                : "Live map of what people around you care about right now." 
              : pathMode
              ? `Select ${Math.max(2 - selectedNodes.length, 0)} more node${Math.max(2 - selectedNodes.length, 0) === 1 ? '' : 's'} (${selectedNodes.length}/4)`
              : "Hover nodes to peek • Glowing = people nearby share this."}
          </p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-gray-400 text-xs" data-testid="text-location">San Francisco</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            {viewMode === 'mine' && !pathMode && (
              <button
                onClick={() => setPathMode(true)}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-white"
                data-testid="button-build-path"
              >
                Build a path
              </button>
            )}
            
            {pathMode && (
              <>
                <button
                  onClick={buildPath}
                  disabled={selectedNodes.length < 2}
                  className="bg-gray-900 text-white rounded-lg px-3 py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-find-travelers"
                >
                  Find travelers ({selectedNodes.length})
                </button>
                <button
                  onClick={clearPath}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-white"
                  data-testid="button-cancel-path"
                >
                  Cancel
                </button>
              </>
            )}

            {viewMode === 'mine' && !pathMode && (
              <button
                onClick={startPulse}
                disabled={pulseActive}
                className="bg-gray-900 text-white rounded-lg px-3 py-1.5 text-xs disabled:opacity-50"
                data-testid="button-pulse"
              >
                {pulseActive ? 'Scanning...' : 'Run a 5-min Pulse'}
              </button>
            )}
          </div>

          <div className="text-xs text-gray-400 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5" data-testid="text-controls-hint">
            {pathMode ? 'tap nodes to build path' : 'hover = peek • zoom & pan'}
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 px-6" data-testid="modal-info">
          <div className="bg-white rounded-2xl p-6 max-w-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-gray-900">Privacy</h3>
              <button onClick={() => setShowInfo(false)} className="text-gray-400" data-testid="button-close-info">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              We only show counts/heat. No raw content leaves your pod. Double-blind reveal is mutual.
            </p>
            <p className="text-xs text-gray-600">
              Your interest graph stays on your device. Nearby Pulse shows aggregated, anonymous signals only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
