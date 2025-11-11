import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema } from "@shared/schema";
import { findSharedInterests, isMatch } from "./matching";
import { setupAuth, isAuthenticated } from "./replitAuth";
import OpenAI from "openai";
import { z } from "zod";

// Using OpenAI API with user's API key for document analysis
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth route - get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Analyze document and extract interests (protected)
  app.post("/api/analyze-document", isAuthenticated, async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: "Text is required" });
      }

      // Truncate to ~2k tokens (~8k characters)
      const truncatedText = text.slice(0, 8000);

      const prompt = `Analyze the following text and extract 10-15 key interests, topics, or recurring ideas.
Group them into 3-5 thematic clusters.
Return clean JSON with this format:
{ "clusters": [ { "theme": "", "topics": [] } ] }

Text:
${truncatedText}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert at analyzing text and extracting key interests and topics. Return only valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        return res.status(500).json({ error: "Failed to analyze document" });
      }

      const result = JSON.parse(content);
      
      // Flatten clusters into interests array
      const interests: string[] = [];
      if (result.clusters && Array.isArray(result.clusters)) {
        for (const cluster of result.clusters) {
          if (cluster.topics && Array.isArray(cluster.topics)) {
            interests.push(...cluster.topics);
          }
        }
      }

      res.json({ 
        interests: interests.slice(0, 15),
        clusters: result.clusters || []
      });

    } catch (error: any) {
      console.error("Error analyzing document:", error);
      res.status(500).json({ error: error.message || "Failed to analyze document" });
    }
  });

  // Create profile (protected)
  app.post("/api/profiles", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(validatedData, userId);
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get current user's profile
  app.get("/api/profile/me", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getProfileByUserId(userId);
      res.json(profile || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Get profile
  app.get("/api/profiles/:id", isAuthenticated, async (req, res) => {
    const profile = await storage.getProfile(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  });

  // Update location (protected)
  app.post("/api/profiles/:id/location", isAuthenticated, async (req, res) => {
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

  // Toggle discoverable status (protected)
  app.post("/api/profiles/:id/discoverable", isAuthenticated, async (req, res) => {
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

  // Find matches (simple interest-based matching within 100m, protected)
  app.get("/api/profiles/:id/matches", isAuthenticated, async (req, res) => {
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
