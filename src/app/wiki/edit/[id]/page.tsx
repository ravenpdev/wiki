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
  // const { userId } = await auth.protect();
  const { id } = await params;

  const article = await getArticleById(Number(id));

  if (!article) {
    notFound();
  }

  return `article ${id} edit page`;
}
