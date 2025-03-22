import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model for authentication (if needed later)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Message model for contact form submissions
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Repository model for caching GitHub repositories (optional)
export const repositories = pgTable("repositories", {
  id: serial("id").primaryKey(),
  repoId: text("repo_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  stars: integer("stars").default(0).notNull(),
  forks: integer("forks").default(0).notNull(),
  language: text("language"),
  updatedAt: timestamp("updated_at").notNull(),
  tags: text("tags").array(),
});

// Define Zod schemas for type validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertRepositorySchema = createInsertSchema(repositories).omit({
  id: true,
});

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertRepository = z.infer<typeof insertRepositorySchema>;
export type Repository = typeof repositories.$inferSelect;
