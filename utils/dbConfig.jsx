import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://neondb_owner:npg_jOTARh1P9xDN@ep-weathered-queen-a17la62l-pooler.ap-southeast-1.aws.neon.tech/Expense-Tracker?sslmode=require&channel_binding=require"
);
export const db = drizzle({ client: sql, schema });
// const db = drizzle(sql, { schema });
