import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./app/db/drizzle/mysql",
  schema: "./app/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
