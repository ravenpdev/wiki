"use server";

import redis from "@/cache";
import { db } from "@/db";
import { articles } from "@/db/schema";
import isAuthorizedToEditArticle from "@/repositories/auth";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export type CreateArticleInput = {
  title: string;
  content: string;
  authorId: string;
  imageUrl?: string;
};

export type UpdateArticleInput = Partial<Omit<CreateArticleInput, "authorId">>;

export async function createArticle(data: CreateArticleInput) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  console.log("createArticle called:", data);

  const response = await db
    .insert(articles)
    .values({
      title: data.title,
      content: data.content,
      slug: `${Date.now()}`,
      published: true,
      authorId: userId,
      imageUrl: data.imageUrl ?? undefined,
    })
    .returning({ id: articles.id });

  const articleId = response[0]?.id;

  await redis.del("articles:all");

  return { success: true, message: "Article create logged", id: articleId };
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  console.log("updateArticle called:", { id, ...data });

  if (!isAuthorizedToEditArticle(userId, Number(id))) {
    throw new Error("Forbidden");
  }

  await db
    .update(articles)
    .set({
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl ?? undefined,
    })
    .where(eq(articles.id, +id));

  return { success: true, message: `Article ${id} update logged` };
}

export async function deleteArticle(id: string) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }

  if (!isAuthorizedToEditArticle(userId, Number(id))) {
    throw new Error("Forbidden");
  }

  console.log("deleteArticle called:", id);

  await db.delete(articles).where(eq(articles.id, Number(id)));

  return { success: true, message: `Article ${id} delete logged (stub)` };
}

export async function deleteArticleForm(formData: FormData): Promise<void> {
  const id = formData.get("id");

  if (!id) {
    throw new Error("Missing article id");
  }

  await deleteArticle(String(id));

  redirect("/");
}
