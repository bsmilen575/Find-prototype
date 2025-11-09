import { sql } from "drizzle-orm";
import { pgTable, text, varchar, doublePrecision, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  interests: text("interests").array().notNull().default(sql`ARRAY[]::text[]`),
  discoverable: boolean("discoverable").notNull().default(true),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  lastActive: timestamp("last_active").notNull().default(sql`now()`),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  lastActive: true,
}).extend({
  interests: z.array(z.string()).min(5).max(5),
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
