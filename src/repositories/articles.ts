import redis from "@/cache";
import { db } from "@/db";
import { articles, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getArticles() {
  const cached = await redis.get("articles:all");

  if (cached) {
    console.log("Get Articles Cache Hit!");
    return cached;
  }
  console.log("Get Articles Cache Miss!");

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: users.name,
    })
    .from(articles)
    .leftJoin(users, eq(articles.authorId, users.id));

  redis.set("articles:all", response, {
    ex: 60, // in seconds
  });

  return response;
}

export async function getArticleById(id: number) {
  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: users.name,
      authorId: users.id,
      imageUrl: articles.imageUrl,
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(users, eq(articles.authorId, users.id));

  return response[0] ? response[0] : null;
}
