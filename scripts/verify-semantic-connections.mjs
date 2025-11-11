import { syntheticUserGraph } from '../shared/synthetic-data.ts';
import { nearbyPulseGraph } from '../shared/nearby-pulse-data.ts';
import { cosineSimilarity } from '../shared/embedding-helpers.ts';

// Test cases: Ghost nodes that should connect to specific personal nodes
// Based on ACTUAL nodes that exist in syntheticUserGraph
const testCases = [
  {
    ghostId: 'p8',
    ghostLabel: 'The Eras Tour',
    expectedMatches: ['Indie Music', 'Phoebe Bridgers', 'Concert Photos'],
    rationale: 'Music/entertainment - should match music-related personal nodes'
  },
  {
    ghostId: 'p22',
    ghostLabel: 'iPhone',
    expectedMatches: ['iPhone Tips', 'Tech News', 'MKBHD'],
    rationale: 'Technology - should match tech-related personal nodes'
  },
  {
    ghostId: 'p24',
    ghostLabel: 'Tech Reviews',
    expectedMatches: ['MKBHD', 'Tech News', 'iPhone Tips'],
    rationale: 'Tech content - should match tech-related personal nodes'
  },
  {
    ghostId: 'p10',
    ghostLabel: 'Netflix Shows',
    expectedMatches: ['The Bear', 'Succession', 'TV Recommendations'],
    rationale: 'TV/Entertainment - should match TV show personal nodes'
  },
  {
    ghostId: 'p19',
    ghostLabel: 'Gym Motivation',
    expectedMatches: ['Home Workouts', 'Chloe Ting', 'Yoga'],
    rationale: 'Fitness - should match fitness-related personal nodes'
  }
];

console.log('=== Semantic Connection Verification ===\n');

// Get personal nodes with embeddings
const personalNodes = syntheticUserGraph.nodes.filter(n => n.embedding);
console.log(`Personal nodes with embeddings: ${personalNodes.length}`);

// Get ghost nodes with embeddings
const ghostNodes = nearbyPulseGraph.nodes.filter(n => n.embedding);
console.log(`Ghost nodes with embeddings: ${ghostNodes.length}\n`);

// Verify each test case
testCases.forEach(testCase => {
  const ghostNode = ghostNodes.find(n => n.id === testCase.ghostId);
  
  if (!ghostNode) {
    console.log(`❌ Ghost node ${testCase.ghostId} not found`);
    return;
  }
  
  if (!ghostNode.embedding) {
    console.log(`❌ Ghost node ${testCase.ghostId} has no embedding`);
    return;
  }
  
  // Find top 5 most similar personal nodes
  const similarities = personalNodes.map(personalNode => ({
    node: personalNode,
    similarity: cosineSimilarity(ghostNode.embedding, personalNode.embedding)
  }));
  
  // Sort by similarity descending
  similarities.sort((a, b) => b.similarity - a.similarity);
  
  const top5 = similarities.slice(0, 5);
  
  console.log(`\n📍 ${testCase.ghostLabel} (${testCase.ghostId}):`);
  console.log(`   Rationale: ${testCase.rationale}`);
  console.log(`   Cluster: ${ghostNode.clusterId}, Color: ${ghostNode.categoryColor}`);
  console.log(`   Top 5 semantic matches:`);
  
  let matchCount = 0;
  top5.forEach((item, index) => {
    const isExpected = testCase.expectedMatches.some(expected => 
      item.node.label.toLowerCase().includes(expected.toLowerCase())
    );
    if (isExpected) matchCount++;
    const marker = isExpected ? '✅' : '  ';
    console.log(`   ${marker} ${index + 1}. ${item.node.label} (${item.node.id}) - ${(item.similarity * 100).toFixed(1)}% similar`);
    console.log(`        Cluster: ${item.node.clusterId}, Color: ${item.node.categoryColor}`);
  });
  
  const testResult = matchCount > 0 ? '✅ PASS' : '❌ FAIL';
  console.log(`   ${testResult} - ${matchCount}/${testCase.expectedMatches.length} expected matches found in top 5`);
});

console.log('\n=== Verification Complete ===\n');
