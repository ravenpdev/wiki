import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function isAuthorizedToEditArticle(
  userId: string,
  articleId: number,
) {
  const response = await db
    .select({
      authorId: articles.authorId,
    })
    .from(articles)
    .where(eq(articles.id, articleId));

  if (!response.length) {
    return false;
  }

  return response[0].authorId === userId;
}
