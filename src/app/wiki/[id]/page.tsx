import WikiArticleViewer from "@/components/wiki-article-viewer";
import { getArticleById } from "@/db/queries/articles";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

type ViewArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ViewArticlePage({
  params,
}: ViewArticlePageProps) {
  const { id } = await params;
  const { userId } = await auth.protect();

  const article = await getArticleById(Number(id));

  if (!article) {
    notFound();
  }

  const canEdit = article.authorId === userId;

  return <WikiArticleViewer article={article} canEdit={canEdit} />;
}
