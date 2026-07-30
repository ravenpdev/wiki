import resend from "@/email";
import { db } from "@/db";
import { users, articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import CelebrationTemplate from "@/email/templates/celebration-template";

// When deployed to Vercel, process.env.VERCEL_URL is automatically populated with the correct base URL (including for preview environments).
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

export default async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const response = await db
    .select({
      email: users.email,
      id: users.id,
      title: articles.title,
      name: users.name,
    })
    .from(articles)
    .leftJoin(users, eq(articles.authorId, users.id))
    .where(eq(articles.id, articleId));

  const { email, id, name, title } = response[0];

  if (!email) {
    console.log(
      `skipping celebration for ${articleId} on pageviews ${pageviews}, could not find email in datatabase`,
    );
    return;
  }

  // for custom domain setup
  // const emailRes = resend.emails.send({
  //   from: "test@gmail.com",
  //   to: email,
  //   subject: `Your article on wiki get ${pageviews} views`,
  //   html: "<h1>Congrats!</h1><p>You're an amazing author and people like you</p>",
  // });

  // for custom domain setup
  const emailRes = await resend.emails.send({
    from: "Wiki <wiki@resend.dev>",
    to: "raven.paragas1992@gmail.com",
    subject: `Your article on wiki get ${pageviews} views`,
    // html: "<h1>Congrats!</h1><p>You're an amazing author and people like you</p>",
    react: (
      <CelebrationTemplate
        articleTitle={title}
        name={name ?? "Friend"}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        pageviews={pageviews}
      />
    ),
  });

  // never log emails information for GDPR compliance
  if (!emailRes.error) {
    console.log(
      `sent ${id} a celebration email for getting ${pageviews} on article ${articleId}`,
    );
  } else {
    console.log(
      `error sending ${id} a celebration email for getting ${pageviews} on article ${articleId}`,
    );
  }
}
