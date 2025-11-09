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
- `/` - Welcome screen with hyper-realistic metallic sphere and neural network overlay
- `/map` - **Self Map**: Force-directed graph visualization of user's interest graph (D3.js)
- `/home` - Home screen with discoverable toggle and anonymous match cards
- `/about` - Information about the platform and privacy features
- `/onboarding` - Single-page profile creation (name + 5 interests)
- `/signup` - Detailed signup with Pod setup and interest capture

**State Management**:
- TanStack React Query for server state management and caching
- Zustand for local profile state (stored in localStorage)
- React Context for theme management (light/dark mode)

**UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling. The design system follows a "New York" style with custom color tokens and spacing primitives defined in the Tailwind configuration.

**Design Philosophy**: Privacy-first visual language drawing inspiration from Airbnb (location discovery), LinkedIn (professional profiles), Signal (privacy aesthetic), and Tinder (quick decision-making). Uses Inter as primary font and Space Grotesk for accent typography. Warm beige (#f5f3f0) background for calm, focused experience.

**Graph Visualization** (Self Map - /map):
- D3.js force-directed graph showing interests as nodes
- Node size scaled by attention weight (time-weighted engagement)
- Edges represent relationships (co-occur, sequential, semantic, temporal)
- Interactive features:
  - Drag nodes to reposition
  - Zoom and pan (tracked via zoomTransformRef for accurate selection)
  - Click nodes to view detail panel
  - Lasso mode: click-to-select multiple nodes (uses isLassoModeRef for dynamic behavior)
  - Circuit creation: select 2+ nodes and create named circuits with persistence
  - Kill nodes: remove from graph permanently
  - Pin nodes: fix position with visual indicator (green border)
- Lens modes with smooth 300ms color transitions (no simulation restart):
  - Default: Grayscale (#9ca3af) for calm, low-stimulus viewing
  - Recency: Green (<7d), yellow (<30d), red (<90d), gray (>90d)
  - Source: Color by content type - purple (book), pink (podcast), blue (article), amber (video), emerald (creator), indigo (topic), teal (tag)
  - Heat: Red (>80), amber (60-80), yellow (40-60), gray (<40) based on attention weight
- Node detail panel: evidence (likes, saves, watch time, highlights), connected neighbors, timeline
- Circuit display: Shows created circuits in controls panel with truncated names
- Synthetic dataset: 35 nodes across 9 thematic clusters (AI Safety, Narrative, Causal Inference, Systems Thinking, Emergence, etc.)
- Performance: Separated effects for lens color updates, selection stroke updates, and simulation - prevents unnecessary graph restarts

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