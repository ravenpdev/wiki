import WikiEditor from "@/components/wiki-editor";
import { auth } from "@clerk/nextjs/server";

export default async function NewArticlePage() {
  await auth.protect();

  return <WikiEditor isEditing={false} />;
}
