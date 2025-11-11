import { sql } from "drizzle-orm";
import { pgTable, text, varchar, doublePrecision, timestamp, boolean, integer, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  interests: text("interests").array().notNull().default(sql`ARRAY[]::text[]`),
  discoverable: boolean("discoverable").notNull().default(true),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  lastActive: timestamp("last_active").notNull().default(sql`now()`),
  graphData: jsonb("graph_data"),
  signature: doublePrecision("signature").array(),
  uploadedFiles: text("uploaded_files").array().default(sql`ARRAY[]::text[]`),
});

export const nodes = pgTable("nodes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").notNull(),
  label: text("label").notNull(),
  type: varchar("type").notNull(),
  attentionWeight: integer("attention_weight").notNull(),
  source: text("source").notNull(),
  evidence: jsonb("evidence").notNull(),
  firstSeen: timestamp("first_seen").notNull(),
  lastActive: timestamp("last_active").notNull(),
  cluster: varchar("cluster"),
});

export const edges = pgTable("edges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").notNull(),
  sourceNodeId: varchar("source_node_id").notNull(),
  targetNodeId: varchar("target_node_id").notNull(),
  weight: doublePrecision("weight").notNull(),
  type: varchar("type").notNull(),
});

export const clusters = pgTable("clusters", {
  id: varchar("id").primaryKey(),
  profileId: varchar("profile_id").notNull(),
  name: text("name").notNull(),
  nodeIds: text("node_ids").array().notNull(),
  color: varchar("color"),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  lastActive: true,
  userId: true,
}).extend({
  interests: z.array(z.string()).min(5).max(5),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
export type Node = typeof nodes.$inferSelect;
export type Edge = typeof edges.$inferSelect;
export type Cluster = typeof clusters.$inferSelect;
