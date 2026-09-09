import { Pool } from "pg";

// Scope the existing managed-database certificate setting to PostgreSQL.
// Never disable certificate validation globally for outbound HTTPS (Resend).
const databaseUrl = process.env.DATABASE_URL
  ? new URL(process.env.DATABASE_URL)
  : null;
const requiresSsl =
  databaseUrl?.searchParams.get("sslmode") === "require" ||
  databaseUrl?.hostname.endsWith(".ondigitalocean.com");
if (requiresSsl) databaseUrl?.searchParams.delete("sslmode");

// Database connection pool with better error handling
const pool = new Pool({
  connectionString: databaseUrl?.toString(),
  ssl: requiresSsl ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Query function with logging
export async function query(text: string, params: any[] = []) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Test database connection
export async function testConnection() {
  try {
    const result = await query("SELECT NOW()");
    console.log("✅ Database connected:", result.rows[0]);
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

export default pool;
