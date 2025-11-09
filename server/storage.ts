import { type Profile, type InsertProfile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProfile(id: string): Promise<Profile | undefined>;
  getAllProfiles(): Promise<Profile[]>;
  getProfilesNearby(latitude: number, longitude: number, radiusKm: number): Promise<Profile[]>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfileLocation(id: string, latitude: number, longitude: number): Promise<Profile | undefined>;
  updateDiscoverable(id: string, discoverable: boolean): Promise<Profile | undefined>;
}

export class MemStorage implements IStorage {
  private profiles: Map<string, Profile>;

  constructor() {
    this.profiles = new Map();
  }

  async getProfile(id: string): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async getAllProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfilesNearby(latitude: number, longitude: number, radiusKm: number): Promise<Profile[]> {
    const profiles = Array.from(this.profiles.values());
    return profiles.filter(profile => {
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

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = randomUUID();
    const profile: Profile = {
      id,
      name: insertProfile.name,
      interests: insertProfile.interests || [],
      discoverable: insertProfile.discoverable ?? true,
      latitude: insertProfile.latitude || null,
      longitude: insertProfile.longitude || null,
      lastActive: new Date(),
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfileLocation(id: string, latitude: number, longitude: number): Promise<Profile | undefined> {
    const profile = this.profiles.get(id);
    if (!profile) return undefined;
    
    const updated = {
      ...profile,
      latitude,
      longitude,
      lastActive: new Date(),
    };
    this.profiles.set(id, updated);
    return updated;
  }

  async updateDiscoverable(id: string, discoverable: boolean): Promise<Profile | undefined> {
    const profile = this.profiles.get(id);
    if (!profile) return undefined;
    
    const updated = {
      ...profile,
      discoverable,
      lastActive: new Date(),
    };
    this.profiles.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
