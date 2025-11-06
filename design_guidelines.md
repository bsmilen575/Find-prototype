# Find Engine - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from privacy-first social platforms and location-based discovery apps:
- **Airbnb** - Location-based discovery, map integration, trust signals
- **LinkedIn** - Professional profiles, opportunity matching
- **Signal** - Privacy-first aesthetic, secure feeling design
- **Tinder** - Quick decision-making, match reveals

**Core Design Principles:**
1. Privacy-first visual language - subtle, trustworthy, secure
2. Real-time proximity awareness without compromising safety
3. Multi-dimensional compatibility visualization
4. Clear, transparent match explanations

---

## Typography System

**Font Families:**
- Primary: Inter (CDN: Google Fonts) - clean, modern, highly readable
- Accent: Space Grotesk (Google Fonts) - for compatibility scores, stats

**Type Scale:**
- Hero/Landing: text-6xl font-bold (48px)
- Section Headers: text-4xl font-bold (36px)
- Card Titles: text-2xl font-semibold (24px)
- Body: text-base (16px), text-lg for emphasis
- Captions/Labels: text-sm (14px)
- Micro-copy: text-xs (12px) for privacy notices

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16 (desktop), py-8 (mobile)
- Card gaps: gap-4, gap-6
- Icon margins: m-2, mr-4

**Grid System:**
- Main containers: max-w-7xl mx-auto
- Profile cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Match interface: Two-column split (lg:grid-cols-2) - profile left, compatibility right
- Map view: Full-width with overlay controls

---

## Component Library

### Navigation
**Top Navigation Bar:**
- Sticky header with blur backdrop (backdrop-blur-md)
- Logo left, main nav center, profile/notifications right
- Privacy indicator icon always visible
- Distance filter toggle prominently placed

### Map Interface
**Interactive Map Component:**
- Full-screen map view as primary discovery interface
- Anonymized match pins (no profile photos until interaction)
- Proximity radius visualization (subtle circle overlay)
- Bottom sheet slide-up for match previews
- Cluster indicators for multiple nearby matches

### Profile Cards
**Multi-Dimensional Profile Display:**
- Card-based layout with rounded corners (rounded-2xl)
- Interest tags organized by category (books, music, hobbies, etc.)
- Compatibility percentage badge (top-right corner)
- Privacy level indicator (encrypted icon)
- Distance indicator (subtle, bottom-left)
- Expandable sections for detailed interests

### Match Explanation Modal
**Compatibility Breakdown:**
- Three-column grid: Niche Overlap | Whole Person Score | Opportunity Match
- Visual progress bars for each dimension
- Specific shared interests highlighted (e.g., "Both love 'Island of Dr. Moreau'")
- Gap matches shown as complementary pairs (mentor ↔ mentee icons)

### Real-Time Notifications
**Match Alerts:**
- Toast notifications (top-right, slide-in animation)
- Sound/vibration indicators (user-controlled)
- Proximity threshold indicators ("Within 500m")
- Privacy-safe previews (compatibility score only, no identity)

### Onboarding Flow
**Progressive Profile Building:**
- Step-by-step wizard (5 screens max)
- Visual category selection (icon-based tiles)
- Interest input with autocomplete tags
- Location permissions with clear privacy explanation
- Privacy settings dashboard (toggle controls)

### Forms & Inputs
- Rounded input fields (rounded-lg) with focus rings
- Tag input for interests (pill-shaped, dismissible)
- Location radius slider (visual feedback)
- Privacy toggles with clear labels

---

## Privacy-First Design Elements

**Visual Trust Indicators:**
- Lock icons for encrypted data
- Eye-slash icons for hidden profile elements
- Green checkmarks for verified interests
- Shield badges for privacy settings

**Anonymous Match Previews:**
- Blurred profile images until mutual interest
- Compatibility scores without identity reveal
- "?" placeholder avatars on map
- Progressive disclosure (show more after interaction)

---

## Images

### Landing Page Hero
**Large Hero Image:** Yes
- Full-viewport hero with real people connecting in urban settings
- Overlay with blurred button backgrounds
- Image should convey: proximity, diversity, authentic moments
- Suggested: Candid photo of people at coffee shop, bookstore, or co-working space with city backdrop

### Profile Placeholders
- Abstract geometric patterns until profile reveal
- Category-specific icons for interest areas (book icon, music note, etc.)
- Map marker icons with gradient fills

### Match Success States
- Celebratory illustrations for mutual matches
- Subtle confetti or spark animations (minimal, one-time)

---

## Animations
**Minimal and Purposeful:**
- Match card flip reveal (3D transform on mutual match)
- Proximity pulse on map pins (breathing effect)
- Slide-up bottom sheet for match previews
- Smooth transitions between onboarding steps
- NO auto-playing carousel, NO parallax scrolling

---

## Accessibility
- High contrast for compatibility scores
- Clear focus states on all interactive elements
- Screen reader labels for privacy indicators
- Keyboard navigation for map interface
- Alt text for all profile icons and category markers

---

## Icon Library
**Heroicons (CDN)** - outline style for UI elements, solid style for filled states
- Map pin, lock, eye, eye-slash, shield, checkmark, star, heart, briefcase, book, music note, etc.