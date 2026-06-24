import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "@/db/schema";

type Db = LibSQLDatabase<typeof schema>;

let client: Client | undefined;
let database: Db | undefined;

function getCredentials() {
  const url =
    process.env.DATABASE_URL ?? process.env.TURSO_DATABASE_URL ?? "";
  const authToken =
    process.env.DATABASE_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      "DATABASE_URL (or TURSO_DATABASE_URL) is not set in environment.",
    );
  }

  return { url, authToken };
}

export function getDb(): Db {
  if (!database) {
    const { url, authToken } = getCredentials();
    client = createClient({ url, authToken });
    database = drizzle(client, { schema });
  }

  return database;
}
