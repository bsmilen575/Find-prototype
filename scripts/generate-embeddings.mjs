import { pipeline } from '@xenova/transformers';
import fs from 'fs';

// Initialize the embedding model
console.log('Loading embedding model (all-MiniLM-L6-v2)...');
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

// Import actual data from source files to ensure labels match
import { syntheticUserGraph } from '../shared/synthetic-data.ts';
import { nearbyPulseGraph } from '../shared/nearby-pulse-data.ts';

// Extract nodes with correct labels from source data
const personalNodes = syntheticUserGraph.nodes.map(n => ({ id: n.id, label: n.label }));
const ghostNodes = nearbyPulseGraph.nodes.map(n => ({ id: n.id, label: n.label }));

const allNodes = [...personalNodes, ...ghostNodes];

console.log(`Generating embeddings for ${allNodes.length} nodes...`);

// Generate embeddings for all nodes
const results = [];
for (const node of allNodes) {
  console.log(`Processing: ${node.label}`);
  const output = await embedder(node.label, { pooling: 'mean', normalize: true });
  const embedding = Array.from(output.data);
  
  results.push({
    id: node.id,
    label: node.label,
    embedding: embedding,
  });
}

// Simple K-Means clustering implementation
function kMeans(embeddings, k = 6, maxIter = 100) {
  const n = embeddings.length;
  const dim = embeddings[0].length;
  
  // Initialize centroids randomly
  const centroids = [];
  const indices = new Set();
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * n);
    if (!indices.has(idx)) {
      indices.add(idx);
      centroids.push([...embeddings[idx]]);
    }
  }
  
  let labels = new Array(n).fill(0);
  
  for (let iter = 0; iter < maxIter; iter++) {
    // Assign points to nearest centroid
    const newLabels = embeddings.map((emb) => {
      let minDist = Infinity;
      let bestCluster = 0;
      
      for (let c = 0; c < k; c++) {
        // Cosine similarity (we normalized embeddings, so dot product = cosine similarity)
        let dotProduct = 0;
        for (let d = 0; d < dim; d++) {
          dotProduct += emb[d] * centroids[c][d];
        }
        const dist = 1 - dotProduct; // Convert similarity to distance
        
        if (dist < minDist) {
          minDist = dist;
          bestCluster = c;
        }
      }
      
      return bestCluster;
    });
    
    // Check convergence
    if (JSON.stringify(newLabels) === JSON.stringify(labels)) {
      break;
    }
    labels = newLabels;
    
    // Update centroids
    for (let c = 0; c < k; c++) {
      const clusterPoints = embeddings.filter((_, i) => labels[i] === c);
      if (clusterPoints.length === 0) continue;
      
      for (let d = 0; d < dim; d++) {
        centroids[c][d] = clusterPoints.reduce((sum, p) => sum + p[d], 0) / clusterPoints.length;
      }
      
      // Normalize centroid
      const norm = Math.sqrt(centroids[c].reduce((sum, v) => sum + v * v, 0));
      for (let d = 0; d < dim; d++) {
        centroids[c][d] /= norm;
      }
    }
  }
  
  return labels;
}

console.log('\nPerforming K-Means clustering (k=6)...');
const embeddings = results.map(r => r.embedding);
const clusterLabels = kMeans(embeddings, 6);

// Color palette for categories
const colorPalette = [
  '#8CCB9B', // Green
  '#F5C06E', // Yellow
  '#9C8ADE', // Purple
  '#74A8E4', // Blue
  '#E7A26F', // Orange
  '#F28B82', // Red
];

// Add cluster assignments to results
results.forEach((r, i) => {
  r.cluster = clusterLabels[i];
  r.color = colorPalette[clusterLabels[i]];
});

// Group nodes by cluster to show semantic categories
console.log('\n=== CLUSTER ANALYSIS ===');
for (let c = 0; c < 6; c++) {
  const nodesInCluster = results.filter(r => r.cluster === c);
  console.log(`\nCluster ${c} (${colorPalette[c]}): ${nodesInCluster.length} nodes`);
  console.log(nodesInCluster.map(n => n.label).join(', '));
}

// Save results to JSON
const outputPath = 'scripts/embeddings-output.json';
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\n✅ Embeddings saved to ${outputPath}`);
console.log(`\nTotal nodes processed: ${results.length}`);
console.log(`Embedding dimensions: ${results[0].embedding.length}`);
