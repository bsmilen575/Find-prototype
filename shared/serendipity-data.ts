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
    location: "Your Neighborhood",
    sharedThemes: ["Sustainable Living", "Minimalism"],
    sharedNodes: ["Vintage Furniture", "Local Exchange"],
    distance: "45m",
    nearbyUser: {
      alias: "Someone nearby is looking to sell their couch",
      firstName: "Alex",
      overlapPercent: 0.68
    }
  },
  {
    id: "match3",
    location: "Creative Hub",
    sharedThemes: ["Film Theory", "Creative AI"],
    sharedNodes: ["Generative Art", "Cinema Vérité", "AI Ethics"],
    distance: "25m",
    nearbyUser: {
      alias: "Someone nearby is hosting a meet-and-greet in your city and is looking to invite people interested in the film<>AI space",
      firstName: "Jordan",
      overlapPercent: 0.91
    }
  },
  {
    id: "match4",
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
