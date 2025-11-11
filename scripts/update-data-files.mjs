import fs from 'fs';

// Read the embeddings output
const embeddings = JSON.parse(fs.readFileSync('scripts/embeddings-output.json', 'utf8'));

// Create lookup maps
const embeddingMap = new Map();
const clusterMap = new Map();
const colorMap = new Map();

embeddings.forEach(node => {
  embeddingMap.set(node.id, node.embedding);
  clusterMap.set(node.id, node.cluster);
  colorMap.set(node.id, node.color);
});

console.log('Embeddings loaded. Updating TypeScript files...\n');

// Helper function to format embedding array with proper line breaks for readability
function formatEmbedding(embedding) {
  // Group into lines of 10 values each for readability
  const lines = [];
  for (let i = 0; i < embedding.length; i += 10) {
    const chunk = embedding.slice(i, i + 10);
    lines.push('      ' + chunk.join(', '));
  }
  return lines.join(',\n');
}

// We'll create a simple mapping of node updates
// For synthetic-data.ts
const personalNodeUpdates = {};
embeddings.filter(e => e.id.startsWith('n')).forEach(node => {
  personalNodeUpdates[node.id] = {
    embedding: node.embedding,
    cluster: node.cluster,
    categoryColor: node.color
  };
});

// For nearby-pulse-data.ts
const ghostNodeUpdates = {};
embeddings.filter(e => e.id.startsWith('p')).forEach(node => {
  ghostNodeUpdates[node.id] = {
    embedding: node.embedding,
    cluster: node.cluster,
    categoryColor: node.color
  };
});

// Output summary JSON files instead of modifying TypeScript directly
// This makes it easier to manually integrate or use programmatically
fs.writeFileSync('scripts/personal-node-updates.json', JSON.stringify(personalNodeUpdates, null, 2));
fs.writeFileSync('scripts/ghost-node-updates.json', JSON.stringify(ghostNodeUpdates, null, 2));

console.log('✅ Created update files:');
console.log('  - scripts/personal-node-updates.json (35 nodes)');
console.log('  - scripts/ghost-node-updates.json (27 nodes)');
console.log('\nSummary of clusters by color:');

// Group by cluster for summary
const clusterSummary = {};
embeddings.forEach(node => {
  if (!clusterSummary[node.cluster]) {
    clusterSummary[node.cluster] = {
      color: node.color,
      nodes: []
    };
  }
  clusterSummary[node.cluster].nodes.push(node.label);
});

Object.entries(clusterSummary).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).forEach(([cluster, data]) => {
  console.log(`\nCluster ${cluster} (${data.color}):`);
  console.log(`  ${data.nodes.join(', ')}`);
});

// Create a helper script that generates the TypeScript code snippets
const tsSnippets = {
  personal: [],
  ghost: []
};

// Generate personal node snippets
Object.entries(personalNodeUpdates).forEach(([nodeId, data]) => {
  const node = embeddings.find(e => e.id === nodeId);
  tsSnippets.personal.push({
    id: nodeId,
    label: node.label,
    code: `// Add to node ${nodeId} (${node.label}):\ncategoryColor: '${data.categoryColor}',\nembedding: [\n${formatEmbedding(data.embedding)}\n]`
  });
});

// Generate ghost node snippets
Object.entries(ghostNodeUpdates).forEach(([nodeId, data]) => {
  const node = embeddings.find(e => e.id === nodeId);
  tsSnippets.ghost.push({
    id: nodeId,
    label: node.label,
    code: `// Add to node ${nodeId} (${node.label}):\ncategoryColor: '${data.categoryColor}',\nembedding: [\n${formatEmbedding(data.embedding)}\n]`
  });
});

fs.writeFileSync('scripts/typescript-snippets.json', JSON.stringify(tsSnippets, null, 2));
console.log('\n✅ Created TypeScript code snippets: scripts/typescript-snippets.json');
