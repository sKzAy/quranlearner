import { pgTable, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: varchar("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  liked:jsonb("liked").$type([{ surah: Number, verse: Number, message: String }]).default([]),
 // array of objects stored in JSONB
  updatedAt: timestamp("updated_at").defaultNow(),
});
