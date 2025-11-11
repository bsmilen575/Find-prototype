export interface FakeEncounter {
  id: string;
  location: string;
  sharedThemes: string[];
  sharedNodes: string[];
  distance: string;
  nearbyUser: {
    alias: string;
    firstName: string;
    overlapPercent: number;
  };
}

export const fakeEncounters: FakeEncounter[] = [
  {
    id: "match1",
    location: "Coffee Shop",
    sharedThemes: ["Speculative Fiction", "Psychological Realism"],
    sharedNodes: ["Island of Dr. Moreau", "Annihilation"],
    distance: "12m",
    nearbyUser: {
      alias: "Someone nearby",
      firstName: "Maya",
      overlapPercent: 0.82
    }
  },
  {
    id: "match2",
    location: "Park",
    sharedThemes: ["Wellness", "Craft & Ritual"],
    sharedNodes: ["Yoga", "Sourdough Bread"],
    distance: "35m",
    nearbyUser: {
      alias: "A runner nearby",
      firstName: "Alex",
      overlapPercent: 0.76
    }
  },
  {
    id: "match3",
    location: "Library",
    sharedThemes: ["Indie Music", "Art Curation"],
    sharedNodes: ["Bon Iver", "Contemporary Art Museums"],
    distance: "8m",
    nearbyUser: {
      alias: "A reader nearby",
      firstName: "Jordan",
      overlapPercent: 0.88
    }
  },
  {
    id: "match4",
    location: "Gym",
    sharedThemes: ["Fitness", "Mindfulness"],
    sharedNodes: ["Running", "Meditation"],
    distance: "22m",
    nearbyUser: {
      alias: "An athlete nearby",
      firstName: "Sam",
      overlapPercent: 0.71
    }
  }
];
