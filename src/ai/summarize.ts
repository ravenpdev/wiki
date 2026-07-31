import { generateText } from "ai";

export async function summarizeArticle(title: string, content: string) {
  if (!content || !content.trim()) {
    throw new Error("Article content is required to generate a summary");
  }

  // check anthropic 10-step prompt approach is a good reference. better prompts lead to significantly better ai outputs, making the time investment worthwhile.
  const prompt = `Summarize the following wiki article in 1-2 concise sentences. Focus on the main idea and the most important details a reader should remember. Do not add opinions or unrelated information. Your goal is inform users of what the gist of a wiki article is so they can decide if they want to read more or not.\n\n<title>\n${title}</title>\n\n<wiki_content>\n${content}</wiki_content>`;

  const { text } = await generateText({
    model: "openai/gpt-5-nano",
    instructions: "You are an assistant that writes concise factual sumamries.",
    prompt,
  });

  return (text ?? "").trim();
}
