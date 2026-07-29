import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

const schema = { articles };
export default schema;

export type Article = typeof articles.$inferInsert;
export type NewArticle = typeof articles.$inferInsert;

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email"),
});

export type User = typeof users.$inferSelect;
