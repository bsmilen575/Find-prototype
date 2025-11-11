# Find - Privacy-First Location Matching Platform

## Overview

Find is a hyper-local, real-time matching platform designed to connect individuals within a 100-meter radius based on shared interests. Its core purpose is to facilitate spontaneous, meaningful connections while prioritizing user privacy through a double-blind reveal mechanism and granular control over discoverability. The platform aims to create a calm, focused user experience, drawing inspiration from leading design systems to foster a privacy-first visual language.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built with React and TypeScript, using Vite for development. It features a mobile-first design with `shadcn/ui` components, Tailwind CSS, and a custom "New York" theme. `Wouter` handles client-side routing. State management is a hybrid approach, utilizing `TanStack React Query` for server state, `Zustand` for local profile data, and React Context for UI themes.

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
  - Synthetic encounter data in `shared/serendipity-data.ts` with first names for each user
  - Auto-trigger after 12 seconds (simulating "entering a coffee shop")
  - Manual "Simulate" button in header for demo purposes
  - Three-stage reveal flow:
    1. **Teaser**: Initial notification with "Find out who?" and "Ignore" buttons
    2. **Revealed**: Shared interests details with "Simulate Mutual Match" button (waiting for both users to say yes)
    3. **Matched**: Reveals first name with connection options ("Tap Phones" or "Add to Network")

### Backend

The backend uses Express.js with TypeScript, providing a RESTful API for profile management, location updates, discoverability toggling, and match retrieval. It implements a simple matching engine based on shared interests (2+ required) and a 100-meter geographic radius using the Haversine formula. Currently, it uses in-memory storage with an interface designed for future database integration.

### Data Storage

PostgreSQL, managed via Neon serverless driver and Drizzle ORM, is used for data persistence. The schema includes tables for `profiles`, `nodes`, `edges`, and `clusters` to support interest graph data and future advanced matching capabilities. Zod is used for schema validation.

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