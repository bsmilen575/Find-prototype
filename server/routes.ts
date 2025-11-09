import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema } from "@shared/schema";
import { findSharedInterests, isMatch } from "./matching";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create profile
  app.post("/api/profiles", async (req, res) => {
    try {
      const validatedData = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(validatedData);
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get profile
  app.get("/api/profiles/:id", async (req, res) => {
    const profile = await storage.getProfile(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  });

  // Update location
  app.post("/api/profiles/:id/location", async (req, res) => {
    const { latitude, longitude } = req.body;
    
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ error: "Invalid coordinates" });
    }
    
    const profile = await storage.updateProfileLocation(req.params.id, latitude, longitude);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    
    res.json(profile);
  });

  // Toggle discoverable status
  app.post("/api/profiles/:id/discoverable", async (req, res) => {
    const { discoverable } = req.body;
    
    if (typeof discoverable !== "boolean") {
      return res.status(400).json({ error: "Invalid discoverable value" });
    }
    
    const profile = await storage.updateDiscoverable(req.params.id, discoverable);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    
    res.json(profile);
  });

  // Find matches (simple interest-based matching within 100m)
  app.get("/api/profiles/:id/matches", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      // Fixed 100m radius for hyper-local matching
      const radiusKm = 0.1;
      
      if (!profile.latitude || !profile.longitude) {
        return res.json([]);
      }

      const nearbyProfiles = await storage.getProfilesNearby(
        profile.latitude,
        profile.longitude,
        radiusKm
      );

      const matches = [];
      
      for (const candidate of nearbyProfiles) {
        // Skip self and non-discoverable profiles
        if (candidate.id === profile.id || !candidate.discoverable) {
          continue;
        }
        
        // Check if there are 2+ shared interests
        if (isMatch(profile, candidate)) {
          const matchInfo = findSharedInterests(profile, candidate);
          const distance = calculateDistance(
            profile.latitude,
            profile.longitude,
            candidate.latitude!,
            candidate.longitude!
          );
          
          matches.push({
            profileId: candidate.id,
            distance: Math.round(distance * 1000), // Distance in meters
            sharedInterests: matchInfo.sharedInterests,
            matchCount: matchInfo.matchCount,
            // Don't reveal name until double-blind reveal
            revealed: false,
          });
        }
      }

      // Sort by match count, then by distance
      matches.sort((a, b) => {
        if (b.matchCount !== a.matchCount) {
          return b.matchCount - a.matchCount;
        }
        return a.distance - b.distance;
      });
      
      res.json(matches);
    } catch (error: any) {
      console.error("Match error:", error);
      res.status(500).json({ error: "Failed to find matches" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
