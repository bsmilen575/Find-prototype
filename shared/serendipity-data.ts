export interface FakeEncounter {
  id: string;
  type: 'private' | 'public';
  location: string;
  sharedThemes: string[];
  sharedNodes: string[];
  distance: string;
  nearbyUser: {
    alias: string;
    firstName: string;
    overlapPercent: number;
  };
  publicPosting?: {
    title: string;
    description: string;
  };
}

export const fakeEncounters: FakeEncounter[] = [
  {
    id: "match1",
    type: "private",
    location: "Coffee Shop",
    sharedThemes: ["Startups", "Product Design"],
    sharedNodes: ["Web3", "AI/ML", "User Research"],
    distance: "18m",
    nearbyUser: {
      alias: "Someone nearby is looking for a technical cofounder",
      firstName: "Maya",
      overlapPercent: 0.84
    }
  },
  {
    id: "match2",
    type: "public",
    location: "Your Neighborhood",
    sharedThemes: [],
    sharedNodes: [],
    distance: "45m",
    nearbyUser: {
      alias: "Someone nearby is selling a couch",
      firstName: "Alex",
      overlapPercent: 0
    },
    publicPosting: {
      title: "Vintage couch for sale",
      description: "Beautiful mid-century couch, $200. Moving next week — needs a new home!"
    }
  },
  {
    id: "match3",
    type: "public",
    location: "Creative Hub",
    sharedThemes: [],
    sharedNodes: [],
    distance: "25m",
    nearbyUser: {
      alias: "Someone nearby is hosting a Film×AI meet-and-greet",
      firstName: "Jordan",
      overlapPercent: 0
    },
    publicPosting: {
      title: "Film×AI Meet-and-Greet",
      description: "Casual gathering for filmmakers and AI enthusiasts. Thursday 7pm at the Creative Hub. Bring your questions and projects!"
    }
  },
  {
    id: "match4",
    type: "private",
    location: "Park",
    sharedThemes: ["Wellness", "Craft & Ritual"],
    sharedNodes: ["Yoga", "Sourdough Bread"],
    distance: "35m",
    nearbyUser: {
      alias: "A runner nearby",
      firstName: "Sam",
      overlapPercent: 0.76
    }
  }
];
