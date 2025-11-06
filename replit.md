# Find - Privacy-First Location Matching Platform

## Overview

Find is a real-time location-based matching platform that connects users with compatible people nearby based on deep multi-dimensional compatibility analysis. The application focuses on three core matching dimensions: niche interests (books, music, hobbies), whole-person compatibility (comprehensive profile analysis), and opportunity matching (job seekers, mentors, collaborators).

The platform emphasizes privacy-first design principles, using cryptographic techniques to protect user data while enabling meaningful connections. Users can discover compatible matches in their vicinity without compromising personal information until they choose to connect.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for client-side routing with three main routes:
- `/` - Home page with MapView component for discovering matches
- `/about` - Information about the platform and privacy features
- `/onboarding` - Multi-step profile creation flow

**State Management**:
- TanStack React Query for server state management and caching
- Zustand for local profile state (stored in localStorage)
- React Context for theme management (light/dark mode)

**UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling. The design system follows a "New York" style with custom color tokens and spacing primitives defined in the Tailwind configuration.

**Design Philosophy**: Privacy-first visual language drawing inspiration from Airbnb (location discovery), LinkedIn (professional profiles), Signal (privacy aesthetic), and Tinder (quick decision-making). Uses Inter as primary font and Space Grotesk for accent typography.

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Structure**: RESTful API with the following endpoints:
- `POST /api/profiles` - Create new user profile
- `GET /api/profiles/:id` - Retrieve profile by ID
- `POST /api/profiles/:id/location` - Update user location
- `GET /api/profiles/:id/matches` - Get compatible matches within specified radius

**Matching Engine**: Multi-stage compatibility scoring system with three components:
1. Niche Score - Shared specific interests (books, music, hobbies)
2. Whole Person Score - Overall profile compatibility
3. Opportunities Score - Complementary needs/offerings

**Storage Strategy**: Currently using in-memory storage (`MemStorage` class) with interface (`IStorage`) designed for future database implementation. Location-based queries use haversine formula for distance calculations.

### Data Storage Solutions

**Database**: PostgreSQL via Neon serverless driver, managed through Drizzle ORM

**Schema Design**:
- Single `profiles` table with fields: id, name, books[], music[], hobbies[], seeking[], latitude, longitude, embedding, lastActive
- Array fields for multi-value interests
- Embedding field stores serialized vector representation for similarity matching
- Geographic coordinates for proximity-based filtering

**ORM**: Drizzle with Zod schema validation for type-safe database operations and API input validation

### Authentication and Authorization

**Current State**: No authentication system implemented. Profiles are identified by UUID and stored in browser localStorage.

**Privacy Mechanisms Mentioned** (not yet implemented):
- Private Set Intersection (PSI) for matching without revealing full profiles
- Cryptographic techniques for data encryption
- Decentralized storage via Solid Pods (referenced in About page)

### Core Matching Algorithm

**Embedding Generation**: Uses OpenAI's `text-embedding-3-small` model to create vector representations of user profiles based on combined books, music, hobbies, and seeking fields.

**Similarity Calculation**: 
- Cosine similarity between profile embeddings for whole-person compatibility
- Direct comparison of array fields for niche interest matching
- Weighted combination of scores to generate overall compatibility percentage

**Geographic Filtering**: Radius-based filtering using latitude/longitude coordinates with configurable search distance (default 5km, adjustable via slider in UI).

**Real-time Updates**: Matches query refetches every 30 seconds to provide near-real-time discovery of nearby compatible users.

## External Dependencies

### Third-Party Services

**OpenAI API**: 
- Used for profile embedding generation (`text-embedding-3-small`)
- Required for compatibility matching features
- API key must be configured in `OPENAI_API_KEY` environment variable

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