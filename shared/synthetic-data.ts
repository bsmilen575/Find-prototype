export interface Node {
  id: string;
  label: string;
  type: 'book' | 'podcast' | 'article' | 'video' | 'creator' | 'topic' | 'tag';
  attentionWeight: number;
  source: string;
  evidence: {
    likes?: number;
    saves?: number;
    watchTime?: number;
    highlights?: number;
    visits?: number;
  };
  firstSeen: string;
  lastActive: string;
  cluster?: string;
  createdAt: string;
  activityScore: 'High' | 'Medium' | 'Low';
  sharedCount: number;
  trending: boolean;
  parentId?: string;
  children?: string[];
  embedding?: number[];
  clusterId?: number;
  categoryColor?: string;
}

export interface Edge {
  source: string;
  target: string;
  weight: number;
  type: 'co-occur' | 'sequential' | 'semantic' | 'temporal';
}

export interface Cluster {
  id: string;
  name: string;
  nodeIds: string[];
  color?: string;
}

export interface UserGraph {
  userId: string;
  nodes: Node[];
  edges: Edge[];
  clusters: Cluster[];
  signature?: number[];
}

export const syntheticUserGraph: UserGraph = {
  userId: 'demo-user-001',
  nodes: [
    { id: 'n1', label: 'Home Workouts', type: 'topic', attentionWeight: 92, source: 'Instagram + YouTube', evidence: { likes: 156, watchTime: 480, saves: 23 }, firstSeen: '2024-09-01', lastActive: '2025-01-08', cluster: 'c1', createdAt: '2024-09-01', activityScore: 'High', sharedCount: 18, trending: true },
    { id: 'n2', label: 'Chloe Ting', type: 'creator', attentionWeight: 88, source: 'YouTube + Instagram', evidence: { watchTime: 1240, likes: 89, saves: 12 }, firstSeen: '2024-09-05', lastActive: '2025-01-07', cluster: 'c1', createdAt: '2024-09-05', activityScore: 'High', sharedCount: 22, trending: true },
    { id: 'n3', label: 'Meal Prep', type: 'topic', attentionWeight: 85, source: 'Instagram + Pinterest', evidence: { saves: 67, likes: 134 }, firstSeen: '2024-09-10', lastActive: '2025-01-06', cluster: 'c1', createdAt: '2024-09-10', activityScore: 'High', sharedCount: 20, trending: true },
    { id: 'n4', label: 'Protein Recipes', type: 'tag', attentionWeight: 79, source: 'TikTok + Google', evidence: { saves: 45, visits: 28 }, firstSeen: '2024-09-15', lastActive: '2025-01-05', cluster: 'c1', createdAt: '2024-09-15', activityScore: 'High', sharedCount: 15, trending: false },
    { id: 'n5', label: 'Yoga', type: 'topic', attentionWeight: 71, source: 'YouTube + Instagram', evidence: { watchTime: 620, likes: 43 }, firstSeen: '2024-10-01', lastActive: '2024-12-30', cluster: 'c1', createdAt: '2024-10-01', activityScore: 'High', sharedCount: 12, trending: false },
    
    { id: 'n6', label: 'The Bear', type: 'video', attentionWeight: 94, source: 'Hulu + Twitter', evidence: { watchTime: 840, likes: 67 }, firstSeen: '2024-08-15', lastActive: '2024-09-20', cluster: 'c2', createdAt: '2024-08-15', activityScore: 'Low', sharedCount: 8, trending: false },
    { id: 'n7', label: 'Succession', type: 'video', attentionWeight: 87, source: 'HBO + Reddit', evidence: { watchTime: 1680, visits: 34 }, firstSeen: '2024-07-01', lastActive: '2024-08-10', cluster: 'c2', createdAt: '2024-07-01', activityScore: 'Low', sharedCount: 5, trending: false },
    { id: 'n8', label: 'TV Recommendations', type: 'topic', attentionWeight: 76, source: 'Twitter + Reddit', evidence: { saves: 29, visits: 52 }, firstSeen: '2024-07-15', lastActive: '2025-01-04', cluster: 'c2', createdAt: '2024-07-15', activityScore: 'High', sharedCount: 16, trending: false, children: ['n6', 'n7', 'n9', 'n10'] },
    { id: 'n9', label: 'Weekend Binge', type: 'tag', attentionWeight: 68, source: 'Instagram Stories', evidence: { visits: 18 }, firstSeen: '2024-08-01', lastActive: '2024-12-28', cluster: 'c2', createdAt: '2024-08-01', activityScore: 'High', sharedCount: 9, trending: false },
    { id: 'n10', label: 'Jeremy Allen White', type: 'creator', attentionWeight: 62, source: 'Instagram + Google', evidence: { likes: 89, visits: 12 }, firstSeen: '2024-08-20', lastActive: '2024-11-15', cluster: 'c2', createdAt: '2024-08-20', activityScore: 'Low', sharedCount: 3, trending: false },
    
    { id: 'n11', label: 'Travel Destinations', type: 'topic', attentionWeight: 90, source: 'Instagram + Google', evidence: { saves: 142, visits: 67 }, firstSeen: '2024-06-01', lastActive: '2025-01-07', cluster: 'c3', createdAt: '2024-06-01', activityScore: 'High', sharedCount: 24, trending: true, children: ['n12', 'n13', 'n14'] },
    { id: 'n12', label: 'Japan Trip Planning', type: 'tag', attentionWeight: 86, source: 'Google + Reddit', evidence: { saves: 58, visits: 94 }, firstSeen: '2024-10-15', lastActive: '2025-01-08', cluster: 'c3', createdAt: '2024-10-15', activityScore: 'High', sharedCount: 21, trending: true },
    { id: 'n13', label: 'Travel Aesthetic', type: 'topic', attentionWeight: 73, source: 'Instagram + Pinterest', evidence: { likes: 234, saves: 89 }, firstSeen: '2024-06-10', lastActive: '2024-12-20', cluster: 'c3', createdAt: '2024-06-10', activityScore: 'High', sharedCount: 17, trending: false },
    { id: 'n14', label: 'Budget Travel', type: 'tag', attentionWeight: 69, source: 'YouTube + Substack', evidence: { watchTime: 360, saves: 23 }, firstSeen: '2024-07-01', lastActive: '2024-11-30', cluster: 'c3', createdAt: '2024-07-01', activityScore: 'Low', sharedCount: 7, trending: false },
    
    { id: 'n15', label: 'Sourdough Bread', type: 'topic', attentionWeight: 84, source: 'Instagram + YouTube', evidence: { saves: 45, watchTime: 420, visits: 28 }, firstSeen: '2024-05-20', lastActive: '2024-12-15', cluster: 'c4', createdAt: '2024-05-20', activityScore: 'High', sharedCount: 14, trending: false },
    { id: 'n16', label: 'Baking', type: 'topic', attentionWeight: 77, source: 'Pinterest + YouTube', evidence: { saves: 98, likes: 67 }, firstSeen: '2024-04-15', lastActive: '2025-01-03', cluster: 'c4', createdAt: '2024-04-15', activityScore: 'High', sharedCount: 19, trending: false },
    { id: 'n17', label: 'Claire Saffitz', type: 'creator', attentionWeight: 71, source: 'YouTube + Instagram', evidence: { watchTime: 840, likes: 52 }, firstSeen: '2024-05-01', lastActive: '2024-10-20', cluster: 'c4', createdAt: '2024-05-01', activityScore: 'Low', sharedCount: 4, trending: false },
    { id: 'n18', label: 'Recipe Videos', type: 'tag', attentionWeight: 80, source: 'Instagram Reels + TikTok', evidence: { saves: 123, likes: 189 }, firstSeen: '2024-04-01', lastActive: '2025-01-06', cluster: 'c4', createdAt: '2024-04-01', activityScore: 'High', sharedCount: 23, trending: false },
    
    { id: 'n19', label: 'Interior Design', type: 'topic', attentionWeight: 88, source: 'Instagram + Pinterest', evidence: { saves: 267, likes: 345 }, firstSeen: '2024-03-10', lastActive: '2025-01-08', cluster: 'c5', createdAt: '2024-03-10', activityScore: 'High', sharedCount: 25, trending: true, children: ['n20', 'n21', 'n22'] },
    { id: 'n20', label: 'Minimalist Home', type: 'tag', attentionWeight: 82, source: 'Pinterest + Instagram', evidence: { saves: 156, likes: 234 }, firstSeen: '2024-03-15', lastActive: '2024-12-30', cluster: 'c5', createdAt: '2024-03-15', activityScore: 'High', sharedCount: 20, trending: false },
    { id: 'n21', label: 'Studio McGee', type: 'creator', attentionWeight: 75, source: 'Instagram + Netflix', evidence: { likes: 189, watchTime: 480 }, firstSeen: '2024-04-01', lastActive: '2024-11-22', cluster: 'c5', createdAt: '2024-04-01', activityScore: 'Low', sharedCount: 6, trending: false },
    { id: 'n22', label: 'IKEA Hacks', type: 'tag', attentionWeight: 67, source: 'YouTube + Pinterest', evidence: { saves: 89, visits: 34 }, firstSeen: '2024-05-10', lastActive: '2024-09-15', cluster: 'c5', createdAt: '2024-05-10', activityScore: 'Low', sharedCount: 2, trending: false },
    
    { id: 'n23', label: 'Indie Music', type: 'topic', attentionWeight: 91, source: 'Spotify + Instagram', evidence: { likes: 456, visits: 234 }, firstSeen: '2024-02-01', lastActive: '2025-01-08', cluster: 'c6', createdAt: '2024-02-01', activityScore: 'High', sharedCount: 22, trending: true, children: ['n24', 'n25', 'n26'] },
    { id: 'n24', label: 'Phoebe Bridgers', type: 'creator', attentionWeight: 87, source: 'Spotify + Twitter', evidence: { likes: 234, visits: 67 }, firstSeen: '2024-02-15', lastActive: '2024-12-28', cluster: 'c6', createdAt: '2024-02-15', activityScore: 'High', sharedCount: 18, trending: false },
    { id: 'n25', label: 'Concert Photos', type: 'tag', attentionWeight: 72, source: 'Instagram + Twitter', evidence: { likes: 189, saves: 45 }, firstSeen: '2024-06-20', lastActive: '2024-11-10', cluster: 'c6', createdAt: '2024-06-20', activityScore: 'Low', sharedCount: 5, trending: false },
    { id: 'n26', label: 'Vinyl Collection', type: 'topic', attentionWeight: 64, source: 'Reddit + Instagram', evidence: { saves: 34, visits: 28 }, firstSeen: '2024-08-05', lastActive: '2024-10-30', cluster: 'c6', createdAt: '2024-08-05', activityScore: 'Low', sharedCount: 3, trending: false },
    
    { id: 'n27', label: 'Street Photography', type: 'topic', attentionWeight: 78, source: 'Instagram + YouTube', evidence: { likes: 298, saves: 89 }, firstSeen: '2024-01-15', lastActive: '2024-12-20', cluster: 'c7', createdAt: '2024-01-15', activityScore: 'High', sharedCount: 16, trending: false },
    { id: 'n28', label: 'Film Camera', type: 'tag', attentionWeight: 70, source: 'Instagram + Reddit', evidence: { saves: 67, visits: 45 }, firstSeen: '2024-02-01', lastActive: '2024-11-15', cluster: 'c7', createdAt: '2024-02-01', activityScore: 'Low', sharedCount: 4, trending: false },
    { id: 'n29', label: 'Photography Tips', type: 'topic', attentionWeight: 74, source: 'YouTube + Google', evidence: { watchTime: 540, visits: 34 }, firstSeen: '2024-01-20', lastActive: '2024-10-25', cluster: 'c7', createdAt: '2024-01-20', activityScore: 'Low', sharedCount: 6, trending: false },
    
    { id: 'n30', label: 'Tech News', type: 'topic', attentionWeight: 81, source: 'Twitter + Reddit', evidence: { visits: 189, likes: 67 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c8', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 21, trending: true, children: ['n31', 'n32'] },
    { id: 'n31', label: 'iPhone Tips', type: 'tag', attentionWeight: 73, source: 'TikTok + Google', evidence: { saves: 45, visits: 89 }, firstSeen: '2024-03-10', lastActive: '2024-12-15', cluster: 'c8', createdAt: '2024-03-10', activityScore: 'High', sharedCount: 13, trending: false },
    { id: 'n32', label: 'MKBHD', type: 'creator', attentionWeight: 85, source: 'YouTube + Twitter', evidence: { watchTime: 960, likes: 123 }, firstSeen: '2024-01-05', lastActive: '2025-01-07', cluster: 'c8', createdAt: '2024-01-05', activityScore: 'High', sharedCount: 19, trending: true },
    
    { id: 'n33', label: 'Personal Finance', type: 'topic', attentionWeight: 76, source: 'Substack + Reddit', evidence: { visits: 67, saves: 34 }, firstSeen: '2024-09-01', lastActive: '2025-01-05', cluster: 'c9', createdAt: '2024-09-01', activityScore: 'High', sharedCount: 14, trending: false },
    { id: 'n34', label: 'Budgeting Apps', type: 'tag', attentionWeight: 68, source: 'Google + Twitter', evidence: { visits: 45, saves: 23 }, firstSeen: '2024-09-15', lastActive: '2024-12-20', cluster: 'c9', createdAt: '2024-09-15', activityScore: 'High', sharedCount: 11, trending: false },
    { id: 'n35', label: 'Investment Tips', type: 'topic', attentionWeight: 71, source: 'Reddit + Substack', evidence: { saves: 28, visits: 56 }, firstSeen: '2024-10-01', lastActive: '2024-12-30', cluster: 'c9', createdAt: '2024-10-01', activityScore: 'High', sharedCount: 10, trending: false },
  ],
  
  edges: [
    { source: 'n1', target: 'n2', weight: 0.95, type: 'co-occur' },
    { source: 'n1', target: 'n3', weight: 0.88, type: 'semantic' },
    { source: 'n1', target: 'n4', weight: 0.82, type: 'co-occur' },
    { source: 'n1', target: 'n5', weight: 0.79, type: 'semantic' },
    { source: 'n2', target: 'n3', weight: 0.71, type: 'temporal' },
    { source: 'n2', target: 'n5', weight: 0.68, type: 'semantic' },
    { source: 'n3', target: 'n4', weight: 0.91, type: 'semantic' },
    { source: 'n4', target: 'n5', weight: 0.65, type: 'temporal' },
    
    { source: 'n6', target: 'n7', weight: 0.89, type: 'semantic' },
    { source: 'n6', target: 'n8', weight: 0.86, type: 'co-occur' },
    { source: 'n6', target: 'n9', weight: 0.77, type: 'temporal' },
    { source: 'n6', target: 'n10', weight: 0.92, type: 'co-occur' },
    { source: 'n7', target: 'n8', weight: 0.84, type: 'co-occur' },
    { source: 'n7', target: 'n9', weight: 0.73, type: 'temporal' },
    { source: 'n8', target: 'n9', weight: 0.81, type: 'semantic' },
    
    { source: 'n11', target: 'n12', weight: 0.94, type: 'co-occur' },
    { source: 'n11', target: 'n13', weight: 0.87, type: 'semantic' },
    { source: 'n11', target: 'n14', weight: 0.79, type: 'semantic' },
    { source: 'n12', target: 'n13', weight: 0.82, type: 'temporal' },
    { source: 'n12', target: 'n14', weight: 0.88, type: 'co-occur' },
    { source: 'n13', target: 'n14', weight: 0.71, type: 'semantic' },
    
    { source: 'n15', target: 'n16', weight: 0.93, type: 'semantic' },
    { source: 'n15', target: 'n17', weight: 0.84, type: 'co-occur' },
    { source: 'n15', target: 'n18', weight: 0.78, type: 'temporal' },
    { source: 'n16', target: 'n17', weight: 0.91, type: 'co-occur' },
    { source: 'n16', target: 'n18', weight: 0.89, type: 'co-occur' },
    { source: 'n17', target: 'n18', weight: 0.86, type: 'temporal' },
    
    { source: 'n19', target: 'n20', weight: 0.96, type: 'semantic' },
    { source: 'n19', target: 'n21', weight: 0.88, type: 'co-occur' },
    { source: 'n19', target: 'n22', weight: 0.81, type: 'semantic' },
    { source: 'n20', target: 'n21', weight: 0.85, type: 'co-occur' },
    { source: 'n20', target: 'n22', weight: 0.73, type: 'temporal' },
    { source: 'n21', target: 'n22', weight: 0.69, type: 'semantic' },
    
    { source: 'n23', target: 'n24', weight: 0.94, type: 'co-occur' },
    { source: 'n23', target: 'n25', weight: 0.82, type: 'temporal' },
    { source: 'n23', target: 'n26', weight: 0.76, type: 'semantic' },
    { source: 'n24', target: 'n25', weight: 0.87, type: 'co-occur' },
    { source: 'n24', target: 'n26', weight: 0.71, type: 'temporal' },
    
    { source: 'n27', target: 'n28', weight: 0.91, type: 'co-occur' },
    { source: 'n27', target: 'n29', weight: 0.85, type: 'semantic' },
    { source: 'n28', target: 'n29', weight: 0.78, type: 'temporal' },
    
    { source: 'n30', target: 'n31', weight: 0.83, type: 'semantic' },
    { source: 'n30', target: 'n32', weight: 0.92, type: 'co-occur' },
    { source: 'n31', target: 'n32', weight: 0.79, type: 'temporal' },
    
    { source: 'n33', target: 'n34', weight: 0.88, type: 'semantic' },
    { source: 'n33', target: 'n35', weight: 0.84, type: 'co-occur' },
    { source: 'n34', target: 'n35', weight: 0.76, type: 'temporal' },
    
    { source: 'n3', target: 'n15', weight: 0.72, type: 'semantic' },
    { source: 'n3', target: 'n16', weight: 0.68, type: 'semantic' },
    { source: 'n11', target: 'n19', weight: 0.61, type: 'semantic' },
    { source: 'n13', target: 'n19', weight: 0.64, type: 'semantic' },
    { source: 'n13', target: 'n27', weight: 0.58, type: 'semantic' },
    { source: 'n27', target: 'n19', weight: 0.55, type: 'semantic' },
    { source: 'n23', target: 'n6', weight: 0.52, type: 'semantic' },
    { source: 'n30', target: 'n33', weight: 0.59, type: 'semantic' },
  ],
  
  clusters: [
    { id: 'c1', name: 'Fitness & Wellness', nodeIds: ['n1', 'n2', 'n3', 'n4', 'n5'] },
    { id: 'c2', name: 'TV & Entertainment', nodeIds: ['n6', 'n7', 'n8', 'n9', 'n10'] },
    { id: 'c3', name: 'Travel', nodeIds: ['n11', 'n12', 'n13', 'n14'] },
    { id: 'c4', name: 'Cooking & Baking', nodeIds: ['n15', 'n16', 'n17', 'n18'] },
    { id: 'c5', name: 'Home & Decor', nodeIds: ['n19', 'n20', 'n21', 'n22'] },
    { id: 'c6', name: 'Music', nodeIds: ['n23', 'n24', 'n25', 'n26'] },
    { id: 'c7', name: 'Photography', nodeIds: ['n27', 'n28', 'n29'] },
    { id: 'c8', name: 'Tech & Gadgets', nodeIds: ['n30', 'n31', 'n32'] },
    { id: 'c9', name: 'Personal Finance', nodeIds: ['n33', 'n34', 'n35'] },
  ],
};
