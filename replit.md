# Find - Privacy-First Location Matching Platform

## Overview

Find is a hyper-local, real-time matching platform designed to connect individuals within a 100-meter radius based on shared interests. Its core purpose is to facilitate spontaneous, meaningful connections while prioritizing user privacy through a double-blind reveal mechanism and granular control over discoverability. The platform aims to create a calm, focused user experience, drawing inspiration from leading design systems to foster a privacy-first visual language.

**Progressive Web App (PWA):**
Find is a fully functional mobile application that can be installed on iOS and Android devices. Users can add Find to their home screen for an app-like experience with:
- Offline support via service workers
- Native app feel without browser UI
- Push notification capability (future integration)
- Optimized for mobile with safe area support and haptic feedback
- Install prompt on compatible browsers

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built as a Progressive Web App (PWA) using React and TypeScript with Vite for development. It features a mobile-first design with `shadcn/ui` components, Tailwind CSS, and a custom "New York" theme. `Wouter` handles client-side routing. State management is a hybrid approach, utilizing `TanStack React Query` for server state, `Zustand` for local profile data, and React Context for UI themes.

**PWA Features:**
- `vite-plugin-pwa` for service worker generation and offline support
- Web App Manifest with app icons (192x192, 512x512, Apple touch icon)
- Install prompt hook (`usePWAInstall`) for seamless app installation
- Haptic feedback hook (`useHapticFeedback`) for native-like interactions
- Mobile-optimized CSS with safe area support for notched devices
- Viewport configuration preventing zoom and pull-to-refresh

Key UI/UX decisions include:
- A warm beige background for a calm user experience.
- Inter as the primary font and Space Grotesk for accents.
- Four-tab navigation: About (Info icon), Mine, Insights, Connections
- An "About" tab (default landing) explaining Find's philosophy, privacy architecture (SOLID protocol), and usage guidance
- A "Mine" tab featuring a D3.js force-directed graph for visualizing user interests, with an optional "Nearby Pulse" overlay to show local trends
  - Nearby Pulse legend uses human-friendly labels: "New to you & Popular nearby" (ghost nodes), "Common in your area" (halos)
- A "Connections" tab for match cards, implementing a double-blind reveal.
- An "Insights" tab with simplified, human-digestible content:
  - "Your Attention Map" showing 5 semantic clusters with just titles and color dots
  - "Attention Drift" - a 7-day bar chart showing engagement across clusters using Recharts
  - "Things You Might Like Exploring" with 5 curated suggestions using conversational "Because you..." reasoning
  - "Insights on Your Neighborhood" with natural language relation descriptions
  - "Magic" section with Find logo and light blue gradient showing shared reading insights
- A detailed signup process for name, interests, optional social media connections (Pods), and file uploads.
- The `SelfMapGraph` component uses D3.js for interactive interest visualization, including a central "You" anchor node, hover tooltips, drill-down navigation, and lens modes (Recency, Heat).
- **Serendipity Notifications**: A real-time notification system that simulates detecting nearby users with overlapping interests. Implemented via:
  - `SerendipityPopup` component with three-stage flow: teaser → revealed → matched
  - Synthetic encounter data in `shared/serendipity-data.ts` with four diverse scenarios:
    1. **Technical cofounder search** (Maya - Startups & Product Design)
    2. **Couch for sale** (Alex - Sustainable Living & Minimalism)
    3. **Film<>AI meet-and-greet invitation** (Jordan - Film Theory & Creative AI)
    4. **Wellness connection** (Sam - Wellness & Craft)
  - Auto-trigger after 12 seconds (simulating "entering a coffee shop")
  - Manual "Simulate" button in header for demo purposes
  - Three-stage reveal flow:
    1. **Teaser**: Initial notification with alias description and distance (e.g., "Someone nearby is looking for a technical cofounder")
    2. **Revealed**: Shared interests details with "Simulate Mutual Match" button (waiting for both users to say yes)
    3. **Matched**: "Connection established" reveals first name with purposeful language ("This curiosity is shared with Maya") and connection options ("Tap Phones" or "Open Exchange")
  - Language philosophy: Intentionally avoids dating-app terminology (no "It's a match!" or "Meet [name]") in favor of calm, contextual, purposeful language that emphasizes shared curiosity over romantic connection

### Backend

The backend uses Express.js with TypeScript, providing a RESTful API for profile management, location updates, discoverability toggling, and match retrieval. It implements a simple matching engine based on shared interests (2+ required) and a 100-meter geographic radius using the Haversine formula.

**Authentication:**
- Integrated Replit Auth (OIDC) with multi-domain support via Passport.js
- Session-based authentication with PostgreSQL session store (connect-pg-simple)
- Protected API routes via `isAuthenticated` middleware
- Auth flow: Landing page → Login → Profile creation (if new user) → Main app
- Logout properly destroys both Passport session and database session

**User Flow:**
1. Unauthenticated users see a landing page with login button
2. After authentication, new users complete onboarding (name, 5 interests, location)
3. Profile creation requires exactly 5 interests and browser geolocation access
4. Authenticated users with profiles access the full Find experience

### Data Storage

PostgreSQL, managed via Neon serverless driver and Drizzle ORM, is used for data persistence. The schema includes:
- **users**: Replit Auth user records (id, email, firstName, lastName, profileImageUrl)
- **sessions**: PostgreSQL session store for authentication persistence
- **profiles**: User profiles linked to users via userId foreign key (name, interests array, discoverable flag, latitude/longitude, graphData)
- **nodes**, **edges**, **clusters**: Interest graph data for advanced matching capabilities

All storage operations use the DatabaseStorage interface with proper type safety via Drizzle ORM and Zod validation.

### Core Matching Algorithm

The algorithm performs a case-insensitive comparison of interest arrays. Matches require a minimum of two shared interests within a 100-meter radius. Results are sorted by shared interest count and then by distance. Privacy controls include a user-controlled discoverable toggle and anonymous match cards until a double-blind reveal.

## External Dependencies

### Database

- **Neon PostgreSQL**: Serverless PostgreSQL database accessed via `@neondatabase/serverless` driver.

### UI Component Libraries

- **Radix UI**: Provides accessible, unstyled component primitives.
- **shadcn/ui**: Pre-styled components built on Radix UI, with a custom theme.
- **D3.js**: Used for interactive force-directed graph visualizations.

### Fonts

- **Google Fonts CDN**: `Inter` (primary) and `Space Grotesk` (accent).

### Location Services

- **Browser Geolocation API**: Utilized for obtaining the user's current location for proximity matching.