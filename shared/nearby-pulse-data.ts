import { UserGraph } from './synthetic-data';

// Nearby Pulse: Aggregated mainstream interests from people in the locality
// More generic, trending, and "normy" compared to individual graphs
export const nearbyPulseGraph: UserGraph = {
  userId: 'nearby-pulse',
  nodes: [
    { id: 'p1', label: 'Coffee Shops', type: 'topic', attentionWeight: 95, source: 'Instagram + Yelp', evidence: { likes: 2341, visits: 892 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c1', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 28, trending: true },
    { id: 'p2', label: 'Local Brunch', type: 'tag', attentionWeight: 88, source: 'Instagram + Google', evidence: { saves: 1456, visits: 673 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c1', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 24, trending: true },
    { id: 'p3', label: 'Dog Parks', type: 'topic', attentionWeight: 82, source: 'Facebook + Nextdoor', evidence: { visits: 543, likes: 891 }, firstSeen: '2024-01-01', lastActive: '2025-01-07', cluster: 'c1', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 19, trending: false },
    
    { id: 'p4', label: 'Warriors Games', type: 'topic', attentionWeight: 92, source: 'Twitter + Instagram', evidence: { likes: 3421, visits: 1234 }, firstSeen: '2024-10-01', lastActive: '2025-01-08', cluster: 'c2', createdAt: '2024-10-01', activityScore: 'High', sharedCount: 31, trending: true },
    { id: 'p5', label: 'NFL Playoffs', type: 'tag', attentionWeight: 87, source: 'Twitter + ESPN', evidence: { likes: 2876, visits: 981 }, firstSeen: '2024-12-15', lastActive: '2025-01-08', cluster: 'c2', createdAt: '2024-12-15', activityScore: 'High', sharedCount: 27, trending: true },
    { id: 'p6', label: 'Sports Bars', type: 'topic', attentionWeight: 79, source: 'Yelp + Google', evidence: { visits: 456, saves: 234 }, firstSeen: '2024-01-01', lastActive: '2025-01-06', cluster: 'c2', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 16, trending: false },
    
    { id: 'p7', label: 'Taylor Swift', type: 'creator', attentionWeight: 94, source: 'Spotify + Instagram', evidence: { likes: 4567, visits: 2341 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c3', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 34, trending: true },
    { id: 'p8', label: 'The Eras Tour', type: 'tag', attentionWeight: 91, source: 'TikTok + Instagram', evidence: { likes: 3891, saves: 1567 }, firstSeen: '2024-03-15', lastActive: '2024-12-20', cluster: 'c3', createdAt: '2024-03-15', activityScore: 'Medium', sharedCount: 22, trending: false },
    { id: 'p9', label: 'Concert Tickets', type: 'topic', attentionWeight: 84, source: 'Ticketmaster + Twitter', evidence: { visits: 892, saves: 456 }, firstSeen: '2024-01-01', lastActive: '2025-01-05', cluster: 'c3', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 20, trending: false },
    
    { id: 'p10', label: 'Netflix Shows', type: 'topic', attentionWeight: 90, source: 'Twitter + Reddit', evidence: { visits: 1892, likes: 2456 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c4', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 26, trending: true },
    { id: 'p11', label: 'Stranger Things', type: 'tag', attentionWeight: 86, source: 'Instagram + Twitter', evidence: { likes: 2134, visits: 891 }, firstSeen: '2024-07-01', lastActive: '2024-08-30', cluster: 'c4', createdAt: '2024-07-01', activityScore: 'Low', sharedCount: 8, trending: false },
    { id: 'p12', label: 'Binge Watching', type: 'topic', attentionWeight: 81, source: 'Instagram Stories', evidence: { visits: 673, likes: 1234 }, firstSeen: '2024-01-01', lastActive: '2025-01-07', cluster: 'c4', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 18, trending: false },
    
    { id: 'p13', label: 'Pizza Places', type: 'topic', attentionWeight: 89, source: 'Yelp + Instagram', evidence: { visits: 1456, likes: 2891 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c5', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 29, trending: true },
    { id: 'p14', label: 'Food Delivery', type: 'tag', attentionWeight: 93, source: 'DoorDash + Uber Eats', evidence: { visits: 2341, saves: 891 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c5', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 32, trending: true },
    { id: 'p15', label: 'Taco Tuesday', type: 'topic', attentionWeight: 78, source: 'Instagram + Yelp', evidence: { likes: 1567, visits: 673 }, firstSeen: '2024-01-01', lastActive: '2025-01-07', cluster: 'c5', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 17, trending: false },
    
    { id: 'p16', label: 'Hiking Trails', type: 'topic', attentionWeight: 85, source: 'AllTrails + Instagram', evidence: { visits: 891, saves: 1234 }, firstSeen: '2024-01-01', lastActive: '2025-01-06', cluster: 'c6', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 21, trending: false },
    { id: 'p17', label: 'Weekend Plans', type: 'tag', attentionWeight: 83, source: 'Instagram + Snapchat', evidence: { visits: 1456, likes: 2134 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c6', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 23, trending: true },
    { id: 'p18', label: 'Beach Day', type: 'topic', attentionWeight: 76, source: 'Instagram + Weather App', evidence: { likes: 1892, visits: 456 }, firstSeen: '2024-05-01', lastActive: '2024-10-15', cluster: 'c6', createdAt: '2024-05-01', activityScore: 'Low', sharedCount: 6, trending: false },
    
    { id: 'p19', label: 'Gym Motivation', type: 'topic', attentionWeight: 87, source: 'Instagram + TikTok', evidence: { likes: 2456, saves: 891 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c7', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 30, trending: true },
    { id: 'p20', label: 'New Years Resolutions', type: 'tag', attentionWeight: 80, source: 'Facebook + Instagram', evidence: { visits: 673, likes: 1234 }, firstSeen: '2024-12-20', lastActive: '2025-01-08', cluster: 'c7', createdAt: '2024-12-20', activityScore: 'High', sharedCount: 25, trending: true },
    { id: 'p21', label: 'Peloton', type: 'creator', attentionWeight: 74, source: 'Instagram + YouTube', evidence: { watchTime: 2340, likes: 891 }, firstSeen: '2024-01-01', lastActive: '2025-01-05', cluster: 'c7', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 14, trending: false },
    
    { id: 'p22', label: 'iPhone', type: 'topic', attentionWeight: 91, source: 'Apple Store + YouTube', evidence: { visits: 1567, likes: 2341 }, firstSeen: '2024-09-15', lastActive: '2025-01-08', cluster: 'c8', createdAt: '2024-09-15', activityScore: 'High', sharedCount: 33, trending: true },
    { id: 'p23', label: 'AirPods', type: 'tag', attentionWeight: 86, source: 'Instagram + Amazon', evidence: { visits: 1234, saves: 673 }, firstSeen: '2024-01-01', lastActive: '2025-01-07', cluster: 'c8', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 22, trending: false },
    { id: 'p24', label: 'Tech Reviews', type: 'topic', attentionWeight: 77, source: 'YouTube + Reddit', evidence: { watchTime: 3456, visits: 891 }, firstSeen: '2024-01-01', lastActive: '2025-01-06', cluster: 'c8', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 15, trending: false },
    
    { id: 'p25', label: 'Happy Hour', type: 'topic', attentionWeight: 88, source: 'Yelp + Instagram', evidence: { visits: 1892, saves: 1456 }, firstSeen: '2024-01-01', lastActive: '2025-01-08', cluster: 'c9', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 26, trending: true },
    { id: 'p26', label: 'Date Night', type: 'tag', attentionWeight: 82, source: 'Instagram + OpenTable', evidence: { saves: 1234, visits: 673 }, firstSeen: '2024-01-01', lastActive: '2025-01-07', cluster: 'c9', createdAt: '2024-01-01', activityScore: 'High', sharedCount: 19, trending: false },
    { id: 'p27', label: 'Wine Tasting', type: 'topic', attentionWeight: 73, source: 'Instagram + Yelp', evidence: { likes: 891, visits: 456 }, firstSeen: '2024-01-01', lastActive: '2024-12-30', cluster: 'c9', createdAt: '2024-01-01', activityScore: 'Medium', sharedCount: 11, trending: false },
  ],
  
  edges: [
    { source: 'p1', target: 'p2', weight: 0.94, type: 'co-occur' },
    { source: 'p1', target: 'p3', weight: 0.81, type: 'semantic' },
    { source: 'p2', target: 'p3', weight: 0.73, type: 'temporal' },
    
    { source: 'p4', target: 'p5', weight: 0.88, type: 'semantic' },
    { source: 'p4', target: 'p6', weight: 0.92, type: 'co-occur' },
    { source: 'p5', target: 'p6', weight: 0.86, type: 'temporal' },
    
    { source: 'p7', target: 'p8', weight: 0.96, type: 'co-occur' },
    { source: 'p7', target: 'p9', weight: 0.84, type: 'semantic' },
    { source: 'p8', target: 'p9', weight: 0.91, type: 'temporal' },
    
    { source: 'p10', target: 'p11', weight: 0.89, type: 'co-occur' },
    { source: 'p10', target: 'p12', weight: 0.93, type: 'semantic' },
    { source: 'p11', target: 'p12', weight: 0.82, type: 'temporal' },
    
    { source: 'p13', target: 'p14', weight: 0.91, type: 'co-occur' },
    { source: 'p13', target: 'p15', weight: 0.85, type: 'semantic' },
    { source: 'p14', target: 'p15', weight: 0.76, type: 'temporal' },
    
    { source: 'p16', target: 'p17', weight: 0.87, type: 'semantic' },
    { source: 'p16', target: 'p18', weight: 0.79, type: 'co-occur' },
    { source: 'p17', target: 'p18', weight: 0.72, type: 'temporal' },
    
    { source: 'p19', target: 'p20', weight: 0.94, type: 'co-occur' },
    { source: 'p19', target: 'p21', weight: 0.88, type: 'semantic' },
    { source: 'p20', target: 'p21', weight: 0.81, type: 'temporal' },
    
    { source: 'p22', target: 'p23', weight: 0.95, type: 'co-occur' },
    { source: 'p22', target: 'p24', weight: 0.86, type: 'semantic' },
    { source: 'p23', target: 'p24', weight: 0.78, type: 'temporal' },
    
    { source: 'p25', target: 'p26', weight: 0.91, type: 'semantic' },
    { source: 'p25', target: 'p27', weight: 0.84, type: 'co-occur' },
    { source: 'p26', target: 'p27', weight: 0.89, type: 'temporal' },
    
    { source: 'p1', target: 'p13', weight: 0.68, type: 'semantic' },
    { source: 'p2', target: 'p25', weight: 0.72, type: 'semantic' },
    { source: 'p4', target: 'p6', weight: 0.85, type: 'semantic' },
    { source: 'p7', target: 'p10', weight: 0.61, type: 'semantic' },
    { source: 'p13', target: 'p25', weight: 0.76, type: 'semantic' },
    { source: 'p16', target: 'p1', weight: 0.58, type: 'semantic' },
  ],
  
  clusters: [
    { id: 'c1', name: 'Local Favorites', nodeIds: ['p1', 'p2', 'p3'] },
    { id: 'c2', name: 'Sports', nodeIds: ['p4', 'p5', 'p6'] },
    { id: 'c3', name: 'Music & Concerts', nodeIds: ['p7', 'p8', 'p9'] },
    { id: 'c4', name: 'TV & Streaming', nodeIds: ['p10', 'p11', 'p12'] },
    { id: 'c5', name: 'Food & Dining', nodeIds: ['p13', 'p14', 'p15'] },
    { id: 'c6', name: 'Outdoor Activities', nodeIds: ['p16', 'p17', 'p18'] },
    { id: 'c7', name: 'Fitness', nodeIds: ['p19', 'p20', 'p21'] },
    { id: 'c8', name: 'Tech & Gadgets', nodeIds: ['p22', 'p23', 'p24'] },
    { id: 'c9', name: 'Nightlife & Social', nodeIds: ['p25', 'p26', 'p27'] },
  ],
};

// Ghost nodes: popular nearby interests that the user doesn't have yet
export const nearbyPulseData = {
  ghostNodes: [
    'p1',  // Coffee Shops
    'p2',  // Local Brunch
    'p3',  // Dog Parks
    'p4',  // Warriors Games
    'p5',  // NFL Playoffs
    'p6',  // Sports Bars
    'p7',  // Taylor Swift
    'p8',  // The Eras Tour
    'p9',  // Concert Tickets
    'p16', // Hiking Trails
    'p17', // Weekend Plans
    'p18', // Beach Day
    'p25', // Happy Hour
    'p26', // Date Night
    'p27', // Wine Tasting
  ],
  overlaps: [
    { userNodeId: 'n30', nearbyNodeId: 'p22', overlapScore: 0.85 }, // Tech News ↔ iPhone
    { userNodeId: 'n31', nearbyNodeId: 'p22', overlapScore: 0.92 }, // iPhone Tips ↔ iPhone
    { userNodeId: 'n32', nearbyNodeId: 'p24', overlapScore: 0.78 }, // MKBHD ↔ Tech Reviews
    { userNodeId: 'n1', nearbyNodeId: 'p19', overlapScore: 0.88 },  // Home Workouts ↔ Gym Motivation
    { userNodeId: 'n2', nearbyNodeId: 'p19', overlapScore: 0.75 },  // Chloe Ting ↔ Gym Motivation
    { userNodeId: 'n1', nearbyNodeId: 'p20', overlapScore: 0.82 },  // Home Workouts ↔ New Years Resolutions
    { userNodeId: 'n6', nearbyNodeId: 'p10', overlapScore: 0.79 },  // The Bear ↔ Netflix Shows
    { userNodeId: 'n7', nearbyNodeId: 'p10', overlapScore: 0.76 },  // Succession ↔ Netflix Shows
    { userNodeId: 'n8', nearbyNodeId: 'p10', overlapScore: 0.91 },  // TV Recommendations ↔ Netflix Shows
    { userNodeId: 'n9', nearbyNodeId: 'p12', overlapScore: 0.87 },  // Weekend Binge ↔ Binge Watching
    { userNodeId: 'n16', nearbyNodeId: 'p13', overlapScore: 0.71 }, // Baking ↔ Pizza Places
    { userNodeId: 'n18', nearbyNodeId: 'p14', overlapScore: 0.73 }, // Recipe Videos ↔ Food Delivery
  ],
};

// Augment ghost nodes with embeddings and cluster data
import { augmentNodesWithEmbeddings } from './embedding-helpers';
nearbyPulseGraph.nodes = augmentNodesWithEmbeddings(nearbyPulseGraph.nodes);
