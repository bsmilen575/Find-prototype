# Find - Privacy-First Location Matching Platform

## Overview

Find is a hyper-local, real-time matching platform that connects people within 100 meters based on shared interests. The application uses a simple, transparent matching algorithm: if two people share 2+ interests from their 5-interest profiles, they get notified. 

The platform emphasizes privacy-first design with double-blind reveal - both people must choose to reveal themselves before identities are shared. Users control their discoverability with a simple toggle and can see anonymous match cards showing only shared interests and distance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for client-side routing with key routes:
- `/` - **Onboarding screen** with Find logo, feature icons (Users, MapPin, Upload), and "Upload your files, docs, and notes" text
- `/home` - **Primary app screen** with 3-tab navigation (Mine, Insights, Connections)
  - **Mine**: User's personal interest graph (force-directed D3.js visualization) with optional Nearby Pulse toggle overlay
  - **Insights**: Interest patterns and analytics (placeholder)
  - **Connections**: Match cards with double-blind reveal
- `/about` - Information about the platform and privacy features
- `/signup` - **Detailed signup** with mandatory name and interests fields, optional Pod connections, file upload, and location permission
  - Required fields: Name, Talk to Find (interests)
  - Optional sections:
    - Pod setup: 6 social media connections (Facebook, Twitter, Instagram, Google, Gmail, TikTok) in 3x2 grid
    - File upload: Dashed border upload area for files, docs, and notes
  - Location access handled gracefully - proceeds even if network lookup fails after permission granted
  - Navigates to /home on completion

**State Management**:
- TanStack React Query for server state management and caching
- Zustand for local profile state (stored in localStorage)
- React Context for theme management (light/dark mode)

**UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling. The design system follows a "New York" style with custom color tokens and spacing primitives defined in the Tailwind configuration.

**Design Philosophy**: Privacy-first visual language drawing inspiration from Airbnb (location discovery), LinkedIn (professional profiles), Signal (privacy aesthetic), and Tinder (quick decision-making). Uses Inter as primary font and Space Grotesk for accent typography. Warm beige (#f5f3f0) background for calm, focused experience.

**Home Screen Architecture** (/home):
- **Mobile-first 3-tab navigation**: Top icon bar with Mine (User), Insights (Lightbulb), Connections (Users)
- **HomeHeader**: "Find" heading + "Nearby Pulse" toggle (visible only on Mine tab) + "Open" toggle for discoverable status
  - Nearby Pulse toggle: Amber when active, gray when inactive, shows overlay of local interests on Mine graph
- **GraphTab**: Reusable wrapper for SelfMapGraph component
  - Mine tab: syntheticUserGraph (35 nodes: Fitness, TV, Travel, Cooking, Home, Music, Photography, Tech, Finance)
  - Optional overlay: When Nearby Pulse toggle is ON, shows ghost nodes and halos from nearbyPulseData
- **ConnectionsTab**: Match cards with distance, shared interests, and reveal buttons
  - Fetches matches from API every 30 seconds when discoverable
  - Shows loading state and empty state
  - Double-blind reveal mechanism (placeholder)
- **InsightsTab**: Placeholder for interest patterns/analytics
- **MatchNotificationModal**: Pops up when new matches detected
  - Vibration alert (200ms-100ms-200ms pattern)
  - Shows distance and shared interests
  - "View Match" button navigates to Connections tab
  - Smart detection: Tracks match profileIds to detect additions, skips initial load

**Graph Visualization** (SelfMapGraph component):
- D3.js force-directed graph showing interests as nodes
- Node size scaled by attention weight (time-weighted engagement)
- Edges represent relationships (co-occur, sequential, semantic, temporal)
- **Central "You" Anchor Node**: Synthetic node representing the user
  - Positioned at centroid (average x/y) of all interest nodes
  - Amber circle (#f59e0b) with 15px radius, white star (★) icon
  - Drop-shadow glow effect for visual prominence
  - All interests connect to it with faint gray lines (opacity 0.15, weight 0.05)
  - Fixed position, excluded from cluster calculations
  - Shows "★ You" in legend
- **Hover Tooltips**: Display node metadata on mouseover
  - Shows: Interest name, Last Interaction (relative time via formatDistanceToNow), Shared Nearby count
  - Expand button ("...") appears for nodes with children
  - Clean minimal design with Share2 icon from lucide-react
- **Drill-Down Navigation**: Hierarchical exploration of sub-interests
  - Click expand button or node with children to zoom into subgraph
  - Breadcrumb navigation at top (e.g., "Find > Indie Music > Phoebe Bridgers")
  - Back button in GraphControls when not at root level
  - Smooth d3 zoom transition (750ms duration)
  - Nodes with children: Travel Destinations, Interior Design, Indie Music, TV Recommendations, Tech News
  - Preserves graph state (pins, kills, circuits) across navigation levels
  - "You" anchor maintained in subgraphs
- **Nearby Pulse Integration** (optional overlay on Mine tab, toggled via HomeHeader):
  - Ghost nodes: Popular local interests user doesn't have, with dashed outlines (#9ca3af), reduced opacity (0.6), lighter fill (#e5e7eb), "(nearby)" label suffix
  - Animated halos: Amber rings (#f59e0b) around user's overlapping interests, pulse animation (scale 1.0 to 1.15, 2s infinite loop)
  - Contextual legend: Shows "Ghost Node (Popular Nearby)" and "Halo (Also Popular Here)"
  - 15 ghost nodes, 12 overlap relationships from nearbyPulseData
  - State flow: Home → HomeHeader toggle → GraphTab showNearbyPulse prop → SelfMapGraph conditional rendering
- **Tuned D3 Force Simulation**: Optimized for stable, natural-looking clusters
  - Cluster-aware link distances (70px intra-cluster, 140px inter-cluster)
  - Cluster-aware charge forces (-150 intra-cluster, -350 inter-cluster)
  - Collision radius tied to node size (Math.sqrt(attentionWeight) * 0.6 + 10)
  - Alpha decay 0.01 for slower, more stable settling
- **Search functionality**: Real-time filtering of nodes by label
  - Matching nodes highlighted with orange stroke (#f59e0b)
  - Non-matching nodes faded to 30% opacity
  - Match count displayed in search input
  - Works on Mine tab with or without Nearby Pulse overlay, across all navigation levels
- Interactive features:
  - Drag nodes to reposition
  - Zoom and pan (tracked via zoomTransformRef for accurate selection)
  - Click nodes to view detail panel or drill down to sub-interests
  - Lasso mode: click-to-select multiple nodes (uses isLassoModeRef for dynamic behavior)
  - Circuit creation: select 2+ nodes and create named circuits from active graphData
  - Kill nodes: remove from graph permanently
  - Pin nodes: fix position with visual indicator (green border)
- Lens modes with smooth 300ms color transitions (no simulation restart):
  - Default: Grayscale (#9ca3af) for calm, low-stimulus viewing
  - Recency: Green (<7d), yellow (<30d), red (<90d), gray (>90d)
  - Heat: Red (>80), amber (60-80), yellow (40-60), gray (<40) based on attention weight
- Node detail panel: evidence (likes, saves, watch time, highlights), connected neighbors, timeline
- Circuit display: Shows created circuits in controls panel with truncated names
- GraphControls: Mobile-responsive with flex-wrap, shortened labels on small screens, back button when navigating subgraphs
- Performance: Separated effects for lens color updates, selection stroke updates, and simulation - prevents unnecessary graph restarts
- Key property ensures D3 simulation rebuilds when switching between Mine/Nearby Pulse overlay states

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Structure**: RESTful API with the following endpoints:
- `POST /api/profiles` - Create new user profile (name + 5 interests)
- `GET /api/profiles/:id` - Retrieve profile by ID
- `POST /api/profiles/:id/location` - Update user location
- `POST /api/profiles/:id/discoverable` - Toggle discoverable status
- `GET /api/profiles/:id/matches` - Get matches within 100m (2+ shared interests)

**Matching Engine**: Simple interest array comparison:
1. Fixed 100-meter radius for hyper-local matching
2. Case-insensitive interest comparison
3. Minimum threshold: 2+ shared interests
4. Returns: shared interests array, match count, distance in meters
5. Filters out non-discoverable profiles

**Storage Strategy**: Currently using in-memory storage (`MemStorage` class) with interface (`IStorage`) designed for future database implementation. Location-based queries use haversine formula for distance calculations.

### Data Storage Solutions

**Database**: PostgreSQL via Neon serverless driver, managed through Drizzle ORM

**Schema Design**:
- `profiles` table: id, name, interests[], discoverable, latitude, longitude, lastActive, graphData (JSONB), signature (embedding array)
- `nodes` table: id, profileId, label, type, attentionWeight, source, evidence (JSONB), firstSeen, lastActive, cluster
- `edges` table: id, profileId, sourceNodeId, targetNodeId, weight, type
- `clusters` table: id, profileId, name, nodeIds[], color
- Graph structure supports future advanced matching with embeddings and signatures

**ORM**: Drizzle with Zod schema validation for type-safe database operations and API input validation

### Authentication and Authorization

**Current State**: No authentication system implemented. Profiles are identified by UUID and stored in browser localStorage.

**Privacy Mechanisms Mentioned** (not yet implemented):
- Private Set Intersection (PSI) for matching without revealing full profiles
- Cryptographic techniques for data encryption
- Decentralized storage via Solid Pods (referenced in About page)

### Core Matching Algorithm

**Simple Interest Matching**: Direct string array comparison with case-insensitive matching

**Matching Logic**: 
- Normalize interests (lowercase, trim whitespace)
- Count shared interests between two profiles
- Match threshold: 2+ shared interests
- Sort results by match count, then by distance

**Geographic Filtering**: Fixed 100-meter radius using haversine formula for hyper-local matching (same building or block).

**Privacy Controls**:
- Discoverable toggle: Users control when they appear in matches
- Anonymous matches: Only shared interests shown until double-blind reveal
- Real-time Updates: Matches refetch every 30 seconds when discoverable

## External Dependencies

### Third-Party Services

**No external APIs required**: The system uses simple string comparison for matching - no AI or embeddings needed.

### Database

**Neon PostgreSQL**:
- Serverless PostgreSQL database via `@neondatabase/serverless` driver
- Connection string required in `DATABASE_URL` environment variable
- Schema managed through Drizzle migrations in `/migrations` directory

### UI Component Libraries

**Radix UI**: Comprehensive set of accessible component primitives including:
- Dialogs, popovers, dropdowns, tooltips
- Form controls (checkbox, radio, select, slider)
- Navigation components (tabs, accordion, navigation-menu)

**shadcn/ui**: Pre-styled components built on Radix UI with custom theme configuration

**D3.js**: Data visualization library for force-directed graph layout in Self Map
- Force simulation with link, charge, center, and collision forces
- Interactive drag behavior on nodes
- Zoom and pan transformations
- Dynamic color encoding based on lens modes

### Fonts

**Google Fonts CDN**:
- Inter (weights: 300, 400, 500, 600, 700) - primary typeface
- Space Grotesk (weights: 400, 500, 600, 700) - accent typeface

### Development Tools

**Vite Plugins**:
- `@vitejs/plugin-react` - React fast refresh
- `@replit/vite-plugin-runtime-error-modal` - Error overlay
- `@replit/vite-plugin-cartographer` - Replit integration (dev only)
- `@replit/vite-plugin-dev-banner` - Dev environment banner (dev only)

### Location Services

**Browser Geolocation API**: Used to obtain user's current position for proximity-based matching. No external geolocation service is currently integrated.