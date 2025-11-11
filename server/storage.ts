import { type Profile, type InsertProfile, type User, type UpsertUser, users, profiles } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Profile operations
  getProfile(id: string): Promise<Profile | undefined>;
  getProfileByUserId(userId: string): Promise<Profile | undefined>;
  getAllProfiles(): Promise<Profile[]>;
  getProfilesNearby(latitude: number, longitude: number, radiusKm: number): Promise<Profile[]>;
  createProfile(profile: InsertProfile, userId: string): Promise<Profile>;
  updateProfileLocation(id: string, latitude: number, longitude: number): Promise<Profile | undefined>;
  updateDiscoverable(id: string, discoverable: boolean): Promise<Profile | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Profile operations
  async getProfile(id: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.id, id));
    return profile;
  }

  async getProfileByUserId(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile;
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await db.select().from(profiles);
  }

  async getProfilesNearby(latitude: number, longitude: number, radiusKm: number): Promise<Profile[]> {
    const allProfiles = await db.select().from(profiles);
    return allProfiles.filter(profile => {
      if (!profile.latitude || !profile.longitude) return false;
      const distance = this.calculateDistance(
        latitude,
        longitude,
        profile.latitude,
        profile.longitude
      );
      return distance <= radiusKm;
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async createProfile(insertProfile: InsertProfile, userId: string): Promise<Profile> {
    const [profile] = await db
      .insert(profiles)
      .values({
        ...insertProfile,
        userId,
      })
      .returning();
    return profile;
  }

  async updateProfileLocation(id: string, latitude: number, longitude: number): Promise<Profile | undefined> {
    const [updated] = await db
      .update(profiles)
      .set({
        latitude,
        longitude,
        lastActive: new Date(),
      })
      .where(eq(profiles.id, id))
      .returning();
    return updated;
  }

  async updateDiscoverable(id: string, discoverable: boolean): Promise<Profile | undefined> {
    const [updated] = await db
      .update(profiles)
      .set({
        discoverable,
        lastActive: new Date(),
      })
      .where(eq(profiles.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
