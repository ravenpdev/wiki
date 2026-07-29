import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type WikiCardProps = {
  title: string;
  author: string;
  date: string;
  summary: string;
  href: string;
};

export function WikiCard({
  title,
  author,
  date,
  summary,
  href,
}: WikiCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs text-mute-foreground">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <CardDescription>{summary}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          href={href}
          className="text-blue-600 hover:underline text-sm font-medium w-fit"
        >
          Read article &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
