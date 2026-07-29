"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { articles, users } from "../schema";

export async function getArticles() {
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
