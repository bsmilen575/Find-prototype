import { pipeline } from '@xenova/transformers';
import fs from 'fs';

// Initialize the embedding model
console.log('Loading embedding model (all-MiniLM-L6-v2)...');
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

// Personal nodes from synthetic-data.ts
const personalNodes = [
  { id: 'n1', label: 'Home Workouts' },
  { id: 'n2', label: 'Chloe Ting' },
  { id: 'n3', label: 'Yoga' },
  { id: 'n4', label: 'Protein Recipes' },
  { id: 'n5', label: 'Interior Design' },
  { id: 'n6', label: 'The Bear' },
  { id: 'n7', label: 'Succession' },
  { id: 'n8', label: 'TV Recommendations' },
  { id: 'n9', label: 'Weekend Binge' },
  { id: 'n10', label: 'True Crime' },
  { id: 'n11', label: 'Taylor Swift' },
  { id: 'n12', label: 'Concert Photos' },
  { id: 'n13', label: 'Indie Music' },
  { id: 'n14', label: 'Phoebe Bridgers' },
  { id: 'n15', label: 'Camera Gear' },
  { id: 'n16', label: 'Baking' },
  { id: 'n17', label: 'Sourdough' },
  { id: 'n18', label: 'Recipe Videos' },
  { id: 'n19', label: 'Minimalist Decor' },
  { id: 'n20', label: 'Plant Care' },
  { id: 'n21', label: 'Travel Destinations' },
  { id: 'n22', label: 'Weekend Trips' },
  { id: 'n23', label: 'Road Trip Playlists' },
  { id: 'n24', label: 'Beach Weekend' },
  { id: 'n25', label: 'Wine Country' },
  { id: 'n26', label: 'City Guide: Portland' },
  { id: 'n27', label: 'City Guide: Austin' },
  { id: 'n28', label: 'Personal Finance' },
  { id: 'n29', label: 'Budgeting Apps' },
  { id: 'n30', label: 'Tech News' },
  { id: 'n31', label: 'iPhone Tips' },
  { id: 'n32', label: 'MKBHD' },
  { id: 'n33', label: 'Meditation' },
  { id: 'n34', label: 'Headspace' },
  { id: 'n35', label: 'Morning Routine' },
];

// Ghost nodes from nearby-pulse-data.ts
const ghostNodes = [
  { id: 'p1', label: 'Coffee Shops' },
  { id: 'p2', label: 'Local Brunch' },
  { id: 'p3', label: 'Dog Parks' },
  { id: 'p4', label: 'Warriors Games' },
  { id: 'p5', label: 'NFL Playoffs' },
  { id: 'p6', label: 'Sports Bars' },
  { id: 'p7', label: 'Taylor Swift' },
  { id: 'p8', label: 'The Eras Tour' },
  { id: 'p9', label: 'Concert Tickets' },
  { id: 'p10', label: 'Netflix Shows' },
  { id: 'p11', label: 'Stranger Things' },
  { id: 'p12', label: 'Binge Watching' },
  { id: 'p13', label: 'Pizza Places' },
  { id: 'p14', label: 'Food Delivery' },
  { id: 'p15', label: 'Taco Tuesday' },
  { id: 'p16', label: 'Hiking Trails' },
  { id: 'p17', label: 'Weekend Plans' },
  { id: 'p18', label: 'Beach Day' },
  { id: 'p19', label: 'Gym Motivation' },
  { id: 'p20', label: 'New Years Resolutions' },
  { id: 'p21', label: 'Peloton' },
  { id: 'p22', label: 'iPhone' },
  { id: 'p23', label: 'AirPods' },
  { id: 'p24', label: 'Tech Reviews' },
  { id: 'p25', label: 'Happy Hour' },
  { id: 'p26', label: 'Date Night' },
  { id: 'p27', label: 'Wine Tasting' },
];

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
