import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { articles, users } from "./schema";
import postgres from "postgres";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const queryClient = postgres(process.env.DATABASE_URL, { prepare: false });

export const db = drizzle(queryClient, {
  schema: { articles, users },
});
