// Helper function to augment nodes with embedding data
import { nodeEmbeddings } from './embeddings';
import type { Node } from './synthetic-data';

export function augmentNodesWithEmbeddings<T extends Node>(nodes: T[]): T[] {
  return nodes.map(node => {
    const embeddingData = nodeEmbeddings[node.id];
    if (embeddingData) {
      return {
        ...node,
        embedding: embeddingData.embedding,
        clusterId: embeddingData.clusterId,
        categoryColor: embeddingData.categoryColor,
      };
    }
    return node;
  });
}

// Cosine similarity helper for semantic matching
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
