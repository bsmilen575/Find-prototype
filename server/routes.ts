import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema } from "@shared/schema";
import { generateProfileEmbedding, calculateCompatibility, cosineSimilarity } from "./matching";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create profile
  app.post("/api/profiles", async (req, res) => {
    try {
      const validatedData = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(validatedData);
      
      // Generate embedding asynchronously
      try {
        const embedding = await generateProfileEmbedding(profile);
        await storage.updateProfileEmbedding(profile.id, JSON.stringify(embedding));
      } catch (error) {
        console.error("Failed to generate embedding:", error);
      }
      
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

  // Find matches
  app.get("/api/profiles/:id/matches", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const radiusKm = parseFloat(req.query.radius as string) || 5;
      
      if (!profile.latitude || !profile.longitude) {
        return res.json([]);
      }

      const nearbyProfiles = await storage.getProfilesNearby(
        profile.latitude,
        profile.longitude,
        radiusKm
      );

      const matches = [];
      
      // First filter by embedding similarity if available
      const candidatesWithScores = nearbyProfiles
        .filter(candidate => candidate.id !== profile.id)
        .map(candidate => {
          let embeddingScore = 0;
          if (profile.embedding && candidate.embedding) {
            try {
              const embedding1 = JSON.parse(profile.embedding);
              const embedding2 = JSON.parse(candidate.embedding);
              embeddingScore = cosineSimilarity(embedding1, embedding2);
            } catch (e) {
              console.error("Embedding similarity failed:", e);
            }
          }
          return { candidate, embeddingScore };
        })
        .filter(({ embeddingScore }) => embeddingScore >= 0.6 || embeddingScore === 0) // Keep if score is good or not computed
        .sort((a, b) => b.embeddingScore - a.embeddingScore)
        .slice(0, 20); // Limit to top 20 by embedding similarity

      // Then get detailed compatibility for top candidates
      for (const { candidate } of candidatesWithScores) {
        try {
          const compatibility = await calculateCompatibility(profile, candidate);
          
          if (compatibility.overallScore >= 60) {
            const distance = calculateDistance(
              profile.latitude,
              profile.longitude,
              candidate.latitude!,
              candidate.longitude!
            );
            
            matches.push({
              profileId: candidate.id,
              name: candidate.name,
              distance: Math.round(distance * 10) / 10,
              compatibility,
            });
          }
        } catch (error) {
          console.error(`Failed to calculate compatibility for ${candidate.id}:`, error);
          // Continue with other matches
        }
      }

      matches.sort((a, b) => b.compatibility.overallScore - a.compatibility.overallScore);
      
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
