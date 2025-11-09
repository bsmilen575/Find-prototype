import { type Profile } from "@shared/schema";

export interface SimpleMatch {
  sharedInterests: string[];
  matchCount: number;
}

/**
 * Simple interest matching: Count how many interests two profiles share
 * Returns match info with shared interests array
 */
export function findSharedInterests(profile1: Profile, profile2: Profile): SimpleMatch {
  const interests1 = new Set(profile1.interests.map(i => i.toLowerCase().trim()));
  const interests2 = new Set(profile2.interests.map(i => i.toLowerCase().trim()));
  
  const sharedInterests: string[] = [];
  
  for (const interest of interests1) {
    if (interests2.has(interest)) {
      // Find the original casing from profile2
      const original = profile2.interests.find(i => i.toLowerCase().trim() === interest);
      if (original) {
        sharedInterests.push(original);
      }
    }
  }
  
  return {
    sharedInterests,
    matchCount: sharedInterests.length,
  };
}

/**
 * Check if two profiles meet the minimum match threshold (2+ shared interests)
 */
export function isMatch(profile1: Profile, profile2: Profile): boolean {
  const match = findSharedInterests(profile1, profile2);
  return match.matchCount >= 2;
}
