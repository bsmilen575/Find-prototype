export interface Node {
  id: string;
  label: string;
  type: 'book' | 'podcast' | 'article' | 'video' | 'creator' | 'topic' | 'tag' | 'github_repo' | 'huggingface_model' | 'spotify_artist' | 'youtube_channel' | 'paper';
  attentionWeight: number;
  source: string;
  evidence: {
    likes?: number;
    saves?: number;
    watchTime?: number;
    highlights?: number;
    visits?: number;
    stars?: number;
    commits?: number;
    downloads?: number;
    plays?: number;
  };
  firstSeen: string;
  lastActive: string;
  cluster?: string;
  platformUrl?: string;
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

export interface PlatformConnector {
  id: string;
  name: string;
  domain: 'Code' | 'Audio' | 'Video' | 'Social' | 'Reading';
  icon: string;
  description: string;
  status: 'disconnected' | 'pending' | 'connected' | 'error';
  lastSync?: string;
  syncCadence?: string;
  scopes?: string[];
  sampleInsights?: string[];
}

export const platformConnectors: PlatformConnector[] = [
  { id: 'github', name: 'GitHub', domain: 'Code', icon: 'github', description: "Repos you've starred, contributed to, or frequently visited", status: 'disconnected', syncCadence: 'Daily', scopes: ['public repos', 'stars', 'commits'], sampleInsights: ['transformers', 'stable-diffusion', 'The Book of Shaders'] },
  { id: 'huggingface', name: 'Hugging Face', domain: 'Code', icon: 'huggingface', description: "Models and datasets you've downloaded or bookmarked", status: 'disconnected', syncCadence: 'Daily', scopes: ['downloads', 'likes'], sampleInsights: ['gpt-2', 'DALL-E'] },
  { id: 'spotify', name: 'Spotify', domain: 'Audio', icon: 'spotify', description: 'Artists, albums, and playlists in your library', status: 'disconnected', syncCadence: 'Weekly', scopes: ['listening history', 'saved tracks'], sampleInsights: ['Jon Hopkins', 'Nils Frahm'] },
  { id: 'youtube', name: 'YouTube', domain: 'Video', icon: 'youtube', description: 'Channels you subscribe to and videos you watch regularly', status: 'disconnected', syncCadence: 'Daily', scopes: ['subscriptions', 'watch history'], sampleInsights: ['Lex Fridman Podcast', '3Blue1Brown'] },
  { id: 'twitter', name: 'Twitter / X', domain: 'Social', icon: 'twitter', description: 'Accounts you follow and topics you engage with', status: 'disconnected', syncCadence: 'Daily', scopes: ['likes', 'bookmarks', 'follows'], sampleInsights: ['AI Safety', 'Mental Models'] },
  { id: 'arxiv', name: 'ArXiv', domain: 'Reading', icon: 'file-text', description: "Papers you've saved or referenced", status: 'disconnected', syncCadence: 'Weekly', scopes: ['saved papers'], sampleInsights: ['Attention Is All You Need'] },
  { id: 'goodreads', name: 'Goodreads', domain: 'Reading', icon: 'book', description: "Books you've read, want to read, or rated highly", status: 'disconnected', syncCadence: 'Weekly', scopes: ['shelves', 'ratings'], sampleInsights: ['Alignment Problem', 'The Book of Why', 'Thinking Fast and Slow'] },
  { id: 'substack', name: 'Substack', domain: 'Reading', icon: 'mail', description: 'Newsletters you subscribe to and engage with', status: 'disconnected', syncCadence: 'Weekly', scopes: ['subscriptions', 'reading history'], sampleInsights: ['Anthropic Blog', 'Vitalik Buterin'] },
];

export const syntheticUserGraph: UserGraph = {
  userId: 'demo-user-001',
  nodes: [
    { id: 'n1', label: 'AI Safety', type: 'topic', attentionWeight: 95, source: 'Twitter likes + YouTube', evidence: { likes: 42, watchTime: 180, saves: 8 }, firstSeen: '2024-08-15', lastActive: '2025-01-05', cluster: 'c1' },
    { id: 'n2', label: 'Eliezer Yudkowsky', type: 'creator', attentionWeight: 72, source: 'LessWrong + Podcasts', evidence: { visits: 23, watchTime: 420, saves: 5 }, firstSeen: '2024-08-20', lastActive: '2024-12-28', cluster: 'c1' },
    { id: 'n3', label: 'Alignment Problem', type: 'book', attentionWeight: 88, source: 'Goodreads + Kindle', evidence: { highlights: 47, saves: 1 }, firstSeen: '2024-09-01', lastActive: '2024-09-15', cluster: 'c1' },
    { id: 'n4', label: 'Interpretability Research', type: 'topic', attentionWeight: 91, source: 'ArXiv + Twitter', evidence: { saves: 12, visits: 34 }, firstSeen: '2024-09-10', lastActive: '2025-01-08', cluster: 'c1' },
    { id: 'n5', label: 'Anthropic', type: 'creator', attentionWeight: 68, source: 'Blog subscriptions', evidence: { visits: 18, saves: 6 }, firstSeen: '2024-10-05', lastActive: '2024-12-20', cluster: 'c1' },
    
    { id: 'n6', label: 'Narrative Structure', type: 'topic', attentionWeight: 82, source: 'Medium + Books', evidence: { highlights: 31, saves: 9 }, firstSeen: '2024-07-20', lastActive: '2025-01-03', cluster: 'c2' },
    { id: 'n7', label: 'Brandon Sanderson', type: 'creator', attentionWeight: 77, source: 'Audible + YouTube', evidence: { watchTime: 840, likes: 15 }, firstSeen: '2024-07-25', lastActive: '2024-12-10', cluster: 'c2' },
    { id: 'n8', label: 'Worldbuilding', type: 'topic', attentionWeight: 65, source: 'Reddit + YouTube', evidence: { visits: 27, saves: 4 }, firstSeen: '2024-08-05', lastActive: '2024-11-22', cluster: 'c2' },
    { id: 'n9', label: 'Story Circle', type: 'tag', attentionWeight: 58, source: 'Pocket articles', evidence: { saves: 7, highlights: 12 }, firstSeen: '2024-09-12', lastActive: '2024-10-30', cluster: 'c2' },
    { id: 'n10', label: 'Pixar Theory', type: 'video', attentionWeight: 45, source: 'YouTube', evidence: { watchTime: 120 }, firstSeen: '2024-08-18', lastActive: '2024-08-18', cluster: 'c2' },
    
    { id: 'n11', label: 'Causal Inference', type: 'topic', attentionWeight: 86, source: 'Papers + Courses', evidence: { saves: 14, visits: 41 }, firstSeen: '2024-06-10', lastActive: '2025-01-07', cluster: 'c3' },
    { id: 'n12', label: 'Judea Pearl', type: 'creator', attentionWeight: 71, source: 'Citations + Podcasts', evidence: { saves: 5, watchTime: 180 }, firstSeen: '2024-06-15', lastActive: '2024-11-15', cluster: 'c3' },
    { id: 'n13', label: 'Do-Calculus', type: 'tag', attentionWeight: 62, source: 'Lecture notes', evidence: { highlights: 28, saves: 3 }, firstSeen: '2024-07-01', lastActive: '2024-09-20', cluster: 'c3' },
    { id: 'n14', label: 'The Book of Why', type: 'book', attentionWeight: 75, source: 'Kindle', evidence: { highlights: 52, saves: 1 }, firstSeen: '2024-06-20', lastActive: '2024-07-10', cluster: 'c3' },
    
    { id: 'n15', label: 'Systems Thinking', type: 'topic', attentionWeight: 79, source: 'Medium + Books', evidence: { saves: 11, highlights: 38 }, firstSeen: '2024-05-15', lastActive: '2024-12-30', cluster: 'c4' },
    { id: 'n16', label: 'Donella Meadows', type: 'creator', attentionWeight: 66, source: 'Books', evidence: { highlights: 41, saves: 2 }, firstSeen: '2024-05-20', lastActive: '2024-07-22', cluster: 'c4' },
    { id: 'n17', label: 'Feedback Loops', type: 'tag', attentionWeight: 71, source: 'Articles + Videos', evidence: { visits: 19, watchTime: 240 }, firstSeen: '2024-06-01', lastActive: '2024-12-18', cluster: 'c4' },
    { id: 'n18', label: 'Emergence', type: 'topic', attentionWeight: 68, source: 'Papers + Podcasts', evidence: { saves: 8, watchTime: 300 }, firstSeen: '2024-07-08', lastActive: '2024-11-28', cluster: 'c4' },
    
    { id: 'n19', label: 'Cognitive Science', type: 'topic', attentionWeight: 73, source: 'Courses + Papers', evidence: { visits: 32, saves: 10 }, firstSeen: '2024-04-10', lastActive: '2024-12-15', cluster: 'c5' },
    { id: 'n20', label: 'Mental Models', type: 'tag', attentionWeight: 81, source: 'Twitter + Medium', evidence: { likes: 28, saves: 13 }, firstSeen: '2024-04-15', lastActive: '2025-01-06', cluster: 'c5' },
    { id: 'n21', label: 'Thinking Fast and Slow', type: 'book', attentionWeight: 84, source: 'Audible', evidence: { watchTime: 1260, highlights: 23 }, firstSeen: '2024-04-20', lastActive: '2024-05-10', cluster: 'c5' },
    { id: 'n22', label: 'Daniel Kahneman', type: 'creator', attentionWeight: 69, source: 'Books + Interviews', evidence: { watchTime: 180, saves: 4 }, firstSeen: '2024-04-22', lastActive: '2024-10-05', cluster: 'c5' },
    
    { id: 'n23', label: 'Generative Art', type: 'topic', attentionWeight: 54, source: 'Instagram + Twitter', evidence: { likes: 67, saves: 8 }, firstSeen: '2024-10-01', lastActive: '2024-12-25', cluster: 'c6' },
    { id: 'n24', label: 'Processing (p5.js)', type: 'tag', attentionWeight: 48, source: 'GitHub + Tutorials', evidence: { visits: 14, saves: 5 }, firstSeen: '2024-10-05', lastActive: '2024-11-12', cluster: 'c6' },
    { id: 'n25', label: 'Tyler Hobbs', type: 'creator', attentionWeight: 42, source: 'Twitter + Essays', evidence: { likes: 12, visits: 8 }, firstSeen: '2024-10-08', lastActive: '2024-10-28', cluster: 'c6' },
    
    { id: 'n26', label: 'Network Science', type: 'topic', attentionWeight: 77, source: 'Papers + Coursera', evidence: { visits: 25, saves: 9 }, firstSeen: '2024-03-15', lastActive: '2024-12-22', cluster: 'c7' },
    { id: 'n27', label: 'Scale-Free Networks', type: 'tag', attentionWeight: 63, source: 'Research papers', evidence: { saves: 6, highlights: 19 }, firstSeen: '2024-03-20', lastActive: '2024-08-15', cluster: 'c7' },
    { id: 'n28', label: 'Albert-László Barabási', type: 'creator', attentionWeight: 70, source: 'Books + Lectures', evidence: { watchTime: 360, saves: 3 }, firstSeen: '2024-03-25', lastActive: '2024-09-10', cluster: 'c7' },
    { id: 'n29', label: 'Linked', type: 'book', attentionWeight: 59, source: 'Kindle', evidence: { highlights: 34, saves: 1 }, firstSeen: '2024-04-01', lastActive: '2024-04-25', cluster: 'c7' },
    
    { id: 'n30', label: 'Mechanism Design', type: 'topic', attentionWeight: 67, source: 'Economics courses', evidence: { visits: 18, saves: 7 }, firstSeen: '2024-11-01', lastActive: '2025-01-04', cluster: 'c8' },
    { id: 'n31', label: 'Incentive Alignment', type: 'tag', attentionWeight: 74, source: 'Papers + Podcasts', evidence: { saves: 10, watchTime: 240 }, firstSeen: '2024-11-05', lastActive: '2025-01-02', cluster: 'c8' },
    { id: 'n32', label: 'Vitalik Buterin', type: 'creator', attentionWeight: 61, source: 'Blog + Twitter', evidence: { visits: 22, likes: 15 }, firstSeen: '2024-11-10', lastActive: '2024-12-28', cluster: 'c8' },
    
    { id: 'n33', label: 'Complexity Economics', type: 'topic', attentionWeight: 64, source: 'Santa Fe Institute', evidence: { visits: 16, saves: 5 }, firstSeen: '2024-09-20', lastActive: '2024-11-30', cluster: 'c9' },
    { id: 'n34', label: 'Agent-Based Modeling', type: 'tag', attentionWeight: 56, source: 'Papers + Tutorials', evidence: { saves: 4, visits: 12 }, firstSeen: '2024-09-25', lastActive: '2024-10-18', cluster: 'c9' },
    { id: 'n35', label: 'Brian Arthur', type: 'creator', attentionWeight: 51, source: 'Lectures', evidence: { watchTime: 180, saves: 2 }, firstSeen: '2024-10-01', lastActive: '2024-10-15', cluster: 'c9' },
    
    { id: 'n36', label: 'transformers', type: 'github_repo', attentionWeight: 89, source: 'GitHub', evidence: { stars: 247, commits: 18, visits: 52 }, firstSeen: '2024-09-05', lastActive: '2025-01-07', cluster: 'c1', platformUrl: 'github.com/huggingface/transformers' },
    { id: 'n37', label: 'gpt-2', type: 'huggingface_model', attentionWeight: 76, source: 'Hugging Face', evidence: { downloads: 156, visits: 23 }, firstSeen: '2024-09-12', lastActive: '2024-12-18', cluster: 'c1', platformUrl: 'huggingface.co/gpt2' },
    { id: 'n38', label: 'Jon Hopkins', type: 'spotify_artist', attentionWeight: 83, source: 'Spotify', evidence: { plays: 284, likes: 12 }, firstSeen: '2024-07-10', lastActive: '2025-01-08', cluster: 'c10', platformUrl: 'open.spotify.com/artist/7yxi31szvlbwvKq9dYOmFI' },
    { id: 'n39', label: 'Lex Fridman Podcast', type: 'youtube_channel', attentionWeight: 92, source: 'YouTube', evidence: { watchTime: 3240, visits: 47 }, firstSeen: '2024-08-01', lastActive: '2025-01-05', cluster: 'c1', platformUrl: 'youtube.com/@lexfridman' },
    { id: 'n40', label: 'Attention Is All You Need', type: 'paper', attentionWeight: 94, source: 'ArXiv', evidence: { highlights: 38, saves: 14, visits: 29 }, firstSeen: '2024-09-01', lastActive: '2024-12-22', cluster: 'c1', platformUrl: 'arxiv.org/abs/1706.03762' },
    { id: 'n41', label: 'stable-diffusion', type: 'github_repo', attentionWeight: 72, source: 'GitHub', evidence: { stars: 189, visits: 34 }, firstSeen: '2024-10-15', lastActive: '2024-12-30', cluster: 'c6', platformUrl: 'github.com/CompVis/stable-diffusion' },
    { id: 'n42', label: 'DALL-E', type: 'huggingface_model', attentionWeight: 68, source: 'Hugging Face', evidence: { downloads: 92, visits: 18 }, firstSeen: '2024-10-18', lastActive: '2024-11-25', cluster: 'c6', platformUrl: 'huggingface.co/openai/dall-e' },
    { id: 'n43', label: 'Nils Frahm', type: 'spotify_artist', attentionWeight: 79, source: 'Spotify', evidence: { plays: 312, likes: 15 }, firstSeen: '2024-06-20', lastActive: '2025-01-06', cluster: 'c10', platformUrl: 'open.spotify.com/artist/5hMw0lBPPgbwFDN1pz9y9Y' },
    { id: 'n44', label: '3Blue1Brown', type: 'youtube_channel', attentionWeight: 87, source: 'YouTube', evidence: { watchTime: 1680, visits: 38 }, firstSeen: '2024-05-15', lastActive: '2024-12-28', cluster: 'c3', platformUrl: 'youtube.com/@3blue1brown' },
    { id: 'n45', label: 'The Book of Shaders', type: 'github_repo', attentionWeight: 65, source: 'GitHub', evidence: { stars: 142, visits: 27 }, firstSeen: '2024-10-20', lastActive: '2024-11-30', cluster: 'c6', platformUrl: 'github.com/patriciogonzalezvivo/thebookofshaders' },
  ],
  
  edges: [
    { source: 'n1', target: 'n2', weight: 0.92, type: 'co-occur' },
    { source: 'n1', target: 'n3', weight: 0.88, type: 'sequential' },
    { source: 'n1', target: 'n4', weight: 0.95, type: 'semantic' },
    { source: 'n1', target: 'n5', weight: 0.85, type: 'co-occur' },
    { source: 'n2', target: 'n3', weight: 0.78, type: 'semantic' },
    { source: 'n2', target: 'n4', weight: 0.82, type: 'co-occur' },
    { source: 'n3', target: 'n4', weight: 0.71, type: 'sequential' },
    { source: 'n4', target: 'n5', weight: 0.89, type: 'temporal' },
    
    { source: 'n6', target: 'n7', weight: 0.86, type: 'co-occur' },
    { source: 'n6', target: 'n8', weight: 0.91, type: 'semantic' },
    { source: 'n6', target: 'n9', weight: 0.79, type: 'sequential' },
    { source: 'n7', target: 'n8', weight: 0.84, type: 'semantic' },
    { source: 'n7', target: 'n10', weight: 0.67, type: 'co-occur' },
    { source: 'n8', target: 'n9', weight: 0.75, type: 'temporal' },
    { source: 'n9', target: 'n10', weight: 0.62, type: 'semantic' },
    
    { source: 'n11', target: 'n12', weight: 0.94, type: 'co-occur' },
    { source: 'n11', target: 'n13', weight: 0.87, type: 'semantic' },
    { source: 'n11', target: 'n14', weight: 0.81, type: 'sequential' },
    { source: 'n12', target: 'n13', weight: 0.76, type: 'semantic' },
    { source: 'n12', target: 'n14', weight: 0.92, type: 'co-occur' },
    { source: 'n13', target: 'n14', weight: 0.73, type: 'sequential' },
    
    { source: 'n15', target: 'n16', weight: 0.88, type: 'co-occur' },
    { source: 'n15', target: 'n17', weight: 0.93, type: 'semantic' },
    { source: 'n15', target: 'n18', weight: 0.85, type: 'temporal' },
    { source: 'n16', target: 'n17', weight: 0.79, type: 'semantic' },
    { source: 'n17', target: 'n18', weight: 0.81, type: 'co-occur' },
    
    { source: 'n19', target: 'n20', weight: 0.90, type: 'semantic' },
    { source: 'n19', target: 'n21', weight: 0.86, type: 'sequential' },
    { source: 'n19', target: 'n22', weight: 0.82, type: 'co-occur' },
    { source: 'n20', target: 'n21', weight: 0.77, type: 'temporal' },
    { source: 'n21', target: 'n22', weight: 0.95, type: 'co-occur' },
    
    { source: 'n23', target: 'n24', weight: 0.83, type: 'semantic' },
    { source: 'n23', target: 'n25', weight: 0.79, type: 'co-occur' },
    { source: 'n24', target: 'n25', weight: 0.72, type: 'temporal' },
    
    { source: 'n26', target: 'n27', weight: 0.89, type: 'semantic' },
    { source: 'n26', target: 'n28', weight: 0.91, type: 'co-occur' },
    { source: 'n26', target: 'n29', weight: 0.84, type: 'sequential' },
    { source: 'n27', target: 'n28', weight: 0.76, type: 'semantic' },
    { source: 'n28', target: 'n29', weight: 0.93, type: 'co-occur' },
    
    { source: 'n30', target: 'n31', weight: 0.92, type: 'semantic' },
    { source: 'n30', target: 'n32', weight: 0.78, type: 'co-occur' },
    { source: 'n31', target: 'n32', weight: 0.81, type: 'temporal' },
    
    { source: 'n33', target: 'n34', weight: 0.87, type: 'semantic' },
    { source: 'n33', target: 'n35', weight: 0.82, type: 'co-occur' },
    { source: 'n34', target: 'n35', weight: 0.74, type: 'sequential' },
    
    { source: 'n1', target: 'n11', weight: 0.68, type: 'semantic' },
    { source: 'n4', target: 'n11', weight: 0.72, type: 'semantic' },
    { source: 'n1', target: 'n19', weight: 0.61, type: 'semantic' },
    { source: 'n6', target: 'n19', weight: 0.58, type: 'semantic' },
    { source: 'n11', target: 'n15', weight: 0.64, type: 'semantic' },
    { source: 'n15', target: 'n26', weight: 0.69, type: 'semantic' },
    { source: 'n26', target: 'n33', weight: 0.71, type: 'semantic' },
    { source: 'n15', target: 'n33', weight: 0.66, type: 'semantic' },
    { source: 'n1', target: 'n30', weight: 0.59, type: 'semantic' },
    { source: 'n31', target: 'n1', weight: 0.63, type: 'semantic' },
    { source: 'n23', target: 'n6', weight: 0.41, type: 'semantic' },
    
    { source: 'n36', target: 'n1', weight: 0.88, type: 'co-occur' },
    { source: 'n36', target: 'n4', weight: 0.91, type: 'semantic' },
    { source: 'n37', target: 'n40', weight: 0.85, type: 'sequential' },
    { source: 'n39', target: 'n1', weight: 0.79, type: 'temporal' },
    { source: 'n39', target: 'n2', weight: 0.82, type: 'co-occur' },
    { source: 'n40', target: 'n1', weight: 0.94, type: 'semantic' },
    { source: 'n40', target: 'n4', weight: 0.89, type: 'semantic' },
    { source: 'n41', target: 'n23', weight: 0.87, type: 'semantic' },
    { source: 'n41', target: 'n24', weight: 0.84, type: 'co-occur' },
    { source: 'n42', target: 'n23', weight: 0.81, type: 'temporal' },
    { source: 'n42', target: 'n41', weight: 0.90, type: 'co-occur' },
    { source: 'n44', target: 'n11', weight: 0.76, type: 'semantic' },
    { source: 'n44', target: 'n19', weight: 0.73, type: 'semantic' },
    { source: 'n45', target: 'n24', weight: 0.86, type: 'semantic' },
    { source: 'n45', target: 'n41', weight: 0.79, type: 'co-occur' },
    { source: 'n38', target: 'n43', weight: 0.77, type: 'semantic' },
  ],
  
  clusters: [
    { id: 'c1', name: 'AI Safety & Interpretability', nodeIds: ['n1', 'n2', 'n3', 'n4', 'n5', 'n36', 'n37', 'n39', 'n40'] },
    { id: 'c2', name: 'Narrative & Storytelling', nodeIds: ['n6', 'n7', 'n8', 'n9', 'n10'] },
    { id: 'c3', name: 'Causal Inference', nodeIds: ['n11', 'n12', 'n13', 'n14', 'n44'] },
    { id: 'c4', name: 'Systems Thinking', nodeIds: ['n15', 'n16', 'n17', 'n18'] },
    { id: 'c5', name: 'Cognitive Science', nodeIds: ['n19', 'n20', 'n21', 'n22'] },
    { id: 'c6', name: 'Generative Art', nodeIds: ['n23', 'n24', 'n25', 'n41', 'n42', 'n45'] },
    { id: 'c7', name: 'Network Science', nodeIds: ['n26', 'n27', 'n28', 'n29'] },
    { id: 'c8', name: 'Mechanism Design', nodeIds: ['n30', 'n31', 'n32'] },
    { id: 'c9', name: 'Complexity Economics', nodeIds: ['n33', 'n34', 'n35'] },
    { id: 'c10', name: 'Ambient & Electronic Music', nodeIds: ['n38', 'n43'] },
  ],
};
