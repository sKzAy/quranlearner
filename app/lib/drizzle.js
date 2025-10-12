import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// You can import environment variables directly instead of from next.config
const sql = neon(process.env.DATABASE_URL);

// Create Drizzle client
export const db = drizzle(sql);
