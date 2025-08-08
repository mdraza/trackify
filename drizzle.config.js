import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_jOTARh1P9xDN@ep-weathered-queen-a17la62l-pooler.ap-southeast-1.aws.neon.tech/Expense-Tracker?sslmode=require&channel_binding=require",
  },
});
