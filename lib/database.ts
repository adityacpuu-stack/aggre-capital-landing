import { Pool } from 'pg';

// Disable SSL certificate verification for self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Database connection pool with better error handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined,
  },
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
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test database connection
export async function testConnection() {
  try {
    const result = await query('SELECT NOW()');
    console.log('✅ Database connected:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

export default pool;
