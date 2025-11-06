import { sql } from "drizzle-orm";
import { pgTable, text, varchar, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  books: text("books").array().notNull().default(sql`ARRAY[]::text[]`),
  music: text("music").array().notNull().default(sql`ARRAY[]::text[]`),
  hobbies: text("hobbies").array().notNull().default(sql`ARRAY[]::text[]`),
  seeking: text("seeking").array().notNull().default(sql`ARRAY[]::text[]`),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  embedding: text("embedding"),
  lastActive: timestamp("last_active").notNull().default(sql`now()`),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  embedding: true,
  lastActive: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
