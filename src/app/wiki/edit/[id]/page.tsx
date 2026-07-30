import WikiEditor from "@/components/wiki-editor";
import { getArticleById } from "@/db/queries/articles";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;
  const { userId } = await auth.protect();

  const article = await getArticleById(Number(id));

  if (!article) {
    notFound();
  }

  const canEdit = article.authorId === userId;

  return (
    <WikiEditor
      articleId={id}
      userId={userId}
      initialTitle={article.title}
      initialContent={article.content}
      isEditing={canEdit}
    />
  );
}
